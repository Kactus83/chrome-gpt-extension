// Fonction pour construire les requettes en fonction du mode (context menu option)
export async function createRequest(mode, selectedText, lang, _aiVersion) {
    return new Promise((resolve, reject) => {
      let _messages = [];
  
      switch (mode) {
        case 1:
          if (lang === "fr") {
            _messages.push({"role": "system", "content": "Tu es un assistant qui parle français. Tu es pédagogue et tu prends ton temps pour expliquer."});
            _messages.push({"role": "user", "content": "J'ai besoin d'une explication précise, je ne comprends pas quelque chose."});
            _messages.push({"role": "assistant", "content": "Oui, bien sûr. Qu'est-ce que tu veux que je t'explique ?"});
            _messages.push({"role": "assistant", "content": "Explique-moi ceci : " + selectedText});
          } else if (lang === "en") {
            _messages.push({"role": "system", "content": "You are an assistant who speaks English. You are pedagogical and take your time to explain."});
            _messages.push({"role": "user", "content": "I need a precise explanation, I don't understand something."});
            _messages.push({"role": "assistant", "content": "Yes, of course. What do you want me to explain to you?"});
            _messages.push({"role": "assistant", "content": "Explain this to me: " + selectedText});
          }
          break;
        case 2:
          if (lang === "fr") {
            _messages.push({"role": "system", "content": "Tu es un assistant qui parle français. Tu as un esprit de synthèse exceptionnel et tu arrives à résumer en prenant ton temps mais sans oublier aucun détail."});
            _messages.push({"role": "user", "content": "J'ai besoin d'un résumé précis."});
            _messages.push({"role": "assistant", "content": "Oui, bien sûr. Qu'est-ce que tu veux que je te résume ?"});
            _messages.push({"role": "user", "content": "Résume-moi : " + selectedText});
          } else if (lang === "en") {
            _messages.push({"role": "system", "content": "You are an assistant who speaks English. You have an exceptional synthesis mind and can summarize by taking your time but without forgetting any detail."});
            _messages.push({"role": "user", "content": "I need a precise summary."});
            _messages.push({"role": "assistant", "content": "Yes, of course. What do you want me to summarize for you?"});
            _messages.push({"role": "user", "content": "Summarize this for me: " + selectedText});
          }
          break;
        case 3:
          if (lang === "fr") {
            _messages.push({"role": "system", "content": "Tu es un assistant qui parle français. Tu es pédagogue et tu prends ton temps pour expliquer étape après étape."});
            _messages.push({"role": "user", "content": "J'ai besoin d'une solution à ce problème. Explique moi étape après étape."});
            _messages.push({"role": "assistant", "content": "Oui, bien sûr. Quel est le problème ?"});
            _messages.push({"role": "user", "content": "Voici le problème : " + selectedText});
          } else if (lang === "en") {
            _messages.push({"role": "system", "content": "You are an assistant who speaks English. You are pedagogical and take your time to explain step by step."});
            _messages.push({"role": "user", "content": "I need a solution to this problem. Explain to me step by step."});
            _messages.push({"role": "assistant", "content": "Yes, of course. What is the problem?"});
            _messages.push({"role": "user", "content": "Here's the problem: " + selectedText});
          }
          break;
        
        case 4:
          if (lang === "fr") {
            _messages.push({"role": "system", "content": "Tu es un assistant qui parle français. Tu prends en compte des contextes écrits sans oublier de détail pour fournir des réponses polies et riches."});
            _messages.push({"role": "user", "content": "J'ai besoin d'une réponse à ce message. Il faut que la réponse soit adaptée à l'interlocuteur."});
            _messages.push({"role": "assistant", "content": "Oui, bien sûr. À quel message faut-il répondre ?"});
            _messages.push({"role": "user", "content": "Voici le message : " + selectedText});
          } else if (lang === "en") {
            _messages.push({"role": "system", "content": "You are an assistant who speaks English. You take into account written contexts without forgetting any detail to provide polite and rich responses."});
            _messages.push({"role": "user", "content": "I need a response to this message. The response must be adapted to the interlocutor."});
            _messages.push({"role": "assistant", "content": "Yes, of course. Which message should I respond to?"});
            _messages.push({"role": "user", "content": "Here's the message: " + selectedText});
          }
          break;
      }
      // Construire la requête
      const request = {
        model: _aiVersion,
        messages: _messages
      };
  
      resolve(request);
    });
  }