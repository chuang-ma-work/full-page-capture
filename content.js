async function captureFullPage() {
  const originalZoom = document.documentElement.style.zoom;
  const originalScrollTop = window.scrollY;
  const originalScrollLeft = window.scrollX;

  try {
    // Calculate zoom level to fit entire page width
    const docWidth = document.documentElement.scrollWidth;
    const viewportWidth = window.innerWidth;
    const zoomLevel = Math.min(1, (viewportWidth * 0.95) / docWidth);

    // Apply zoom
    document.documentElement.style.zoom = zoomLevel;
    await new Promise(r => setTimeout(r, 300));

    // Get zoomed dimensions
    const docHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    // Create canvas for the full page
    const canvas = document.createElement('canvas');
    canvas.width = viewportWidth;
    canvas.height = docHeight;

    const ctx = canvas.getContext('2d');

    // Scroll to top
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 100));

    // Capture sections by scrolling
    const numSections = Math.ceil(docHeight / viewportHeight);

    for (let i = 0; i < numSections; i++) {
      // Scroll to position
      window.scrollTo(0, i * viewportHeight);
      await new Promise(r => setTimeout(r, 150));

      // Capture this section
      const imageUrl = await captureVisibleSection();
      const img = await loadImage(imageUrl);

      // Draw on canvas
      ctx.drawImage(img, 0, i * viewportHeight);
    }

    // Return canvas as data URL (PNG)
    const finalImage = canvas.toDataURL('image/png');

    // Restore original state
    window.scrollTo(originalScrollLeft, originalScrollTop);
    document.documentElement.style.zoom = originalZoom;

    return {
      success: true,
      dataUrl: finalImage
    };
  } catch (error) {
    // Restore original state on error
    window.scrollTo(originalScrollLeft, originalScrollTop);
    document.documentElement.style.zoom = originalZoom;

    return {
      success: false,
      error: error.message
    };
  }
}

function captureVisibleSection() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(
      { action: 'captureTab' },
      (response) => {
        if (response && response.imageUrl) {
          resolve(response.imageUrl);
        } else {
          resolve(null);
        }
      }
    );
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureFullPage') {
    captureFullPage().then(result => {
      if (result.success) {
        // Auto-download
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        link.href = result.dataUrl;
        link.download = `webpage-${timestamp}.png`;
        link.click();

        sendResponse({
          success: true,
          dataUrl: result.dataUrl
        });
      } else {
        sendResponse(result);
      }
    });
    return true;
  }
});
