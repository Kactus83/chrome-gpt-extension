// Imports
import { createRequest } from "./request-factory.js";

// Envoie de requête à OpenAI
export async function sendOpenAIRequest(requestNumber) {
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
  