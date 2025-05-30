# Life Navigator - Roadmap

This document outlines potential future features and improvements for the Life Navigator plugin, based on user feedback and development ideas.

## Accepted/Implemented Ideas

**AI Conversation History:**
Implement a feature to store and review past conversations. This would allow users to refer back to previous interactions, advice, or generated content.

**Introduce support for weekly and monthly summaries**:
via ln-monthly-note and ln-weekly-note.

**Gemini Model Support and Model Selection:**
Add support for Gemini model from Google, and add a model selection option from the mode settings.

**User-Defined Tools:**
Introduce the ability for the user to add extra tools to the system. Investigate methods for loading extra tools (e.g., eval, JSON, MCP). This could allow accessing calendar for example.

**Deep Research Tool:** ✅ COMPLETED
Implement a tool for deep research using firecrawl api. Implemented as `deep_research` tool with configurable research depth, URL limits, and timeout settings.

**Mode Settings Editor:**
Create a comprehensive mode settings editor that allows users to configure all mode parameters through a user-friendly interface.

## Floating Ideas

**AI-Assisted Knowledge Base Editing:**
Explore functionality for the AI to directly suggest or make additions/modifications to the user's core knowledge files (e.g., `About Me.md`, `Relationships.md`) based on conversations or insights. The user need is to streamline the process of updating personal context, allowing the AI to help maintain and expand the knowledge base it uses.

**Task List Tool:**
Re-implement a function to display the list of tasks as a tool call, accessible by the user.

**Weather Fetching Tool:**
Implement a tool to fetch and display weather information.


**Fire and forget chat workflow:**
Rethink the concept of creating a new chat for each voice message without automatically switching to it.

**Google Calendar Integration:**
Create a system to extract calendar information about upcoming events (today plus next 7 days) so the system can include this data in daily tasks.

**Proactive Agent Notifications:**
Investigate the possibility of an agent that activates based on cron jobs or random events and sends notifications to the user (e.g., mobile notification, SMS).

**Passive Listening Agent:**
Explore the ability to enter a voice-activated mode where the system waits for a wake phrase like "Hi Navigator" to start interacting.

**Endless Chat Interface:**
Implement an endless chat window in Obsidian with a recent messages view that includes truncated context and a "load previous messages" option similar to Cursor's interface. This would provide a more seamless chat experience with better context management.

**Audio Feedback System:**
Add audio signals/sounds to Life Navigator for various actions (task completion, end of speech, start of transcription processing) to provide better user feedback and interaction cues.

**Interactive Creator Mode:**
Create a creator mode that generates sections/files based on dialogue with the user instead of using standard starter kits. This would provide a more personalized and interactive setup experience.

## General Notes

*   This roadmap is a living document and priorities may shift based on user feedback and development capacity.
*   Suggestions and contributions are welcome via the plugin's GitHub repository. 
