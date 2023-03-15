// Envoie de requête à OpenAI
export function sendOpenAIRequest(_request) {
  return new Promise((resolve, reject) => {
    // Récupération de la clé API depuis le local storage
    chrome.storage.local.get(["apiKey", "ai_version", "language", "api_address"], (result) => {
      const apiKey = result.apiKey;
      const apiAddress = result.api_address;

      // Vérification que la clé API est définie
      if (!apiKey) {
        reject(new Error("Clé API non définie."));
      }

      console.log("sending api request");

      // Envoi de la requête à l'API OpenAI
      fetch(apiAddress, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify(_request)
      }).then(response => {
        console.log("api response : ", response);

        // Vérification du type de contenu de la réponse
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        } else {
          throw new Error("Réponse de l'API OpenAI au mauvais format.");
        }
      }).then(responseData => {
        console.log("data : ", responseData);

        // Check si la reponse contiens un message, le cas échéant retourne une erreur
        if (responseData.choices[0].message.content) {
          const completion = responseData.choices[0].message.content.trim();
          resolve(completion);
        } else {
          reject(new Error("Réponse invalide de l'API OpenAI."));
        }
      }).catch(error => {
        reject(error);
      });
    });
  });
}
