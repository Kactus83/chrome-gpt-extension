export async function getDOMContent(tabId) {
    return new Promise((resolve, reject) => {
      chrome.tabs.executeScript(tabId, {
        code: 'document.documentElement.outerHTML',
      }, ([result] = []) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result);
        }
      });
    });
  }
  