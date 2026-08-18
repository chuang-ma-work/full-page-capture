// Service Worker for Full Page Capture Extension

// Handle icon click - start capture immediately
chrome.action.onClicked.addListener(async (tab) => {
  console.log('Icon clicked on tab:', tab.url);
  await startCapture(tab);
});

// Create context menu on install
chrome.runtime.onInstalled.addListener(() => {
  console.log('Creating context menu');
  chrome.contextMenus.create({
    id: 'capture-full-page',
    title: 'Capture Full Page',
    contexts: ['page']
  }, () => {
    if (chrome.runtime.lastError) {
      console.error('Context menu error:', chrome.runtime.lastError);
    } else {
      console.log('Context menu created successfully');
    }
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log('Context menu clicked:', info.menuItemId);
  if (info.menuItemId === 'capture-full-page') {
    await startCapture(tab);
  }
});

// Main capture function
async function startCapture(currentTab) {
  try {
    console.log('Starting capture for URL:', currentTab.url);

    // Create a new tab with the same URL (invisible, in background)
    const newTab = await chrome.tabs.create({ url: currentTab.url, active: false });
    console.log('New tab created:', newTab.id);

    // Wait for tab to load (with timeout)
    await waitForTabLoad(newTab.id);
    console.log('Tab loaded');

    // Wait a moment for page to settle
    await new Promise(r => setTimeout(r, 500));

    // Inject html2canvas library first
    console.log('Injecting html2canvas library');
    await chrome.scripting.executeScript({
      target: { tabId: newTab.id },
      files: ['html2canvas.js']
    });

    // Then inject and run capture script
    console.log('Injecting capture script');
    await chrome.scripting.executeScript({
      target: { tabId: newTab.id },
      files: ['capture-worker.js']
    });
    console.log('Capture script injected');

    // Wait for capture and download to complete
    await new Promise(r => setTimeout(r, 3000));

    // Close the capture tab
    chrome.tabs.remove(newTab.id);
    console.log('Capture tab closed');
  } catch (error) {
    console.error('Capture error:', error);
  }
}

// Helper to wait for tab to load
function waitForTabLoad(tabId) {
  return new Promise((resolve, reject) => {
    let timeout = setTimeout(() => {
      chrome.tabs.onUpdated.removeListener(listener);
      reject(new Error('Tab load timeout'));
    }, 10000);

    const listener = (changedTabId, changeInfo) => {
      if (changedTabId === tabId && changeInfo.status === 'complete') {
        clearTimeout(timeout);
        chrome.tabs.onUpdated.removeListener(listener);
        resolve();
      }
    };

    chrome.tabs.onUpdated.addListener(listener);
  });
}
