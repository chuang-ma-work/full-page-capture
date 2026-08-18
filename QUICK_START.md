# Quick Start Guide - Full Page Capture

## 30-Second Setup

### 1. Load the Extension
1. Open Chrome and go to: **`chrome://extensions/`**
2. Toggle **"Developer mode"** (top-right corner)
3. Click **"Load unpacked"**
4. Navigate to and select the **`FullPageCapture`** folder
5. Done! ✅

### 2. Use the Extension
- Click the 📸 icon in your Chrome toolbar
- Click **"Capture"** button
- Your full-page screenshot is ready!

---

## Features You Have

| Feature | How to Use |
|---------|-----------|
| **Full-page capture** | Click the extension icon → Capture |
| **Copy to clipboard** | Click Capture, then click Copy button |
| **Auto-download** | Check "Auto-download" before capturing |
| **Format choice** | Select PNG or JPEG before capturing |
| **Right-click capture** | Right-click page → "Capture Full Page" |

---

## First Time Issues?

**"Permission denied" error?**
- Refresh the webpage and try again
- The extension needs to inject code the first time

**Extension icon not appearing?**
- Pin it: Click 🧩 icon in top-right → Find "Full Page Capture" → Click 📌

**Capture looks blank/broken?**
- Some sites block automated screenshots (try PNG format)
- Wait for the page to fully load before capturing

**Want to enable auto-download?**
- Check the "Auto-download" checkbox before capturing
- Chrome will ask for permission (allow it)

---

## File Structure

```
FullPageCapture/
├── manifest.json         ← Extension config (Manifest V3)
├── popup.html & popup.js ← The UI & buttons
├── content.js            ← Capture engine
├── background.js         ← Background tasks
├── icons/                ← Extension icons
├── README.md             ← Full documentation
└── QUICK_START.md        ← You are here!
```

---

## Pro Tips

✨ **Best practices:**
- PNG = best quality (recommended)
- JPEG = smaller file size
- Wait for lazy-loaded images before capturing
- Disable other extensions if having issues

🚀 **What makes this work:**
- Uses `html2canvas` library to render pages
- Renders at 2x scale for crisp images
- Processes everything locally (no data sent anywhere)

---

## Keyboard Shortcuts

You can add custom shortcuts! Go to:
**`chrome://extensions/shortcuts`**

Then assign a keyboard shortcut to "Full Page Capture"

---

## Next Steps

- ✅ Extension installed and working?
- 📖 Read **README.md** for full documentation
- 🐛 Having issues? Check **Troubleshooting** section in README
- 💡 Want to customize? Edit **popup.html** for UI changes

---

**Questions?**
- Check the browser console (F12) for error messages
- Try reloading the extension: `chrome://extensions` → Find it → Click reload
- Ensure all files are in the FullPageCapture folder

Happy screenshotting! 📸✨
