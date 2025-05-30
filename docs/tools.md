# Life Navigator Tools

Life Navigator provides AI assistants with a comprehensive set of tools to help manage your Obsidian vault and daily activities. These tools allow the AI to interact with your notes, manage tasks, and perform various operations on your behalf.

## Document Management Tools

### Create Document
**Tool:** `create_document`
- Creates new markdown files in your vault
- Automatically handles file path creation and content formatting
- Useful for creating new notes, templates, or structured documents

### Read Document
**Tool:** `read_document`
- Reads the content of existing files in your vault
- Allows the AI to access and reference information from your notes
- Essential for providing contextual assistance based on your existing content

### Append to Document
**Tool:** `append_to_document`
- Adds content to the end of existing files
- Perfect for adding new entries to journals, logs, or ongoing notes
- Maintains existing content while extending it

### Search Vault
**Tool:** `search_vault`
- Searches through all files in your vault for specific content
- Helps find relevant information across your entire knowledge base
- Supports both text content and file name searches

## Task Management Tools

### Add Todo
**Tool:** `add_todo`
- Creates new todo items in your daily notes or specified files
- Supports emoji categorization and detailed descriptions
- Integrates with your daily planning workflow

### Check Todo
**Tool:** `check_todo`
- Marks todo items as completed with timestamps
- Moves completed tasks to appropriate sections
- Tracks completion times for habit analysis

### Uncheck Todo
**Tool:** `uncheck_todo`
- Reverts completed todos back to pending status
- Useful for tasks that need to be repeated or were marked done by mistake

### Edit Todo
**Tool:** `edit_todo`
- Modifies existing todo items
- Can change text, emoji, or other properties
- Maintains task history and context

### Remove Todo
**Tool:** `remove_todo`
- Removes todo items from notes
- Adds HTML comments to track removed tasks
- Helps clean up completed or irrelevant tasks

### Move Todo
**Tool:** `move_todo`
- Transfers todo items between different notes or dates
- Useful for rescheduling tasks or organizing by priority
- Maintains task context during moves

### Abandon Todo
**Tool:** `abandon_todo`
- Marks tasks as abandoned with timestamps
- Moves abandoned tasks to the beginning of notes for visibility
- Helps track what didn't work out and why

### Create Completed Todo
**Tool:** `create_completed_todo`
- Creates a todo item that's already marked as completed
- Useful for logging activities that were done but not previously planned
- Includes completion timestamps

## Content Tools

### YouTube Transcript Download
**Tool:** `download_youtube_transcript`
- Downloads transcripts from YouTube videos and saves them to Obsidian files
- Browser-compatible implementation using Obsidian's built-in request capabilities
- Supports multiple languages with automatic fallback to English
- Handles various YouTube URL formats (full URLs, short URLs, video IDs)
- Configurable options:
  - **Language**: Specify transcript language (e.g., 'en', 'pl', 'fr')
  - **Include Timestamps**: Option to include/exclude timestamps in output
  - **Overwrite**: Control whether to overwrite existing files
- Output includes metadata (video URL, language, generation timestamp)
- Formatted as clean markdown with proper structure
- Works by extracting caption data from YouTube's web player

**Example Usage:**
```
Download transcript from: https://www.youtube.com/watch?v=VIDEO_ID
Save to: Transcripts/Video Title.md
Language: en
Include timestamps: true
```

**Note:** This tool requires that the YouTube video has captions available (either auto-generated or manually uploaded). Private videos or videos without captions will not work.

## System Tools

### Handover Mode
**Tool:** `handover_mode`
- Allows the AI to switch between different modes during conversations
- Enables transitions between different personalities or specialized contexts
- Useful for moving from planning to reflection or from general assistance to specific expertise
- Provides clear handover instructions to the new mode to ensure smooth transitions
- The new mode receives explicit instructions to take control and continue with the task

## Tool Filtering

Life Navigator supports tool filtering per mode, allowing you to control which tools are available in different contexts:

- **Allowed Tools**: Specify which tools a mode can use (supports wildcards like `*todo*`)
- **Disallowed Tools**: Explicitly block certain tools from a mode
- **Default Behavior**: All tools are available unless specifically filtered

This allows you to create specialized modes that only have access to relevant tools, improving focus and reducing complexity.

## Usage Tips

1. **Voice Commands**: Most tools work well with natural voice commands like "add a task to exercise today" or "mark my workout as done"

2. **Context Awareness**: Tools automatically work with your current context - they know about your daily notes, current date, and active files

3. **Error Handling**: Tools provide clear feedback when operations can't be completed, helping you understand what went wrong

4. **Batch Operations**: Many tools can handle multiple items at once when requested naturally

5. **Integration**: Tools work together seamlessly - you can search for content, read it, and then create new documents based on what you found

For more information about configuring tool access in different modes, see the [tool-filtering documentation](tool-filtering.md).

## Deep Research Tool

The `deep_research` tool provides comprehensive web research capabilities using Firecrawl's AI-powered research engine. It automatically searches multiple sources, extracts relevant information, and synthesizes findings into detailed reports with proper citations.

### Features

- **Multi-source Research**: Automatically searches and analyzes multiple web sources
- **AI-Powered Extraction**: Uses AI to extract relevant information from web pages
- **Synthesis & Analysis**: Combines findings into comprehensive reports
- **Source Citations**: Provides proper citations for all sources used
- **Real-time Progress**: Shows research progress with activity indicators
- **Configurable Parameters**: Adjust research depth, URL limits, and timeouts

### Configuration

Before using the deep research tool, you need to configure your Firecrawl API key:

1. Go to [Firecrawl Dashboard](https://firecrawl.dev/) and sign up for an account
2. Generate an API key from your dashboard
3. In Obsidian, go to Settings → Life Navigator → API Keys
4. Enter your Firecrawl API key in the "Firecrawl API Key" field

### Usage

The AI can use this tool automatically when you ask research-related questions. You can also explicitly request deep research:

**Example prompts:**
- "Conduct deep research on the latest developments in quantum computing"
- "Research the current state of renewable energy adoption globally"
- "Do a comprehensive analysis of remote work trends in 2024"

### Parameters

The tool accepts several optional parameters to customize the research:

- **max_depth** (1-10, default: 3): Number of research iterations to perform
- **max_urls** (5-50, default: 20): Maximum number of URLs to analyze
- **timeout** (60-300 seconds, default: 180): Maximum time for research process

### Output Format

The tool generates structured reports with:

1. **Research Analysis**: Comprehensive synthesis of findings
2. **Sources**: List of all sources with titles, URLs, and descriptions
3. **Research Metadata**: Query details, parameters used, and completion time
4. **Research Process**: Log of research activities and progress

### Error Handling

The tool provides clear error messages for common issues:

- **Missing API Key**: Prompts to configure Firecrawl API key in settings
- **Quota Exceeded**: Indicates when API limits are reached
- **Timeout**: Suggests using more specific queries for better results
- **No Results**: Indicates when no relevant information is found

### Best Practices

1. **Be Specific**: More specific queries yield better results
2. **Adjust Parameters**: Use higher depth for complex topics, lower for quick overviews
3. **Monitor Usage**: Keep track of API usage to avoid quota limits
4. **Review Sources**: Always verify important information from the provided sources
