---
tags: ["ln-tool"]
description: "Download transcripts from YouTube videos"
version: "1.0.0"
icon: "youtube"
enabled: true
---

# YouTube Transcript Download Tool

This tool downloads transcripts from YouTube videos using Obsidian's requestUrl API to bypass CORS restrictions.

## Schema

```json
{
  "name": "youtube_transcript_download",
  "description": "Downloads transcript from a YouTube video URL",
  "input_schema": {
    "type": "object",
    "properties": {
      "url": {
        "type": "string",
        "description": "The YouTube video URL"
      },
      "filename": {
        "type": "string", 
        "description": "Optional filename for the transcript (without extension)"
      }
    },
    "required": ["url"]
  }
}
```

## Implementation

```javascript
async function execute(context) {
  const { params, plugin, progress, addNavigationTarget, setLabel } = context;
  
  // Helper function for Unicode normalization (reusable across tools)
  function normalizeUnicode(text) {
    return text
      .normalize('NFKD') // Decompose characters into base + diacritics
      .replace(/[\u0300-\u036f]/g, ''); // Remove combining diacritical marks
  }
  
  setLabel("Extracting video ID...");
  
  // Extract video ID from URL
  const videoId = extractVideoId(params.url);
  if (!videoId) {
    throw new Error('Invalid YouTube URL provided');
  }
  
  progress(`Extracting transcript for video: ${videoId}`);
  setLabel("Fetching transcript...");
  
  try {
    // Fetch video page to get transcript data
    const response = await requestUrl({
      url: `https://www.youtube.com/watch?v=${videoId}`,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Failed to fetch YouTube page: HTTP ${response.status}`);
    }

    const html = response.text;
    
    // Extract title
    const titleMatch = html.match(/<title>([^<]*)/);
    const title = titleMatch ? titleMatch[1].replace(' - YouTube', '') : 'YouTube Video';
    
    // Extract ytInitialPlayerResponse from the page
    const playerResponseMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.+?});/);
    if (!playerResponseMatch) {
      throw new Error("Could not find player response data in YouTube page");
    }

    const playerResponse = JSON.parse(playerResponseMatch[1]);
    const captionTracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
    
    if (captionTracks.length === 0) {
      throw new Error("No captions available for this video");
    }

    // Find the best caption track (prefer English, then any available)
    let selectedTrack = captionTracks.find(track => track.languageCode === 'en');
    if (!selectedTrack) {
      selectedTrack = captionTracks[0];
    }

    if (!selectedTrack?.baseUrl) {
      throw new Error("No valid caption track found");
    }

    setLabel("Processing transcript...");

    // Fetch the caption data
    const captionUrl = selectedTrack.baseUrl + '&fmt=json3';
    const captionResponse = await requestUrl({
      url: captionUrl,
      method: 'GET'
    });

    if (captionResponse.status < 200 || captionResponse.status >= 300) {
      throw new Error(`Failed to fetch captions: HTTP ${captionResponse.status}`);
    }

    const captionData = JSON.parse(captionResponse.text);
    const events = captionData.events || [];

    // Process the events into transcript segments
    const segments = [];
    
    for (const event of events) {
      if (event.segs) {
        const text = event.segs
          .map(seg => seg.utf8 || '')
          .join('')
          .replace(/[\u200B-\u200D\uFEFF]/g, '') // Remove zero-width characters
          .trim();
        
        if (text) {
          segments.push({
            text: text,
            offset: event.tStartMs ? parseFloat(event.tStartMs) / 1000 : 0,
            duration: event.dDurationMs ? parseFloat(event.dDurationMs) / 1000 : 0
          });
        }
      }
    }

    if (segments.length === 0) {
      throw new Error("No transcript content found in captions");
    }

    // Format the transcript
    const transcript = `# YouTube Transcript

**Video:** ${params.url}
**Title:** ${title}
**Video ID:** ${videoId}
**Downloaded:** ${new Date().toISOString()}

## Transcript

${segments.map(item => {
  const startTime = item.offset;
  const minutes = Math.floor(startTime / 60);
  const seconds = Math.floor(startTime % 60);
  const timestamp = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  return `**[${timestamp}]** ${item.text}`;
}).join('\n\n')}`;
    
    // Create filename using proper Unicode normalization
    const baseFilename = params.filename || normalizeUnicode(title).replace(/[^a-zA-Z0-9 ]/g, '').trim();
    const filename = `${baseFilename} - Transcript.md`;
    
    // Save transcript to vault
    await plugin.app.vault.create(filename, transcript);
    
    // Add navigation target
    addNavigationTarget({
      filePath: filename
    });
    
    setLabel("Transcript downloaded");
    progress(`Successfully saved transcript to: ${filename}`);
    
  } catch (error) {
    setLabel("Download failed");
    throw error;
  }
}

function extractVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}
```

## How to Use

1. **Get a YouTube URL** - Copy any YouTube video URL
2. **Ask the AI** - "Download the transcript from this YouTube video: [URL]"
3. **Optional filename** - "Save the transcript as 'My Video'"
4. **Review result** - The tool will create a new note with the transcript

## Notes

This tool now uses Obsidian's `requestUrl` API which bypasses CORS restrictions that would block regular `fetch()` calls. It extracts the actual transcript data from YouTube's internal APIs and formats it as a readable Markdown document with timestamps.

The tool handles:
- Multiple YouTube URL formats
- Automatic title extraction
- Timestamp formatting
- Error handling for videos without transcripts
- Unique filename generation

You can modify this tool or use it as a template for your own video processing tools! 