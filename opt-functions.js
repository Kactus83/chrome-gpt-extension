// Imports
import { sendOpenAIRequestWithStream } from "./requests/api-request.js";
import { createRequest } from "./requests/request-factory.js";

// Fonction générique pour traiter les données reçues en streaming
async function handleStream(streamPromise, tabId) {
  let result = '';
  const stream = await streamPromise;

  const reader = stream.body.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += new TextDecoder().decode(value);
    const completion = parseCompletion(result);
    if (completion !== null) {
      chrome.runtime.sendMessage({ option: "stream", response: completion }, (response) => {
        // Callback pour gérer la réponse
        console.log(response);
      });
      result = '';
    }
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
    handleStream(streamPromise, tab.id);

  } catch (error) {
    // Envoyer un message au content script indiquant qu'il y a une erreur
    let errorData = {
      code: null,
      message: error,
      type: null
    };
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {error: true, data: errorData.message});
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
    handleStream(streamPromise, tab.id, "summarize");
  } catch (error) {
    // Envoyer un message au content script indiquant qu'il y a une erreur
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
export async function onOption3Click(info, tab, selectedText, apiKey, aiVersion, language, apiAddress) {
  try {
    // Création de la requête
    const request = await createRequest(3, selectedText, language, aiVersion);

    // Envoi de la requête à OpenAI avec un stream de réponse
    const streamPromise = sendOpenAIRequestWithStream(apiKey, apiAddress, request);

    // Gestion des données en streaming
    handleStream(streamPromise, tab.id, "solve");
  } catch (error) {
    // Envoyer un message au content script indiquant qu'il y a une erreur
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
export async function onOption4Click(info, tab, selectedText, apiKey, aiVersion, language, apiAddress) {
  try {
    // Création de la requête
    const request = await createRequest(4, selectedText, language, aiVersion);

    // Envoi de la requête à OpenAI avec un stream de réponse
    const streamPromise = sendOpenAIRequestWithStream(apiKey, apiAddress, request);

    // Gestion des données en streaming
    handleStream(streamPromise, tab.id, "answer");
  } catch (error) {
    // Envoyer un message au content script indiquant qu'il y a une erreur
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

