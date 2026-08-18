# Full Page Capture - Chrome Extension

A Chrome extension that captures entire web pages as high-quality screenshots, similar to GoFullPage.

## Features

- 📸 **Full-page screenshots** - Capture the entire webpage, not just the visible area
- 🎨 **Multiple formats** - Export as PNG or JPEG
- 📋 **Copy to clipboard** - Quickly copy captures to your clipboard
- ⚙️ **Smart options** - Toggle auto-download and header/footer inclusion
- 🎯 **Context menu** - Right-click anywhere and capture the page
- 🚀 **Fast and lightweight** - Uses html2canvas for reliable rendering

## Installation

### Step 1: Prepare the Extension
1. The extension is already in the `FullPageCapture` folder
2. Make sure all files are in place:
   - `manifest.json`
   - `popup.html`
   - `popup.js`
   - `content.js`
   - `background.js`
   - `icons/` folder with icon files

### Step 2: Load in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the `FullPageCapture` folder
5. The extension should now appear in your extensions list

### Step 3: Verify Installation
- You should see the extension icon in your toolbar
- Click it to open the popup interface

## How to Use

### Method 1: Using the Popup
1. Click the extension icon in your Chrome toolbar
2. Click **"Capture"** button
3. The page will be captured
4. Optionally click **"Copy"** to copy to clipboard
5. If "Auto-download" is enabled, the image is automatically saved

### Method 2: Right-Click Context Menu
1. Right-click anywhere on a webpage
2. Select "Capture Full Page"
3. Image is automatically downloaded

## Options

- **Include headers/footers** - Toggle whether to capture headers and footers
- **Auto-download** - Automatically download captures (requires confirmation on first use)
- **Format** - Choose between PNG (recommended) or JPEG

## Troubleshooting

### Extension not capturing
- Ensure you're on a webpage (not Chrome internal pages like `chrome://` or `chrome-extension://`)
- Some websites with strict CSP policies may not capture correctly

### Quality issues
- PNG format provides lossless quality (recommended)
- JPEG is more compressed but smaller file size
- The extension uses 2x scaling for better quality

### Copy to clipboard not working
- Ensure you've already captured a page
- Grant clipboard permissions if prompted

## File Structure

```
FullPageCapture/
├── manifest.json          # Extension configuration (Manifest V3)
├── popup.html            # UI popup interface
├── popup.js              # Popup logic and event handlers
├── content.js            # Content script (runs on pages)
├── background.js         # Service worker (background logic)
├── icons/
│   ├── icon-16.svg      # Extension icon (16x16)
│   ├── icon-48.svg      # Extension icon (48x48)
│   └── icon-128.svg     # Extension icon (128x128)
└── README.md            # This file
```

## Technical Details

### How It Works
1. When you click capture, the popup injects `content.js` into the current tab
2. `content.js` loads `html2canvas` library from CDN
3. `html2canvas` renders the entire DOM to a canvas element
4. The canvas is converted to an image (PNG or JPEG)
5. Image is either auto-downloaded or copied to clipboard

### Libraries Used
- **html2canvas** v1.4.1 - DOM to canvas rendering
  - CDN: `https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/`

### Browser Compatibility
- Chrome 90+
- Chromium-based browsers (Edge, Brave, Vivaldi, etc.)

## Limitations

- Cannot capture Chrome internal pages (`chrome://`, `chrome-extension://`)
- Some websites with strict Content Security Policy may have issues
- JavaScript-rendered content is captured as displayed (after page load)
- Very large pages may take a moment to capture

## Privacy

- All captures are processed locally in your browser
- No data is sent to external servers (except loading html2canvas library)
- Captures are stored only in your Downloads folder or clipboard

## Tips

1. **Wait for page to load** - Ensure all content is loaded before capturing
2. **Disable extensions** - If having issues, temporarily disable other extensions
3. **Use PNG for quality** - PNG format provides best quality
4. **Scroll before capturing** - Any ads/lazy-loaded content will be captured as displayed

## License

This extension is provided as-is for personal and educational use.

## Support

For issues or suggestions:
1. Check that all files are present and properly placed
2. Try reloading the extension (chrome://extensions/)
3. Clear browser cache and try again
4. Check the browser console for error messages

---

**Made with 💜 for full-page screenshotters**
