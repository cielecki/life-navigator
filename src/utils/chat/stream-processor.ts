import { Anthropic } from "@anthropic-ai/sdk";
import { Message, ContentBlock, ThinkingBlock, ToolUseBlock, RedactedThinkingBlock } from "../../types/message";
import { ApiUsageData } from "../../types/cost-tracking";
import { ensureContentBlocks } from "./content-blocks";

// Define the type for the stream parameter
type AnthropicMessageStream = AsyncIterable<Anthropic.Beta.Messages.BetaRawMessageStreamEvent>;

export interface StreamProcessorCallbacks {
	onMessageStart?: () => void;
	onMessageUpdate?: (message: Message) => void;
	onMessageStop?: (finalMessage: Message) => void;
	onAbort?: () => void;
	onUsageData?: (usage: ApiUsageData) => void;
}

export interface StreamProcessResult {
	aborted: boolean;
	finalContent: ContentBlock[] | null;
	finalMessage: Message | null;
	usageData?: ApiUsageData;
}

/**
 * Processes an Anthropic message stream and builds the response incrementally
 */
export const processAnthropicStream = async (
	stream: AnthropicMessageStream,
	signal: AbortSignal,
	callbacks: StreamProcessorCallbacks = {}
): Promise<StreamProcessResult> => {
	let aborted = false;
	let finalContent: ContentBlock[] = [];
	let localMessage: Message | null = null;
	let thinkingBlocksInProgress: Record<number, boolean> = {}; // Track thinking blocks in progress
	const partialJsonRef: Record<number, string> = {}; // Local JSON accumulator
	let accumulatedUsage: ApiUsageData | undefined; // Track accumulated usage data

	// Set up immediate abort detection
	const handleAbort = () => {
		aborted = true;
		callbacks.onAbort?.();
	};
	
	if (signal.aborted) {
		aborted = true;
	} else {
		signal.addEventListener('abort', handleAbort);
	}

	try {
		for await (const chunk of stream) {
			if (signal.aborted || aborted) {
				aborted = true;
				break;
			}

			switch (chunk.type) {
				case "message_start":
					localMessage = { role: "assistant", content: [] };
					finalContent = [];
					thinkingBlocksInProgress = {}; // Reset on new message
					
					// Extract usage information if available (but don't send to callback yet)
					if (chunk.message?.usage) {
						console.debug("API Usage (message_start)", chunk.message.usage);
						accumulatedUsage = {
							input_tokens: chunk.message.usage.input_tokens,
							cache_creation_input_tokens: chunk.message.usage.cache_creation_input_tokens ?? 0,
							cache_read_input_tokens: chunk.message.usage.cache_read_input_tokens ?? 0,
							output_tokens: chunk.message.usage.output_tokens,
							cache_creation: {
							  ephemeral_5m_input_tokens: chunk.message.usage.cache_creation?.ephemeral_5m_input_tokens,
							  ephemeral_1h_input_tokens: chunk.message.usage.cache_creation?.ephemeral_1h_input_tokens,
							},
							service_tier: chunk.message.usage.service_tier,
						}
						callbacks.onUsageData?.(accumulatedUsage);
					}
					
					callbacks.onMessageStart?.();
					// Create a fresh copy for the callback to avoid proxy issues
					callbacks.onMessageUpdate?.({ ...localMessage });
					break;

				case "content_block_start": {
					// Initialize message if needed
					if (!localMessage) {
						localMessage = { role: "assistant", content: [] };
						finalContent = [];
						callbacks.onMessageStart?.();
						callbacks.onMessageUpdate?.(localMessage);
					}

					const blockIndex = chunk.index;
					const blockType = chunk.content_block?.type;
					const currentContent = ensureContentBlocks(localMessage.content);

					if (blockType === "thinking") {
						thinkingBlocksInProgress[blockIndex] = true;
					}

					// Initialize JSON accumulator for tool_use blocks
					if (blockType === "tool_use") {
						partialJsonRef[blockIndex] = "";
					}

					// Prepare new content array
					const newContent = [...currentContent];
					while (newContent.length <= blockIndex) {
						newContent.push({ type: "text", text: "" });
					}

					// Set the block with appropriate type
					if (blockType === "text") {
						newContent[blockIndex] = { type: "text", text: "" };
					} else if (blockType === "thinking") {
						newContent[blockIndex] = {
							type: "thinking",
							thinking: "",
							reasoningInProgress: true, // Mark as in progress initially
						};
					} else if (blockType === "redacted_thinking" && chunk.content_block?.data) {
						newContent[blockIndex] = {
							type: "redacted_thinking",
							data: chunk.content_block.data,
						} as RedactedThinkingBlock;
					} else if (blockType === "tool_use" && chunk.content_block) {
						newContent[blockIndex] = {
							type: "tool_use",
							id: chunk.content_block.id,
							name: chunk.content_block.name,
							input: {},
						} as ToolUseBlock;
					}

					if (localMessage) {
						finalContent = newContent;
						localMessage.content = newContent;
						// Create a fresh copy for the callback to avoid proxy issues
						callbacks.onMessageUpdate?.({ ...localMessage, content: [...newContent] });
					}
					break;
				}
				case "content_block_delta": {
					if (!localMessage) continue;

					const deltaIndex = chunk.index;
					const content = ensureContentBlocks(localMessage.content);
					if (deltaIndex >= content.length) continue;

					const contentBlock = content[deltaIndex];
					if (!contentBlock) continue;

					const updatedContent = [...content];
					const delta = chunk.delta;

					// Handle different delta types
					if (delta.type === "text_delta" && contentBlock.type === "text") {
						updatedContent[deltaIndex] = {
							...contentBlock,
							text: contentBlock.text + delta.text,
						};
					} else if (delta.type === "thinking_delta" && contentBlock.type === "thinking") {
						updatedContent[deltaIndex] = {
							...contentBlock,
							thinking: contentBlock.thinking + delta.thinking,
							reasoningInProgress: true, // Still in progress while receiving deltas
						};
					} else if (delta.type === "signature_delta" && contentBlock.type === "thinking") {
						updatedContent[deltaIndex] = {
							...contentBlock,
							signature: (contentBlock.signature || "") + delta.signature,
						};
					} else if (delta.type === "input_json_delta" && contentBlock.type === "tool_use") {
						partialJsonRef[deltaIndex] = (partialJsonRef[deltaIndex] || "") + delta.partial_json;
					}

					finalContent = updatedContent;
					localMessage.content = updatedContent;
					// Create a fresh copy for the callback to avoid proxy issues
					callbacks.onMessageUpdate?.({ ...localMessage, content: [...updatedContent] });
					break;
				}
				case "content_block_stop": {
					if (!localMessage) break;

					const stopIndex = chunk.index;

					// If this is a thinking block, mark it as completed
					if (thinkingBlocksInProgress[stopIndex] && localMessage.content.length > stopIndex) {
						const block = localMessage.content[stopIndex];
						if (typeof block === "object" && block.type === "thinking") {
							const contentCopy = ensureContentBlocks(localMessage.content);
							contentCopy[stopIndex] = {
								...(contentCopy[stopIndex] as ThinkingBlock),
								reasoningInProgress: false,
							};
							finalContent = contentCopy;
							localMessage.content = contentCopy;
							delete thinkingBlocksInProgress[stopIndex]; // Remove from tracking
							// Create a fresh copy for the callback to avoid proxy issues
							callbacks.onMessageUpdate?.({ ...localMessage, content: [...contentCopy] });
						}
					}

					// Process JSON for tool_use blocks
					const jsonString = partialJsonRef[stopIndex];
					if (jsonString && localMessage.content.length > stopIndex) {
						const block = localMessage.content[stopIndex];
						if (typeof block === "object" && block.type === "tool_use") {
							try {
								if (jsonString.trim().startsWith("{") && jsonString.trim().endsWith("}")) {
									const contentCopy = ensureContentBlocks(localMessage.content);
									const toolBlock = { ...contentCopy[stopIndex] } as ToolUseBlock;
									toolBlock.input = JSON.parse(jsonString);
									contentCopy[stopIndex] = toolBlock;
									finalContent = contentCopy;
									localMessage.content = contentCopy;
									// Create a fresh copy for the callback to avoid proxy issues
									callbacks.onMessageUpdate?.({ ...localMessage, content: [...contentCopy] });
								}
							} catch (e) {
								console.error(`JSON parse error for block ${stopIndex}`, e);
							}
						}
					}

					// Clean up reference
					delete partialJsonRef[stopIndex];
					break;
				}
				case "message_stop":
					// Clear all thinking blocks in progress flags when message ends
					if (localMessage) {
						const finalContentCopy = ensureContentBlocks(localMessage.content);
						let hasChanges = false;

						finalContentCopy.forEach((block, idx) => {
							if (block.type === "thinking" && thinkingBlocksInProgress[idx]) {
								(finalContentCopy[idx] as ThinkingBlock).reasoningInProgress = false;
								delete thinkingBlocksInProgress[idx];
								hasChanges = true;
							}
						});

						if (hasChanges) {
							finalContent = finalContentCopy;
							localMessage.content = finalContentCopy;
							// Create a fresh copy for the callback to avoid proxy issues
							callbacks.onMessageUpdate?.({ ...localMessage, content: [...finalContentCopy] });
						}

						// Create a fresh copy for the callback to avoid proxy issues
						callbacks.onMessageStop?.({ ...localMessage, content: [...finalContent] });
					}

					thinkingBlocksInProgress = {};
					break;
				case "message_delta":
					console.debug("API Usage (message_delta)", chunk.usage);
					// Merge or update usage data (but don't send to callback yet)
					if (accumulatedUsage) {
						// Merge with existing usage data
						accumulatedUsage = {
							input_tokens: accumulatedUsage.input_tokens + (chunk.usage.input_tokens ?? 0),
							cache_creation_input_tokens: accumulatedUsage.cache_creation_input_tokens + (chunk.usage.cache_creation_input_tokens ?? 0),
							cache_read_input_tokens: accumulatedUsage.cache_read_input_tokens + (chunk.usage.cache_read_input_tokens ?? 0),
							output_tokens: accumulatedUsage.output_tokens + (chunk.usage.output_tokens ?? 0),
							cache_creation: accumulatedUsage.cache_creation, // No cache creation in delta
						};
					} else {
						accumulatedUsage = chunk.usage as ApiUsageData;
					}
					callbacks.onUsageData?.(accumulatedUsage);
					break;
			}
		}
	} catch (error) {
		console.error("Error processing Anthropic stream:", error);
		aborted = true;
	} finally {
		// Clean up abort event listener
		signal.removeEventListener('abort', handleAbort);
		
		// If stream was aborted or ended with incomplete thinking blocks, clean them up
		if ((aborted || signal.aborted) && localMessage && Object.keys(thinkingBlocksInProgress).length > 0) {
			console.debug("Cleaning up incomplete thinking blocks after stream abort");
			const finalContentCopy = ensureContentBlocks(localMessage.content);
			let hasChanges = false;

			finalContentCopy.forEach((block, idx) => {
				if (block.type === "thinking" && thinkingBlocksInProgress[idx]) {
					(finalContentCopy[idx] as ThinkingBlock).reasoningInProgress = false;
					delete thinkingBlocksInProgress[idx];
					hasChanges = true;
				}
			});

			if (hasChanges) {
				finalContent = finalContentCopy;
				localMessage.content = finalContentCopy;
				// Create a fresh copy for the callback to avoid proxy issues
				callbacks.onMessageUpdate?.({ ...localMessage, content: [...finalContentCopy] });
			}
		}
	}

	return {
		aborted,
		finalContent: finalContent.length > 0 ? finalContent : null,
		finalMessage: localMessage,
		usageData: accumulatedUsage,
	};
}; 