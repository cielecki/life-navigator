# Validation Tools

Life Navigator includes two built-in validation tools to help you ensure your modes and user-defined tools are properly configured and working correctly. These tools are particularly useful for debugging issues and maintaining quality in your Life Navigator setup.

## Mode Validator Tool

The **Mode Validator** tool validates Life Navigator mode files for completeness, correctness, and functionality.

### What it checks:

- **File Structure**: Ensures the file has proper frontmatter and the required `ln-mode` tag
- **YAML Parsing**: Validates that frontmatter YAML is properly formatted
- **Required Fields**: Checks for essential mode configuration
- **Field Validation**: Validates specific fields like model names, voice settings, token limits, and icon names
- **Icon Validation**: Ensures icons are valid Lucide icons available in Obsidian
- **Link Expansion**: Tests if links in the system prompt expand correctly
- **System Prompt**: Ensures the system prompt content is present and valid
- **Legacy Format Detection**: Identifies and flags deprecated `ln_` format patterns including:
  - Deprecated `ln_` prefixed fields (like `ln_icon`, `ln_description`, `ln_enabled`)
  - Version format issues (`v1.0.0` should be `1.0.0`)
  - Boolean format problems (`yes/no` should be `true/false`)
  - Legacy filename patterns (`Mode-v1.md`)
  - Old link formats (`🔎` instead of `🧭`)

### Usage:

You can ask the AI to validate a mode file:

```
Validate the mode file "Assistant.md"
```

Or use the tool directly:
- **Tool name**: `mode_validator`
- **Parameter**: `mode_path` - The path to the mode file (including .md extension)

### Example Output:

The validator provides a comprehensive report with:
- ✅ **Errors**: Critical issues that prevent the mode from working
- ⚠️ **Warnings**: Issues that may affect functionality but don't break the mode
- ℹ️ **Information**: Details about the mode configuration

## Tool Validator Tool

The **Tool Validator** tool validates user-defined tool files for proper structure, schema validity, and code quality.

### What it checks:

- **File Structure**: Ensures the file has proper frontmatter and the required `ln-tool` tag
- **YAML Parsing**: Validates frontmatter YAML formatting
- **Required Frontmatter**: Checks for required fields like `version` and `description`
- **Version Format**: Validates semantic versioning format (e.g., "1.0.0")
- **Icon Validation**: Ensures icons are valid Lucide icons available in Obsidian
- **JSON Schema**: Validates the tool's parameter schema in JSON code blocks
- **JavaScript Code**: Checks code syntax and common patterns
- **Tool Integration**: Tests if the tool can be loaded by the tool system
- **Legacy Format Detection**: Identifies and flags deprecated `ln_` format patterns including:
  - Deprecated `ln_` prefixed fields (like `ln_version`, `ln_description`, `ln_icon`, `ln_enabled`)
  - Version format issues (`v1.0.0` should be `1.0.0`)
  - Boolean format problems (`yes/no` should be `true/false`)
  - Mixed format usage (both old `ln_` prefixes and new format together)
  - Legacy filename patterns (`Tool-v1.md`)
  - Old link formats (`🔎` instead of `🧭`)

### Usage:

You can ask the AI to validate a user-defined tool:

```
Validate the tool file "Weather Tool.md"
```

Or use the tool directly:
- **Tool name**: `tool_validator`
- **Parameter**: `tool_path` - The path to the tool file (including .md extension)

### Example Output:

The validator provides detailed feedback on:
- **Schema Structure**: Whether the JSON schema is valid and well-formed
- **Code Quality**: Basic syntax checking and pattern analysis
- **Integration**: Whether the tool loads correctly in the system
- **Best Practices**: Suggestions for error handling, context usage, etc.

## When to Use Validation Tools

### Troubleshooting

If you're experiencing issues with:
- Modes not appearing or working correctly
- User-defined tools failing to execute
- Unexpected behavior in system prompts
- Link expansion problems

### Quality Assurance

Before sharing modes or tools with others, validate them to ensure:
- All required fields are present
- Configuration is correct
- Links resolve properly
- Code follows best practices

### Development

During development of new modes or tools:
- Catch syntax errors early
- Ensure proper structure
- Verify integration with Life Navigator
- Get feedback on best practices

## Understanding Validation Results

### Errors ❌
Critical issues that must be fixed for the mode/tool to work properly. These include:
- Missing required tags or fields
- Invalid YAML syntax
- JavaScript syntax errors
- Failed link resolution

### Warnings ⚠️
Issues that may affect functionality but don't completely break the mode/tool:
- Missing optional fields
- Non-standard version formatting
- Suboptimal code patterns
- Missing error handling

### Information ℹ️
Helpful details about the configuration:
- Current settings and values
- Code quality observations
- Integration status
- Usage statistics

## Best Practices

1. **Validate Early**: Run validation during development, not just when problems occur
2. **Fix Errors First**: Address all errors before warnings
3. **Review Warnings**: Consider addressing warnings for better reliability
4. **Use Navigation**: Click on file paths in validation reports to quickly edit files
5. **Regular Checks**: Validate modes and tools after making changes

## Limitations

- Validation tools check structure and syntax but can't guarantee runtime behavior
- Link expansion testing is limited to checking if links resolve, not their content
- JavaScript validation is basic syntax checking, not full semantic analysis
- Some advanced validation requires actually running the mode or tool

These validation tools are designed to catch common issues and provide helpful feedback for maintaining a high-quality Life Navigator setup. 