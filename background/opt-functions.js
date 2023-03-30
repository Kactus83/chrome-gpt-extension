// Imports
import { sendOpenAIRequestWithStream } from "./utils/api-request.js";
import { createRequest } from "./modes/selected-text-modes/request-factory.js";
import { handleError } from "./utils/errors.js";
import { handleStream } from "./utils/stream.js";
import { createPageResumeRequest } from "./modes/page-modes/page-resume/page-resume.js";


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

// Fonction pour réagir au clic sur l'option "GPT - Résumer" dans le contexte d'une page entiere
export async function onOption5Click(info, tab, apiKey, aiVersion, language, apiAddress) {
  // Votre logique pour traiter l'action de l'option 5
}
