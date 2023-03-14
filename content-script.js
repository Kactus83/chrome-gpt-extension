// Récupère la sélection de texte dans la page
function getSelectedText() {
  return window.getSelection().toString();
}

// Écoute la sélection de texte dans le navigateur
document.addEventListener('mouseup', function(event) {
  // Récupère le texte sélectionné
  var selectedText = getSelectedText();
  // Envoie un message à background.js avec le texte sélectionné ou une chaîne de caractères vide s'il n'y en a pas
  chrome.runtime.sendMessage({selectedText: selectedText || ''});
});

document.addEventListener('touchend', function(event) {
  // Récupère le texte sélectionné
  var selectedText = getSelectedText();
  // Envoie un message à background.js avec le texte sélectionné ou une chaîne de caractères vide s'il n'y en a pas
  chrome.runtime.sendMessage({selectedText: selectedText || ''});
});

// Ecoute les resultats de requettes
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.option === "explain") {
    alert("Explication : " + request.request);
  }
  if (request.option === "summarize") {
    alert("Resume : " + request.request);
  }
  if (request.option === "solve") {
    alert("Resolution : " + request.request);
  }
  if (request.option === "answer") {
    alert("Reponse : " + request.request);
  }
});
