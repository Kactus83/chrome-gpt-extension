// Envoie de requête à OpenAI avec un stream de réponse
export function sendOpenAIRequestWithStream(apiKey, apiAddress, _request) {
  return new Promise(async (resolve, reject) => {

    console.log("sending api request with stream");

    try {
      const response = await fetch(apiAddress, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify(_request),
      });

      const reader = response.body.getReader();

      let result = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += new TextDecoder().decode(value);
        const completion = parseCompletion(result);
        if (completion !== null) {
          resolve(completion);
          break;
        }
      }
    } catch (error) {
      reject(error);
    }
  });
}