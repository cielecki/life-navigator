# Release Notes

# Release v0.16.3 (November 24, 2025)

Focused bug fix release improving conversation handling and audio recording experience.

## Key Improvements

- **Fixed a critical bug with mobile recording**: In 0.16.2 we introduced a bug which caused for chat to end up in invalid stat after recording, this is now fixed.
- **Preserve text during recording**: Text input is now preserved when starting a voice recording on desktop, allowing you to append transcription to existing text

---

# Release v0.16.2 (November 21, 2025)

This release focuses on architectural improvements, code quality, and preparing the foundation for future features.

## Mode System Enhancements
- **Close Day mode improvements**: Added research-backed psychological techniques with clear sections and completion criteria
- **UUID-based mode identifiers**: Modes now use stable UUIDs instead of file paths for better reliability
- **Auto-updating context paths**: Mode context attachments automatically update when files are renamed or moved
- **Better mode validation**: Improved handling of invalid modes with clearer error messages

## Bug Fixes

- **Recording state cleanup**: Fixed issues with recording state persisting after re-recording or editing
- **Conversation sorting**: Use file stats for `updatedAt` to prevent inconsistencies in conversation listing
- **Invalid mode handling**: Better visual consistency and error handling for missing or invalid modes
- **Mode selector visibility**: Fixed issues with mode selector not appearing when expected
- **Chat loading**: Await chat loading before rendering to prevent invalid states
- **Unread count logic**: Fixed unread counter to properly display unread chats

# Release v0.16.1 (November 17, 2025)

This patch release focuses on stability improvements, bug fixes, and refinements to the 0.16.0 architecture.

## Improvements and Bug Fixes

- **Clickable internal links**: Wikilinks in AI messages are now clickable and navigate directly to your notes
- **Auto-updating context paths**: Mode context attachments automatically update when files are renamed or moved
- **Improved invalid mode handling**: Better visual feedback and consistency when dealing with invalid or missing modes
- **Start Day & Close Day improvements**: Enhanced workflows with better structure and user experience
- **Auto-refresh on sync**: Chat history automatically refreshes when files sync
- **Fixed mobile silence**: Resolved audio recording issues on mobile
- **TTS during recording**: Prevented text-to-speech from streaming while voice recording is active
- **Track Activities headers**: Eliminated duplicate headers in Track Activities mode
- **Mode selector visibility**: "Open new tab" now always shows the mode selector as expected
- **Multimodal support**: Initial message that is triggering auto mode selection now properly supports attachments and multimodal input
- **Invalid mode handling**: Better error handling and visual consistency for invalid modes
- **Disabled unfinished modes**: Removed 8 experimental modes from production that weren't ready for release (Personal Branding Strategist, Long Term Planner, Wind Down, Reflection, Relationship Consultant, Longevity Strategist, Psychodietitian, and Financial Advisor). These modes were accidentally available in 0.16.0 and will return in a future release when they're production-ready

---

# Release v0.16.0 (November 12, 2025)
**Note:** This is the first release of the new architecture—expect some rough edges as we refine the system. This is a major release with significant changes, so please read carefully, especially the Breaking Changes section. We recommend backing up your vault before upgrading.

## What's New
<img width="368" height="583" alt="0 16 0" src="https://github.com/user-attachments/assets/2a481aff-3817-4d98-ba68-7e2f6a29af5b" />

### Task-Centric AI Modes
AI modes (agents) have been redesigned around specific tasks and workflows. Instead of generic assistants, you now have specialized modes to start your day, end your day, get moving, brainstorm ideas, troubleshoot problems, and more. Each mode is optimized for its specific purpose, providing more focused and effective assistance.

### Mode Customization & Management
Create and customize your own AI modes with a powerful new editor interface. Modes are now stored as files in your vault, which:
- Makes them easy to backup, share, and version control
- Allows them to track and receive updates from built-in base modes
- Provides a dedicated UI for editing all settings without manual file editing

Model selection has been simplified—just choose a model like "Claude Sonnet" and the system handles all underlying configuration automatically.

### Enhanced Context Management
Context configuration has been redesigned with a dedicated UI. Instead of managing context through special markers in files, you can now edit everything directly in the mode editor for a more intuitive experience.

### Mode Discovery & Auto-Installation
The system can now discover, install, and suggest relevant modes based on your queries. Modes are installed as files in your vault, giving you full control. The system can automatically select appropriate modes or you can manually choose them through UI icons. Focus on the modes that interest you while ignoring the rest.

### Vault-Based Chat Storage
Your conversations are now stored as regular files directly in your vault. This means you can:
- Search through chat history using Obsidian's native search
- Manage conversations like any other note
- Integrate chats with your existing knowledge management workflows

## Improvements

### Upgraded AI Model
The plugin now uses Claude Sonnet 4.5 by default, providing improved reasoning, accuracy, and response quality across all modes.

## Breaking Changes

### AI Provider Support
**Temporarily Removed:** Support for non-Anthropic AI providers has been removed in this release. We will reintroduce multi-provider support in a more robust and reliable way in an upcoming release. For now, the plugin exclusively uses Anthropic's Claude models.

**Action Required:** If you were using other providers (OpenAI, local models, etc.), you'll need to configure an Anthropic API key to continue using the plugin.

### Custom Mode Migration
**May Require Recreation:** Custom modes created in v0.15.x may not be fully functional in the new system due to architectural changes.

**Action Required:** Review your custom modes after upgrading. If they don't work as expected, you may need to recreate them using the new mode editor interface. The new system provides more powerful customization options that should make recreation straightforward.

### Data Migration
**Automatic:** Existing chats will be automatically migrated to the new vault-based storage system on first launch. This process may take a few moments depending on your chat history size.

## What's Next

Over the coming weeks, we'll be focusing on:
- Comprehensive documentation updates and video tutorials
- In-person onboarding sessions for interested users
- Continuous bug fixes and stability improvements
- Reintroduction of multi-provider support with enhanced reliability
- AI-powered mode creator for easier mode customization

## Feedback & Support

This release represents a significant evolution of Life Navigator. We're committed to making it stable and polished. Please report any issues you encounter and share your feedback to help us improve.

**Thank you for using Life Navigator!** We're excited about this new foundation and the possibilities it opens for future enhancements.

---

## Version 0.15.2 - 22 September 2025

### 📎 Attachment handling

- Drag and drop attachments from Finder and within Obsidian now works reliably.
- Attachment ingestion automatically detects text, binary, PDF, and other file types for correct processing.

### 💬 Chat stability

- Resolved chat hanging when using Anthropic models, restoring dependable AI processing (expanded model support coming soon).

### 🔊 Voice responses

- Voice reading is more fluent and begins speaking as soon as sentences generate, delivering near real-time audio replies.

## Version 0.15.1 - August 2025

### 🎯 New Features

- **Multi-file type support**: Drag & Drop, attach and process PDFs and markdown files directly in your conversations
- **Real-time text-to-speech**: AI responses start playing audio immediately as they're being generated
- **Custom models**: Choose from claude, gemini, openai and grok models
- **New editing UI for modes**: Now you can edit mode settings via dedicated UI.
- **MCP integration support**: Better support for Model Context Protocol tools
- **iPad compatibility**: Fixed button sizing issues for better touch support
- **New Brainstorming mode**: New mode for brainstorming and generating ideas that follows a procedure.
- **New AI spiritual healer mode**: New mode for healing discovered trauma.

## Version 0.14.6 - July 10, 2025

### 🎁 Auto-update:
- Removed auto update feature to be in line with Obsidian guidelines
- The official way to install and update the app is now to use BRAT plugin for Obsidian, you can find it in the obsidian 3rd party plugin browser.

### 🕵️‍♂️ Personalities:
- Removed analysis as it was a duplicate of detective
- Improved detective prompts

---

## Version 0.14.3 - July 8, 2025

### 🧑‍💻 Interface Improvements:
- **"More Modes" button now works** - properly opens plugin settings when clicked
- **New FAQ screen** - quickly find answers from both chat menu and settings panel

### 🐞 Bugs fixed:
- Fixed task editing and management tools to properly handle international characters and emoji combinations
- Corrected mode prompt perspective inconsistencies - all modes now use consistent "Your Personality" language
- Each AI mode now has its own unique voice that matches its personality (Navigator uses "echo", Detective uses "onyx", Writer uses "nova", etc.)
- User messages now wrap naturally at word boundaries instead of breaking mid-word

---

## Version 0.14.2 - July 7, 2025

### 🧑‍💻 Built-in AI Modes & Customization
![image](https://github.com/user-attachments/assets/e279a981-b215-439c-b83e-bfa50032d04d)
- Instantly enable or disable built-in AI modes (Navigator, Reflection, etc.) with a checkbox.
- Create your own custom versions of any mode with a single click.

### 🕵️‍♂️ New Experimental Personalities
- **Analyst:** Deep life pattern analysis.
- **Detective:** Uncover the real causes behind your challenges.

### 🧰 "Batteries Included" Philosophy
![image](https://github.com/user-attachments/assets/a5fbd49f-28f3-4c69-94f9-270e22e0115b)

- All major integrations and modes are available out of the box—just toggle what you need.
- Experimental features are clearly marked for easy discovery.

### 📝 AI To-Do items
![image](https://github.com/user-attachments/assets/9e45d5e7-3726-4073-81bd-30d4e8984e39)
- AI can now follow instructions embedded in your notes (using %% instruction %%).
- Leave tasks for the AI anywhere in your notes and Navigator mode will pick them up.

### 🔄 Limitless Sync Improvements
![image](https://github.com/user-attachments/assets/6ee06803-ce67-4134-8fb8-4ef73f8b4a81)
- Effortlessly sync your Limitless device logs into your Obsidian vault.
- All your thoughts, conversations, and ideas in one place—secure and private.

### 🛡️ New Licensing Model (Testing)
- New privacy-first licensing model—no data ever touches our servers.
- We're experimenting with a licensing approach that puts your privacy first.

### ✨ UX Polish & Setup Improvements
- Cleaner, more reliable setup with progress bars and a reset option.
- Full Polish translation and improved support for international characters.
- Settings are now more organized and user-friendly.

### 🚀 What This Means for You
This release is all about giving you more power and more control, while making everything easier and more transparent. Whether you're a new user or a power user, you'll find it easier to get started, customize your experience, and trust that your data and privacy are protected.

---

## Version 0.13.5 - June 29, 2025

### 🧠 New Mentor Mode  
**A breakthrough in personal guidance:**  
Life Navigator now includes Mentor mode - a master at guiding you through deep discovery processes:
- **Advanced inquiry techniques:** Uses psychological safety and cognitive restructuring to unlock genuine understanding
- **Pattern recognition:** Helps identify and break repeating life patterns
- **Transformational support:** Perfect for when you're feeling lost, stuck, or sensing untapped potential
- **Self-inquiry development:** Builds your capacity for deeper self-reflection and sustainable change

### 🌐 Web Search Integration  
**Real-time information at your fingertips:**  
Life Navigator can now search the web directly within your conversations:
- **Current information:** Access up-to-date data beyond the AI's training cutoff
- **Seamless integration:** Web results appear naturally in your chat flow
- **Source tracking:** All information comes with proper attribution and links
- **Multi-language support:** Search works perfectly in both English and Polish

### 🎙️ Voice Experience Revolution  
**5x faster transcription with pristine quality:**  
Voice transcription is now blazingly fast using our state-of-the-art audio processing pipeline:
- **Millisecond processing:** What used to take seconds now happens instantly
- **Professional audio pipeline:** Voice activity detection, silence removal, noise filtering, and hallucination cleanup work together seamlessly
- **Smart word recognition:** AI learns names and technical terms from your vault for accurate transcription
- **Natural text-to-speech:** Handles emojis and special characters smoothly
- **Perfect synchronization:** Fixed all issues with send buttons and audio indicators during voice interactions

### 💰 Cost Optimizations  
**Smarter API usage saves you money:**
- **Enhanced prompt caching:** Dramatically reduces API calls in longer conversations
- **Accurate cost tracking:** Fixed duplicate entries that were incorrectly doubling your usage statistics
- **Memory-based analytics:** Cost dialog loads instantly without disk access

### 🛡️ Rock-Solid Stability  
**Critical fixes for data integrity:**
- **XSS protection:** Complete security against malicious code injection
- **Never lose messages:** Fixed all issues with message loss when switching chats
- **Cache optimization:** Conversations with many tool calls now run smoothly
- **Link expansion perfection:** Aliased wikilinks like `🧭 expand [[File|Display Name]]` now work flawlessly

### ✨ Interface Polish  
**Every interaction feels right:**
- **Voice autoplay control:** Toggle automatic playback with a button right in your input area
- **Smart text display:** Long messages show elegant "Read more" links
- **Natural scrolling:** Read previous messages without being yanked back down
- **Responsive sidebar:** Automatically adjusts to optimal width
- **Visual feedback:** Audio play buttons accurately show which message is speaking

### 🔧 Supercharged Tools & Search  
**More powerful and reliable than ever:**
- **Intelligent vault search:** Shows rich context around matches with adjustable relevance thresholds
- **Precise navigation:** Every search result and validation error takes you to the exact line
- **Enhanced validation:** Mode and tool errors include clickable navigation targets
- **Smart error recovery:** AI automatically diagnoses and helps fix tool failures
- **Clean file operations:** Remove operations delete entire lines without leaving gaps
- **Automatic pagination:** Large search results are paginated for easier browsing

### 🎯 Additional Improvements  
**Dozens of refinements that add up:**
- **Edit modes anytime:** Switch AI modes even while editing messages
- **Consistent parsing:** Display names and prompts always appear correctly
- **Instant navigation:** Jump to any file and line with a single click
- **Better error messages:** Clear, actionable guidance instead of technical jargon
- **Smooth recording:** Voice input works perfectly even during AI responses

### 🚀 What This Means for You  
Version 0.13.5 transforms Life Navigator into your most reliable digital companion. With the new Mentor mode for deep personal work, web search for real-time information, and rock-solid stability throughout, this release addresses every major user request from the past month.

**New users benefit from:** The Mentor mode's gentle guidance through life's challenges  
**Power users benefit from:** Web search integration and enhanced tool reliability  
**Voice users benefit from:** 5x faster transcription with perfect UI synchronization  
**Everyone benefits from:** Unmatched stability and thoughtful interface improvements

This isn't just an update - it's Life Navigator reaching its full potential as your trusted productivity and personal growth partner. 
