# Release Notes

## Version 0.14.6 - July 10, 2025

### 🎁 Auto-update:
- Removed auto update feature to be in line with Obsidian guidelines
- The official way to install and update the app is now to use BRAT plugin for Obsidian, you can find it in the obsidian 3rd party plugin browser.

### 🕵️‍♂️ Personalities:
- Removed analysis as it was a duplicate of detective
- Improved detective prompts

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
