export function getResumeMessage(selectedText, lang) {
    let messages = [];
    
    if (lang === "fr") {
      messages.push({"role": "system", "content": "Tu es un assistant qui parle français. Tu as un esprit de synthèse exceptionnel et tu arrives à résumer en prenant ton temps mais sans oublier aucun détail."});
      messages.push({"role": "user", "content": "J'ai besoin d'un résumé précis."});
      messages.push({"role": "assistant", "content": "Oui, bien sûr. Qu'est-ce que tu veux que je te résume ?"});
      messages.push({"role": "user", "content": "Résume-moi : " + selectedText});
    } else if (lang === "en") {
      messages.push({"role": "system", "content": "You are an assistant who speaks English. You have an exceptional synthesis mind and can summarize by taking your time but without forgetting any detail."});
      messages.push({"role": "user", "content": "I need a precise summary."});
      messages.push({"role": "assistant", "content": "Yes, of course. What do you want me to summarize for you?"});
      messages.push({"role": "user", "content": "Summarize this for me: " + selectedText});
    }
    
    return messages;
  }
  