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

// Envoie de requête à OpenAI sans stream de réponse
export async function sendOpenAIRequest(apiKey, apiAddress, _request) {
  try {
    const response = await fetch(apiAddress, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify(_request),
    });

    return await response.json();
  } catch (error) {
    throw error;
  }
}
