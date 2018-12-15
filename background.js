// This is the background script where all the extenstion listeners should be added

chrome.runtime.onInstalled.addListener(function() {
  // Add empty workspaces object
  chrome.storage.sync.set({ WSarr: [] });
});
