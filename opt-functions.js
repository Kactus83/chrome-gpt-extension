// Imports
import { sendOpenAIRequestWithStream } from "./requests/api-request.js";
import { createRequest } from "./requests/request-factory.js";
let complete_message = ""; // declaration de la variable ici

// Fonction générique pour traiter les données reçues en streaming
async function handleStream(streamPromise, tab) {
  const stream = await streamPromise;
  const reader = stream.getReader();
  complete_message = ""; // re-initialization de la variable ici

  async function readStream() {
    const { value, done } = await reader.read();
    if (done) {
      console.log("Stream closed");
      return;
    }

    handleStreamData(value, tab); // pass complete_message en argument

    // Continue la lecture des chunks de données
    await readStream();
  }

  readStream();
}

function handleStreamData(chunk, tab) {
  const message = new TextDecoder().decode(chunk).replace(/^data: /, "");
  if (message === "[DONE]") {
    console.log("Stream finished");
    return;
  }
  try {
    const parsed = JSON.parse(message);
    if (parsed.choices && parsed.choices.length > 0) {
      const text = parsed.choices[0].delta && parsed.choices[0].delta.content ? parsed.choices[0].delta.content : "";
      complete_message += text; // ajoute le texte reçu au message complet
      chrome.tabs.sendMessage(tab.id, { option: "stream", response: complete_message }); // envoie le message complet à contentscript
    } else if (parsed.completion) {
      const text = parsed.completion.charAt(0).toUpperCase() + parsed.completion.slice(1);
      complete_message += text; // ajoute le texte reçu au message complet
      chrome.tabs.sendMessage(tab.id, { option: "stream", response: complete_message }); // envoie le message complet à contentscript
    } else {
      console.error("Invalid stream message", message);
    }
  } catch (error) {
    console.error("Could not JSON parse stream message", message, error);
  }
}


// Fonction pour réagir au clic sur l'option "GPT - Expliquer"
export async function onOption1Click(info, tab, selectedText, apiKey, aiVersion, language, apiAddress) {
  try {
    // Création de la requête
    const request = await createRequest(1, selectedText, language, aiVersion);

    // Envoi de la requête à OpenAI avec un stream de réponse
    const streamPromise = sendOpenAIRequestWithStream(apiKey, apiAddress, request);

    // Traiter les données en streaming
    // Attendre 500ms avant de traiter les données en streaming
    setTimeout(() => {
      handleStream(streamPromise, tab);
    }, 500);

  } catch (error) {
    // Envoyer un message au content script indiquant qu'il y a une erreur
    let errorData = {
      code: null,
      message: error,
      type: null
    };
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tab, {error: true, data: errorData.message});
    });
    console.error(error);
  }
}

// Fonction pour réagir au clic sur l'option "GPT - Résumer"
export async function onOption2Click(info, tab, selectedText, apiKey, aiVersion, language, apiAddress) {
  try {
    // Création de la requête
    const request = await createRequest(2, selectedText, language, aiVersion);

    // Envoi de la requête à OpenAI avec un stream de réponse
    const streamPromise = sendOpenAIRequestWithStream(apiKey, apiAddress, request);

    // Gestion des données en streaming
    // Attendre 500ms avant de traiter les données en streaming
    setTimeout(() => {
      handleStream(streamPromise, tab);
    }, 500);
  } catch (error) {
    // Envoyer un message au content script indiquant qu'il y a une erreur
    let errorData = {
      code: null,
      message: error,
      type: null
    };
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tab, {error: true, data: errorData});
    });
    console.error(error);
  }
}

// Fonction pour réagir au clic sur l'option "GPT - Résoudre"
export async function onOption3Click(info, tab, selectedText, apiKey, aiVersion, language, apiAddress) {
  try {
    // Création de la requête
    const request = await createRequest(3, selectedText, language, aiVersion);

    // Envoi de la requête à OpenAI avec un stream de réponse
    const streamPromise = sendOpenAIRequestWithStream(apiKey, apiAddress, request);

    // Gestion des données en streaming
    // Attendre 500ms avant de traiter les données en streaming
    setTimeout(() => {
      handleStream(streamPromise, tab);
    }, 500);
  } catch (error) {
    // Envoyer un message au content script indiquant qu'il y a une erreur
    let errorData = {
      code: null,
      message: error,
      type: null
    };
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tab, {error: true, data: errorData});
    });
    console.error(error);
  }
}

// Fonction pour réagir au clic sur l'option "GPT - Répondre"
export async function onOption4Click(info, tab, selectedText, apiKey, aiVersion, language, apiAddress) {
  try {
    // Création de la requête
    const request = await createRequest(4, selectedText, language, aiVersion);

    // Envoi de la requête à OpenAI avec un stream de réponse
    const streamPromise = sendOpenAIRequestWithStream(apiKey, apiAddress, request);

    // Gestion des données en streaming
    // Attendre 500ms avant de traiter les données en streaming
    setTimeout(() => {
      handleStream(streamPromise, tab);
    }, 500);
  } catch (error) {
    // Envoyer un message au content script indiquant qu'il y a une erreur
    let errorData = {
      code: null,
      message: error,
      type: null
    };
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tab, {error: true, data: errorData});
    });
    console.error(error);
  }
}

