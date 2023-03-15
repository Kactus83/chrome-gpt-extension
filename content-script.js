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

// Variables pour stocker l'image de chargement
let loadingImg = null;

// Variables pour stocker l'overlay et son contenu
let overlay = null;
let overlayContent = null;

// Écoute les messages envoyés depuis le background script pour afficher l'image de chargement et le résultat des requêtes
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.processing) {
    // Créer l'image de chargement
    loadingImg = document.createElement('img');
    loadingImg.src = chrome.runtime.getURL("assets/loading.svg");
    loadingImg.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 999999;';

    document.body.appendChild(loadingImg);
  } else {
    // Supprimer l'image de chargement
    if (loadingImg) {
      loadingImg.remove();
      loadingImg = null;
    }
    
    // Afficher le résultat de la requête dans l'overlay
    if (request.response) {
      // Supprimer le contenu précédent de l'overlay s'il existe
      if (overlayContent) {
        overlayContent.remove();
        overlayContent = null;
      }
      
      // Créer l'overlay et son contenu
      overlay = document.createElement('div');
      overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999999;';

      const responseDiv = document.createElement('div');
      responseDiv.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #ffffff; font-size: 2em;';

      // Si la réponse est une erreur, afficher le message d'erreur
      if (request.response.error) {
        responseDiv.textContent = "Erreur : " + request.response.error;
      } else {
        // Sinon, afficher le résultat de la requête
        if (request.option === "explain") {
          responseDiv.textContent = "Explication : " + request.response.response;
        }
        if (request.option === "summarize") {
          responseDiv.textContent = "Résumé : " + request.response.response;
        }
        if (request.option === "solve") {
          responseDiv.textContent = "Résolution : " + request.response.response;
        }
        if (request.option === "answer") {
          responseDiv.textContent = "Réponse : " + request.response.response;
        }
      }

      // Ajouter le bouton "Fermer" à l'overlay
      const closeButton = document.createElement('button');
      closeButton.textContent = 'Fermer';
      closeButton.style.cssText = 'position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%); font-size: 1.2em; padding: 10px 20px;';
      closeButton.addEventListener('click', () => {
        overlay.remove();
        overlay = null;
        responseDiv.remove();
        closeButton.remove();
      });

      overlay.appendChild(responseDiv);
      overlay.appendChild(closeButton);

      document.body.appendChild(overlay);
      
      // Conserver une référence à l'élément de contenu pour pouvoir le supprimer plus tard
      overlayContent = responseDiv;
    }
  }
});
