import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ContentBlock } from 'src/types/types';
import { ThinkingCollapsibleBlock, RedactedThinkingBlock as RedactedThinking, ToolBlock } from './CollapsibleBlock';
import { getObsidianTools } from 'src/obsidian-tools';
import { useAIAgent } from 'src/context/AIAgentContext';
import { useTextToSpeech } from 'src/context/TextToSpeechContext';
import { t } from 'src/i18n';
import { LucideIcon } from './LucideIcon';

interface MessageDisplayProps {
  role: 'user' | 'assistant';
  content: string | ContentBlock[];
  toolResults?: Map<string, string>;
  messageIndex?: number;
  isLastMessage?: boolean;
  isGeneratingResponse?: boolean;
  newAbortController?: () => AbortController;
  abort?: () => void;
}

// Helper to ensure content is always ContentBlock[]
const ensureContentBlocksForDisplay = (content: string | ContentBlock[]): ContentBlock[] => {
    if (typeof content === 'string') {
        return [{ type: 'text', text: content }];
    }
    if (Array.isArray(content)) {
        return content;
    }
    return [];
};

export const MessageDisplay: React.FC<MessageDisplayProps> = ({
  role,
  content,
  toolResults = new Map(),
  messageIndex,
  isLastMessage = false,
  isGeneratingResponse = false,
  newAbortController,
  abort,
}) => {
  const { editUserMessage } = useAIAgent();
  const { speakText, isPlayingAudio, isGeneratingSpeech, stopAudio } = useTextToSpeech();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState('');
  const [copyIcon, setCopyIcon] = useState('copy');

  const contentBlocksToRender = ensureContentBlocksForDisplay(content);
  const toolResultsMap = toolResults;

  // Helper to extract plain text from content blocks
  const getPlainTextContent = (blocks: ContentBlock[]): string => {
    return blocks
      .filter(block => block.type === 'text')
      .map(block => (block as any).text || '')
      .join('\n');
  };

  // Handle copy message
  const handleCopyMessage = () => {
    const textToCopy = getPlainTextContent(contentBlocksToRender);
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopyIcon('check');
      setTimeout(() => setCopyIcon('copy'), 2000);
    }
  };

  // Handle edit message button click
  const handleEditClick = () => {
    if (role === 'user') {
      setEditedMessage(getPlainTextContent(contentBlocksToRender));
      setIsEditing(true);
    }
  };

  // Handle save edited message
  const handleSaveEdit = () => {
    if (editedMessage.trim() && messageIndex !== undefined) {
      // Create a new abort controller to allow stopping the operation
      const controller = newAbortController ? newAbortController() : new AbortController();
      
      // Use the new editUserMessage function that handles history preservation
      editUserMessage(messageIndex, editedMessage.trim(), controller.signal);
      
      // Reset editing state
      setIsEditing(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedMessage('');
  };

  // Handle speak message
  const handleSpeakMessage = () => {
    if (role === 'assistant') {
      if (isPlayingAudio) {
        // If audio is already playing, stop it
        stopAudio();
      } else {
        // Otherwise start playing the text
        const textToSpeak = getPlainTextContent(contentBlocksToRender);
        if (textToSpeak) {
          speakText(textToSpeak, new AbortController().signal, true);
        }
      }
    }
  };

  // Helper to render individual content blocks
  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'text': {
        return (
          <div key={`block-${index}`} className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({inline, className, children, ...props}: any) => {
                  return !inline ? (
                    <pre className="code-block">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code className={className} {...props}>{children}</code>
                  );
                }
              }}
            >
              {/* block.text is guaranteed by TextBlock type */}
              {block.text}
            </ReactMarkdown>
          </div>
        );
      }
      case 'image': {
        // Create URL from base64 data
        const imageUrl = `data:${block.source.media_type};base64,${block.source.data}`;
        return (
          <div key={`block-${index}`} className="image-content">
            <img 
              src={imageUrl} 
              alt={t('ui.message.attachedImage')}
              className="attached-image-preview"
              style={{ maxWidth: '300px', maxHeight: '200px', objectFit: 'contain' }}
            />
          </div>
        );
      }
      case 'thinking': {
        // Defensive check, although TS expects 'thinking' property
        const thinkingContent = block.thinking || '';
        return (
          <ThinkingCollapsibleBlock
            key={`block-${index}`}
            thinking={thinkingContent}
            reasoningInProgress={block.reasoningInProgress}
            defaultOpen={false}
          />
        );
      }
      case 'redacted_thinking':
        return (
          <RedactedThinking key={`block-${index}`} />
        );
      case 'tool_use': {
        const result = toolResultsMap.get(block.id) || '';
        const hasResult = !!result;
        const tool = getObsidianTools(undefined!).getToolByName(block.name);
        
        // Detect error based on result content starting with ❌
        const resultContent = typeof result === 'object' ? result.content : result;
        const isErrorByContent = typeof resultContent === 'string' && resultContent.trim().startsWith('❌');
        
        // Get the tool result block to check for error state
        const toolResultEntry = Array.from(toolResultsMap.entries())
          .find(([id]) => id === block.id);
        const isErrorByFlag = toolResultEntry && 
          typeof toolResultEntry[1] === 'object' && 
          toolResultEntry[1].is_error;
          
        // Use either method to determine if it's an error
        const isError = isErrorByFlag || isErrorByContent;
        
        // Check if the tool has a custom rendering method
        if (tool && tool.renderResult && hasResult) {
          return (
            <div key={`block-${index}`} className={`tool-custom-renderer ${isError ? 'tool-error' : ''}`}>
              <div className="tool-custom-header">
                <span className="tool-custom-title">
                  {tool.getActionText(block.input, resultContent, true, !!isError)}
                </span>
              </div>
              <div className="tool-custom-content">
                {tool.renderResult(resultContent, block.input)}
              </div>
            </div>
          );
        }
        // Fall back to the default rendering
        return (
          <ToolBlock
            key={`block-${index}`}
            toolName={block.name}
            toolInput={block.input}
            hasResult={hasResult}
            result={resultContent}
            isError={!!isError}
            defaultOpen={false}
          />
        );
      }
      case 'tool_result':
        return null; // Not rendered directly
      default:
        console.warn("Unknown content block type encountered:", (block as any)?.type);
        return null;
    }
  };

  // Determine message classes based on props
  const messageClasses = ['message', role];
  if (contentBlocksToRender.length > 0) {
    messageClasses.push('has-content-blocks');
  }
  if (isLastMessage) {
    messageClasses.push('is-last-message');
  }
  if (isGeneratingResponse) {
    messageClasses.push('is-generating');
  }

  // If in editing mode, show edit interface instead of message content
  if (isEditing && role === 'user') {
    return (
      <div className={messageClasses.join(' ') + " editing"}>
        <div className="message-content">
          <div className="unified-input-area">
            <div className="input-wrapper">
              <textarea 
                className="unified-input-textarea"
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
                rows={Math.max(3, editedMessage.split('\n').length)}
              />
            </div>
            <div className="input-controls-bottom">
              <div className="input-controls-left"></div>
              <div className="input-controls-right">
                <button 
                  className="input-control-button cancel-button"
                  onClick={handleCancelEdit}
                >
                  {t('buttons.cancel')}
                </button>
                <button 
                  className="input-control-button send-button"
                  onClick={handleSaveEdit}
                  disabled={!editedMessage.trim()}
                >
                  {t('ui.input.send')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const hasTextContent = contentBlocksToRender.some(block => block.type === 'text');

  return (
    <div className={messageClasses.join(' ')}>
      <div className="message-content">
        <div className="content-blocks">
          {contentBlocksToRender.map(renderContentBlock)}
        </div>

        {hasTextContent && (
          <div className="message-actions">
            {!isGeneratingResponse && <>
              {role === 'user' && (
                <>
                  <button 
                    className="clickable-icon" 
                    onClick={handleEditClick}
                    aria-label={t('ui.message.edit')}
                  >
                    <LucideIcon name="pencil" size={18} />
                  </button>
                  <button 
                    className="clickable-icon" 
                    onClick={handleCopyMessage}
                    aria-label={t('ui.message.copy')}
                  >
                    <LucideIcon name={copyIcon} size={18} />
                  </button>
                </>
              )}
              
              {role === 'assistant' && (
                <>
                  <button 
                    className={`clickable-icon ${isPlayingAudio ? 'playing' : isGeneratingSpeech ? 'generating' : ''}`}
                    onClick={handleSpeakMessage}
                    aria-label={
                      isPlayingAudio 
                          ? t('ui.message.stopSpeech') 
                          : isGeneratingSpeech 
                            ? t('ui.message.generatingSpeech') 
                            : t('ui.message.speak')
                    }
                  >
                    {isPlayingAudio ? (
                      <LucideIcon name="circle-stop" size={18} />
                    ) : isGeneratingSpeech ? (
                      <LucideIcon name="loader" size={18} />
                    ) : (
                      <LucideIcon name="volume-2" size={18} />
                    )}
                  </button>
                  <button 
                    className="clickable-icon" 
                    onClick={handleCopyMessage}
                    aria-label={t('ui.message.copy')}
                  >
                    <LucideIcon name={copyIcon} size={18} />
                  </button>
                </>
              )}
            </>}
          </div>
        )}
      </div>
    </div>
  );
};
