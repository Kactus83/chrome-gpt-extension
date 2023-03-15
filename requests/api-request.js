// Envoie de requête à OpenAI
export async function sendOpenAIRequest(_request) {
    return new Promise((resolve, reject) => {
      // Récupération de la clé API depuis le local storage
      chrome.storage.local.get(["apiKey", "ai_version", "language", "api_address"], async (result) => {
        const apiKey = result.apiKey;
        const apiAddress = result.api_address;
  
        // Vérification que la clé API est définie
        if (!apiKey) {   
          reject(new Error("Clé API non définie."));
        }
  
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
  
        // Check si la reponse contiens un message, le cas échéant retourne une erreur
        if (responseData.choices[0].message.content) {
          const completion = responseData.choices[0].message.content.trim();
          resolve(completion);
        } else {
          reject(new Error("Réponse invalide de l'API OpenAI."));
        }
      });
    });
  }
  