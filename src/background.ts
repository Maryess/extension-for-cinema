chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id || !tab.url?.startsWith("http")) return;

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const container = document.getElementById("cinema-extension-wrapper");
      if (container) {
        container.remove();
      } else {
        chrome.runtime.sendMessage({ type: "INJECT_UI" });
      }
    },
  });
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "INJECT_UI" && sender.tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["content.js"],
    });
  }
});
