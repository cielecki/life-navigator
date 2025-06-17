# Life Navigator Tools

Life Navigator provides AI assistants with a comprehensive set of tools to help manage your Obsidian vault and daily activities. These tools allow the AI to interact with your notes, manage tasks, and perform various operations on your behalf.

## Document Management Tools

### Create Document
**Tool:** `note_create`
- Creates new markdown files in your vault
- Automatically handles file path creation and content formatting
- **Auto-versioning**: Optional feature to create versioned filenames when file already exists
- Useful for creating new notes, templates, or structured documents

**Auto-versioning Feature:**
When `auto_version` parameter is set to `true`, the tool automatically creates versioned filenames if the target file already exists:
- `note.md` → `note 2.md`
- `research.md` → `research 2.md` → `research 3.md`
- Preserves file extensions and maintains sequential numbering

### Read Document
**Tool:** `note_read`
- Reads the content of existing files in your vault
- Allows the AI to access and reference information from your existing content
- Essential for providing contextual assistance based on your existing content
- **Expand Life Navigator Links**: Optional `expand_links` parameter expands special links when reading files

**Link Expansion Feature:**
When `expand_links` is set to `true`, the tool automatically expands Life Navigator links in the document:
- `[[ln-day-note-(-1)]] 🧭` → Previous day's daily note content
- `[[ln-current-date-and-time]] 🧭` → Current timestamp
- `[[ln-currently-open-file]] 🧭` → Currently active file content
- `[[ln-current-chat]] 🧭` → Current conversation context

This allows AI to access dynamic, real-time content when analyzing notes, making it perfect for reviewing files that reference daily notes, current context, or other dynamic Life Navigator links.

### Edit Document
**Tool:** `note_edit`
- **Comprehensive editing capabilities** for existing documents with multiple operation types
- **Sequential processing**: Apply multiple edits in one operation with detailed feedback
- **Enhanced error handling**: Descriptive messages when search text isn't found or line numbers are invalid

**Supported Edit Operations:**

**Replace Operations:**
- `replace`: Replace first occurrence of text (supports multiline text)
- Requires `search_text` and `replacement_text` parameters
- Example: Replace outdated information with current data

**Insert Operations:**
- `insert_after`: Insert content immediately after specified text
- `insert_before`: Insert content immediately before specified text  
- `insert_after_line`: Insert content after a specific line number (1-based)
- `insert_before_line`: Insert content before a specific line number (1-based)
- `append`: Add content to the end of the document
- `prepend`: Add content to the beginning of the document

**Usage Examples:**
```json
{
  "path": "My Notes.md",
  "edits": [
    {
      "type": "replace",
      "search_text": "Old heading",
      "replacement_text": "New improved heading"
    },
    {
      "type": "insert_after",
      "search_text": "## Research Notes",
      "content": "\n\n### Key Findings\n- Important discovery"
    },
    {
      "type": "append",
      "content": "\n\n## Conclusion\nSummary of findings"
    }
  ]
}
```

**Error Handling:**
- Clear feedback for each edit operation
- Specific error messages when search text isn't found
- Line number validation for line-based operations
- Detailed success messages showing what was changed

### Download URL
**Tool:** `url_download`
- Downloads content from any URL and displays it in the progress output
- Useful for quickly fetching web content, APIs, or any accessible URL
- Automatically validates URL format and handles errors gracefully
- Displays content with metadata including content type and length

**Features:**
- **URL Validation**: Ensures proper URL format before attempting download
- **Content Metadata**: Shows content type, length, and HTTP status
- **Error Handling**: Clear error messages for invalid URLs or failed requests
- **User Agent**: Identifies as Life Navigator for proper web etiquette

**Usage Examples:**
- Fetch API responses for research
- Download web pages for analysis
- Access public data sources
- Retrieve documentation or articles

**Example Usage:**
```
Download content from: url="https://api.github.com/repos/user/repo"
Fetch webpage: url="https://example.com/article"
```

## Vault Exploration Tools

### Search Vault
**Tool:** `search_vault`
- Searches through all files in your vault for specific content
- Helps find relevant information across your entire knowledge base
- Supports both text content and file name searches


### List Directory
**Tool:** `list_directory`
- Provides structured directory and file listing for any vault path
- Essential for understanding vault organization and helping with navigation
- **Recursive Option**: Can show complete directory trees when needed
- **File Type Filtering**: Filter by extensions (md, pdf, png, etc.)
- **Flexible Inclusion**: Toggle files and/or folders independently
- **File Information**: Shows file sizes and uses visual icons
- **Navigation Support**: Provides direct links to directories and files

**Example Usage:**
```
List vault root: directory_path="", recursive=false
List all markdown files: recursive=true, include_folders=false, file_types=["md"]
Browse project folder: directory_path="Projects/Work", recursive=true
```

### Find Files by Tag
**Tool:** `find_files_by_tag`
- Searches for files containing specific tags across the entire vault
- Comprehensive tag discovery and content organization tool
- **Dual Tag Support**: Searches both in-content tags (#tag) and frontmatter tags
- **Flexible Matching**: Exact match or nested tag matching (e.g., 'project' matches 'project/work')
- **Location Reporting**: Shows line numbers for content tags
- **Content Preview**: Optional file content snippets for context
- **Metadata Extraction**: Includes heading information and file details
- **Result Control**: Configurable limits to manage output size

**Tag Matching Examples:**
- `exact_match=false`: "project" matches #project, #project/work, #project/personal
- `exact_match=true`: "project" matches only #project

**Example Usage:**
```
Find project files: tag="project", exact_match=false, include_file_content=true
Find exact meetings: tag="meeting", exact_match=true, max_results=20
Frontmatter only: tag="important", include_content=false
```

**Use Cases:**
- **Content Discovery**: Find files you've tagged but can't remember
- **Vault Overview**: Understand your tagging patterns and organization
- **Project Navigation**: Locate all files related to specific topics
- **Tag Management**: Find inconsistencies or similar tags

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


## System Tools

### Delegate to Mode
**Tool:** `mode_delegate`
- Fire-and-forget task delegation to specialized modes
- Creates a new independent conversation in the target mode with a self-contained task
- Perfect for when you need a different mode to handle something specific without interrupting your current conversation
- The delegated task must include ALL relevant context since the new conversation is completely separate
- Target mode immediately starts working on the delegated task
- Original conversation continues unaffected

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
