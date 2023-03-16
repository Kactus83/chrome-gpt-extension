// Imports
import { sendOpenAIRequestWithStream } from "./requests/api-request.js";
import { createRequest } from "./requests/request-factory.js";

// Fonction générique pour traiter les données reçues en streaming
async function handleStream(streamPromise, tab) {
  const stream = await streamPromise;
  const reader = stream.getReader();
  let result = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += new TextDecoder().decode(value);
    chrome.tabs.sendMessage(tab.id, {option: "stream", response: result});
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

