const state = {
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
    showLoadingStatus('Preparing page...');

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Inject content script
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });

    showLoadingStatus('Capturing full page...');

    // Send capture message to content script
    const result = await chrome.tabs.sendMessage(tab.id, {
      action: 'captureFullPage'
    });

    if (result.success) {
      showStatus('✓ Saved to Downloads!', 'success');
    } else {
      showStatus(`✗ ${result.error}`, 'error');
    }
  } catch (error) {
    console.error('Capture error:', error);
    showStatus(`✗ ${error.message}`, 'error');
  } finally {
    state.isCapturing = false;
    document.getElementById('captureBtn').disabled = false;
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('captureBtn').addEventListener('click', captureFullPage);
});
