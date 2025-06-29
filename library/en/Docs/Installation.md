# Installation

## Step 1: **Install Obsidian and Create a Vault**

- Go to [obsidian.md](https://obsidian.md/) and download Obsidian for desktop
- Create a new vault:
    - Choose "Create new vault"
    - Pick a name for your vault
    - **Important:** Set the vault location to iCloud Drive (or another sync service) if you plan to use it on mobile
- Open your new vault in Obsidian

## Step 2: **Enable Community Plugins**

- Go to **Settings → Community plugins** 
- Ensure **"Community plugins"** is enabled (toggled on)
- You may see a warning about community plugins - click "Turn on community plugins"

## Step 3: **Install Life Navigator Plugin**

- Install Life Navigator:
  - **Option A (Recommended):** If "Life Navigator" is already available in the Community Plugins browser, click "Browse" and search for "Life Navigator", then install it directly. If you use this method, skip to step 6.
  - **Option B (Manual Installation):** If the plugin is not yet available in the community browser, or you need a specific version, continue with the manual installation steps below.
    - Download the plugin files (Manual Installation Only):
        - Open your web browser and go to the latest release: [https://github.com/cielecki/life-navigator/releases](https://github.com/cielecki/life-navigator/releases)
        - Download these three files from the "Assets" section:
        - `main.js`
        - `manifest.json` 
        - `styles.css`
        - **Note:** All three files are required for the plugin to work properly

    - Access your vault's folder (Manual Installation Only):
        - Open your vault's folder in your computer's file explorer (Finder on Mac, File Explorer on Windows)
        - You can usually find this in your iCloud Drive if you set it up there

    - Show hidden files to access the .obsidian directory (Manual Installation Only):
        - **On Mac:** In Finder, press `Cmd+Shift+.` (Command + Shift + Period) to show hidden files
        - **On Windows:** In File Explorer, go to the "View" tab and check the "Hidden items" box
        - You should now see a `.obsidian` folder in your vault directory

    - Create the plugin directory structure (Manual Installation Only):
        - Enter the `.obsidian` directory
        - Create a new folder named `plugins` if it doesn't already exist
        - Inside the `plugins` directory, create a new folder named `life-navigator` (with a hyphen, not underscore)
        - Move the three downloaded files (`main.js`, `manifest.json`, and `styles.css`) into the `life-navigator` directory you just created
        - Restart Obsidian completely to ensure it recognizes the new plugin

    - Enable the plugin:
        - Go back to **Settings → Community plugins**
        - Under "Installed plugins," you should now see "Life Navigator"
        - Enable it using the toggle switch
        - If you don't see it, try the "Check for updates" button or restart Obsidian again

## Step 4: **Open Life Navigator and Complete Setup**

- Open Life Navigator:
    - **Automatic opening**: Life Navigator will automatically open its side panel when you first enable the plugin, so you can start setup immediately
    - **Manual opening** (if needed): If Life Navigator doesn't open automatically, close the settings window first, then find the compass icon labeled "Life Navigator" in the left ribbon of Obsidian and click it to open the plugin's side panel
    - You can close the graph view in the center of your screen if it's not needed
- Complete the guided setup:
    Life Navigator will now guide you through a step-by-step setup process of choosing a language, setting up your initial content and configuring API keys. Once setup is complete, you'll have immediate access to Life Navigator Guide Mode in chat, just press Start in order to continue your own personalised setup using AI.

## Step 5: **Mobile Setup**

- Download the Obsidian app from your device's app store
- Open the app and select "Open folder as vault"
- Choose your vault from iCloud Drive (or your chosen sync service)
- Enable community plugins on mobile:
    - Go to **Settings → Community plugins**
    - Turn on "Community plugins" 
    - You may need to toggle "Restricted mode" and confirm to enable community plugins
    - The Life Navigator plugin should automatically sync and be available

## Troubleshooting

**Important sync considerations:**
- Wait for files to sync between devices before editing the same file on multiple devices
- iCloud and other sync services may have delays
- If you've been editing on desktop, give it a few minutes to sync before continuing on mobile, and vice versa

**Plugin not appearing after installation:**
- Ensure all three files (main.js, manifest.json, styles.css) are in the correct directory
- Verify the directory name is `life-navigator`
- Restart Obsidian completely
- Check that community plugins are enabled

**Setup screens not appearing:**
- If you've previously used Life Navigator, the setup may have been completed already
- You can reset the tutorial by going to **Settings → Community plugins → Life Navigator (gear icon) → Reset Tutorial**
- This will show the setup screens again on your next visit to Life Navigator

**Mobile sync issues:**
- Ensure your vault is properly set up in iCloud Drive or your chosen sync service
- Allow time for sync to complete between devices
- Check that community plugins are enabled

**API key configuration:**
- If you need to modify API keys later, you can do so in **Settings → Community plugins → Life Navigator (gear icon)**
- You can also access settings directly from within Life Navigator using the "Open Settings" link during setup

## Next Steps

After completing the installation and setup, please refer to the [User Guide](user-guide.md) for detailed instructions on how to use Life Navigator effectively. The guide will walk you through exploring the available features, customizing your experience, and using the different AI modes.
