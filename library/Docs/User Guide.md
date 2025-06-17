# Life Navigator User Guide

**Note:** This guide assumes you have already installed Life Navigator and completed the initial setup. If you haven't installed the plugin yet, please follow the [Installation Guide](installation.md) first.

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

### The Link System

Life Navigator uses a special linking system to control what information the AI sees:

- **Regular links** `[[File Name]]` - References the file but doesn't include its content
- **Inline links** `[[File Name]] 🧭` - Includes the full content of the file in the AI's context
- **Expand links** `🧭 expand [[File Name]]` - Modern syntax to include file content in AI context
- **Tool calls** `🧭 periodic_notes(types=["daily"], start_date={offset: 0, unit: "days"}, end_date={offset: 0, unit: "days"})` - References periodic notes relative to today (0=today, -1=yesterday, etc.). This allows modes to automatically include recent context.
- **Range tools** `🧭 periodic_notes(types=["daily"], start_date={offset: -3, unit: "days"}, end_date={offset: 0, unit: "days"})` - Includes multiple periodic notes in a range (e.g., last 3 days to today)


Learn more about the link system in the [link-expansion](link-expansion.md) document.

## Getting Started: The Setup Process

Life Navigator features a comprehensive guided setup process that ensures you're properly configured before you start using the plugin. The setup flow consists of four sequential screens that walk you through all necessary configuration steps: language configuration, initial content setup, Anthropic API key configuration and OpenAI API key configuration.

### Information Files (Info Directory)

**About Me.md** - Your personal profile and control center
- Start by replacing the example content with your own information
- Include details like age, occupation, interests, goals, values, daily routines
- This file also includes links to all information files in `About Me` directory, so any time you link to this file the AI will also have access to all the information in the `About Me` directory.
- To add new information files, you MUST link them from `About Me.md` using `[[File Name]] 🧭`
- The more relevant details you provide, the more personalized the AI's assistance becomes

**Details/Day Structure.md** - Your ideal daily routine
- This defines how the AI plans your days when you ask for daily planning
- Describe your preferred schedule, habits, and recurring activities
- Example: "Morning routine: Wake at 7:00, meditation, coffee, review daily plan"
- **Note:** This should describe your ideal day, not necessarily your current reality

**Details/Role Models.md** - Influential figures or role models
- List people whose wisdom you value (historical figures, mentors, authors, etc.)
- The Reflection mode references these when providing guidance

**Details/Relationships.md** - Important people in your life
- Document family, friends, colleagues, and their key characteristics
- Helps the AI understand your social context when you mention people by name

**Backlog.md** - Ongoing tasks and projects
- Tasks that aren't tied to specific days
- Long-term goals, project ideas, things to remember
- Different from daily notes which capture day-specific activities

### AI Modes (Modes Directory)

Life Navigator includes several pre-configured AI personalities:

**Assistant** - General-purpose helper
- Task management, scheduling, answering questions
- Best for: Logging notes, managing and checking off your daily tasks

**Planner** - Focused on daily planning
- Creates detailed daily schedules based on your Day Structure
- Best for: Morning planning sessions, schedule optimization

**Bro** - Motivational coach
- Direct, encouraging, designed to push you through procrastination and resistance
- Best for: Motivation, accountability, breaking through mental blocks

**Reflection** - Thoughtful advisor
- Contemplative, wise personality for deeper thinking, using your role models and values
- Best for: Processing emotions, gaining insights, philosophical discussions

## Daily Workflow

### Morning Planning

1. Open Life Navigator and select the **Planner** mode
2. Say or type: "Plan my day" or "What should I do today?"
3. The AI will ask about your calendar and energy levels
4. It creates a detailed plan based on your Day Structure and current priorities
5. Review and adjust the plan as needed

### Throughout the Day

**Quick Activity Logging:**
- Use voice input to quickly log completed tasks: "I finished my workout"
- Report challenges: "I'm struggling to focus on this project"
- Ask for guidance: "What should I do next?"


### Evening Reflection

1. Switch to **Reflection** mode
2. Ask: "Help me reflect on my day" or "What patterns do you notice?"
3. The AI analyzes your daily activities and provides insights
4. Save important insights to your daily note for future reference

## Understanding Daily Notes

Daily notes are automatically created files that capture your daily activities, thoughts, and plans. They follow a specific format:

### Daily Note Structure

```markdown
- [x] 🌅 Wake up at 7:00 AM (completed at 07:15)
- [x] ☕ Morning coffee and review daily plan (completed at 07:30)
- [ ] 💼 Work on project presentation
- [x] 🍽️ Healthy lunch (completed at 12:30)
    Had salad with grilled chicken, feeling satisfied.
- [x] 🏃 30-minute workout (completed at 18:00)
    Felt energized after the workout, good endurance today.
- [ ] 📚 Read for 30 minutes before bed

```

### Working with Daily Notes

**Task Management:**
- The AI can add, complete, and move tasks between days
- Use checkboxes `- [ ]` for pending tasks, `- [x]` for completed ones
- Ask the AI to "move this task to tomorrow" or "mark this as done"

**Activity Logging:**
- Voice logging automatically adds timestamped entries
- Creates a searchable history of your activities and thoughts
- Helps the AI understand your patterns and provide better insights

## Customizing Your Experience

### Personalizing AI Modes

Each mode can be extensively customized:

**Changing Personality:**
- Edit the system prompt in any mode file
- Example: Make Bro less aggressive or change gender presentation
- Modify language style, tone, and approach

**Voice Settings:**
- Each mode can have a different AI voice
- Visit [OpenAI's Voice Demo](https://platform.openai.com/docs/guides/text-to-speech) to hear options
- Change the `voice` setting to: alloy, ash, ballad, coral, echo, fable, onyx, nova, sage, shimmer, or verse
- Modify `ln_voice_instructions` to control speaking style (e.g., "speak quickly and energetically")

**Visual Customization:**
- Change the `icon` to any [Lucide icon name](https://lucide.dev/icons/)
- Modify the `color` using hex codes or color names
- Example: `icon: "brain"`, `color: "#ff5500"`

### Creating New Modes

To create a new mode, ask the AI assistant to help you. The AI can:
1. Guide you through the process of creating a mode file
2. Help you customize the system prompt, voice, and appearance settings
3. Ensure the mode is properly configured and saved in the correct location
4. The new mode will automatically appear in the Life Navigator panel

Simply ask something like "Help me create a new mode for [your purpose]" and the AI will walk you through the process.

### Adding Information Files

1. Create a new markdown file with your information
2. **Critical step:** Add a link to the file in `About Me.md` using the format `[[File Name]] 🧭`
3. Without this link, the AI cannot access the file's content

## Advanced Features

### System Prompt Inspection

To see exactly what information the AI receives:
1. Select any mode in Life Navigator
2. Look for "Show system prompt" option
3. View the complete prompt including all your linked information
4. You can copy this prompt to use in other AI tools if needed

### Habit Building and Pattern Recognition

Life Navigator excels at helping you build habits and recognize patterns:

**Habit Tracking:**
- Include recurring activities in your Day Structure
- The AI can create conditional tasks (e.g., "Add red light therapy only if not done yesterday")
- Track completion rates and identify obstacles

**Pattern Recognition:**
- The AI analyzes your daily notes to identify correlations
- Example: "I notice you're more productive on days when you exercise in the morning"
- Ask directly: "What patterns do you see in my behavior?"

## Mobile Usage

### Setup Considerations

- Ensure your vault syncs properly via iCloud or your chosen service
- Enable community plugins on mobile: Settings → Community plugins → Turn on
- Language settings should match between desktop and mobile

### Mobile Workflow Tips

- Use voice input for faster note-taking
- **Long press on tool blocks** to expand/collapse them (equivalent to shift+click on desktop)
- Avoid editing the same file simultaneously on desktop and mobile
- Allow time for sync between devices (especially with iCloud)
- Consider setting daily notes to open automatically on startup

### Sync Best Practices

- Edit on one device at a time when possible
- Wait for sync completion before switching devices
- If conflicts occur, manually resolve them by choosing the correct version

## Troubleshooting Common Issues

### AI Not Responding Appropriately

**Check your information files:**
- Ensure `About Me.md` links to all relevant files with `🔎` symbols
- Verify your personal information is up-to-date and relevant
- Remove placeholder content that doesn't apply to you

**Review recent daily notes:**
- The AI uses recent daily notes for context
- Ensure important information is captured in your daily logs

### Voice Recognition Problems

- Speak clearly and at a moderate pace
- Stop AI processing and edit sent message if errors occur
- Consider using text input for complex or technical terms

### Sync Issues

- Check that community plugins are enabled on all devices
- Verify your vault is properly set up in your sync service
- Allow adequate time for sync completion
- Restart Obsidian if the plugin doesn't appear on a new device

## Controlling what goes into AI's context

- Only information in files linked from files defining the modes like `Planner.md` with `🧭` symbols
- Recent daily notes (if configured in the mode)
- Current date and time (if configured in the mode)
- Current conversation context

### API Usage and Costs

- Life Navigator uses Anthropic (Claude) and OpenAI APIs
- You pay directly to these providers based on usage
- Costs are typically minimal for personal use
- Monitor your API usage through the respective provider dashboards

## Getting the Most Out of Life Navigator

### Start Simple

- Begin with basic information in About Me.md
- Use one or two modes initially
- Gradually add more detail and complexity as you become comfortable
- Delete all the example content and replace with your personal information

### Be Consistent

- Regular daily planning and reflection sessions work best
- Voice logging throughout the day creates valuable context
- Consistent use helps the AI provide better insights over time

### Experiment and Iterate

- Try different modes for different situations
- Customize personalities to match your preferences
- Adjust your Day Structure based on what actually works
- Don't be afraid to modify or create new modes

### Focus on Insights

- Ask the AI what patterns it notices in your behavior
- Use reflection sessions to process experiences and emotions
- Save important insights to your information files for future reference
- Let the AI help you see blind spots in your thinking and behavior

Life Navigator becomes more valuable the more you use it and the more context you provide. Start with the basics and gradually build a comprehensive personal AI assistant that truly understands your life and goals.
