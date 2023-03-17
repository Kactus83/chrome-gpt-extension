import { handleError } from "./errors.js";

let complete_message = ""; // declaration de la variable ici

// Fonction générique pour traiter les données reçues en streaming
export async function handleStream(streamPromise, tab) {
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
