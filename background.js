// Texte selectionné actualisé en temps réel
var selectedText = '';
// Variables pour les requettes
let request1 = '';
let request2 = '';
let request3 = '';
let request4 = '';

// Crée les menus
chrome.contextMenus.create({
  "id": "option-1",
  "title": "Expliquer",
  "contexts": ["selection"],
  "enabled": false
});

chrome.contextMenus.create({
  "id": "option-2",
  "title": "Resumer",
  "contexts": ["selection"],
  "enabled": false
});

chrome.contextMenus.create({
  "id": "option-3",
  "title": "Resoudre",
  "contexts": ["selection"],
  "enabled": false
});

chrome.contextMenus.create({
  "id": "option-4",
  "title": "Repondre",
  "contexts": ["selection"],
  "enabled": false
});



// Écoute les messages envoyés depuis le contenu
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.selectedText) {
    // Vérifie la longueur de la sélection
    if (request.selectedText.length >= 2) {
        // Stocke le texte sélectionné dans la variable globale
        selectedText = selectedText;
        // Actualisation des requettes
        request1 = request.selectedText;
        request2 = request.selectedText;
        request3 = request.selectedText;
        request4 = request.selectedText;
        // Active l'option du menu contextuel
        chrome.contextMenus.update("option-1", {"enabled": true});
        chrome.contextMenus.update("option-2", {"enabled": true});
        chrome.contextMenus.update("option-3", {"enabled": true});
        chrome.contextMenus.update("option-4", {"enabled": true});
    } else {
        // Reset les requettes
        request1 = '';
        request2 = '';
        request3 = '';
        request4 = '';
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

// Fonction pour réagir au clic sur l'option "GPT - Expliquer"
function onOption1Click(info, tab) {
  alert("Requête 1 : " + request1);
}

// Fonction pour réagir au clic sur l'option "GPT - Résumer"
function onOption2Click(info, tab) {
  alert("Requête 2 : " + request2);
}

// Fonction pour réagir au clic sur l'option "GPT - Résoudre"
function onOption3Click(info, tab) {
  alert("Requête 3 : " + request3);
}

// Fonction pour réagir au clic sur l'option "GPT - Répondre"
function onOption4Click(info, tab) {
  alert("Requête 4 : " + request4);
}

// Ajout des écouteurs d'événements pour les clics sur les options
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "option-1") {
    chrome.tabs.sendMessage(tab.id, {option: "explain", request: request1});
  } else if (info.menuItemId === "option-2") {
    chrome.tabs.sendMessage(tab.id, {option: "summarize", request: request2});
  } else if (info.menuItemId === "option-3") {
    chrome.tabs.sendMessage(tab.id, {option: "solve", request: request3});
  } else if (info.menuItemId === "option-4") {
    chrome.tabs.sendMessage(tab.id, {option: "answer", request: request4});
  }
});
