# User-Defined Tools - User Guide

## Overview

User-defined tools allow you to extend Life Navigator with custom functionality by creating tools directly from Obsidian notes. These tools can access your vault, make network requests, and integrate seamlessly with the AI assistant.

## ⚠️ Security Warning

**User-defined tools execute JavaScript code with full access to:**
- Your entire Obsidian vault
- Local file system
- Network requests  
- System resources

**Only enable this feature if you:**
- Understand JavaScript security risks
- Will only run tools you trust
- Review all tool code before approval

## Getting Started

### Quick Setup (5 minutes)

1. Enable feature in settings (with security warning)
2. Run command "Create Template: Basic User Tool"
3. Edit the created template 
4. Ask AI to test your tool

### Manual Setup

- Add `tags: ["ln-tool"]` to any note's frontmatter
- Include JSON schema in ```json block
- Include JavaScript code in ```javascript block
- AI can now use your custom tool!

## Tool Structure

A user-defined tool is an Obsidian note with three main sections:

### 1. Frontmatter Configuration
```yaml
---
tags: ["ln-tool"]
ln-tool-description: "A simple example tool"
ln-tool-version: "1.0.0"
ln-tool-icon: "gear"  # Lucide icon name
ln-tool-enabled: true
---
```

**Note:** The tool name is automatically taken from the filename (just like modes).

### 2. JSON Schema Definition
```json
{
  "name": "my_custom_tool",
  "description": "Tool description for the AI",
  "input_schema": {
    "type": "object",
    "properties": {
      "parameter_name": {
        "type": "string",
        "description": "Parameter description"
      }
    },
    "required": ["parameter_name"]
  }
}
```

### 3. JavaScript Implementation
```javascript
async function execute(context) {
  const { params, plugin, progress, addNavigationTarget, setLabel } = context;
  
  // Set initial status
  setLabel("Starting tool...");
  
  // Main logic here
  
  // Access parameters from AI
  console.log(params.parameter_name);
  
  // Create files, make requests, etc.
  
  // Success message  
  setLabel("Tool completed");
}
```

## Execution Context

Your tool's `execute` function receives a context object with:

### `params`
Parameters passed by the AI based on your schema:
```javascript
const { url, filename } = params;
```

### `plugin` 
Access to Obsidian APIs:
```javascript
// Create a file
await plugin.app.vault.create("filename.md", content);

// Read a file
const content = await plugin.app.vault.read(file);

// Get current file
const activeFile = plugin.app.workspace.getActiveFile();
```

### `progress(message)`
Show progress updates in the chat:
```javascript
progress("Downloading data...");
progress("Processing results...");
```

### `addNavigationTarget(target)`
Add clickable links to files:
```javascript
addNavigationTarget({
  filePath: "created-file.md"
});
```

### `setLabel(text)`
Update the tool's action text in real-time:
```javascript
setLabel("Creating document...");
setLabel("Document created");
```

## Available APIs

Your tools have access to:

### Safe Globals
- `console.log()`, `console.warn()`, `console.error()`
- `Date`, `JSON`, `Math`, `String`, `Number`, `Array`, `Object`

### Obsidian APIs
- `plugin.app.vault.*` - File operations
- `plugin.app.workspace.*` - Workspace management
- `plugin.app.metadataCache.*` - File metadata

### Network Requests
```javascript
// Make HTTP requests
const response = await fetch('https://api.example.com/data');
const data = await response.json();
```

### Blocked for Security
- `require()`, `process`, `eval()`, `Function()`
- Direct file system access outside Obsidian
- Child process execution

## Example Tool: Note Creator

```markdown
---
tags: ["ln-tool"]
description: "Creates a note with template and metadata"
version: "1.0.0"
icon: "file-plus"
enabled: true
---

# Smart Note Creator

Creates a new note with a template structure and metadata.

## Schema

```json
{
  "name": "smart_note_creator",
  "description": "Creates a new note with template and metadata",
  "input_schema": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "Note title"
      },
      "tags": {
        "type": "array",
        "items": {"type": "string"},
        "description": "Tags to add to the note"
      },
      "template": {
        "type": "string",
        "enum": ["meeting", "project", "daily", "research"],
        "description": "Template type to use"
      }
    },
    "required": ["title"]
  }
}
```

## Implementation

```javascript
async function execute(input, { progress, setLabel, addNavigationTarget, plugin }) {
  try {
    setLabel("Creating note...");
    
    const { title, tags = [], template = "basic" } = input;
    
    progress(`Creating note: ${title}`);
    
    // Generate content based on template
    let content = `# ${title}\n\n`;
    content += `Created: ${new Date().toISOString()}\n`;
    
    if (tags.length > 0) {
      content += `Tags: ${tags.map(tag => `#${tag}`).join(' ')}\n`;
    }
    
    content += `\n## Notes\n\n`;
    
    switch (template) {
      case 'meeting':
        content += `### Attendees\n- \n\n### Agenda\n- \n\n### Notes\n\n### Action Items\n- [ ] \n\n`;
        break;
      case 'project':
        content += `### Objective\n\n### Tasks\n- [ ] \n\n### Resources\n\n### Timeline\n\n`;
        break;
      case 'daily':
        content += `### Today's Goals\n- [ ] \n\n### Notes\n\n### Tomorrow\n- [ ] \n\n`;
        break;
      case 'research':
        content += `### Research Question\n\n### Sources\n\n### Findings\n\n### Conclusions\n\n`;
        break;
    }
    
    // Create unique filename using proper Unicode normalization
    function normalizeUnicode(text) {
      return text
        .normalize('NFKD') // Decompose characters into base + diacritics
        .replace(/[\u0300-\u036f]/g, ''); // Remove combining diacritical marks
    }
    
    const sanitizedTitle = normalizeUnicode(title).replace(/[^a-zA-Z0-9 ]/g, '').trim();
    const filename = `${sanitizedTitle}.md`;
    
    // Create the file
    const file = await plugin.app.vault.create(filename, content);
    
    // Add navigation
    addNavigationTarget({
      filePath: file.path
    });
    
    setLabel("Note created");
    progress(`Successfully created: ${filename}`);
    
  } catch (error) {
    progress(`❌ Error: ${error.message}`);
    setLabel("Failed");
    throw error;
  }
}
```
```

## Tool Approval Process

When you first run a tool:

1. **Review Modal**: Shows tool code and schema
2. **Security Warning**: Reminds you of the risks
3. **Approval Decision**: Click "I understand the risks - Approve"
4. **Persistent Approval**: Approval is remembered until code changes

## Managing Tools

### Finding Your Tools
Tools are automatically discovered when you:
- Add `["ln-tool"]` to the tags array in any note's frontmatter
- Save the note with valid schema and JavaScript code

### Disabling Tools
- Set `enabled: false` in frontmatter
- Or disable the entire feature in settings

### Updating Tools
- Edit the JavaScript code in your tool note
- Save the file - you'll need to re-approve if code changed
- Tools automatically refresh when files are modified

### Debugging Tools
- Check the Developer Console (`Cmd/Ctrl + Shift + I`) for errors
- Use `console.log()` statements in your tool code
- Tool errors appear in chat with detailed messages

## Best Practices

### Security
- Always review tool code before approval
- Don't run tools from untrusted sources
- Be cautious with network requests and sensitive data
- Consider the scope of file access your tool needs

### Development
- Start with the template tool and modify incrementally
- Test with simple parameters first
- Use `progress()` for long-running operations
- Handle errors gracefully with try-catch blocks

### Performance
- Avoid infinite loops or excessive recursion
- Be mindful of large file operations
- Use appropriate delays for API rate limiting

## Troubleshooting

### Tool Not Appearing
- Check that `tags: ["ln-tool"]` is in frontmatter
- Verify JSON schema is valid
- Ensure JavaScript code block exists
- Check that tool is enabled in frontmatter

### Approval Modal Not Showing
- Tool might already be approved
- Check if user-defined tools are enabled in settings
- Look for error messages in Developer Console

### Execution Errors
- Review JavaScript syntax
- Check that all required parameters are handled
- Verify file paths and permissions
- Use try-catch blocks for error handling

### Tool Updates Not Reflecting
- Save the file to trigger refresh
- Check if code hash changed (requires re-approval)
- Restart Obsidian if tools seem stuck

## Advanced Topics

### Error Handling
```javascript
async function execute(context) {
  const { params, plugin, setLabel } = context;
  
  // Helper function for Unicode normalization (reusable across tools)
  function normalizeUnicode(text) {
    return text
      .normalize('NFKD') // Decompose characters into base + diacritics
      .replace(/[\u0300-\u036f]/g, ''); // Remove combining diacritical marks
  }
  
  try {
    setLabel("Processing...");
    
    // Your risky operation
    await riskOperation();
    
    setLabel("Success");
  } catch (error) {
    setLabel("Failed");
    throw new Error(`Tool failed: ${error.message}`);
  }
}
```

### Working with Files
```javascript
// Check if file exists
const fileExists = await plugin.app.vault.adapter.exists("path/to/file.md");

// List files in directory
const files = plugin.app.vault.getMarkdownFiles()
  .filter(file => file.path.startsWith("folder/"));

// Read metadata
const metadata = plugin.app.metadataCache.getFileCache(file);
```

### Network Requests
```javascript
// GET request
const response = await fetch("https://api.example.com/data");
const data = await response.json();

// POST request  
const response = await fetch("https://api.example.com/data", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({key: "value"})
});
```

## Contributing

Found a bug or want to contribute to the user-defined tools system? 

- Report issues on [GitHub](https://github.com/cielecki/life-navigator/issues)
- Submit feature requests
- Share your tools with the community
- Contribute to documentation

## Examples Repository

Check out the [Life Navigator Tools Collection](https://github.com/cielecki/life-navigator-tools) for:
- Community-contributed tools
- Advanced examples
- Tool templates
- Best practices

---

**Remember**: With great power comes great responsibility. User-defined tools give you unlimited extensibility, but require careful consideration of security implications. 

## Common Issues

### Tool Not Detected
- Check that `tags: ["ln-tool"]` is in frontmatter
- Verify JSON and JavaScript code blocks exist
- Look for syntax errors in developer console

### Security Approval Required
Every tool requires one-time security approval showing:
- Tool name and description  
- Complete source code
- Security warnings
- Approve/Deny options 