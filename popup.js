const CANVAS_API = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';

const state = {
  lastCapture: null,
  isCapturing: false
};

function showStatus(message, type = 'info') {
  const statusEl = document.getElementById('status');
  statusEl.textContent = message;
  statusEl.className = `status visible ${type}`;

  if (type !== 'loading') {
    setTimeout(() => {
      statusEl.classList.remove('visible');
    }, 3000);
  }
}

function showLoadingStatus(message) {
  const statusEl = document.getElementById('status');
  statusEl.innerHTML = `<span class="spinner"></span>${message}`;
  statusEl.className = 'status visible loading';
}

async function captureFullPage() {
  if (state.isCapturing) return;

  state.isCapturing = true;
  document.getElementById('captureBtn').disabled = true;

  try {
    showLoadingStatus('Capturing page...');

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const format = document.querySelector('input[name="format"]:checked').value;
    const autoDownload = document.getElementById('downloadAuto').checked;

    // Capture the visible tab
    const imageUrl = await chrome.tabs.captureVisibleTab(null, {
      format: format === 'jpeg' ? 'jpeg' : 'png'
    });

    if (imageUrl) {
      state.lastCapture = imageUrl;

      // Auto-download if enabled
      if (autoDownload) {
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const ext = format === 'jpeg' ? 'jpg' : 'png';
        link.href = imageUrl;
        link.download = `webpage-${timestamp}.${ext}`;
        link.click();
      }

      showStatus('✓ Capture successful!', 'success');
      document.getElementById('copyBtn').disabled = false;
    } else {
      showStatus('✗ Failed to capture', 'error');
    }
  } catch (error) {
    console.error('Capture error:', error);
    showStatus(`✗ Error: ${error.message}`, 'error');
  } finally {
    state.isCapturing = false;
    document.getElementById('captureBtn').disabled = false;
  }
}

async function copyToClipboard() {
  if (!state.lastCapture) {
    showStatus('✗ No capture yet', 'error');
    return;
  }

  try {
    showLoadingStatus('Copying...');

    // Convert data URL to blob
    const response = await fetch(state.lastCapture);
    const blob = await response.blob();

    await navigator.clipboard.write([
      new ClipboardItem({ [blob.type]: blob })
    ]);

    showStatus('✓ Copied to clipboard!', 'success');
  } catch (error) {
    console.error('Copy error:', error);
    showStatus('✗ Failed to copy', 'error');
  }
}

// Initialize on popup open
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('captureBtn').addEventListener('click', captureFullPage);
  document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
  document.getElementById('copyBtn').disabled = true;
});
