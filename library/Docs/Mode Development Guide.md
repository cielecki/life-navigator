# Mode Development Guide

**Complete guide for creating, customizing, and validating Life Navigator modes**

This guide covers everything you need to know about developing AI personalities (modes) for Life Navigator, from basic customization to advanced mode creation.

## What Are Modes?

Life Navigator modes are AI personalities with specific expertise, communication styles, and capabilities. Each mode is designed for particular use cases:

- **Assistant**: Professional task management and organization
- **Planner**: Strategic daily planning and goal setting  
- **Reflection**: Personal insights and pattern recognition
- **Tool Creator**: Technical development assistance
- **Bro**: Motivational coaching and direct advice

## Mode File Structure

Every mode is a markdown file with YAML frontmatter containing configuration and a body containing the system prompt.

### Basic Template

```markdown
---
tags:
  - ln-mode
icon: brain
icon_color: "#4ade80"
description: Brief description of what this mode does
model: auto
thinking_budget_tokens: 1024
max_tokens: 4096
voice_autoplay: true
voice: alloy
voice_instructions: How the AI should speak when using voice
tools_allowed:
  - "*"
tools_disallowed: []
example_usages:
  - "Example message to trigger this mode"
---

# Your Mode Name

Your system prompt goes here. This defines the AI's personality, expertise, and behavior patterns.

## Your Role
Describe what the AI should do in this mode.

## Guidelines
- List specific behaviors
- Communication style preferences  
- Areas of expertise
- Limitations or boundaries
```

## Essential Configuration Fields

### Required Fields

**`icon`**: Visual icon for the mode
- Use [Lucide icon names](https://lucide.dev/icons/)
- Examples: `brain`, `calendar`, `wrench`, `heart`, `zap`

**`icon_color`**: Color for the icon
- Hex colors: `#4ade80`, `#3b82f6`, `#ef4444`
- Named colors: `blue`, `red`, `green`

**`description`**: One-sentence explanation
- Appears in mode selection dropdown
- Should clearly explain the mode's purpose
- Keep under 100 characters for UI readability

**`model`**: AI model to use
- `auto`: Let Life Navigator choose the best model
- `claude-sonnet-4`: Latest Claude model
- `gpt-4`: OpenAI's GPT-4

### Voice Configuration

**`voice`**: AI voice for text-to-speech
- Options: `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`, `onyx`, `nova`, `sage`, `shimmer`, `verse`
- [Explore all the voices and see voice instruction samples](https://www.openai.fm)

**`voice_instructions`**: How the AI should speak
```yaml
voice_instructions: |-
  Speak in a warm, encouraging tone. Use short sentences for clarity.
  Sound like a helpful friend who's genuinely interested in the user's success.
  Moderate pace, pause between thoughts.
```

**`voice_autoplay`**: Auto-play voice responses
- `true`: Always play voice responses automatically
- `false`: User clicks to play voice responses

### Tool Access Control

**`tools_allowed`**: Tools this mode can use
```yaml
tools_allowed:
  - "*"           # All tools
  - "note_*"      # All note-related tools
  - "task_*"      # All task management tools
  - "vault_*"     # All vault exploration tools
```

**`tools_disallowed`**: Tools to exclude
```yaml
tools_disallowed:
  - "note_delete"     # Prevent deletion
  - "task_delete"     # Prevent task deletion
  - "*financial*"    # No financial tools
```

### Performance Settings

**`thinking_budget_tokens`**: Internal reasoning capacity
- 1024: Basic reasoning (simple responses)
- 2048: Moderate reasoning (standard responses)  
- 4096: Deep reasoning (complex analysis)
- 8192: Maximum reasoning (very complex tasks)

**`max_tokens`**: Maximum response length
- 2048: Short responses
- 4096: Standard responses
- 8192: Long responses (detailed analysis)

## System Prompt Best Practices

### Structure Your Prompt

1. **Role Definition**: Who is the AI in this mode?
2. **Expertise Areas**: What does it know about?
3. **Communication Style**: How does it speak?
4. **Capabilities**: What can it help with?
5. **Limitations**: What should it avoid?
6. **Examples**: Sample interactions

### Example System Prompt Structure

```markdown
# Fitness Coach Mode

You are a knowledgeable fitness coach focused on helping users achieve their health and wellness goals through sustainable practices.

## Your Expertise
- Exercise programming and progression
- Nutrition fundamentals and meal planning
- Injury prevention and recovery
- Motivation and habit formation
- Equipment recommendations

## Communication Style
- Encouraging but realistic about challenges
- Use motivational language without being pushy
- Provide scientific backing for recommendations
- Ask clarifying questions to understand goals
- Celebrate small wins and progress

## Your Approach
1. Always assess current fitness level and limitations
2. Prioritize safety and proper form over intensity
3. Create personalized recommendations based on user context
4. Focus on sustainable long-term changes
5. Address both physical and mental aspects of fitness

## What You Help With
- Workout planning and exercise selection
- Nutrition advice and meal prep strategies
- Form corrections and exercise modifications
- Overcoming plateaus and motivation challenges
- Recovery and rest day planning

## Limitations
- Do not diagnose injuries or medical conditions
- Refer to healthcare professionals for pain or health concerns
- Avoid extreme or dangerous exercise recommendations
- Don't provide medical advice beyond general wellness
```

### Voice Instructions Examples

**Professional Mode:**
```yaml
voice_instructions: |-
  Professional and clear tone. Speak at a measured pace.
  Sound knowledgeable but approachable.
  Use standard business communication style.
```

**Motivational Mode:**
```yaml
voice_instructions: |-
  Energetic and encouraging! Sound excited about the user's potential.
  Faster pace, emphatic delivery. Like a personal trainer or coach.
  Use motivational phrases and positive energy.
```

**Reflective Mode:**
```yaml
voice_instructions: |-
  Calm, thoughtful, and wise tone. Slower pace with meaningful pauses.
  Sound like a counselor or meditation teacher.
  Gentle delivery that invites introspection.
```

## Advanced Mode Features

### Context Integration

Modes can reference user information through link expansion:

```markdown
## Your Context Awareness

You have access to the user's personal information through these links:
- [[About Me]] 🧭 - Core personal details and goals
- [[ln-day-note-(0)]] 🧭 - Today's activities and plans
- [[Relationships]] 🧭 - Important people in the user's life

Always consider this context when providing advice and recommendations.
```

### Dynamic Tool Filtering

Create specialized tool access for different modes:

```yaml
# Research mode - focus on information gathering
tools_allowed:
  - "vault_*"
  - "library_*"
  - "note_create"
  - "note_modify"
tools_disallowed:
  - "task_*"
  - "note_delete"
```

### Multi-Language Support

Create modes in different languages:

```yaml
# Spanish mode example
description: Asistente personal en español para planificación diaria
voice_instructions: |-
  Habla en español con un tono amigable y profesional.
  Usa vocabulario claro y estructuras gramaticales correctas.
```

## Mode Validation & Testing

### Using the Mode Validator

Always validate your modes before using them:

1. **Run Validation**: Use the Mode Validator tool in Life Navigator
2. **Check Results**: Review any errors or warnings
3. **Fix Issues**: Address configuration problems
4. **Re-validate**: Test until validation passes

### Common Validation Errors

**Invalid YAML Syntax:**
```yaml
# Wrong - missing quotes around colon
description: This: breaks YAML parsing

# Correct - proper quoting
description: "This: works correctly"
```

**Missing Required Fields:**
```yaml
# Missing description and icon
tags:
  - ln-mode
model: auto
```

**Invalid Icon Names:**
```yaml
# Wrong - not a valid Lucide icon
icon: not-a-real-icon

# Correct - valid Lucide icon
icon: brain
```

**Invalid Tool Patterns:**
```yaml
# Wrong - invalid wildcard pattern
tools_allowed:
  - "task*"

# Correct - proper wildcard syntax
tools_allowed:
  - "task_*"
```

### Testing Your Mode

1. **Basic Functionality**: Can the mode respond appropriately?
2. **Tool Access**: Does it have the right tools available?
3. **Voice Output**: Does the voice match the intended personality?
4. **Context Usage**: Does it properly use linked information?
5. **Edge Cases**: How does it handle unusual requests?

## Common Mode Patterns

### Task-Focused Mode
```yaml
tools_allowed:
  - "task_*"
  - "note_*"
  - "vault_search"
tools_disallowed:
  - "note_delete"
description: Focused on task management and productivity
```

### Creative Mode
```yaml
tools_allowed:
  - "note_*"
  - "library_*"
  - "vault_*"
tools_disallowed:
  - "task_*"
  - "*delete*"
description: Creative writing and ideation assistant
```

### Analytical Mode
```yaml
thinking_budget_tokens: 4096
max_tokens: 8192
tools_allowed:
  - "vault_*"
  - "library_*"
  - "note_create"
description: Deep analysis and research assistant
```

## Troubleshooting Guide

### Mode Not Appearing
- Check that file has `ln-mode` tag
- Verify file is in correct location
- Restart Life Navigator if needed

### Voice Not Working
- Confirm voice name is valid (`alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`, `onyx`, `nova`, `sage`, `shimmer`, `verse`)
- Check voice instructions are properly formatted
- Verify text-to-speech is enabled in settings

### Tools Not Available
- Validate tool patterns in `tools_allowed`
- Check for conflicts in `tools_disallowed`
- Verify tool names are correct

### Poor Response Quality
- Increase `thinking_budget_tokens` for complex tasks
- Review system prompt clarity and specificity
- Test with different model settings

### Context Not Loading
- Verify link syntax: `[[Page Name]] 🧭`
- Check that linked files exist
- Ensure `ln_expand_links` is `true` (default)

## Best Practices Summary

### DO:
- Validate modes before sharing or using extensively
- Use clear, specific system prompts
- Test voice settings with actual audio output
- Create focused modes with specific purposes
- Include relevant context links
- Use appropriate tool filtering
- Document your modes with clear descriptions

### DON'T:
- Create modes without validation
- Use overly complex or conflicting tool rules
- Make system prompts too vague or too restrictive
- Ignore voice instruction quality
- Give modes access to tools they don't need
- Forget to test modes with real scenarios

## Example Mode Templates

### Learning Assistant Mode
```markdown
---
tags:
  - ln-mode
icon: graduation-cap
icon_color: "#3b82f6"
description: Personalized learning and skill development assistant
model: auto
thinking_budget_tokens: 2048
max_tokens: 4096
voice: nova
voice_instructions: |-
  Encouraging teacher tone. Clear explanations with enthusiasm for learning.
  Sound like someone who loves helping others discover new knowledge.
tools_allowed:
  - "vault_*"
  - "library_*"
  - "note_*"
tools_disallowed:
  - "task_*"
example_usages:
  - "Help me learn about quantum computing"
  - "Create a study plan for learning Spanish"
---

# Learning Assistant

You are an enthusiastic learning facilitator who helps users master new skills and knowledge through personalized guidance and structured approaches.

## Your Expertise
- Learning methodology and study techniques
- Curriculum design and progress tracking
- Multiple learning styles and preferences
- Skill acquisition and deliberate practice
- Educational resource recommendations

## Your Approach
1. Assess current knowledge level and learning goals
2. Create structured learning paths with milestones
3. Recommend diverse resources (books, videos, practice)
4. Provide regular check-ins and progress reviews
5. Adapt methods based on learning style preferences

Always make learning engaging, achievable, and personally relevant.
```

This comprehensive guide provides everything needed to create effective, validated modes for Life Navigator. Use the validation tools frequently and test your modes thoroughly before deploying them. 