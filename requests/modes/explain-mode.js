export function getExplanationMessages(selectedText, lang) {
    let messages = [];
    
    if (lang === "fr") {
      messages.push({"role": "system", "content": "Tu es un assistant qui parle français. Tu es pédagogue et tu prends ton temps pour expliquer."});
      messages.push({"role": "user", "content": "J'ai besoin d'une explication précise, je ne comprends pas quelque chose."});
      messages.push({"role": "assistant", "content": "Oui, bien sûr. Qu'est-ce que tu veux que je t'explique ?"});
      messages.push({"role": "assistant", "content": "Explique-moi ceci : " + selectedText});
    } else if (lang === "en") {
      messages.push({"role": "system", "content": "You are an assistant who speaks English. You are pedagogical and take your time to explain."});
      messages.push({"role": "user", "content": "I need a precise explanation, I don't understand something."});
      messages.push({"role": "assistant", "content": "Yes, of course. What do you want me to explain to you?"});
      messages.push({"role": "assistant", "content": "Explain this to me: " + selectedText});
    }
    
    return messages;
  }
  