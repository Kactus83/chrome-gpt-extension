export function handleError(tab, error) {
    console.error(error);
    
    // Envoyer un message au content script indiquant qu'il y a une erreur
    let errorData = {
      code: null,
      message: error,
      type: null
    };
    chrome.tabs.sendMessage(tab.id, { error: true, data: errorData.message });
  }
  