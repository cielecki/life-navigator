# Life Navigator User Guide

**Note:** This guide assumes you have already installed Life Navigator and completed the initial setup. If you haven't installed the plugin yet, please follow the [Installation Guide](INSTALLATION.md) first.

Life Navigator is an AI-powered personal assistant plugin for Obsidian that helps you with daily planning, reflection, habit building, and life guidance. Unlike generic AI chatbots, Life Navigator knows your personal context and can provide tailored advice based on your goals, preferences, and daily patterns.

## What Makes Life Navigator Different

**Privacy-First Design:** All your data stays on your devices (computer and phone) and syncs through your chosen service (like iCloud). The AI only receives the specific information you choose to share, and no personal data is stored on external servers.

**Contextual Intelligence:** The AI has access to your personal information, daily notes, and patterns, allowing it to provide insights you might not see yourself - like noticing correlations between sleep and mood, or identifying patterns in your behavior.

**Voice-First Interaction:** Designed for natural voice conversations throughout your day. You can quickly log activities, ask for guidance, or reflect on your experiences without typing.

## Core Concepts

### How the AI "Knows" About You

Life Navigator's intelligence comes from three sources:

1. **Your Information Files:** Personal details, goals, preferences, and context you explicitly provide
2. **Daily Notes:** Your ongoing journal entries and activity logs
3. **Current Conversation:** The immediate context of what you're discussing

**Important:** The AI doesn't have persistent memory between sessions. To "teach" it something new, it needs to be saved to your information files or daily notes.

## Understanding Modes

**Modes** are specialized AI personalities in Life Navigator, each designed for different aspects of your life. Think of them as different "hats" your AI assistant can wear - each with its own personality, expertise, tools, and context awareness.

Unlike a generic ChatGPT conversation, each mode:
- Has a **unique personality** and communication style
- Comes with **specialized expertise** for specific tasks
- Has access to **different tools** based on its purpose
- Knows **specific context** about your life through attached files and data
- Uses a **specific voice** for text-to-speech (if enabled)

### Selecting a Mode

1. **From Chat View**: Click the mode selector dropdown at the top of the chat interface
2. **Starting a New Chat**: The mode selector shows available modes with their icons and descriptions
3. **Switching Modes**: You can change modes mid-conversation, though it's better to start a new chat for context clarity

### Available Modes

Life Navigator includes 20+ internal modes. Here are the main categories:

#### Core Navigation Modes

**Guide** - Your onboarding companion
- Best for: Learning Life Navigator, setup assistance, feature discovery
- Context: Knows your vault structure and setup status

**General Assistant** - All-purpose AI helper
- Best for: Any general task you'd use ChatGPT for
- Context: Clean slate, no specialized context

#### Productivity Modes

**Task Manager** - Daily task command center
- Best for: Managing daily tasks, checking off todos, organizing your day
- Context: Knows your recent and upcoming days, "About Me", task backlog
- Special: Direct, action-oriented personality

**Long-Term Planner** - Strategic planning assistant
- Best for: Weekly/monthly planning, goal setting, strategic thinking

#### Reflection & Growth Modes

**Reflection** - Wise guide for self-discovery
- Best for: Daily/weekly/monthly reviews, pattern analysis, deep thinking
- Context: Knows your recent notes and personal information
- Special: Calm, thoughtful, patient personality

**Start Day** - Morning preparation
- Best for: Beginning your day with intention and clarity

**Close Day** - Evening review
- Best for: Reflecting on your day, capturing lessons, planning tomorrow

**Wind Down** - Nighttime routine
- Best for: Relaxing end-of-day reflection

#### Creative Modes

**Writer** - Content creation assistant
- Best for: Writing articles, essays, creative content
- Tools: Note editing and creation

**Brainstorm** - Idea generation partner
- Best for: Creative thinking, ideation, problem-solving

**Detective** - Analytical investigator
- Best for: Research, analysis, connecting dots

#### Life Domain Specialists

- **Financial Advisor** - Budget planning, financial decisions
- **Relationship Consultant** - Interpersonal dynamics, communication strategies
- **Longevity Strategist** - Health and longevity optimization
- **Spiritual Healer** - Spiritual growth and healing

### Creating Custom Modes

You can create your own custom modes using the **Mode Builder** built into the plugin. Simply click the "+" button in the mode selector or start a chat with Mode Builder to create a new mode with guided assistance.

Custom modes can:
- Have unique personalities and system prompts
- Access specific tools based on their purpose
- Include context from specific files in your vault
- Use different voice settings for text-to-speech

### Available Voices

Life Navigator supports these TTS voices:
- **alloy** - Neutral, balanced
- **ash** - Warm, conversational
- **coral** - Friendly, upbeat
- **echo** - Clear, direct
- **fable** - Welcoming, patient
- **onyx** - Deep, authoritative
- **nova** - Energetic, enthusiastic
- **sage** - Wise, calm
- **shimmer** - Gentle, reflective

### AI Models

- **Claude Sonnet** - Balanced performance (recommended)
- **Claude Opus** - Most capable, best for complex reasoning
- **Claude Haiku** - Fastest, good for simple tasks

## Voice Features

### Voice Recording

1. Click the microphone button to start recording
2. Speak your message
3. Click stop to transcribe
4. Review and send your message

### Text-to-Speech

When enabled, the AI can read responses aloud. Each mode can have a different voice configured for a unique conversational experience.

## Tips for Effective Use

### Context Management

- **Be Selective:** Configure modes to include only the context they truly need
- **Order Matters:** More recent context gets more attention from the AI
- **Update Regularly:** Keep your personal information files current

### Mode Selection

- Use **Task Manager** for daily productivity
- Use **Reflection** for introspection and pattern recognition
- Use **General Assistant** when you just need quick help
- Use specialized modes for specific life domains

### Voice Interaction

- Voice input works great for quick logging and journaling on mobile
- Use voice recording while commuting or walking
- Text-to-speech helps you engage with responses hands-free

## Troubleshooting

### Mode Not Appearing

1. Restart Obsidian if recently created modes don't show
2. Check plugin settings for mode configuration

### Voice Not Working

1. Verify API keys are configured in settings
2. Check microphone permissions on your device
3. Ensure stable internet connection for transcription

### AI Not Understanding Context

1. Check that relevant files are attached to the mode
2. Verify file paths in mode configuration
3. Make sure context files exist in your vault

## Getting Help

- **[Discord Server](https://discord.gg/VrxZdr3JWH)** - Community support and mode sharing
- **[GitHub Issues](https://github.com/cielecki/life-navigator/issues)** - Bug reports
- **[FAQ](FAQ.md)** - Frequently asked questions
