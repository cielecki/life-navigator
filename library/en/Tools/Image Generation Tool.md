---
tags: ["ln-tool"]
description: "Generates images using OpenAI's GPT-4o image generation model and saves them to the vault"
version: "1.0.0"
icon: "image"
enabled: true
---

# Image Generation Tool

This tool generates images using OpenAI's GPT-4o image generation model via direct API requests and saves them to your vault.

## Schema

```json
{
  "name": "generate_image",
  "description": "Generates an image using OpenAI's GPT-4o image generation model and saves it to the specified path in the vault. Uses the latest gpt-image-1 model for superior instruction following and photorealistic results.",
  "input_schema": {
    "type": "object",
    "properties": {
      "prompt": {
        "type": "string",
        "description": "A detailed description of the image to generate. Be specific and descriptive for best results."
      },
      "path": {
        "type": "string",
        "description": "The path where the image should be saved (including filename with .jpg or .png extension). Directories will be created if they don't exist."
      },
      "size": {
        "type": "string",
        "description": "Image size. Options: '1024x1024' (square), '1536x1024' (portrait), '1024x1536' (landscape), 'auto' (model decides). Default: '1024x1024'",
        "enum": ["1024x1024", "1536x1024", "1024x1536", "auto"]
      },
      "quality": {
        "type": "string",
        "description": "Image quality. Options: 'low', 'medium', 'high', 'auto' (model decides). Default: 'auto'",
        "enum": ["low", "medium", "high", "auto"]
      }
    },
    "required": ["prompt", "path"]
  }
}
```

## Implementation

```javascript
async function execute(context) {
  const { params, plugin, progress, addNavigationTarget, setLabel, getSecret } = context;
  
  // Helper function for Unicode normalization (reusable across tools)
  function normalizeUnicode(text) {
    return text
      .normalize('NFKD') // Decompose characters into base + diacritics
      .replace(/[\u0300-\u036f]/g, ''); // Remove combining diacritical marks
  }
  
  const { prompt, path, size = "1024x1024", quality = "auto" } = params;

  setLabel(`Generating image: ${path}`);

  // Validate inputs
  if (!prompt || prompt.trim().length === 0) {
    setLabel(`Failed to generate image: ${path}`);
    throw new Error('Prompt cannot be empty');
  }

  if (!path || path.trim().length === 0) {
    setLabel(`Failed to generate image: ${path}`);
    throw new Error('Path cannot be empty');
  }

  // Ensure path has an image extension
  let normalizedPath = path;
  if (!normalizedPath.match(/\.(jpg|jpeg|png)$/i)) {
    normalizedPath += '.jpg'; // Default to jpg for GPT-4o images
  }

  // Check if the file already exists
  const fileExists = await plugin.app.vault.adapter.exists(normalizedPath);
  if (fileExists) {
    setLabel(`Failed to generate image: ${normalizedPath}`);
    throw new Error(`File already exists: ${normalizedPath}`);
  }

  // Get OpenAI API key from secrets
  const openaiApiKey = getSecret('OPENAI_API_KEY');
  if (!openaiApiKey || openaiApiKey.trim().length === 0) {
    setLabel(`Failed to generate: ${path}`);
    throw new Error('OpenAI API key not configured. Please add "OPENAI_API_KEY" to your secrets in plugin settings.');
  }

  try {
    progress(`Generating image with prompt: ${prompt.substring(0, 50) + (prompt.length > 50 ? '...' : '')}`);

    // Make direct API request to OpenAI Images API
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt: prompt,
        size: size,
        quality: quality,
        n: 1,
        response_format: "b64_json"
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 429) {
        throw new Error('API quota exceeded. Please check your OpenAI account.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenAI configuration.');
      } else if (errorData.error?.message) {
        throw new Error(`OpenAI API error: ${errorData.error.message}`);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      throw new Error('No image data received from API');
    }

    const imageData = data.data[0];
    if (!imageData.b64_json) {
      throw new Error('No base64 image data in API response');
    }

    progress('Processing image data...');

    // Convert base64 to binary buffer
    const imageBuffer = new Uint8Array(
      atob(imageData.b64_json)
        .split('')
        .map(char => char.charCodeAt(0))
    );

    progress('Saving image to vault...');

    // Ensure directory exists
    const directoryPath = normalizedPath.substring(0, normalizedPath.lastIndexOf('/'));
    if (directoryPath) {
      const dirExists = await plugin.app.vault.adapter.exists(directoryPath);
      if (!dirExists) {
        await plugin.app.vault.adapter.mkdir(directoryPath);
      }
    }

    // Create the binary file using Obsidian's vault API
    await plugin.app.vault.createBinary(normalizedPath, imageBuffer);

    // Add navigation target
    addNavigationTarget({
      filePath: normalizedPath
    });

    setLabel(`Image saved: ${normalizedPath}`);
    progress(`Successfully generated and saved image: ${normalizedPath}`);

  } catch (error) {
    console.error('Error generating image:', error);
    setLabel(`Failed to generate image: ${normalizedPath}`);
    throw new Error(`Image generation failed: ${error.message}`);
  }
}
```

## Usage

The AI can use this tool to generate images based on your requests. The tool supports:

- **High-quality image generation** using OpenAI's latest GPT-4o model
- **Flexible sizing** options (square, portrait, landscape, or auto)
- **Quality control** (low, medium, high, or auto)
- **Direct vault integration** - images are saved directly to your Obsidian vault
- **Directory creation** - automatically creates directories if they don't exist

## Examples

**Basic image generation:**
- "Generate an image of a sunset over mountains and save it as 'sunset.jpg'"

**With specific parameters:**
- "Create a portrait-sized image of a robot cat in a cyberpunk style, high quality, save as 'images/robot-cat.png'"

**Creative prompts:**
- "Generate a photorealistic image of a floating island with waterfalls, magical lighting, save as 'fantasy/floating-island.jpg'"

## Requirements

- OpenAI API key configured in plugin secrets as 'OPENAI_API_KEY'
- Sufficient OpenAI credits for image generation
- Write permissions to the vault directory where images will be saved 