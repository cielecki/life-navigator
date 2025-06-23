## Version 0.12.16 - June 20, 2025

Minor bug fixes

## Version 0.12.15 - June 20, 2025

### ⚡ Lightning-fast chat experience

The biggest improvement in this release is a complete overhaul of chat handling. Every keystroke now responds instantly, and your conversations are bulletproof - no more lost messages, no more delays. We've eliminated over 200 problematic code patterns that could cause race conditions, making Life Navigator more stable than ever.

### 🎨 Redesigned conversation interface

**Empty screen visualization** - The empty conversation screen has been completely reworked. You can now see your system prompt right at the top, making it clear what context the AI is working with.

**Smarter chat warnings** - When your conversation gets long, the warning messages now make more sense and provide better guidance on when to start a new chat.

**Better visual feedback** - New gradient-based warning designs replace harsh red borders throughout the interface.

### 📝 Enhanced mode features

**Clickable mode headers** - Click on the mode name or icon in the empty chat screen to quickly edit that mode file.

**Custom display names** - Mode creators can now add friendly names to their example prompts: `What users see | The actual prompt`.

### 🔧 Important fixes

**Mode persistence restored** - Fixed regression where Life Navigator would forget your last used mode between sessions.

**Voice consistency** - Assistant responses now use the correct voice settings from their original mode.

**Tool improvements**:
- Task operations now properly preserve YAML frontmatter
- Vault search now supports recursive searching and better filtering
- Tool parameter validation provides clear error messages instead of silent failures
- The date/time tool now includes week numbers for better weekly planning.

**Performance** - Eliminated duplicate chat loading for faster startup times.

### 🌐 Language updates

- Refined Polish translations throughout the interface
- All system warnings now properly display in your selected language

### 💻 Under the hood

Complete state management overhaul with atomic updates ensures data integrity. Tool results save directly to conversations in real-time, reducing complexity while improving reliability.


## Version 0.12.14 - June 16, 2025

### 📋 Smart Task Organization

**Your tasks now understand the structure of your documents:**

Life Navigator's task management just got a major upgrade. When you organize your notes with headings like "## Morning Routine" or "### Work Tasks", the AI now respects these sections:

- **Tasks stay in their sections**: When you check off a task, it moves to the top of its current section instead of jumping to the beginning of your note
- **Add tasks to specific sections**: The AI can now place new tasks exactly where they belong - no more hunting through your document
- **Works with nested sections**: Full support for complex document structures (like "Daily Tasks > Morning > Exercise")
- **Nothing breaks**: All your existing task workflows continue working exactly as before

### 🎙️ Smarter Audio Controls

**One button to rule them all:**

We've simplified audio controls with a single, intelligent microphone button that does exactly what you need:

- **When audio is playing**: The microphone becomes a "Stop Audio" button
- **When another chat is recording**: Shows "Stop Recording" to cancel that recording
- **Clean interface**: Removed redundant buttons - everything is now in one place
- **Always available**: The button is right where you need it, in the input area

### 💬 Never Lose Your Work

**Your conversations are now truly persistent:**

- **Auto-saving messages**: Everything you type is automatically saved, even if you close the chat
- **Return anytime**: Come back days or weeks later and your unfinished message is still there
- **Attached images persist**: Images you've attached stay with your draft
- **Consistent AI behavior**: System prompts are now cached per conversation, ensuring the AI behaves consistently throughout your entire chat

### 🚦 Better Handling of Busy Periods

**Life Navigator now gracefully handles API rate limits:**

When Anthropic's servers are busy, instead of failing, Life Navigator:
- Automatically retries your request with smart timing
- Shows you what's happening with clear messages
- Lets you cancel if you don't want to wait
- Respects server guidelines to be a good API citizen

### 🔒 Privacy First

**New privacy policy makes our practices crystal clear:**

- **Easy access**: Find it in Settings or the chat menu (⋯)
- **Plain language**: No legal jargon - just clear explanations
- **Your data stays yours**: Local storage, no telemetry, you control what's shared
- **Transparent AI usage**: Clear explanation of what goes to AI providers

Access via: Settings → Life Navigator Actions → "Privacy Policy"

### 📝 Conversation Length Management

**Know when your chat is getting too long:**

- **Smart notifications**: Get alerted when your conversation might be too long for the AI
- **Works with caching**: Even cached conversations show accurate length warnings
- **Take action**: Clear guidance on what to do when chats get lengthy

### 🐛 Important Fixes

**Making Life Navigator more reliable:**

- **Fixed chat delegation**: When AI creates new chats with different modes, they now work correctly
- **Faster note editing**: Resolved performance issues with large files or multiple edits
- **Better mobile experience**: Long-press on tool blocks no longer triggers text selection on iOS
- **Improved UI polish**: Tool icons behave properly when expanding/collapsing blocks
- **Voice transcription**: Failed transcriptions now show clear retry options

### 🎯 What This Means for You

This update focuses on making Life Navigator more intelligent and reliable:

- **Smarter organization**: Your tasks and notes stay organized the way you structure them
- **Less frustration**: Better handling of errors, rate limits, and edge cases  
- **Cleaner interface**: Simplified controls that do what you expect
- **Peace of mind**: Your work is always saved, and your privacy is respected

Simply update Life Navigator and enjoy these improvements - no action required on your part!

---

## Version 0.12.1 - June 15, 2025

### 🚀 Multiple Conversations Running Simultaneously

**Work on multiple tasks at once without switching contexts:**

<img width="1048" alt="image" src="https://github.com/user-attachments/assets/d083fe63-8d35-4494-92c6-7a2166b7e15c" />

- **Parallel chats**: Open multiple Life Navigator windows and have different conversations running independently
- **Background processing**: Start a research task in one chat while planning your day in another
- **Smart notifications**: Unread indicators show which chats have new messages
- **Flexible workspace**: Open chats in any Obsidian panel or floating window

### 📝 Weekly, Monthly & Quarterly Notes Support

**Life Navigator now works with the Periodic Notes plugin:**

- **Beyond daily notes**: AI can now read your weekly reviews, monthly goals, and quarterly plans
- **Automatic detection**: Works with your existing Periodic Notes setup
- **Easy migration**: Existing modes will be automatically updated to use the new syntax

### 🤝 AI Task Delegation

**Your AI can now delegate tasks to other modes:**

- **Smart handoffs**: AI can create new chats with different modes when another mode would be better suited for a task
- **Fire and forget**: Delegated tasks run in separate chats without interrupting your current conversation
- **Automatic switching**: New delegated chats open automatically so you can see the results
- **Automatic updates of old format**: AI can detect old format of modes and tools and repair it

<img width="342" alt="image" src="https://github.com/user-attachments/assets/d9428730-1c3b-4819-8e9b-8f99e5f80396" />

### 🎙️ ElevenLabs Voice (Experimental)

<img width="725" alt="image" src="https://github.com/user-attachments/assets/3dd8f753-34a5-43d9-8fd1-42482455fd07" />

**Optional premium voice upgrade for advanced users:**

- **3,000+ voices** vs the standard 11 voices
- **32+ languages** with native pronunciation
- **Ultra-fast responses** (75ms vs 500ms+)
- **99 languages** for speech recognition

*Requires ElevenLabs API key. Falls back to OpenAI if unavailable.*

### ✨ Interface Polish

- **Editable chat titles**: Click any chat title to rename it
- **Better mode selector**: Mode dropdown moved closer to the input area

<img width="379" alt="image" src="https://github.com/user-attachments/assets/eaba24c6-cb61-4967-80d2-c01c6551343e" />

- **Improved task navigation**: Click task results to jump to the exact location in your notes
- **What's New modal**: See changelog after updates
- **Audio stop button**: Pause audio playback mid-sentence with a dedicated stop button
- **Smarter voice recording**: Record voice messages even while AI is responding - no more waiting
- **Better task feedback**: Task operations now show exactly which file was modified
- **Enhanced text highlighting**: More accurate highlighting when jumping to specific content in files
- **Directory expansion**: Use `🧭 expand` with folder names to include all files in a directory
- **Improved help flow**: Help buttons now create new Guide chats instead of interrupting your current conversation
- **Better Polish language support**: Proper pluralization and cleaner number displays for Polish users

---

## Version 0.11.3 - June 11, 2025

**Life Navigator now includes a context menu in your chat interface that puts all new features at your fingertips:**

- **💰 View Costs**: Instantly check your API usage and spending data for a given conversation
- **📁 Reveal in Finder**: Open your file manager and jump directly to your conversation files for easy backup, sharing, or organization
- **🗑️ Delete Chat**: Quickly remove conversations you no longer need
- **⭐ Star on GitHub**: Show your support by starring the Life Navigator project
- **💬 Join Community**: Connect with other users on Discord for support, tips, and discussions
- **👤 Follow Author**: Stay updated with the latest news and updates on Twitter/X

### 🎯 Smoother Setup Experience

- **Clearer language selection**: Removed confusing highlighting in language setup - now it's crystal clear which language options are available
- **Better API key guidance**: Step-by-step instructions with numbered steps make it much easier to set up your API keys with clear visual guidance and helpful tips

### 🚀 Enhanced Library System

- **Version-matched content**: Library tools now automatically fetch content that matches your installed plugin version, ensuring perfect compatibility
- **Smart source detection**: Automatically uses the best source for library content based on your environment

### 🎯 What This Means for You

You'll enjoy a more streamlined experience with:
- Clear visibility into your API usage and costs
- Quick access to your conversation files for easy management
- A smoother, more intuitive setup process
- Reliable access to library content that matches your version

## Version 0.11.2 - January 10, 2025

### 🚀 Performance & Reliability Improvements

- **Cheaper AI responses**: Life Navigator now uses smart caching for Anthropic API responses to reduce wait times and lower your API costs. Your conversations will feel snappier, especially when working within the same context.

- **More reliable tools**: Fixed an issue where some tools (like accessing daily notes from specific dates) would incorrectly reject perfectly valid numbers. Now `🧭 daily_note(-1)` and similar commands work flawlessly every time.

### 🎯 What This Means for You

These improvements work automatically in the background - you don't need to change anything. You'll simply notice:
- Faster response times when working with similar content
- Lower API usage costs over time  
- More consistent tool behavior

### 🔧 Technical Notes

- Enhanced Anthropic API caching with extended cache control headers and 1-hour TTL
- Improved parameter validation system for integer values
- Better data integrity validation for cached responses

## Version 0.11.0 - June 8, 2025

### ⚠️ IMPORTANT: Breaking Changes - Action Required

**This update includes breaking changes that require you to update your existing notes and modes.** Life Navigator will help you through this process with built-in validation and fix tools.

#### What Stopped Working
Old Life Navigator link formats are **no longer supported** and will show as errors:

| ❌ Old Format (No Longer Works) | ✅ New Format (Use This Instead) |
|----------------------------------|-----------------------------------|
| `[[ln-current-date-and-time]] 🧭` | `` `🧭 current_date_time()` `` |
| `[[ln-day-note-(0)]] 🧭` | `` `🧭 daily_note(0)` `` |
| `[[ln-day-note-(-1)]] 🧭` | `` `🧭 daily_note(-1)` `` |
| `[[ln-day-note-(-7:0)]] 🧭` | `` `🧭 daily_notes(-7, 0)` `` |
| `[[ln-currently-open-file]] 🧭` | `` `🧭 current_file_and_selection()` `` |
| `[[ln-currently-selected-text]] 🧭` | `` `🧭 current_file_and_selection()` `` |
| `[[ln-current-chat]] 🧭` | `` `🧭 current_chat()` `` |
| `🔎` emoji | `🧭` emoji only |

#### How to Fix Your Content

**Life Navigator makes this easy with automatic detection and guided fixes:**

1. **Automatic Detection**: When you open Life Navigator, it will automatically detect any old formats in your modes and notes
2. **Fix Buttons**: You'll see "Fix" buttons throughout the interface when issues are found:
   - In the mode dropdown when your current mode has issues
   - In settings when tools need updating
   - In error messages when old links are found
3. **Click to Fix**: Simply click these "Fix" buttons - they'll switch to Guide mode and help you update your content
4. **AI Assistance**: The AI will show you exactly what needs to change and can help make the updates

#### Why This Change Benefits You

The new tool call system is much more powerful and flexible:
- **More options**: Support for calling all tools accessible by a mode directly in your notes
- **Seamless integration**: AI can now access your current editor content and daily notes directly during conversations and  get information from your notes when needed
- **Cleaner syntax**: `` `🧭 daily_note(-1)` `` is shorter and clearer than `[[ln-day-note-(-1)]] 🧭`
- **Future-proof**: New system supports many more capabilities and customization

### 🛠️ Migration Help - We've Got You Covered

- **Smart Validation System**: Automatically scans all your modes and tools to find issues
- **Contextual Fix Buttons**: Fix buttons appear exactly where you need them - no hunting around
- **Detailed Error Reports**: Clear explanations of what needs changing with before/after examples  
- **Guide Mode Integration**: All fix buttons connect to Guide mode for step-by-step assistance
- **Validation Tool**: Use the mode validator to check any file and get detailed migration guidance

### 🚀 New Powerful Tool Call System

**Revolutionary way to use Life Navigator tools directly in your notes:**

#### Multiple Ways to Call Tools
```
`🧭 current_date_time()`                    # No parameters
`🧭 daily_note(-1)`                         # Simple parameters  
`🧭 note_read(path="My Note.md")`           # Named parameters
`🧭 tools_list({safe_only: true})`         # JavaScript objects
`🧭 expand` [[Wiki Link]]                   # Special expand syntax
```

#### Smart Safety System
- **Safe tools** (like reading dates, notes) work automatically in link expansion
- **Potentially dangerous tools** (like creating/editing files) only work in chat conversations

#### Discover Available Tools
Have your ai use `` `🧭 tools_list()` `` to see all available tools for your current mode

### 📊 Enhanced Validation & Quality Control

- **Comprehensive Validation**: Automatic checking of modes and tools for completeness and correctness
- **Icon Validation**: Ensures all mode and tool icons are valid and will display properly
- **Parameter Validation**: Tools validate their inputs before running, preventing errors
- **Better Error Messages**: Clear, helpful error messages instead of technical jargon
- **Multi-language Support**: All validation messages properly translated

### 🎯 User Experience Improvements

- **Auto-Setup**: Life Navigator automatically opens when first installed to guide you through setup
- **Retry Any Message**: Every AI response now has a retry button to regenerate from that point
- **Better Error Handling**: Errors appear in chat instead of disruptive popups
- **Improved Performance**: Better file monitoring system that responds faster to changes

### 🏗️ Under the Hood Improvements

- **Modernized Format**: Mode and tool files now use clean, readable attribute names (`description` instead of `ln_description`)
- **Consistent APIs**: All note editing tools now use the same parameter names for consistency
- **Better File Management**: Improved file watching and change detection
- **Enhanced Internationalization**: Better support for multiple languages with proper grammar rules

### 🐛 Bug Fixes

- **Task Editing**: Fixed task editing to highlight only the changed task instead of the entire file
- **Todo Display**: Fixed todo labels showing correct text after editing
- **Navigation**: Proper navigation targeting after file modifications  
- **Settings**: Fix buttons in settings now properly close the modal
- **Translation**: Fixed various translation issues for non-English users

---

**Ready to Upgrade?** Life Navigator will guide you through the process. Look for the fix buttons and let the AI help you migrate your content to the new, more powerful format!

## Version 0.10.6 - June 6, 2025

### Added
- **Safe note deletion**: New note_delete tool provides safe deletion by moving files to a Trash/Śmietnik directory instead of permanent deletion. Creates trash directory automatically and handles duplicate filenames by adding numbers.
- **Guide mode A/B/C choices**: Guide mode now provides clear A/B/C options at the end of responses to eliminate decision fatigue and create guided conversation flow. Users get actionable choices for exploring features, library content, and next steps with simple "Type A, B, or C to continue" prompts.
- **New compass emoji for link expansion**: The compass emoji 🧭 is now the primary symbol for link expansion, replacing the magnifying glass 🔎. The old magnifying glass emoji is still supported for backward compatibility, so your existing setups will continue to work perfectly.
- **Analytics Mode**: New specialized mode for thorough pattern analysis and accountability conversations that examines 30 days of daily notes to provide data-driven insights about productivity, health, habits, and goal progress
- **Tool Call History in Saved Conversations**: Saved conversations now include information about which tools were used and their labels, making saved chats more complete and useful for reference without cluttering them with large tool results
- **Enhanced Guide Mode**: Comprehensive improvements to the Guide prebuilt mode including:
  - Always browse library index AND check user's actual vault content before making recommendations
  - Clear distinction between library templates/examples vs user's installed content
  - Never assumes library content is installed without checking user's vault first
  - Improved library tool descriptions to clarify they show remote templates, not user content
  - Better vault assessment using vault_find and note_read tools
  - Context limitations notice explaining Guide mode is for discovery/development, not personal reflection
  - Development and prototyping support for creating custom modes and tools
  - Manual references to comprehensive development documentation
  - Mode and tool validation capabilities with automatic quality checking
  - Learning persistence to avoid repeating concepts user already understands
- **Direct Setup Guidance**: Guide mode now focuses on helping users create their actual Life Navigator setup immediately rather than simulations, providing more authentic and immediately useful onboarding
- **Development Documentation**: New comprehensive guides for extending Life Navigator:
  - Mode Development Guide with templates, best practices, and troubleshooting
  - Tool Development Guide covering JavaScript tools, security, and API integration
  - Updated library index with development resources and Analytics mode
- **Mobile tool expansion**: Long press on tool blocks now expands/collapses them on mobile devices, providing the mobile equivalent of desktop's shift+click functionality

### Fixed
- **System prompt view with unresolved links**: Fixed issue where clicking "View system prompt" would fail silently when the mode contained unresolved links (like `[[Backlog2]] 🧭`). Now shows a clear error message explaining which links couldn't be found and how to fix them.
- **Input state persistence**: Input text and attached images now clear automatically when starting a new chat or switching between conversations, preventing confusion and ensuring a clean slate for each conversation.

### Enhanced
- **Guide Mode Intelligence**: Now emphasizes library exploration, provides development guidance, and offers clear A/B/C choices for next steps
- **Library Organization**: Updated index with development documentation and Analytics mode for better discoverability

## Version 0.10.4 - June 5, 2025

### Fixed
- **Message validation cutting off conversations**: Fixed critical issue where the last assistant and user messages weren't being sent to AI when conversations contained incomplete tool calls or thinking blocks earlier in the conversation. Now properly skips problematic messages while preserving valid messages at the end of conversations.
- **Chat history saving**: Fixed issue where conversation history wasn't saving on Mac due to missing conversations directory. The plugin now automatically creates the required directory on startup.

### Enhanced
- **Improved note editing tool**: Fixed multiline text replacement issues by adding smart text normalization that handles different line endings, whitespace, and formatting. Now shows edited content with ±3 lines of context (marking edited lines with ●) and creates precise navigation targets that highlight exactly the edited lines.
- **Better find tool feedback**: The find tool now shows specific counts like "Found 5 items in root" instead of the generic "Found content in root"

### Changed
- **Library tool renamed**: The library content viewing tool is now called "library_read" instead of "library_view" and shows specific file paths in completion messages, making it consistent with the document reading tool
- **Mode name change**: Life Navigator mode is now called "Guide" to better reflect its purpose as a helpful assistant that guides users through their tasks and goals


### Fixed
- **Improved comment indentation**: Task tools now consistently use proper comment indentation.

## Version 0.10.2 - June 5, 2025

### Added
- **Smart text selection**: Easily share any text you've highlighted with the AI using the new `[[ln-currently-selected-text]] 🔎` link. Perfect for editing specific parts of text.
- **Rapid voice recording**: You can now record your next message even if ai is responding to your previous message.
- **Cleaner tool displays**: Multi-line text in AI tools now shows with proper formatting instead of cramped single lines, making everything easier to read.

### Fixed
- **Smarter chat history**: Opening old conversations no longer automatically saves them or moves them to the top unless you actually make changes. Your history stays organized exactly how you left it.
- **Better reading experience**: When you scroll up to read previous messages, the chat stays put instead of annoyingly jumping to the bottom every few seconds.
- **Remembers your preferences**: Your selected mode now stays active when you restart the app - no more having to reselect your favorite mode every time.
- **Perfect conversation flow**: Switching between conversations or starting new messages now works smoothly without any conflicts or interruptions.

## Version 0.10.1 - June 4, 2025

### Fixed
- **Task organization**: Completed tasks now stay organized together instead of appearing in random places
- **Tool names**: Fixed confusing technical names showing up - you now see friendly names like "Add Task" instead of "task_add"  
- **Broken links**: Fixed links in documentation that weren't working
- **Polish language**: Chat titles in history now show in Polish when you have Polish selected
- **History dropdown**: Fixed annoying flicker when clicking the conversation history button
- **Language consistency**: All dropdown messages and search boxes now properly show in your selected language
- **Error messages**: Task-related error messages now appear in Polish when you have Polish selected

## Version 0.10.0 - June 4, 2025

### Added
- **LifeNavigator mode**: New built-in mode that helps guide you and gives instructions. It's always available and can't be deleted.

- **Tool and mode library**: New library system where LifeNavigator can download and set up helpful tools and modes for you. Comes with useful tools and modes to get started.

- **Better secrets management**: Improved way to store your API keys and other sensitive information securely. Your old API keys are automatically moved over.

- **New tools for the AI to help you**:
    - **Advanced note editing**: AI can now make complex edits to your notes, not just add text at the end
    - **File moving**: AI can move files to different folders in your vault
    - **Save conversations**: AI can save your current chat to a note in your vault
    - **Check modes and tools**: AI can verify that your custom modes and tools are set up correctly
    - **Download from web**: AI can grab content from any website and show it in the chat
    - **Better file search**: Improved search tool (renamed from "list directory" to "find")
    - **Browse library**: AI can explore and recommend tools and modes from the library

- **Link control for modes**: You can now control whether your custom modes automatically expand note links or not

- **Create your own tools**: You can now create custom tools by tagging notes with `ln-tool`. The AI will ask for permission before running any custom tools you create.

- **Shift-click to expand**: Hold Shift and click on tool blocks to expand them without navigating away

### Changed
- **Simpler setup**: Cleaner setup screen that's easier to use

### Removed
- **Built-in specialized tools**: YouTube transcripts, image generation, and deep research are now available as downloadable tools instead of being built-in. This makes the core plugin simpler while keeping all the functionality.
- **Manual mode creation**: The "New Mode" button is removed - ask the AI to create modes for you instead

## Version 0.9.3 - June 2, 2025

### Added
- **Better audio controls**: You can now pause and resume audio playback instead of having to stop and restart. Audio remembers exactly where you left off. Audio is also cached so replaying the same message is instant.

### Fixed
- **Mobile text highlighting**: Much better highlighting on phones and tablets, especially iPhones. Text now highlights properly and scrolls to the right position on your screen.
- **Polish language completeness**: Fixed missing Polish translations for task actions - everything now shows in Polish when you have Polish selected.

## Version 0.9.0 - June 1, 2025

### Added

- **Vault exploration**: AI can now browse your vault folders and find files by tags much better
- **Update notifications**: Get notified when new plugin versions are available
- **Multiple daily notes**: Reference several daily notes at once using `[[ln-day-note-(-6:0)]] 🔎` to show the last 7 days
- **Progress updates**: Long operations like research now show live progress instead of leaving you wondering what's happening
- **Smart audio handling**: When you finish recording while audio is playing, it automatically stops the audio and sends your message
- **Remember OpenAI setup**: Skip OpenAI configuration once you've done it - won't ask again until you reset
- **Deep web research**: AI can do comprehensive research across multiple websites and create detailed reports with sources (needs Firecrawl API key)
- **Better settings page**: New buttons for checking updates, creating starter kits, resetting tutorial, and viewing docs
- **Step-by-step setup**: Cleaner onboarding with separate screens for language, starter kit, and API keys
- **Image generation**: Create high-quality images using OpenAI and save them directly to your vault
- **Clickable tool results**: Click on tool blocks in chat to jump directly to the relevant files
- **Choose AI model per mode**: Each mode can use a different Anthropic model
- **YouTube transcripts**: Download transcripts from YouTube videos as notes in your vault
- **Smarter file naming**: Automatically creates unique names (like "research 2.md") to avoid overwriting files
- **Smooth audio playback**: Much better text-to-speech with seamless streaming
- **Better mobile editing**: Edit messages using the full input area instead of tiny inline boxes - much better on phones
- **Conversation history**: Save, search, and return to past conversations. Edit titles, add tags, and continue where you left off
- **Cleaner AI context**: Improved how AI processes your notes for better responses
