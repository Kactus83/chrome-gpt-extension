// Imports
import { onOption1Click, onOption2Click, onOption3Click, onOption4Click } from "./opt-functions.js";

// Texte selectionné actualisé en temps réel
var selectedText = '';


// Crée les menus lors de l'installation ou de la mise à jour de l'extension
chrome.runtime.onInstalled.addListener(function() {

  chrome.contextMenus.create({
    "id": "option-1",
    "title": "Expliquer",
    "contexts": ["selection"],
    "enabled": false
  });

  chrome.contextMenus.create({
    "id": "option-2",
    "title": "Résumer",
    "contexts": ["selection"],
    "enabled": false
  });

  chrome.contextMenus.create({
    "id": "option-3",
    "title": "Résoudre",
    "contexts": ["selection"],
    "enabled": false
  });

  chrome.contextMenus.create({
    "id": "option-4",
    "title": "Répondre",
    "contexts": ["selection"],
    "enabled": false
  });

  chrome.contextMenus.create({
    "id": "option-5",
    "title": "Résumé",
    "contexts": ["page"],
    "enabled": true
  });
  
});


// Écoute les messages envoyés depuis le contenu
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.selectedText) {
    // Vérifie la longueur de la sélection
    if (request.selectedText.length >= 2) {
        // Stocke le texte sélectionné dans la variable globale
        selectedText = request.selectedText;
        // Active l'option du menu contextuel
        chrome.contextMenus.update("option-1", {"enabled": true});
        chrome.contextMenus.update("option-2", {"enabled": true});
        chrome.contextMenus.update("option-3", {"enabled": true});
        chrome.contextMenus.update("option-4", {"enabled": true});
    } else {
        // Réinitialise la variable globale si aucun texte n'est sélectionné
        selectedText = '';
        // Désactive l'option du menu contextuel
        chrome.contextMenus.update("option-1", {"enabled": false});
        chrome.contextMenus.update("option-2", {"enabled": false});
        chrome.contextMenus.update("option-3", {"enabled": false});
        chrome.contextMenus.update("option-4", {"enabled": false});
    }
  }
});


// Ajout des écouteurs d'événements pour les clics sur les options
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "option-1") {
    getLocalSettings((apiKey, aiVersion, lang, apiAddress) => {
      // Envoyer un message au content script indiquant que la requête est en cours de traitement
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {processing: true});
      });

      onOption1Click(info, tab, selectedText, apiKey, aiVersion, lang, apiAddress);
    });
  }
  
  if (info.menuItemId === "option-2") {
    getLocalSettings((apiKey, aiVersion, lang, apiAddress) => {
      // Envoyer un message au content script indiquant que la requête est en cours de traitement
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {processing: true});
      });

      onOption2Click(info, tab, selectedText, apiKey, aiVersion, lang, apiAddress);
    });
  }

  if (info.menuItemId === "option-3") {
    getLocalSettings((apiKey, aiVersion, lang, apiAddress) => {
      // Envoyer un message au content script indiquant que la requête est en cours de traitement
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {processing: true});
      });

      onOption3Click(info, tab, selectedText, apiKey, aiVersion, lang, apiAddress);
    });
  }

  if (info.menuItemId === "option-4") {
    getLocalSettings((apiKey, aiVersion, lang, apiAddress) => {
      // Envoyer un message au content script indiquant que la requête est en cours de traitement
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {processing: true});
      });

      onOption4Click(info, tab, selectedText, apiKey, aiVersion, lang, apiAddress);
    });
  }
  
  if (info.menuItemId === "option-5") {
    getLocalSettings((apiKey, aiVersion, lang, apiAddress) => {
      // Envoyer un message au content script indiquant que la requête est en cours de traitement
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {processing: true});
      });
  
      onOption5Click(info, tab, apiKey, aiVersion, lang, apiAddress);
    });
  }
  
});

function getLocalSettings(callback) {
  chrome.storage.local.get(["apiKey", "ai_version", "language", "api_address"], function(result) {
    const apiKey = result.apiKey;
    const aiVersion = result.ai_version;
    const lang = result.language;
    const apiAddress = result.api_address;

    callback(apiKey, aiVersion, lang, apiAddress);
  });
}
