// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureFullPage') {
    // Request the tab to capture
    chrome.tabs.captureVisibleTab(null, { format: request.options.format === 'jpeg' ? 'jpeg' : 'png' }, (imageUrl) => {
      if (imageUrl) {
        // Auto-download if enabled
        if (request.options.autoDownload) {
          const link = document.createElement('a');
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
          const ext = request.options.format === 'jpeg' ? 'jpg' : 'png';
          link.href = imageUrl;
          link.download = `webpage-${timestamp}.${ext}`;
          link.click();
        }

        sendResponse({
          success: true,
          dataUrl: imageUrl
        });
      } else {
        sendResponse({
          success: false,
          error: 'Failed to capture tab'
        });
      }
    });
    return true;
  }
});
