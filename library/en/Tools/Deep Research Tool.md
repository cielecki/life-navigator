---
tags: ["ln-tool"]
description: "Conducts comprehensive web research using Firecrawl's deep research API and saves detailed reports with citations"
version: "1.0.0"
icon: "search"
enabled: true
---

# Deep Research Tool

This tool conducts comprehensive web research on any topic using Firecrawl's deep research capabilities via direct API requests. It searches multiple sources, extracts relevant information, and synthesizes findings into a detailed report with citations.

## Schema

```json
{
  "name": "deep_research",
  "description": "Conducts comprehensive web research on a given topic using Firecrawl's deep research capabilities. Searches multiple sources, extracts relevant information, and synthesizes findings into a detailed report with citations. Saves the research report to a specified file.",
  "input_schema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "The research query or topic to investigate thoroughly"
      },
      "path": {
        "type": "string",
        "description": "The path where the research report should be saved (including filename with .md extension)"
      },
      "max_depth": {
        "type": "number",
        "description": "Maximum depth of research iterations (1-10, default: 3)",
        "minimum": 1,
        "maximum": 10
      },
      "max_urls": {
        "type": "number", 
        "description": "Maximum number of URLs to analyze (5-50, default: 20)",
        "minimum": 5,
        "maximum": 50
      },
      "timeout": {
        "type": "number",
        "description": "Timeout in seconds for the research process (60-300, default: 180)",
        "minimum": 60,
        "maximum": 300
      },
      "overwrite": {
        "type": "boolean",
        "description": "Whether to overwrite the file if it already exists. Defaults to false",
        "default": false
      }
    },
    "required": ["query", "path"]
  }
}
```

## Implementation

```javascript
async function execute(context) {
  const { params, plugin, progress, addNavigationTarget, setLabel } = context;
  
  const { query, path, max_depth = 3, max_urls = 20, timeout = 180, overwrite = false } = params;

  setLabel(`Researching: ${query}`);

  // Validate inputs
  if (!query || query.trim().length === 0) {
    setLabel(`Failed to research: ${query}`);
    throw new Error('Research query cannot be empty');
  }

  if (!path || path.trim().length === 0) {
    setLabel(`Failed to research: ${path}`);
    throw new Error('Path cannot be empty');
  }

  // Get Firecrawl API key from secrets
  const firecrawlApiKey = getSecret('FIRECRAWL_API_KEY');
  if (!firecrawlApiKey || firecrawlApiKey.trim().length === 0) {
    setLabel(`Failed to research: ${query}`);
    throw new Error('Firecrawl API key not configured. Please add "FIRECRAWL_API_KEY" to your secrets in plugin settings.');
  }

  // Configure research parameters
  const researchParams = {
    maxDepth: Math.min(Math.max(max_depth, 1), 10),
    timeLimit: Math.min(Math.max(timeout, 60), 300),
    maxUrls: Math.min(Math.max(max_urls, 5), 50)
  };

  try {
    progress(`Starting deep research for: ${query}`);

    // Make direct API request to Firecrawl Deep Research API
    const response = await fetch('https://api.firecrawl.dev/v1/research', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        maxDepth: researchParams.maxDepth,
        timeLimit: researchParams.timeLimit,
        maxUrls: researchParams.maxUrls
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 429) {
        throw new Error('API quota exceeded. Please check your Firecrawl account.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your Firecrawl configuration.');
      } else if (errorData.error?.message) {
        throw new Error(`Firecrawl API error: ${errorData.error.message}`);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    }

    const data = await response.json();

    if (!data.success || !data.data) {
      const errorMsg = data.error || 'Unknown error occurred during research';
      
      if (errorMsg.includes('quota') || errorMsg.includes('limit')) {
        throw new Error('API quota exceeded. Please check your Firecrawl account.');
      } else if (errorMsg.includes('timeout')) {
        throw new Error('Research timed out. Try reducing the scope or increasing the timeout.');
      } else {
        throw new Error(`Research failed: ${errorMsg}`);
      }
    }

    const researchData = data.data;
    if (!researchData) {
      throw new Error('No research results received from API');
    }

    progress('Processing research results...');

    // Format the research results
    let formattedResult = `# Deep Research Results: ${query}\n\n`;
    
    // Add research summary/analysis if available
    if (researchData.finalAnalysis) {
      formattedResult += `## Executive Summary\n\n${researchData.finalAnalysis}\n\n`;
    }

    // Add sources if available
    if (researchData.sources && researchData.sources.length > 0) {
      formattedResult += `## Sources (${researchData.sources.length})\n\n`;
      researchData.sources.forEach((source, index) => {
        const title = source.title || source.url || `Source ${index + 1}`;
        const url = source.url || '';
        const description = source.description || '';
        
        formattedResult += `${index + 1}. **${title}**\n`;
        if (url) {
          formattedResult += `   - URL: ${url}\n`;
        }
        if (description) {
          formattedResult += `   - ${description}\n`;
        }
        formattedResult += '\n';
      });
    }

    // Add research activities if available
    if (researchData.activities && researchData.activities.length > 0) {
      formattedResult += `## Research Process\n\n`;
      researchData.activities.forEach((activity, index) => {
        if (activity.message) {
          const timestamp = activity.timestamp ? new Date(activity.timestamp).toLocaleTimeString() : '';
          const typeIcon = activity.type === 'search' ? '🔍' : 
                          activity.type === 'analyze' ? '🧠' : 
                          activity.type === 'synthesis' ? '✨' : '🔄';
          
          formattedResult += `${index + 1}. ${typeIcon} ${activity.message}`;
          if (timestamp) {
            formattedResult += ` (${timestamp})`;
          }
          formattedResult += '\n';
        }
      });
      formattedResult += '\n';
    }

    // Add research metadata
    formattedResult += `## Research Metadata\n\n`;
    formattedResult += `- **Query**: ${query}\n`;
    formattedResult += `- **Max Depth**: ${researchParams.maxDepth}\n`;
    formattedResult += `- **Max URLs**: ${researchParams.maxUrls}\n`;
    formattedResult += `- **Timeout**: ${researchParams.timeLimit}s\n`;
    if (researchData.sources) {
      formattedResult += `- **Sources Found**: ${researchData.sources.length}\n`;
    }
    formattedResult += `- **Completed**: ${new Date().toISOString()}\n\n`;

    progress('Saving research report...');

    // Generate unique filename if file exists and overwrite is false
    let finalPath = path;
    if (await plugin.app.vault.adapter.exists(path) && !overwrite) {
      const baseName = path.replace(/\.md$/, '');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      finalPath = `${baseName} ${timestamp}.md`;
    }

    // Ensure directory exists
    const directoryPath = finalPath.substring(0, finalPath.lastIndexOf('/'));
    if (directoryPath) {
      const dirExists = await plugin.app.vault.adapter.exists(directoryPath);
      if (!dirExists) {
        await plugin.app.vault.adapter.mkdir(directoryPath);
      }
    }

    // Save the research report to the specified file
    await plugin.app.vault.create(finalPath, formattedResult);
    
    // Create navigation target for the research report
    addNavigationTarget({
      filePath: finalPath
    });

    const sourceCount = researchData.sources ? researchData.sources.length : 0;
    setLabel(`Research completed: ${finalPath}`);
    progress(`Successfully completed research on "${query}" with ${sourceCount} sources. Report saved to: ${finalPath}`);

  } catch (error) {
    console.error('Error in deep research tool:', error);
    setLabel(`Failed to research: ${query}`);
    throw new Error(`Deep research failed: ${error.message}`);
  }
}
```

## Usage

The AI can use this tool to conduct comprehensive web research on any topic. The tool supports:

- **Multi-source research** using Firecrawl's deep research capabilities
- **Configurable depth and scope** to control research thoroughness
- **Real-time progress updates** during the research process
- **Comprehensive reports** with executive summaries, sources, and metadata
- **Direct vault integration** - research reports are saved directly to your Obsidian vault
- **Automatic directory creation** - creates directories if they don't exist

## Examples

**Basic research:**
- "Research the latest developments in renewable energy and save the report as 'renewable-energy-2025.md'"

**With specific parameters:**
- "Conduct deep research on artificial intelligence ethics, max depth 5, 30 URLs, save as 'research/ai-ethics-comprehensive.md'"

**Technical research:**
- "Research quantum computing breakthroughs in 2024, timeout 300 seconds, save as 'quantum-computing-report.md'"

## Requirements

- Firecrawl API key configured in plugin secrets as 'FIRECRAWL_API_KEY'
- Sufficient Firecrawl credits for research operations
- Write permissions to the vault directory where reports will be saved

## Setup

1. Get a Firecrawl API key from [firecrawl.dev](https://firecrawl.dev)
2. Add it to your plugin secrets with the key name 'FIRECRAWL_API_KEY'
3. The tool will automatically use this key for research requests 