// Capture worker - runs in the capture tab
async function captureFullPage() {
  console.log('Capture worker started');

  try {
    // Wait for page to fully load and render
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to top
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 500));

    console.log('Capturing page as displayed');

    // Use the visible viewport to capture exactly what user sees
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    console.log('Viewport:', viewportWidth, 'x', viewportHeight);

    // Capture entire page using viewport dimensions to match how it displays
    const canvas = await html2canvas(document.body, {
      allowTaint: true,
      useCORS: true,
      scale: 2,
      logging: false,
      backgroundColor: '#ffffff',
      // Use current viewport width to capture as displayed
      windowWidth: viewportWidth,
      windowHeight: viewportHeight,
      imageTimeout: 5000,
      onclone: (clonedDocument) => {
        // Make sure nothing is hidden in the clone
        clonedDocument.documentElement.style.overflow = 'visible';
        clonedDocument.body.style.overflow = 'visible';
      }
    });

    console.log('Canvas created:', canvas.width, 'x', canvas.height);

    // Convert to blob and download
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `webpage-${timestamp}.png`;

    // Convert canvas to blob with high quality
    canvas.toBlob((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      console.log('Download triggered:', filename);
    }, 'image/png');

    return { success: true };
  } catch (error) {
    console.error('Capture error:', error);
    return { success: false, error: error.message };
  }
}

console.log('Capture worker script loaded, running capture');
captureFullPage().catch(err => console.error('Capture failed:', err));
