import { LNMode } from 'src/types/LNMode';
import { TTS_VOICES, TTSVoice } from "src/store/audio-slice";

// Available Anthropic models
export const ANTHROPIC_MODELS = [
  "auto",                          // Auto-select based on mode characteristics
  "claude-opus-4-20250514",        // Claude Opus 4 - Most capable
  "claude-sonnet-4-20250514",      // Claude Sonnet 4 - High performance
  "claude-3-5-haiku-20241022",     // Claude Haiku 3.5 - Fastest
  "claude-3-7-sonnet-20250219",    // Claude Sonnet 3.7 - Current default
  "claude-3-5-sonnet-20241022",    // Claude Sonnet 3.5 v2
  "claude-3-5-sonnet-20240620",    // Claude Sonnet 3.5 v1
  "claude-3-haiku-20240307",       // Claude Haiku 3 - Legacy fast
  "claude-3-opus-20240229",        // Claude Opus 3 - Legacy powerful
] as const;

export type AnthropicModel = typeof ANTHROPIC_MODELS[number];

export const DEFAULT_VOICE_INSTRUCTIONS = `
Voice: Warm, empathetic, and professional, reassuring the customer that their issue is understood and will be resolved.

Punctuation: Well-structured with natural pauses, allowing for clarity and a steady, calming flow.

Delivery: Calm and patient, with a supportive and understanding tone that reassures the listener.

Phrasing: Clear and concise, using customer-friendly language that avoids jargon while maintaining professionalism.

Tone: Empathetic and solution-focused, emphasizing both understanding and proactive assistance.
`;

/**
 * Automatically selects the best model based on mode characteristics
 * @param mode The LN mode to analyze
 * @returns The recommended model for this mode
 */
export function resolveAutoModel(mode: LNMode): string {
  return "claude-sonnet-4-20250514";
}

/**
 * Default configuration for LN modes.
 * These values will be used when a mode doesn't specify certain parameters.
 */
export function getDefaultLNMode(): LNMode {
  return {
    // UI defaults
    ln_name: "",
    ln_path: "",
    ln_icon: "brain",
    ln_icon_color: "#888888",
    ln_description: "",
    
    // Common attributes (shared with tools)
    ln_version: undefined, // No default version
    ln_enabled: true, // Enabled by default
    
    // Behavior defaults
    ln_system_prompt: "",
    ln_example_usages: [],
    ln_expand_links: true, // Expand wikilinks by default
    
    // API parameters
    ln_model: "auto", // Default to auto-selection
    ln_thinking_budget_tokens: 1024,
    ln_max_tokens: 4096,
    
    // TTS defaults
    ln_voice_autoplay: true,
    ln_voice: "alloy",
    ln_voice_instructions: DEFAULT_VOICE_INSTRUCTIONS,
    ln_voice_speed: 1.0,

    // Tool filtering defaults
    ln_tools_allowed: ["*"], // Allow all tools by default
    ln_tools_disallowed: [], // Disallow nothing by default
  }
}

/**
 * Merge user-defined LN mode with default values
 * @param userMode The user-defined LN mode
 * @returns Complete LN mode with all required fields
 */
export function mergeWithDefaultMode(userMode: Partial<LNMode>): LNMode {
  return validateModeSettings({
    ...getDefaultLNMode(),
    ...userMode,
  } as LNMode);
}

export function validateModeSettings(mode: LNMode): LNMode {
  const validatedMode = { ...mode };
  const defaultMode = getDefaultLNMode();
  
  // Validate model if present (allow "auto" as a valid option)
  if (mode.ln_model && !ANTHROPIC_MODELS.includes(mode.ln_model as AnthropicModel)) {
    console.warn(`Invalid model selected: ${mode.ln_model}, falling back to auto`);
    validatedMode.ln_model = "auto";
  }
  
  // Validate voice if present
  if (mode.ln_voice && !TTS_VOICES.includes(mode.ln_voice as TTSVoice)) {
    console.warn(`Invalid voice selected: ${mode.ln_voice}, falling back to default`);
    validatedMode.ln_voice = defaultMode.ln_voice;
  }
  
  // Validate thinking budget (must be positive number)
  if (mode.ln_thinking_budget_tokens !== undefined && 
      (typeof mode.ln_thinking_budget_tokens !== 'number' || 
       mode.ln_thinking_budget_tokens < 1024)) {
    validatedMode.ln_thinking_budget_tokens = defaultMode.ln_thinking_budget_tokens;
  }
  
  // Validate max tokens (must be positive number)
  if (mode.ln_max_tokens !== undefined && 
      (typeof mode.ln_max_tokens !== 'number' || 
       mode.ln_max_tokens <= 0)) {
    validatedMode.ln_max_tokens = defaultMode.ln_max_tokens;
  }
  
  return validatedMode;
}
