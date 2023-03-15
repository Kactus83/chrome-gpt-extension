export function answerMode(selectedText, lang) {
    let _messages = [];
  
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
  
    return _messages;
  }
  