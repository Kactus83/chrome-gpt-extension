export function getSolveMessage(selectedText, lang) {
    let _messages = [];
  
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
  
    return _messages;
  }
  