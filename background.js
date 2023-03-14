// Crée un menu contextuel avec une option "first-option"
chrome.contextMenus.create({
  "id": "first-option",
  "title": "Option maison",
  "contexts": ["selection"],
  "enabled": false
});

// Écoute les messages envoyés depuis le contenu
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.selectedText) {
    // Vérifie la longueur de la sélection
    if (request.selectedText.length >= 2) {
      // Active l'option du menu contextuel
      chrome.contextMenus.update("first-option", {"enabled": true});
    } else {
      // Désactive l'option du menu contextuel
      chrome.contextMenus.update("first-option", {"enabled": false});
    }
  }
});
