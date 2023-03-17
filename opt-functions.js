// Imports
import { sendOpenAIRequestWithStream } from "./requests/api-request.js";
import { createRequest } from "./requests/request-factory.js";
import { handleError } from "./utils/errors.js";

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

    handleStreamData(value, tab);

    // Continue la lecture des chunks de données
    await readStream();
  }

  readStream();
}

function handleStreamData(chunk, tab) {
  const message = new TextDecoder().decode(chunk);
  const messages = message.split('\n');

  for (const msg of messages) {
    if (msg.trim() !== '') {
      let jsonString = msg;
  
      if (msg.startsWith('data:')) {
        jsonString = msg.replace(/^data: /, '');
      }
  
      try {
        const parsed = JSON.parse(jsonString);
  
        if (parsed.choices && parsed.choices.length > 0 && parsed.choices[0].delta && parsed.choices[0].delta.content) {
          const content = parsed.choices[0].delta.content;
  
          // Mettre à jour complete_message et envoyer les données actualisées
          complete_message += content;
          chrome.tabs.sendMessage(tab.id, {option: "stream", response: complete_message});
        }
      } catch (error) {
        if (msg.includes('[DONE]')) {
          chrome.tabs.sendMessage(tab.id, {option: "stream-done"});
        } else {
          console.log(message);
          handleError(tab, error);
        }
      }
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
    // Attendre 500ms avant de traiter les données en streaming
    setTimeout(() => {
      handleStream(streamPromise, tab);
    }, 500);

  } catch (error) {
    handleError(tab, error);
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
    handleError(tab, error);
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
    handleError(tab, error);
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
    handleError(tab, error);
  }
}

