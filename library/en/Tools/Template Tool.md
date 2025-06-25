---
tags: ["ln-tool"]
description: "A basic template for creating your own custom tools"
version: "1.0.0"
icon: "wrench"
enabled: true
---

# Template Tool

This is a basic template for creating user-defined tools. Copy this file and modify it to create your own custom tools for Life Navigator.

## How to Use This Template

### 1. Copy and Rename
- Copy this file to create a new tool
- Give it a descriptive name that reflects its purpose
- Place it anywhere in your vault (it will be automatically discovered)

### 2. Update the Frontmatter
Required fields in the YAML frontmatter:
- **`tags`**: Must include `["ln-tool"]` for the tool to be discovered
- **`description`**: Brief description of what the tool does  
- **`version`**: Version number (increment when making changes)
- **`enabled`**: Set to `true` to enable the tool

Optional customization:
- **`icon`**: Choose from [Lucide icons](https://lucide.dev/)

### 2. Modify the Schema
- **Add parameters**: Define what inputs your tool needs
- **Set types**: `string`, `number`, `boolean`, `array`, `object`
- **Add descriptions**: Help the AI understand when and how to use each parameter
- **Set required fields**: Mark which parameters are mandatory

### 3. Write the JavaScript Code  
- **Use the `execute` function**: This is called when the tool runs
- **Access inputs via `input`**: Get the parameters passed by the AI
- **Use `progress()` for updates**: Show progress messages in the chat
- **Use `setLabel()` for status**: Update the tool's display text
- **Use `addNavigationTarget()` for links**: Create clickable links in the chat
- **Access Obsidian APIs via `plugin.app`**: Full access to vault, files, etc.

### 4. Test Your Tool
1. Save the file
2. Go to Life Navigator settings
3. Find your tool in the User-Defined Tools section  
4. Click "Approve" to enable it

## Schema

```json
{
  "name": "template_tool",
  "description": "A basic template for user-defined tools",
  "input_schema": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "Title for the created note"
      },
      "content": {
        "type": "string", 
        "description": "Content to include in the note"
      },
      "tags": {
        "type": "array",
        "description": "Optional tags to add to the note",
        "items": {
          "type": "string"
        }
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
    progress("Starting template tool...");
    
    // Get input parameters
    const { title, content = "", tags = [] } = input;
    
    // Create the note content
    let noteContent = `# ${title}\n\n`;
    
    if (content) {
      noteContent += `${content}\n\n`;
    }
    
    // Add frontmatter with tags if provided
    if (tags.length > 0) {
      const frontmatter = `---\ntags: [${tags.map(tag => `"${tag}"`).join(", ")}]\n---\n\n`;
      noteContent = frontmatter + noteContent;
    }
    
    // Create the file
    const fileName = `${title}.md`;
    const file = await plugin.app.vault.create(fileName, noteContent);
    
    // Add navigation target so user can click to open the file
    addNavigationTarget({
      filePath: file.path
    });
    
    progress(`✅ Created note: ${title}`);
    setLabel("Completed");
    
    return {
      success: true,
      filePath: file.path,
      message: `Successfully created note: ${title}`
    };
    
  } catch (error) {
    progress(`❌ Error: ${error.message}`);
    setLabel("Failed");
    throw error;
  }
}
```

## Key Concepts

### Tool Discovery
Tools are automatically discovered by scanning for files with the `ln-tool` tag in their frontmatter. No manual registration required.

### Security Model
All tools must be explicitly approved before they can execute. This prevents malicious code from running automatically.

### Parameter Validation
The JSON schema automatically validates inputs from the AI, ensuring your tool receives the expected data types.

### Progress Reporting
Use `progress()` to provide real-time updates that appear in the chat, helping users understand what the tool is doing.

### Navigation Integration
Use `addNavigationTarget()` to create clickable links that can open files, navigate to specific locations, or trigger other actions.

### Error Handling
Always wrap your code in try-catch blocks and provide meaningful error messages to help with debugging.

## Best Practices

1. **Start Simple**: Begin with basic functionality and add complexity gradually
2. **Validate Inputs**: Check that required parameters are present and valid
3. **Provide Feedback**: Use progress updates to keep users informed
4. **Handle Errors**: Always include error handling and recovery
5. **Test Thoroughly**: Test with various inputs and edge cases
6. **Document Well**: Include clear descriptions in your schema and comments in your code
7. **Version Control**: Increment the version number when making changes

## Examples

For more examples and inspiration, check out the other tools included in the library:
- Weather Tool: API integration example
- Image Generation Tool: File creation and external API usage  
- YouTube Transcript Tool: Data processing and file manipulation

## Getting Help

If you need help creating tools:
1. Check the other tool examples in the library
2. Use the Tool Creator mode for assistance
3. Visit the [project documentation](https://github.com/cielecki/life-navigator) for more resources 