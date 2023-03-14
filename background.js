// Texte selectionné actualisé en temps réel
var selectedText = '';
// Fonction pour construire les requettes en fonction du mode (context menu option)
function createRequest(mode, selectedText) {
  let request;
  
  switch (mode) {
    case 1:
      request = {
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "Tu es un assistant qui parle français. Tu es pédagogue et tu prends ton temps pour expliquer."},
          {"role": "user", "content": "J'ai besoin d'une explication précise, je ne comprends pas quelquechose."},
          {"role": "assistant", "content": "Oui, bien sûr. Qu'est-ce que tu veux que je t'explique ?"},
          {"role": "assistant", "content": "Explique-moi ceci : " + selectedText}
        ]
      };
      break;
    case 2:
      request = {
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "Tu es un assistant qui parle français. Tu as un esprit de synthèse exceptionnel et tu arrive à résumer en prenant ton temps mais sans oublier aucun détail."},
          {"role": "user", "content": "J'ai besoin d'un résumé précis."},
          {"role": "assistant", "content": "Oui, bien sûr. Qu'est-ce que tu veux que je te résume ?"},
          {"role": "user", "content": "Résume-moi : " + selectedText}
        ]
      };
      break;
    case 3:
      request = {
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "Tu es un assistant qui parle français. Tu es pédagogue et tu prends ton temps pour expliquer étape après étape."},
          {"role": "user", "content": "J'ai besoin d'une solution à ce problème. Explique moi étape après étape."},
          {"role": "assistant", "content": "Oui, bien sûr. Quel est le problème ?"},
          {"role": "user", "content": "Voici le problème : " + selectedText}
        ]
      };
      break;
    case 4:
      request = {
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "Tu es un assistant qui parle français. Tu prends en compte des contextes écrits sans oublier de détail pour fournir des réponses polies et riches?"},
          {"role": "user", "content": "J'ai besoin d'une réponse à ce message. Il faut que la réponse soit adaptée à l'interlocuteur."},
          {"role": "assistant", "content": "Oui, bien sûr. À quel message faut-il répondre ?"},
          {"role": "user", "content": "Voici le message : " + selectedText}
        ]
      };
      break;
    default:
      throw new Error("Mode invalide.");
  }
  
  return request;
}


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

// Fonction pour réagir au clic sur l'option "GPT - Expliquer"
async function onOption1Click(info, tab) {
  try {
    const response = await sendOpenAIRequest(1);
    console.log(response);
    chrome.tabs.sendMessage(tab.id, {option: "explain", response: response});
  } catch (error) {
    console.error(error);
  }
}

// Fonction pour réagir au clic sur l'option "GPT - Résumer"
async function onOption2Click(info, tab) {
  try {
    const response = await sendOpenAIRequest(2);
    console.log(response);
    chrome.tabs.sendMessage(tab.id, {option: "summarize", response: response});
  } catch (error) {
    console.error(error);
  }
}

// Fonction pour réagir au clic sur l'option "GPT - Résoudre"
async function onOption3Click(info, tab) {
  try {
    const response = await sendOpenAIRequest(3);
    console.log(response);
    chrome.tabs.sendMessage(tab.id, {option: "solve", response: response});
  } catch (error) {
    console.error(error);
  }
}

// Fonction pour réagir au clic sur l'option "GPT - Répondre"
async function onOption4Click(info, tab) {
  try {
    const response = await sendOpenAIRequest(4);
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


// Envoie de requête à OpenAI
async function sendOpenAIRequest(requestNumber) {
  
  return new Promise((resolve, reject) => {
    // Récupération de la clé API depuis le local storage
    chrome.storage.local.get("apiKey", async function(result) {
      const apiKey = result.apiKey;
      
      // Vérification que la clé API est définie
      if (!apiKey) {
        console.error("Clé API non définie.");
        reject(new Error("Clé API non définie."));
      }
      
      
      // Création de la requête en fonction du numéro
      const request = createRequest(requestNumber, selectedText);
      // Envoyer un message au content script indiquant que la requête est en cours de traitement
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {processing: true});
      });
      // Envoi de la requête à l'API OpenAI
      console.log(request);
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify(request)
      });  
      
      const responseData = await response.json();
      console.log("Response received from OpenAI API:", responseData);
      
      if (responseData.choices[0].message.content) {
        const completion = responseData.choices[0].message.content.trim();
        console.log("Completion:", completion);
        resolve(completion);
      } else {
        reject(new Error("Réponse invalide de l'API OpenAI."));
      }      
    });
  });
}
