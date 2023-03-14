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

// Variables pour stocker l'overlay et son contenu
let overlay = null;
let overlayContent = null;

// Écoute les messages envoyés depuis le background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.processing) {
    // Créer l'overlay et son contenu
    overlay = document.createElement('div');
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999999;';
    overlayContent = document.createElement('div');
    overlayContent.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #ffffff; font-size: 2em;';
    overlayContent.textContent = 'La requête est en cours de traitement...';
    overlay.appendChild(overlayContent);
    document.body.appendChild(overlay);
  } else {
    // Supprime l'overlay
    if (overlay) {
      overlay.remove();
      overlay = null;
      overlayContent = null;
    }
    
    // Affiche la réponse
    if (request.option === "explain") {
      alert("Explication : " + request.response);
    }
    if (request.option === "summarize") {
      alert("Resume : " + request.response);
    }
    if (request.option === "solve") {
      alert("Resolution : " + request.response);
    }
    if (request.option === "answer") {
      alert("Reponse : " + request.response);
    }
  }
});
