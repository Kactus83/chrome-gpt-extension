// Imports
import { sendOpenAIRequest } from "./send-request.js";

// Fonction pour réagir au clic sur l'option "GPT - Expliquer"
export async function onOption1Click(info, tab) {
    try {
      const response = await sendOpenAIRequest(1);
      console.log(response);
      chrome.tabs.sendMessage(tab.id, {option: "explain", response: response});
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
  
  // Fonction pour réagir au clic sur l'option "GPT - Résumer"
  export async function onOption2Click(info, tab) {
    try {
      const response = await sendOpenAIRequest(2);
      console.log(response);
      chrome.tabs.sendMessage(tab.id, {option: "summarize", response: response});
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
  export async function onOption3Click(info, tab) {
    try {
      const response = await sendOpenAIRequest(3);
      console.log(response);
      chrome.tabs.sendMessage(tab.id, {option: "solve", response: response});
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
  export async function onOption4Click(info, tab) {
    try {
      const response = await sendOpenAIRequest(4);
      console.log(response);
      chrome.tabs.sendMessage(tab.id, {option: "answer", response: response});
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
  