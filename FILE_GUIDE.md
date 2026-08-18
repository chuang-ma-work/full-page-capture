# File Guide - Full Page Capture Extension

## 📁 Project Structure

```
FullPageCapture/
│
├── 📄 manifest.json          [CORE] Extension configuration
├── 📄 popup.html             [UI] Extension popup interface  
├── 📄 popup.js               [LOGIC] Popup event handlers & UI logic
├── 📄 content.js             [ENGINE] Page capture logic (runs on pages)
├── 📄 background.js          [SERVICE WORKER] Background tasks
│
├── 📁 icons/                 [ASSETS] Extension icons
│   ├── icon-16.svg
│   ├── icon-48.svg
│   └── icon-128.svg
│
├── 📖 README.md              [DOCS] Full documentation
├── 🚀 QUICK_START.md         [GUIDE] 30-second setup guide
└── 📋 FILE_GUIDE.md          [THIS FILE] File reference
```

---

## 📄 File Details

### Core Extension Files

#### `manifest.json`
**What it is:** Extension configuration file (Manifest V3 format)
**What it does:** Tells Chrome how to load and run the extension
**Key parts:**
- `permissions`: What the extension can access (tabs, scripting)
- `host_permissions`: Can run on any website
- `action`: Defines popup interface and icons
- `service_worker`: Points to background.js
- `icons`: References to icon files

**Should you edit it?** 
- Only if you want to change extension name, permissions, or add features
- Be careful with permissions - too many triggers user warnings

---

#### `popup.html`
**What it is:** The UI interface that appears when you click the extension icon
**What it does:** Displays buttons, options, and status messages
**Key elements:**
- **Buttons**: "Capture" and "Copy" buttons
- **Options**: Checkboxes for settings (auto-download, format)
- **Status area**: Shows loading/success/error messages
- **Styling**: Purple gradient theme (can be customized)

**Should you edit it?**
- Yes! To change colors, text, layout, or add options
- Keep it simple - complex HTML can break the popup

---

### Logic & Processing Files

#### `popup.js`
**What it is:** JavaScript that runs in the popup
**What it does:**
1. Handles button clicks
2. Sends capture request to content script
3. Manages UI state (loading, success, error)
4. Handles clipboard copying
5. Injects content script into the webpage

**Key functions:**
- `captureFullPage()` - Triggers the capture
- `copyToClipboard()` - Copies image to clipboard
- `showStatus()` - Displays status messages
- `injectCaptureScript()` - Loads content.js into the page

**Should you edit it?**
- Yes, to add new options or modify behavior
- Good place to adjust capture settings or add new formats

---

#### `content.js`
**What it is:** Script that runs IN the webpage context (not popup context)
**What it does:**
1. Loads html2canvas library from CDN
2. Renders the entire webpage to a canvas
3. Converts canvas to image (PNG or JPEG)
4. Auto-downloads if enabled
5. Returns image data URL to popup

**Key functions:**
- `loadHtml2Canvas()` - Fetches the html2canvas library
- `captureFullPage()` - Main capture logic
- `chrome.runtime.onMessage` - Listens for capture requests

**Should you edit it?**
- Only if you want to change capture quality, format, or behavior
- `scale: 2` controls image quality (higher = better but slower)

---

#### `background.js`
**What it is:** Service Worker (runs in background)
**What it does:**
1. Handles extension installation
2. Creates right-click context menu option
3. Manages downloads (optional)
4. Listens for background tasks

**Should you edit it?**
- Yes, if you want to add context menu items or background tasks
- Required in Manifest V3 (can't be removed)

---

### Asset Files

#### `icons/` folder
**What it contains:**
- `icon-16.svg` - Tiny icon (toolbar)
- `icon-48.svg` - Small icon (extensions page)
- `icon-128.svg` - Large icon (promotional/store)

**Should you edit them?**
- Yes! Replace with your own icons or brand colors
- Must be PNG or SVG format
- Keep file names the same in manifest.json

---

### Documentation Files

#### `README.md`
**What it has:**
- Complete feature list
- Installation instructions (step-by-step)
- Usage guide (3 different methods)
- Options explanation
- Troubleshooting section
- Technical details & limitations
- Privacy information
- File structure reference

**When to read:** Full documentation, detailed explanations

---

#### `QUICK_START.md`
**What it has:**
- 30-second setup instructions
- Feature table
- Common issues & fixes
- Pro tips
- Keyboard shortcuts
- Next steps

**When to read:** You're in a hurry, need quick setup

---

#### `FILE_GUIDE.md`
**What it has:**
- File structure overview
- Detailed file descriptions
- When to edit each file
- Relationships between files
- Quick reference guide

**When to read:** You are here! Understanding what's what

---

## 🔗 How Files Work Together

```
User clicks extension icon
         ↓
    popup.html (displays UI)
         ↓
    popup.js (listens for clicks)
         ↓
  Sends message → content.js (runs on webpage)
         ↓
  content.js loads html2canvas library
         ↓
  Captures full page to canvas
         ↓
  Converts to PNG/JPEG
         ↓
  Returns image data to popup.js
         ↓
  popup.js displays success
         ↓
  Auto-downloads or copies to clipboard
```

---

## 📝 Customization Guide

### Change the color scheme
**File:** `popup.html`
**Find:** `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);`
**Change:** The hex colors (#667eea, #764ba2)

### Change button text
**File:** `popup.html`
**Find:** `<span>📸 Capture</span>`
**Change:** The text inside (keep emoji or remove)

### Improve capture quality
**File:** `content.js`
**Find:** `scale: 2,`
**Change:** `scale: 3` for 3x quality (slower) or `scale: 1` for 1x (faster)

### Add new image format
**File:** `content.js`
**Find:** `image/${options.format || 'png'}`
**Change:** Add support for webp, etc.

### Disable right-click menu
**File:** `background.js`
**Remove:** The entire `chrome.contextMenus` section

### Change default download location
**File:** `content.js`
**Find:** `link.download = ...`
**Change:** The filename pattern

---

## ⚙️ Dependencies

### External Libraries
- **html2canvas v1.4.1**
  - URL: https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js
  - Used for: Converting DOM to canvas image
  - Loaded dynamically in content.js

### Chrome APIs Used
- `chrome.tabs.query()` - Get current tab
- `chrome.tabs.sendMessage()` - Send messages to content script
- `chrome.tabs.executeScript()` - Inject content script (Manifest V2 style)
- `chrome.runtime.onMessage` - Listen for messages
- `chrome.contextMenus.*` - Right-click menu (background.js)

---

## 🔐 Permissions Explained

| Permission | Why | Risk Level |
|-----------|-----|------------|
| `activeTab` | Access the current tab only | 🟢 Low |
| `scripting` | Inject code into pages | 🟡 Medium |
| `tabs` | Get tab information | 🟢 Low |
| `<all_urls>` | Run on any website | 🟡 Medium |

These are standard permissions for a capture extension.

---

## 🚀 Common Edits

### Add a language option
1. **Edit popup.html**: Add radio button for language
2. **Edit popup.js**: Pass language option to content.js
3. **Edit content.js**: Use language option if needed

### Change default settings
1. **Edit popup.html**: Change `checked` attributes
2. **Edit popup.js**: Change default `options` object

### Add metrics/logging
1. **Edit popup.js**: Add console.log() statements
2. **Edit content.js**: Track capture timing
3. Open Developer Tools (F12) to see logs

---

## 📊 File Sizes & Performance

| File | Size | Loaded When | Impact |
|------|------|------------|--------|
| popup.html | ~4KB | Click extension | Instant |
| popup.js | ~3KB | Click extension | Instant |
| content.js | ~2KB | First capture | Quick inject |
| background.js | ~1KB | Extension loads | Always running |
| manifest.json | ~1KB | Extension loads | Config only |
| html2canvas (CDN) | ~165KB | First capture | Downloaded once |

**Performance notes:**
- First capture: ~1-2 seconds (loads html2canvas)
- Subsequent captures: ~500ms-2s depending on page size
- Large pages (10000px+) may take longer

---

## 🐛 Where to Debug

**Popup not responding?**
- Check `popup.js` - look for JS errors in F12 console

**Capture not working?**
- Check `content.js` - content.js runs on the webpage, F12 shows its logs

**Right-click menu missing?**
- Check `background.js` - background script errors won't show easily
- Go to chrome://extensions → "Full Page Capture" → "Details" → look for errors

**Extension icon not showing?**
- Check `manifest.json` - icon paths must be correct

---

## 📚 Learning Path

1. **Start here:** QUICK_START.md
2. **Then read:** README.md (features & usage)
3. **For customization:** This file + specific files mentioned
4. **For deep dive:** Read the actual .js files with comments

---

## Version History

**v1.0.0 (Current)**
- Full-page screenshot capture
- PNG & JPEG export
- Copy to clipboard
- Auto-download option
- Right-click context menu
- Works on Manifest V3

---

**Questions about a specific file? Edit it and the code comments will help!**
