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
  - **Option A (Not yet available):** If "Life Navigator" is already available in the Community Plugins browser, click "Browse" and search for "Life Navigator", then install it directly. If you use this method, skip to step 4.
  - **Option B (Using BRAT):** If the plugin is not yet available in the community browser, you can install it using the BRAT plugin:
    - First, install BRAT from the Community Plugins:
        - Go to **Settings → Community plugins**
        - Click "Browse" and search for "BRAT"
        - Install and enable the BRAT plugin
    - Use BRAT to install Life Navigator:
        - Open the command palette (`Ctrl+P` on Windows/Linux, `Cmd+P` on Mac)
        - Run the command "BRAT: Add a beta plugin for testing"
        - Enter the GitHub repository URL: `https://github.com/cielecki/life-navigator`
        - Select the latest version from the dropdown menu
        - Click "Add Plugin" and wait for BRAT to install it
        - Go to **Settings → Community plugins**
        - Refresh the plugin list if needed
        - Find "Life Navigator" in the list and enable it using the toggle switch

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
- If using BRAT: Wait for the installation to complete, then refresh the plugin list in **Settings → Community plugins**
- Check that community plugins are enabled
- Restart Obsidian completely
- If using BRAT and having issues, try running "BRAT: Check for updates to all beta plugins and UPDATE" from the command palette

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

**Updating Life Navigator (if installed via BRAT):**
- To update Life Navigator to the latest version, open the command palette and run "BRAT: Check for updates to all beta plugins and UPDATE"
- You can also enable automatic updates in **Settings → Community plugins → Obsidian42 - BRAT → Auto-update plugins at startup**

## Next Steps

After completing the installation and setup, please refer to the [User Guide](USER-GUIDE.md) for detailed instructions on how to use Life Navigator effectively. The guide will walk you through exploring the available features, customizing your experience, and using the different AI modes.
