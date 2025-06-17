# Link Expansion

The Life Navigator plugin provides tool calls that can be used to dynamically reference content in your vault. These tools use the new compass-first syntax for consistency and clarity.

## Tool Calls

### Daily Notes

#### Periodic Notes
Format: `` `🧭 periodic_notes(types=["daily"], start_date={offset: X, unit: "days"}, end_date={offset: Y, unit: "days"})` ``

**Purpose**: Automatically references periodic notes (daily, weekly, monthly, quarterly, yearly) within a flexible date range.

**Parameters**:
- `types`: Array of period types to include (["daily"], ["weekly"], ["monthly"], ["quarterly"], ["yearly"], or combinations)
- `start_date`: Start date as offset object with `offset` (number) and `unit` ("days", "months", "years")
- `end_date`: End date as offset object with `offset` (number) and `unit` ("days", "months", "years")

**Examples**:
- `` `🧭 periodic_notes(types=["daily"], start_date={offset: -1, unit: "days"}, end_date={offset: -1, unit: "days"})` `` - Yesterday's daily note
- `` `🧭 periodic_notes(types=["daily"], start_date={offset: -7, unit: "days"}, end_date={offset: 0, unit: "days"})` `` - Last 7 days of daily notes
- `` `🧭 periodic_notes(types=["daily", "weekly"], start_date={offset: -1, unit: "months"}, end_date={offset: 0, unit: "days"})` `` - Daily and weekly notes from last month to today

### Current Date and Time
Format: `` `🧭 current_date_time()` ``
Expands to the current date and time in ISO format.

### Current File and Selection
Format: `` `🧭 current_file_and_selection()` ``
Expands to the full content of the currently open file and any selected text, formatted in XML for clear context.

### Current Chat
Format: `` `🧭 current_chat()` ``
Expands to the current chat session.

## Usage Notes

1. All tool calls use the compass-first format: `` `🧭 tool_name(params)` ``
2. Tools support various parameter styles: positional, named, JavaScript object, and mixed
3. The expansion process is recursive - any tool calls within expanded content will also be expanded
4. Circular references are prevented by tracking visited paths
5. Only tools without side effects can be used in automatic link expansion
6. Regular wiki links can be expanded using: `` `🧭 expand` [[File Name]] `` or `` `🧭 expand` [[Directory Name]] ``

## Examples

### Periodic Notes
```markdown
# Yesterday's Notes
`🧭 periodic_notes(types=["daily"], start_date={offset: -1, unit: "days"}, end_date={offset: -1, unit: "days"})`

# Last Week's Notes
`🧭 periodic_notes(types=["daily"], start_date={offset: -7, unit: "days"}, end_date={offset: 0, unit: "days"})`

# Next Week's Notes
`🧭 periodic_notes(types=["daily"], start_date={offset: 1, unit: "days"}, end_date={offset: 7, unit: "days"})`

# Combined Daily and Weekly Notes
`🧭 periodic_notes(types=["daily", "weekly"], start_date={offset: -1, unit: "months"}, end_date={offset: 0, unit: "days"})`
```

### Current Information
```markdown
Current time: `🧭 current_date_time()`
Current file and selection: `🧭 current_file_and_selection()`
Current chat: `🧭 current_chat()`
```

### Wiki Link Expansion
```markdown
`🧭 expand` [[About Me]]
`🧭 expand` [[Project Notes]]
`🧭 expand` [[Info]]
`🧭 expand` [[Details]]
```

## Purpose and Structure

Tool calls and link expansion allow you to build comprehensive AI prompts with maximum user control. The new compass-first format provides clear, consistent syntax for dynamic content inclusion.

This creates a powerful hierarchical structure:
- From a main mode, you can use `` `🧭 expand` [[Index]] `` to include an index file
- The index can link to multiple sub-files using `` `🧭 expand` [[About Me]] ``, `` `🧭 expand` [[Relationships]] ``, etc.
- Each sub-file can include even more specific documents
- Tool calls like `` `🧭 periodic_notes(types=["daily"], start_date={offset: 0, unit: "days"}, end_date={offset: 0, unit: "days"})` `` provide dynamic, date-based content

This system enables you to:
1. Organize information in a modular way
2. Control exactly what context is provided to the AI
3. Maintain separate documents while creating a unified context
4. Build complex context from simple, reusable components
5. Include dynamic content that updates automatically

## Tool Call Format

All Life Navigator tools use the compass-first format with backticks:

```markdown
`🧭 tool_name(parameters)`
```

This format is:
- **Consistent**: All tools use the same syntax pattern
- **Clear**: The compass emoji clearly indicates Life Navigator functionality  
- **Flexible**: Supports various parameter styles (positional, named, mixed, JavaScript object)
- **Safe**: Only tools without side effects execute during automatic expansion

## Wiki Link Expansion

Regular wiki links can be expanded using the expand tool:

```markdown
`🧭 expand` [[Note Title]]
`🧭 expand` [[Directory Name]]
```

This will include the full content of "Note Title" in your query context. 

### Directory Expansion

The expand tool now supports entire directories:

```markdown
`🧭 expand` [[Info]]
`🧭 expand` [[Projects]]
```

When you expand a directory:
- All markdown files (.md) directly in the directory are included (subdirectories are ignored)
- Files are processed alphabetically for consistent output
- Each file's content is wrapped in XML-like tags for clear structure
- No outer directory wrapper - files are output directly
- Recursive expansion works within each file's content (for any tool calls within the file)
- Circular references are prevented across all files

**Example Output Structure:**
```xml
<About_Me file="Info/About Me.md">
  [Content of About Me.md]
</About_Me>

<Goals file="Info/Goals.md">
  [Content of Goals.md]
</Goals>

<Notes file="Info/Notes.md">
  [Content of Notes.md]
</Notes>
```

**Note:** Only files directly in the `Info` directory are included. Files in subdirectories like `Info/Projects/` would need to be expanded separately with `🧭 expand` [[Projects]].

## HTML Comment Filtering

During the expansion process, Life Navigator automatically filters out top-level HTML comments from the final system prompt while preserving them in code blocks. This feature:

- **Removes top-level HTML comments**: Comments like `<!-- DELETED TASK: ... -->` used to mark deleted tasks are filtered out
- **Preserves code examples**: HTML comments inside markdown code blocks (fenced with ``` or indented with 4+ spaces) are kept intact
- **Handles multi-line comments**: Comments spanning multiple lines are properly detected and removed
- **Maintains code integrity**: Ensures that documentation and code examples remain unchanged

This filtering ensures that the AI doesn't see deleted task markers and other HTML annotations while maintaining the integrity of code examples and documentation.

