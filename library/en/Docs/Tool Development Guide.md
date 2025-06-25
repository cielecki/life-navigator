# Tool Development Guide

**Complete guide for creating custom JavaScript tools for Life Navigator**

This guide covers everything you need to know about developing custom tools for Life Navigator, from basic templates to advanced API integrations and security considerations.

## What Are Tools?

Life Navigator tools are JavaScript functions that extend the AI's capabilities. They allow the AI to:

- Interact with external APIs
- Process and manipulate data
- Create and modify files
- Perform calculations and analysis
- Automate repetitive tasks

## Tool File Structure

Every tool is a markdown file with YAML frontmatter containing the tool specification and JavaScript implementation.

### Basic Template

```markdown
---
tags:
  - ln-tool
description: "Brief description of what this tool does"
version: "1.0.0"
enabled: true
---

# Tool Name

```json
{
  "name": "my_custom_tool",
  "description": "Brief description of what this tool does",
  "input_schema": {
    "type": "object",
    "properties": {
      "parameter_name": {
        "type": "string",
        "description": "Description of this parameter"
      }
    },
    "required": ["parameter_name"]
  }
}
```

```javascript
async function execute(input, { progress, setLabel, addNavigationTarget, plugin }) {
  // Tool logic here
}
```
---

# Tool Implementation

\```javascript
// Your tool implementation goes here
async function execute(params, context) {
    // Tool logic
    return {
        success: true,
        data: "Tool result"
    };
}
\```
```

## Essential Components

### Tool Configuration (YAML Frontmatter)

**`description`**: What the tool does
- Brief explanation for the AI
- Helps AI decide when to use the tool
- Should be specific about capabilities

**`version`**: Tool version number
- Use semantic versioning (1.0.0, 1.1.0, 2.0.0)
- Update when making changes
- Helps with troubleshooting

**`enabled`**: Whether tool is active
- `true`: Tool is available for use
- `false`: Tool is disabled (won't appear in AI tools)

**`icon`**: Lucide icon name (optional)
- Choose from [Lucide icons](https://lucide.dev/)
- Used in UI display

### JSON Schema (input_schema)

Defines the parameters your tool accepts:

```json
{
  "name": "example_tool",
  "description": "Example tool description",
  "input_schema": {
    "type": "object",
    "properties": {
      "text": {
        "type": "string",
        "description": "Text to process"
      },
      "count": {
        "type": "number",
        "description": "Number of items to generate",
        "minimum": 1,
        "maximum": 100
      },
      "options": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "List of available options"
      },
      "enabled": {
        "type": "boolean",
        "description": "Whether feature is enabled"
      }
    },
    "required": ["text"]
  }
}
```

### JavaScript Implementation

The `execute` function is called when the AI uses your tool:

```javascript
async function execute(input, { progress, setLabel, addNavigationTarget, plugin }) {
    // input: Object containing the parameters from input_schema
    // progress: Function to show progress messages
    // setLabel: Function to update tool status
    // addNavigationTarget: Function to add clickable links
    // plugin: Life Navigator plugin instance
    
    try {
        setLabel("Processing...");
        progress("Starting tool execution...");
        
        // Your tool logic here
        const result = processData(input.text);
        
        progress("✅ Tool completed successfully!");
        setLabel("Completed");
        
        return result;
    } catch (error) {
        progress(`❌ Error: ${error.message}`);
        setLabel("Failed");
        throw error;
    }
}
```

## Available Context Objects

### Plugin Context (`plugin`)
Access to Life Navigator plugin and Obsidian's app instance:

```javascript
// Get all markdown files
const files = plugin.app.vault.getMarkdownFiles();

// Read file content
const file = plugin.app.vault.getAbstractFileByPath("MyNote.md");
const content = await plugin.app.vault.read(file);

// Create new file
await plugin.app.vault.create("NewNote.md", "Content here");

// Show notice to user
new Notice("Tool completed successfully!");
```

### Progress and Status Updates
Keep users informed about tool execution:

```javascript
async function execute(input, { progress, setLabel, addNavigationTarget, plugin }) {
    setLabel("Starting...");
    progress("Initializing tool...");
    
    // Do some work
    progress("Processing data...");
    
    // Add clickable link to result
    addNavigationTarget({
        filePath: 'result.md'
    });
    
    setLabel("Completed");
    progress("✅ Tool finished successfully!");
}
```

### HTTP Requests
Make external API calls:

```javascript
async function execute(input, { progress, setLabel, addNavigationTarget, plugin }) {
    const response = await plugin.app.vault.adapter.app.requestUrl({
        url: "https://api.example.com/data",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + input.apiKey,
            "Content-Type": "application/json"
        }
    });
    
    return response.json;
}
```

## Tool Development Patterns

### Data Processing Tool

```markdown
---
tags:
  - ln-tool
description: "Analyzes text for word count, readability, and sentiment"
version: "1.0.0"
enabled: true
icon: "type"
schema:
  type: "object"
  properties:
    text:
      type: "string"
      description: "Text to analyze"
    analysis_type:
      type: "string"
      enum: ["basic", "detailed", "sentiment"]
      description: "Type of analysis to perform"
  required: ["text"]
---

\```javascript
async function execute(params, context) {
    const { text, analysis_type = "basic" } = params;
    
    const words = text.split(/\s+/).length;
    const chars = text.length;
    const sentences = text.split(/[.!?]+/).length - 1;
    
    let result = {
        words: words,
        characters: chars,
        sentences: sentences,
        avg_words_per_sentence: Math.round(words / sentences * 100) / 100
    };
    
    if (analysis_type === "detailed") {
        result.paragraphs = text.split(/\n\s*\n/).length;
        result.reading_time_minutes = Math.ceil(words / 200);
    }
    
    if (analysis_type === "sentiment") {
        // Simple sentiment analysis
        const positiveWords = ["good", "great", "excellent", "amazing", "wonderful"];
        const negativeWords = ["bad", "terrible", "awful", "horrible", "disappointing"];
        
        const textLower = text.toLowerCase();
        const positive = positiveWords.filter(word => textLower.includes(word)).length;
        const negative = negativeWords.filter(word => textLower.includes(word)).length;
        
        result.sentiment = positive > negative ? "positive" : 
                          negative > positive ? "negative" : "neutral";
        result.sentiment_score = positive - negative;
    }
    
    return {
        success: true,
        data: result
    };
}
\```
```

### File Management Tool

```markdown
---
tags:
  - ln-tool
description: "Organizes notes by tags, creation date, or custom criteria"
version: "1.0.0"
enabled: true
icon: "folder-tree"
schema:
  type: "object"
  properties:
    organization_method:
      type: "string"
      enum: ["tags", "date", "size", "alphabetical"]
      description: "How to organize the notes"
    target_folder:
      type: "string"
      description: "Folder to organize (optional, defaults to root)"
  required: ["organization_method"]
---

\```javascript
async function execute(params, context) {
    const { organization_method, target_folder = "" } = params;
    const app = context.app;
    
    try {
        // Get all markdown files
        let files = app.vault.getMarkdownFiles();
        
        // Filter to target folder if specified
        if (target_folder) {
            files = files.filter(file => file.path.startsWith(target_folder));
        }
        
        let organized = {};
        
        for (const file of files) {
            let category;
            
            switch (organization_method) {
                case "tags":
                    const cache = app.metadataCache.getFileCache(file);
                    const tags = cache?.tags?.map(tag => tag.tag) || ["#untagged"];
                    category = tags[0];
                    break;
                    
                case "date":
                    const date = new Date(file.stat.ctime);
                    category = date.toISOString().split('T')[0]; // YYYY-MM-DD
                    break;
                    
                case "size":
                    const size = file.stat.size;
                    category = size < 1000 ? "small" : 
                              size < 10000 ? "medium" : "large";
                    break;
                    
                case "alphabetical":
                    category = file.basename[0].toUpperCase();
                    break;
            }
            
            if (!organized[category]) {
                organized[category] = [];
            }
            organized[category].push({
                name: file.basename,
                path: file.path,
                size: file.stat.size,
                created: new Date(file.stat.ctime).toISOString()
            });
        }
        
        // Sort within each category
        Object.keys(organized).forEach(category => {
            organized[category].sort((a, b) => a.name.localeCompare(b.name));
        });
        
        return {
            success: true,
            data: {
                method: organization_method,
                categories: Object.keys(organized).length,
                total_files: files.length,
                organization: organized
            }
        };
        
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
\```
```

### API Integration Tool

```markdown
---
tags:
  - ln-tool
description: "Gets current weather and forecast for a specified location"
version: "1.0.0"
enabled: true
icon: "cloud"
schema:
  type: "object"
  properties:
    location:
      type: "string"
      description: "City name or coordinates (lat,lon)"
    days:
      type: "number"
      description: "Number of forecast days (1-7)"
      minimum: 1
      maximum: 7
    units:
      type: "string"
      enum: ["metric", "imperial"]
      description: "Temperature units (metric=Celsius, imperial=Fahrenheit)"
  required: ["location"]
---

\```javascript
async function execute(params, context) {
    const { location, days = 3, units = "metric" } = params;
    
    try {
        // Use Open-Meteo API (free, no API key required)
        let lat, lon;
        
        // First, geocode the location
        const geocodeResponse = await context.app.vault.adapter.app.requestUrl({
            url: `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`,
            method: "GET"
        });
        
        if (!geocodeResponse.json.results || geocodeResponse.json.results.length === 0) {
            return {
                success: false,
                error: `Location "${location}" not found`
            };
        }
        
        const result = geocodeResponse.json.results[0];
        lat = result.latitude;
        lon = result.longitude;
        
        // Get weather forecast
        const tempUnit = units === "metric" ? "celsius" : "fahrenheit";
        const weatherResponse = await context.app.vault.adapter.app.requestUrl({
            url: `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&forecast_days=${days}&temperature_unit=${tempUnit}`,
            method: "GET"
        });
        
        const weather = weatherResponse.json;
        
        // Format the forecast data
        const forecast = [];
        for (let i = 0; i < days; i++) {
            forecast.push({
                date: weather.daily.time[i],
                high_temp: weather.daily.temperature_2m_max[i],
                low_temp: weather.daily.temperature_2m_min[i],
                precipitation: weather.daily.precipitation_sum[i],
                weather_code: weather.daily.weather_code[i]
            });
        }
        
        return {
            success: true,
            data: {
                location: `${result.name}, ${result.country}`,
                coordinates: { lat, lon },
                units: units,
                forecast: forecast,
                timezone: weather.timezone
            }
        };
        
    } catch (error) {
        return {
            success: false,
            error: `Weather API error: ${error.message}`
        };
    }
}
\```
```

## Security Considerations

### Input Validation

Always validate and sanitize inputs:

```javascript
async function execute(params, context) {
    const { filename, content } = params;
    
    // Validate filename
    if (!filename || typeof filename !== 'string') {
        return { success: false, error: "Invalid filename" };
    }
    
    // Sanitize filename (remove dangerous characters)
    const sanitizedFilename = filename.replace(/[<>:"/\\|?*]/g, '_');
    
    // Validate content length
    if (content && content.length > 1000000) {
        return { success: false, error: "Content too large" };
    }
    
    // Continue with tool logic...
}
```

### Error Handling

Implement comprehensive error handling:

```javascript
async function execute(params, context) {
    try {
        // Risky operation
        const result = await riskyAPICall(params);
        
        return {
            success: true,
            data: result
        };
        
    } catch (error) {
        // Log error details for debugging
        console.error("Tool error:", error);
        
        // Return user-friendly error message
        return {
            success: false,
            error: "Failed to process request. Please check your parameters."
        };
    }
}
```

### Rate Limiting

Implement rate limiting for API calls:

```javascript
// Global rate limiter
const lastCall = {};
const RATE_LIMIT_MS = 1000; // 1 second between calls

async function execute(params, context) {
    const toolName = "MyTool";
    const now = Date.now();
    
    if (lastCall[toolName] && (now - lastCall[toolName]) < RATE_LIMIT_MS) {
        return {
            success: false,
            error: "Rate limit exceeded. Please wait before making another request."
        };
    }
    
    lastCall[toolName] = now;
    
    // Continue with tool logic...
}
```

## Testing Your Tools

### Manual Testing

1. **Basic Functionality**: Does the tool work with valid inputs?
2. **Error Handling**: How does it handle invalid inputs?
3. **Edge Cases**: What happens with empty, null, or extreme values?
4. **Performance**: Is the tool responsive for typical use cases?

### Test Script Template

```javascript
// Add to the end of your tool for testing
/* TEST CASES - Remove before deployment
async function testTool() {
    console.log("Testing tool...");
    
    // Test 1: Valid input
    let result = await execute({ text: "Hello world" }, mockContext);
    console.log("Test 1:", result);
    
    // Test 2: Invalid input
    result = await execute({ text: null }, mockContext);
    console.log("Test 2:", result);
    
    // Test 3: Edge case
    result = await execute({ text: "" }, mockContext);
    console.log("Test 3:", result);
}

const mockContext = {
    app: {
        vault: {
            getMarkdownFiles: () => [],
            create: () => Promise.resolve(),
            read: () => Promise.resolve("mock content")
        }
    }
};

// testTool();
*/
```

## Tool Validation

### Using the Tool Validator

Always validate your tools before deployment:

1. Use the Tool Validator in Life Navigator
2. Check for JSON schema errors
3. Verify JavaScript syntax
4. Test error handling
5. Confirm security practices

### Common Validation Issues

**Invalid JSON Schema:**
```yaml
# Wrong - missing type
ln_schema:
  properties:
    text:
      description: "Text input"
      
# Correct - includes type
ln_schema:
  type: "object"
  properties:
    text:
      type: "string"
      description: "Text input"
```

**JavaScript Syntax Errors:**
```javascript
// Wrong - missing async
function execute(params, context) {
    return await someAsyncOperation();
}

// Correct - async function
async function execute(params, context) {
    return await someAsyncOperation();
}
```

## Best Practices

### DO:
- Validate all inputs thoroughly
- Handle errors gracefully
- Use descriptive parameter names
- Include helpful descriptions in schema
- Test with edge cases
- Implement rate limiting for external APIs
- Return consistent response format
- Log errors for debugging

### DON'T:
- Trust user input without validation
- Ignore error handling
- Make unbounded API requests
- Store sensitive data in tool code
- Create tools with overly broad permissions
- Skip testing with invalid inputs
- Use synchronous operations for heavy tasks

### Response Format Standards

Always return responses in this format:

```javascript
// Success response
return {
    success: true,
    data: resultData,
    message: "Optional success message"
};

// Error response
return {
    success: false,
    error: "Clear error message",
    details: "Optional additional details"
};
```

## Advanced Patterns

### Async Processing

For long-running operations:

```javascript
async function execute(params, context) {
    const { largeDataSet } = params;
    
    // Process in chunks to avoid blocking
    const chunkSize = 100;
    const results = [];
    
    for (let i = 0; i < largeDataSet.length; i += chunkSize) {
        const chunk = largeDataSet.slice(i, i + chunkSize);
        const processed = await processChunk(chunk);
        results.push(...processed);
        
        // Allow other operations to run
        await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    return { success: true, data: results };
}
```

### Caching

Implement simple caching for expensive operations:

```javascript
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function execute(params, context) {
    const cacheKey = JSON.stringify(params);
    const cached = cache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
        return cached.data;
    }
    
    const result = await expensiveOperation(params);
    
    cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
    });
    
    return result;
}
```

This comprehensive guide provides everything needed to create powerful, secure, and reliable tools for Life Navigator. Always validate your tools and test thoroughly before deployment. 

---
tags:
  - ln-tool
version: "1.0.0"
description: "Brief description of what this tool does"
icon: "wrench"
---

## Tool Configuration

### Required Frontmatter Fields

- **`tags`**: Must include `ln-tool` to mark this as a tool file
- **`version`**: Version number for tracking tool evolution
- **`description`**: Brief description of what the tool does
- **`icon`**: Choose from [Lucide icons](https://lucide.dev/) 