# Library Index

This index catalogs all files in the Life Navigator library with descriptions and use cases to help AI determine when files should be downloaded or referenced for specific user contexts.

## Info - Core Information Files

### Personal Information
- **Path**: `Info/About Me.md`
- **Description**: Complete personal profile including demographics, interests, health status, career information, financial situation, and psychological profile for John Smith
- **Use When**: User asks about personal preferences, needs context about relationships, health goals, career situation, or when personalizing responses and recommendations



- **Path**: `Info/Details/Day Structure.md`
- **Description**: Comprehensive daily planning procedure with 18 specific steps covering morning routines, cornerstone habits, weekly tasks, monthly reviews, and adaptive recommendations based on behavioral patterns
- **Use When**: User asks to plan any day, needs help with daily routine structure, wants to understand the planning methodology, or requires context about expected daily activities and habits

- **Path**: `Info/Details/Relationships.md`
- **Description**: Directory of family members (James, Mary, Anna, Peter Smith), romantic relationship (Eva Johnson), close friends (Alexander, Maria, David), and professional contacts (Dr. Wilson, Sophie Johnson)
- **Use When**: User mentions people by name, planning social activities, relationship advice, or when contextualizing social interactions and personal connections

- **Path**: `Info/Details/Role Models.md`
- **Description**: List of inspirational figures (Marcus Aurelius, Naval Ravikant, Tim Ferriss, Jocko Willink, Ryan Holiday, Cal Newport, James Clear) with their key topics and example quotes for motivation and guidance
- **Use When**: User seeks motivation, needs philosophical guidance, wants personal development advice, or requires inspiration from established thought leaders

### Documentation & Standards
- **Path**: `Info/Note Format.md`
- **Description**: Comprehensive specification for bullet journal methodology including task statuses ([x], [-], [>]), time formats, cornerstone habits, deletion procedures, and productivity tracking principles
- **Use When**: Creating or modifying tasks, working with daily notes, formatting todos, analyzing productivity, or when user asks about task management methodology

- **Path**: `Info/Backlog.md`
- **Description**: Organized project list across health & fitness, professional development, personal growth, home organization, social relationships, and future ideas for John Smith
- **Use When**: User wants to add new projects, needs inspiration for activities, planning long-term goals, or reviewing what's on their personal agenda

## Tools - Functional Utilities

### Research & Information
- **Path**: `Tools/Deep Research Tool.md`
- **Description**: User-defined tool using Firecrawl API for comprehensive web research with multiple sources, detailed reports, and citations. Includes implementation code and configuration
- **Use When**: User needs in-depth research on any topic, wants to explore subjects thoroughly with citations, or requires comprehensive analysis beyond basic searches

- **Path**: `Tools/YouTube Transcript Tool.md`
- **Description**: User-defined tool for downloading YouTube video transcripts using Obsidian's requestUrl API, with support for multiple languages and timestamp options
- **Use When**: User wants to analyze YouTube content, extract key insights from videos, create summaries of educational content, or work with video-based information

### Content Creation
- **Path**: `Tools/Image Generation Tool.md`
- **Description**: User-defined tool using OpenAI's GPT-4o model for high-quality image generation with flexible sizing (square, portrait, landscape), quality control, and direct vault saving
- **Use When**: User needs custom images, visual aids, creative content, illustrations, or any visual representation of concepts

- **Path**: `Tools/Template Tool.md`
- **Description**: Basic template and tutorial for creating custom user-defined tools, including schema structure, JavaScript implementation patterns, and best practices
- **Use When**: User wants to create custom tools, needs guidance on tool development, requires examples of tool structure, or wants to understand the user-defined tool system

### Utilities
- **Path**: `Tools/Weather Tool.md`
- **Description**: User-defined tool using Open-Meteo API for current weather and forecasts with location geocoding, multiple units support, and detailed weather reporting
- **Use When**: User asks about weather conditions, planning outdoor activities, needs weather-dependent recommendations, or wants to factor weather into scheduling

## Modes - AI Assistant Personalities

### Productivity & Organization
- **Path**: `Modes/Assistant.md`
- **Description**: Primary virtual assistant mode (male) for journaling, task management, and daily organization with emphasis on efficiency, minimal conversation, and proactive task completion
- **Use When**: User wants to check off tasks, add completed activities, manage daily notes, needs straightforward task-focused assistance, or wants low-maintenance interaction

- **Path**: `Modes/Planner.md`
- **Description**: Strategic planning assistant that follows the 18-step Day Structure procedure, analyzes previous days, assesses procedure effectiveness, and provides contextual planning guidance
- **Use When**: User asks to plan any specific day, needs help organizing complex schedules, wants strategic thinking about time management, or requires systematic daily planning

### Specialized Assistants
- **Path**: `Modes/Analytics.md`
- **Description**: Personal data analyst and accountability partner with 30-day context for thorough pattern analysis, correlation discovery, and data-driven insights. Meticulously examines daily notes to identify trends in productivity, health, habits, relationships, and goal progress
- **Use When**: User wants analysis of their patterns, needs accountability conversations, asks about productivity trends, health correlations, habit effectiveness, or wants data-driven insights about their lifestyle

- **Path**: `Modes/Reflection.md`
- **Description**: Female coaching mode for introspection and personal growth with 30-day context, role model perspectives, and guidance on life alignment with values and priorities
- **Use When**: User wants to reflect on experiences, needs emotional support, discussing personal growth, processing events, or seeking perspective on life patterns and decisions

- **Path**: `Modes/Tool Creator.md`
- **Description**: Technical assistant specialized in creating, debugging, and improving user-defined tools with comprehensive JavaScript and JSON schema guidance, examples, and best practices
- **Use When**: User wants to create custom tools, needs help with coding, debugging tool issues, optimizing tool performance, or learning about Life Navigator's development capabilities

### Creative & Casual
- **Path**: `Modes/Songwriter.md`
- **Description**: Creative assistant for generating song descriptions for Suno AI platform, including style descriptions and properly formatted lyrics with specific Suno syntax rules
- **Use When**: User wants to create music, write songs for Suno AI, needs creative inspiration for musical projects, or wants to generate audio content

- **Path**: `Modes/Bro.md`
- **Description**: Motivational workout buddy/coach mode with direct, energetic communication style focused on action-oriented advice and identifying next optimal tasks
- **Use When**: User needs motivation, wants direct action-focused advice, requires energy boost, or prefers masculine, no-nonsense interaction style

## Docs - Documentation

### Getting Started & Setup
- **Path**: `Docs/Installation.md`
- **Description**: Step-by-step installation guide covering Obsidian setup, vault creation, plugin installation (both community browser and manual methods), mobile configuration, and troubleshooting common setup issues
- **Use When**: User is setting up Life Navigator for the first time, needs help with installation issues, wants to configure mobile sync, or troubleshooting plugin visibility problems

- **Path**: `Docs/User Guide.md`
- **Description**: Comprehensive user guide covering core concepts, daily workflows, customization options, mobile usage, and best practices for getting the most out of Life Navigator with detailed examples and troubleshooting tips
- **Use When**: User needs help understanding how Life Navigator works, wants to learn about features, needs guidance on daily workflows, customizing modes, or general usage questions

### Technical Documentation
- **Path**: `Docs/Link Expansion.md`
- **Description**: Technical documentation explaining the link expansion system including special link formats (daily notes, date/time, current file), usage of the compass emoji (🧭), and HTML comment filtering during expansion
- **Use When**: User wants to understand how link expansion works, needs help with dynamic links, troubleshooting link issues, or building complex context structures with nested links

- **Path**: `Docs/Tools.md`
- **Description**: Complete reference for all built-in Life Navigator tools including document management, vault exploration, task management, system tools, deep research capabilities, and tool filtering configuration
- **Use When**: User needs information about available tools, wants to understand tool capabilities, needs examples of tool usage, or configuring tool access in different modes

- **Path**: `Docs/User Defined Tools.md`
- **Description**: Comprehensive guide for creating custom JavaScript tools including security warnings, tool structure (frontmatter, JSON schema, JavaScript implementation), execution context, available APIs, examples, and troubleshooting
- **Use When**: User wants to create custom tools, needs help with tool development, debugging user-defined tools, understanding security implications, or learning about the tool approval process

- **Path**: `Docs/Validation Tools.md`
- **Description**: Documentation for built-in validation tools (Mode Validator and Tool Validator) that check configuration completeness, YAML/JSON syntax, link expansion, and provide detailed error/warning reports
- **Use When**: User is troubleshooting mode or tool issues, wants to validate configurations before sharing, needs to debug problems, or ensure quality in their Life Navigator setup

- **Path**: `Docs/Mode Development Guide.md`
- **Description**: Comprehensive guide for creating, customizing, and validating Life Navigator modes including templates, best practices, configuration options, system prompt design, voice settings, tool access control, and troubleshooting
- **Use When**: User wants to create custom AI personalities, modify existing modes, learn mode development best practices, understand configuration options, or troubleshoot mode creation issues

- **Path**: `Docs/Tool Development Guide.md`
- **Description**: Complete guide for creating custom JavaScript tools including templates, security considerations, API integrations, testing strategies, validation procedures, and advanced patterns for extending Life Navigator functionality
- **Use When**: User wants to create custom tools, extend AI capabilities, integrate external APIs, automate workflows, troubleshoot tool issues, or learn JavaScript development best practices for Life Navigator

## File Selection Guidelines

### High Priority (Download First)
1. `Info/About Me.md` - Essential for personalization
2. `Info/Note Format.md` - Critical for task management
3. `Modes/Assistant.md` - Primary interaction mode
4. Current day notes (ln-day-note files) - For task context

### Context-Dependent
- **Planning Sessions**: `Modes/Planner.md` + `Info/Details/Day Structure.md` + `Info/Backlog.md` + day notes
- **Personal Discussions**: `Info/Details/` directory + `Modes/Reflection.md`
- **Technical Help**: `Modes/Tool Creator.md` + `Tools/Template Tool.md` + `Docs/User Defined Tools.md`
- **Research Requests**: `Tools/Deep Research Tool.md` or `Tools/YouTube Transcript Tool.md`
- **Creative Projects**: `Modes/Songwriter.md` + `Tools/Image Generation Tool.md`
- **Setup & Installation**: `Docs/Installation.md` + `Docs/User Guide.md`
- **Understanding Features**: `Docs/User Guide.md` + `Docs/Tools.md` + `Docs/Link Expansion.md`
- **Troubleshooting**: `Docs/Validation Tools.md` + relevant documentation based on issue

### Situational
- Weather-related queries: `Tools/Weather Tool.md`
- Tool development: `Tools/Template Tool.md` + `Modes/Tool Creator.md` + `Docs/User Defined Tools.md`
- Casual conversation: `Modes/Bro.md`
- Goal setting: `Info/Backlog.md` + `Info/Details/Role Models.md`
- Daily routine questions: `Info/Details/Day Structure.md`
- Link expansion questions: `Docs/Link Expansion.md`
- Tool usage questions: `Docs/Tools.md`
- Mode/tool validation: `Docs/Validation Tools.md`
- First-time setup: `Docs/Installation.md` + `Docs/User Guide.md`

## Usage Patterns

**Task Management**: Always include `Info/Note Format.md` and `Modes/Assistant.md`
**Personal Advice**: Include `Info/About Me.md` and relevant relationship/role model files
**Daily Planning**: Combine `Modes/Planner.md` with `Info/Details/Day Structure.md` and day notes
**Creative Work**: Use specialized modes (`Modes/Songwriter.md`) with appropriate tools
**Technical Support**: Load `Modes/Tool Creator.md` and `Docs/User Defined Tools.md` for development assistance
**Reflection Sessions**: Use `Modes/Reflection.md` with personal info and recent day notes
**Learning Life Navigator**: Start with `Docs/User Guide.md` and explore specific documentation as needed
**Debugging Issues**: Use `Docs/Validation Tools.md` with relevant mode/tool files

This index enables AI to make informed decisions about which files to download based on user context, ensuring relevant information is always available while avoiding unnecessary file loading.
