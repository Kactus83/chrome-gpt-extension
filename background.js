// Texte selectionné actualisé en temps réel
var selectedText = '';
// Fonction pour construire les requettes en fonction du mode (context menu option)
async function createRequest(mode, selectedText, lang, _aiVersion) {
  return new Promise((resolve, reject) => {
    let _messages = [];

    switch (mode) {
      case 1:
        if (lang === "fr") {
          _messages.push({"role": "system", "content": "Tu es un assistant qui parle français. Tu es pédagogue et tu prends ton temps pour expliquer."});
          _messages.push({"role": "user", "content": "J'ai besoin d'une explication précise, je ne comprends pas quelque chose."});
          _messages.push({"role": "assistant", "content": "Oui, bien sûr. Qu'est-ce que tu veux que je t'explique ?"});
          _messages.push({"role": "assistant", "content": "Explique-moi ceci : " + selectedText});
        } else if (lang === "en") {
          _messages.push({"role": "system", "content": "You are an assistant who speaks English. You are pedagogical and take your time to explain."});
          _messages.push({"role": "user", "content": "I need a precise explanation, I don't understand something."});
          _messages.push({"role": "assistant", "content": "Yes, of course. What do you want me to explain to you?"});
          _messages.push({"role": "assistant", "content": "Explain this to me: " + selectedText});
        }
        break;
      case 2:
        if (lang === "fr") {
          _messages.push({"role": "system", "content": "Tu es un assistant qui parle français. Tu as un esprit de synthèse exceptionnel et tu arrives à résumer en prenant ton temps mais sans oublier aucun détail."});
          _messages.push({"role": "user", "content": "J'ai besoin d'un résumé précis."});
          _messages.push({"role": "assistant", "content": "Oui, bien sûr. Qu'est-ce que tu veux que je te résume ?"});
          _messages.push({"role": "user", "content": "Résume-moi : " + selectedText});
        } else if (lang === "en") {
          _messages.push({"role": "system", "content": "You are an assistant who speaks English. You have an exceptional synthesis mind and can summarize by taking your time but without forgetting any detail."});
          _messages.push({"role": "user", "content": "I need a precise summary."});
          _messages.push({"role": "assistant", "content": "Yes, of course. What do you want me to summarize for you?"});
          _messages.push({"role": "user", "content": "Summarize this for me: " + selectedText});
        }
        break;
      case 3:
        if (lang === "fr") {
          _messages.push({"role": "system", "content": "Tu es un assistant qui parle français. Tu es pédagogue et tu prends ton temps pour expliquer étape après étape."});
          _messages.push({"role": "user", "content": "J'ai besoin d'une solution à ce problème. Explique moi étape après étape."});
          _messages.push({"role": "assistant", "content": "Oui, bien sûr. Quel est le problème ?"});
          _messages.push({"role": "user", "content": "Voici le problème : " + selectedText});
        } else if (lang === "en") {
          _messages.push({"role": "system", "content": "You are an assistant who speaks English. You are pedagogical and take your time to explain step by step."});
          _messages.push({"role": "user", "content": "I need a solution to this problem. Explain to me step by step."});
          _messages.push({"role": "assistant", "content": "Yes, of course. What is the problem?"});
          _messages.push({"role": "user", "content": "Here's the problem: " + selectedText});
        }
        break;
      
      case 4:
        if (lang === "fr") {
          _messages.push({"role": "system", "content": "Tu es un assistant qui parle français. Tu prends en compte des contextes écrits sans oublier de détail pour fournir des réponses polies et riches."});
          _messages.push({"role": "user", "content": "J'ai besoin d'une réponse à ce message. Il faut que la réponse soit adaptée à l'interlocuteur."});
          _messages.push({"role": "assistant", "content": "Oui, bien sûr. À quel message faut-il répondre ?"});
          _messages.push({"role": "user", "content": "Voici le message : " + selectedText});
        } else if (lang === "en") {
          _messages.push({"role": "system", "content": "You are an assistant who speaks English. You take into account written contexts without forgetting any detail to provide polite and rich responses."});
          _messages.push({"role": "user", "content": "I need a response to this message. The response must be adapted to the interlocutor."});
          _messages.push({"role": "assistant", "content": "Yes, of course. Which message should I respond to?"});
          _messages.push({"role": "user", "content": "Here's the message: " + selectedText});
        }
        break;
    }
    // Construire la requête
    const request = {
      model: _aiVersion,
      messages: _messages
    };

    resolve(request);
  });
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
    // Envoyer un message au content script indiquant que la requête est en cours de traitement
    let errorData = {
      code: null,
      message: error,
      type: null
    };
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {error: true, data: errorData});
    });
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
    // Envoyer un message au content script indiquant que la requête est en cours de traitement
    let errorData = {
      code: null,
      message: error,
      type: null
    };
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {error: true, data: errorData});
    });
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
    // Envoyer un message au content script indiquant que la requête est en cours de traitement
    let errorData = {
      code: null,
      message: error,
      type: null
    };
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {error: true, data: errorData});
    });
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
    // Envoyer un message au content script indiquant que la requête est en cours de traitement
    let errorData = {
      code: null,
      message: error,
      type: null
    };
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {error: true, data: errorData});
    });
    console.error(error);
  }
}

// Ajout des écouteurs d'événements pour les clics sur les options
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "option-1") {
          
    // Envoyer un message au content script indiquant que la requête est en cours de traitement
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {processing: true});
    });

    onOption1Click(info, tab);
  }
  
  if (info.menuItemId === "option-2") {
          
    // Envoyer un message au content script indiquant que la requête est en cours de traitement
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {processing: true});
    });

    onOption2Click(info, tab);
  }

  if (info.menuItemId === "option-3") {
          
    // Envoyer un message au content script indiquant que la requête est en cours de traitement
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {processing: true});
    });

    onOption3Click(info, tab);
  }

  if (info.menuItemId === "option-4") {
          
    // Envoyer un message au content script indiquant que la requête est en cours de traitement
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {processing: true});
    });

    onOption4Click(info, tab);
  }
});


// Envoie de requête à OpenAI
async function sendOpenAIRequest(requestNumber) {
  return new Promise((resolve, reject) => {
    // Récupération de la clé API depuis le local storage
    chrome.storage.local.get(["apiKey", "ai_version", "language", "api_address"], async (result) => {
      const apiKey = result.apiKey;
      const aiVersion = result.ai_version;
      const lang = result.language;
      const apiAddress = result.api_address;
      console.log(2, aiVersion);
      console.log(2, lang);
      console.log(2, apiAddress);

      // Vérification que la clé API est définie
      if (!apiKey) {   
        reject(new Error("Clé API non définie."));
      }
      
      // Création de la requête en fonction du numéro
      const _request = await createRequest(requestNumber, selectedText, lang, aiVersion);
      console.log(_request);

      // Envoi de la requête à l'API OpenAI
      const response = await fetch(apiAddress, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify(_request)
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
