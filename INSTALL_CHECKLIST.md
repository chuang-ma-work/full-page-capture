# Installation Checklist ✅

Use this checklist to verify your extension is properly installed and working.

---

## Pre-Installation (Before you start)

- [ ] Chrome browser is installed and updated to v90+
- [ ] You have the `FullPageCapture` folder with all files
- [ ] You can access `chrome://extensions/`

---

## Step 1: Verify File Structure

Open the `FullPageCapture` folder and confirm you have:

### Essential Files (MUST have)
- [ ] `manifest.json` - Main configuration file
- [ ] `popup.html` - UI interface
- [ ] `popup.js` - Popup logic
- [ ] `content.js` - Capture engine
- [ ] `background.js` - Background worker

### Icon Files (MUST have all 3)
- [ ] `icons/icon-16.svg` - 16x16 pixel icon
- [ ] `icons/icon-48.svg` - 48x48 pixel icon
- [ ] `icons/icon-128.svg` - 128x128 pixel icon

### Documentation (Reference only, not needed for function)
- [ ] `README.md`
- [ ] `QUICK_START.md`
- [ ] `FILE_GUIDE.md`
- [ ] `INSTALL_CHECKLIST.md` (this file)

**Status:** 
- [ ] All essential files present ✅ PROCEED
- [ ] Some files missing ❌ DO NOT LOAD (download again)

---

## Step 2: Load Extension in Chrome

1. Open Chrome browser
2. Go to: `chrome://extensions/` 
   - [ ] URL entered correctly
   - [ ] Extensions page loaded

3. Find "Developer mode" toggle (top-right corner)
   - [ ] Toggle is ON (blue) ✅
   - [ ] Toggle is OFF (gray) ❌ Click to turn ON

4. Look for "Load unpacked" button (should appear near top-left)
   - [ ] "Load unpacked" button visible ✅
   - [ ] Button not visible ❌ Make sure Developer mode is ON

5. Click "Load unpacked" button

6. Navigate to the `FullPageCapture` folder
   - [ ] Folder selected correctly
   - [ ] Clicked "Select Folder"

7. Extension should now appear in the list
   - [ ] "Full Page Capture" extension shows in list ✅
   - [ ] Nothing appeared ❌ Check file path and try again

---

## Step 3: Verify Extension Loads

Check the extension details:

1. Find "Full Page Capture" in the extensions list
2. Verify the following details:

- [ ] **Status:** Shows as enabled (blue toggle)
- [ ] **ID:** Shows an ID starting with random characters (e.g., "abcdefghijkl")
- [ ] **Version:** Shows "1.0.0" or similar
- [ ] **Permissions:** Shows "Read and change site data" and "Access tabs"
- [ ] **No errors:** No red error messages visible

**Status:**
- [ ] All details correct ✅ PROCEED
- [ ] Errors or issues ❌ See troubleshooting below

---

## Step 4: Activate Extension in Toolbar

1. Look at Chrome toolbar (top-right area, right of address bar)
2. Click the puzzle piece icon (Extensions menu)
   - [ ] Puzzle icon found and clicked

3. Find "Full Page Capture" in the menu
   - [ ] Extension listed in menu ✅

4. Click the pin icon next to "Full Page Capture"
   - [ ] Icon is now pinned to toolbar
   - [ ] You should see 📸 icon in your toolbar

**Status:**
- [ ] 📸 icon now visible in toolbar ✅ PROCEED
- [ ] Icon not visible ❌ Try reloading extension (refresh on extensions page)

---

## Step 5: First-Time Test

1. Navigate to a normal website (e.g., google.com, wikipedia.org)
   - [ ] Website fully loaded
   - [ ] Not a Chrome internal page (chrome://, chrome-extension://)

2. Click the 📸 icon in your toolbar
   - [ ] Popup window appears with buttons ✅
   - [ ] Popup doesn't appear ❌ Extension may not be loaded correctly

3. In the popup, look for:
   - [ ] Title "📸 Full Page Capture"
   - [ ] "Capture" button (white, primary)
   - [ ] "Copy" button (purple, secondary)
   - [ ] Checkbox for "Include headers/footers"
   - [ ] Checkbox for "Auto-download"
   - [ ] Radio buttons for PNG/JPEG format

**Status:**
- [ ] Popup displays correctly ✅ PROCEED
- [ ] Popup broken/missing elements ❌ Check popup.html

4. Click the "Capture" button
   - [ ] Status changes to "Capturing page..."
   - [ ] Wait 2-5 seconds...
   - [ ] Status shows "✓ Capture successful!"

**Status:**
- [ ] Capture successful ✅ WORKING!
- [ ] Error message ❌ See troubleshooting

5. If successful, check your Downloads folder
   - [ ] New image file appears (e.g., `webpage-2026-08-18-123456.png`)
   - [ ] Image file is not empty (has content)
   - [ ] Open the image and verify it shows the webpage

**Final Status:**
- [ ] Image saved and looks correct ✅ EXTENSION WORKING PERFECTLY!
- [ ] No file saved ❌ See "Downloads Issue" below

---

## Troubleshooting

### Issue 1: Extension doesn't appear in extensions list
**Possible causes:**
- [ ] Manifest.json has syntax error
  - **Fix:** Check that all `{` have matching `}`
  - **Fix:** Check that all strings are in quotes
  - Open manifest.json in a text editor and verify

- [ ] Folder path is incorrect
  - **Fix:** Make sure you selected the FullPageCapture folder, not parent folder

- [ ] Developer mode is not ON
  - **Fix:** Toggle "Developer mode" at top-right

**Solution:** Try these steps:
1. Go to chrome://extensions/
2. Turn OFF "Developer mode"
3. Turn ON "Developer mode" again
4. Click "Load unpacked"
5. Select FullPageCapture folder again

---

### Issue 2: Popup doesn't appear or is broken
**Possible causes:**
- [ ] popup.html has syntax errors
  - **Fix:** Check for mismatched tags `<div>...</div>`

- [ ] popup.js not loading
  - **Fix:** Check that `<script src="popup.js"></script>` is in popup.html

- [ ] CSS issues (styling broken)
  - **Fix:** Open F12 developer tools, check Console for errors

**Solution:**
1. Check browser console (F12 → Console tab)
2. Look for red error messages
3. Read the error - it usually tells you what's wrong
4. Open the file mentioned in the error
5. Look for the problem line number

---

### Issue 3: "Could not establish connection" error
**Possible cause:**
- Content script (content.js) not injected into the page

**Solution:**
1. Refresh the webpage (F5)
2. Try capturing again
3. If still fails, reload the extension:
   - Go to chrome://extensions/
   - Find Full Page Capture
   - Click the reload button (circular arrow)

---

### Issue 4: Capture returns blank/white image
**Possible causes:**
- [ ] Website uses heavy JavaScript (not fully rendered)
- [ ] Website has strict Content Security Policy
- [ ] Website blocks automated screenshots
- [ ] Page not fully loaded before capturing

**Solutions:**
- Try waiting a few more seconds before capturing
- Try different website (Google, Wikipedia work well)
- Try PNG format instead of JPEG
- Try disabling other extensions temporarily

---

### Issue 5: Downloads not working
**Possible causes:**
- [ ] Auto-download checkbox is not checked
- [ ] Download location is full or read-only
- [ ] Chrome permissions not granted

**Solutions:**
- [ ] Check "Auto-download" checkbox in popup
- [ ] Grant download permissions if Chrome asks
- [ ] Check your Downloads folder permissions
- [ ] Use "Copy" button instead (copies to clipboard)

---

### Issue 6: Can't access from specific website
**Possible causes:**
- [ ] Website blocks extensions (some internal corporate sites)
- [ ] Website has strict Content Security Policy
- [ ] Website is a Chrome internal page

**Note:** Cannot capture:
- `chrome://` pages (like Settings, Extensions)
- `chrome-extension://` pages
- Some enterprise/internal sites with security restrictions

**Solution:** Works best with public websites (Google, Wikipedia, news sites, etc.)

---

## Performance Expectations

### First Capture
- Time: 3-5 seconds
- Why: Downloads html2canvas library from CDN first time
- Subsequent captures: Faster (library cached)

### Normal Page (Under 5000px height)
- Time: 1-2 seconds
- Quality: PNG recommended
- File size: 200KB - 2MB

### Large Page (Over 10000px height)
- Time: 3-10 seconds
- Quality: May take longer
- File size: Can be 2MB+

### Very Large Page (Over 20000px height)
- Time: 10+ seconds
- May run slowly or fail
- Try zooming out before capturing

---

## Success Indicators ✅

You're all set when you see:

- [ ] 📸 icon in Chrome toolbar
- [ ] Popup opens when clicking icon
- [ ] "Capture" button works
- [ ] Image file appears in Downloads
- [ ] Image shows the full webpage
- [ ] PNG/JPEG quality is good

---

## What to Do If Nothing Works

1. **Reload the extension:**
   - Go to chrome://extensions/
   - Find Full Page Capture → Click reload button

2. **Clear Chrome cache:**
   - Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
   - Select "Cookies and other site data"
   - Click "Delete data"

3. **Unload and reload:**
   - Go to chrome://extensions/
   - Turn OFF Full Page Capture toggle
   - Wait 2 seconds
   - Turn ON Full Page Capture toggle

4. **Check file integrity:**
   - Download the extension again
   - Ensure all files are present
   - Try loading again

5. **Check Chrome version:**
   - Click ⋮ menu → About Google Chrome
   - Ensure you're on Chrome 90 or higher
   - If not, update Chrome

6. **Open Developer Console:**
   - Right-click popup → Inspect
   - Look at Console tab for error messages
   - Red text = errors that need fixing

---

## Getting Help

If you're still stuck:

1. **Check the README.md** - Full documentation
2. **Check FILE_GUIDE.md** - File reference
3. **Check console errors (F12)** - Usually tells you what's wrong
4. **Try on different website** - Some sites may not work

---

## Quick Reference Checklist

Print or bookmark this for quick reference:

```
✅ Installation Checklist
- [ ] All files present
- [ ] manifest.json correct
- [ ] icons/ folder exists
- [ ] Developer mode ON
- [ ] Extension loaded
- [ ] Icon in toolbar
- [ ] Popup opens
- [ ] Capture works
- [ ] Image saves

❌ If any fails:
- Reload extension
- Check browser console (F12)
- Read error messages
- Verify file structure
- Try different website
```

---

**Once everything checks out, enjoy capturing full-page screenshots! 📸✨**

Next steps:
- Read QUICK_START.md for usage tips
- Read README.md for detailed features
- Check FILE_GUIDE.md to customize the extension
