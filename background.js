// Texte selectionné actualisé en temps réel
var selectedText = '';
// Variables pour les requettes
let request1 = '';
let request2 = '';
let request3 = '';
let request4 = '';

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
});

// Écoute les messages envoyés depuis le contenu
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.selectedText) {
    // Vérifie la longueur de la sélection
    if (request.selectedText.length >= 2) {
        // Stocke le texte sélectionné dans la variable globale
        selectedText = request.selectedText;
        // Actualisation des requettes
        request1 = "Explique moi ceci : " + request.selectedText;
        request2 = "Resume moi ceci :" + request.selectedText;
        request3 = "Resouds moi ce probleme : " + request.selectedText;
        request4 = "Reponds à ce message : " + request.selectedText;
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
async function onOption1Click(info, tab) {
  try {
    const response = await sendOpenAIRequest(request1);
    console.log(response);
    chrome.tabs.sendMessage(tab.id, {option: "explain", response: response});
  } catch (error) {
    console.error(error);
  }
}

// Fonction pour réagir au clic sur l'option "GPT - Résumer"
async function onOption2Click(info, tab) {
  try {
    const response = await sendOpenAIRequest(request2);
    console.log(response);
    chrome.tabs.sendMessage(tab.id, {option: "summarize", response: response});
  } catch (error) {
    console.error(error);
  }
}

// Fonction pour réagir au clic sur l'option "GPT - Résoudre"
async function onOption3Click(info, tab) {
  try {
    const response = await sendOpenAIRequest(request3);
    console.log(response);
    chrome.tabs.sendMessage(tab.id, {option: "solve", response: response});
  } catch (error) {
    console.error(error);
  }
}

// Fonction pour réagir au clic sur l'option "GPT - Répondre"
async function onOption4Click(info, tab) {
  try {
    const response = await sendOpenAIRequest(request4);
    console.log(response);
    chrome.tabs.sendMessage(tab.id, {option: "answer", response: response});
  } catch (error) {
    console.error(error);
  }
}

// Ajout des écouteurs d'événements pour les clics sur les options
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "option-1") {
    onOption1Click(info, tab);
  }
  if (info.menuItemId === "option-2") {
    onOption2Click(info, tab);
  }
  if (info.menuItemId === "option-3") {
    onOption3Click(info, tab);
  }
  if (info.menuItemId === "option-4") {
    onOption4Click(info, tab);
  }
});



// Envoie de requette a open api
async function sendOpenAIRequest(prompt) {
  return new Promise((resolve, reject) => {
    // Récupération de la clé API depuis le local storage
    chrome.storage.local.get("apiKey", async function(result) {
      const apiKey = result.apiKey;
      // Vérification que la clé API est définie
      if (!apiKey) {
        console.error("Clé API non définie.");
        reject(new Error("Clé API non définie."));
      }
      // Envoi de la requête à l'API OpenAI
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 1024,
          n: 1,
          stop: '\n'
        })
      });
      const data = await response.json();
      resolve(data.choices[0].text);
    });
  });
}
