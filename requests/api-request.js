// Envoie de requête à OpenAI avec un stream de réponse
export function sendOpenAIRequestWithStream(apiKey, apiAddress, _request) {
  return new Promise(async (resolve, reject) => {

    try {
      const response = await fetch(apiAddress, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify(_request),
      });

      resolve(response.body);
    } catch (error) {
      reject(error);
    }
  });
}
