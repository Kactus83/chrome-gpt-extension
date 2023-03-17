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
let closeButton = null;

function createOverlay() {
  overlay = document.createElement('div');
  overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999999;';
  document.body.appendChild(overlay);
}

function removeOverlay() {
  if (overlay) {
    overlay.remove();
    overlay = null;
  }
}

function updateOverlayContent(content) {
  if (overlayContent) {
    overlayContent.remove();
  }
  
  overlayContent = document.createElement('div');
  overlayContent.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #ffffff; font-size: 1.5em; width: 90%; max-width: 800px; background-color: rgba(0, 0, 0, 0.95); border: 3px solid white; padding: 25px; line-height: 1.5; text-align: justify;';
  overlayContent.textContent = content;
  overlay.appendChild(overlayContent);
}

function createCloseButton() {
  closeButton = document.createElement('button');
  closeButton.textContent = 'Fermer';
  closeButton.style.cssText = 'position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%); font-size: 1.2em; padding: 10px 20px; background-color: #ffffff; color: #000000; border: 1px solid #000000; cursor: pointer; z-index: 1000000;';
  closeButton.addEventListener('click', () => {
    removeOverlay();
  });
  overlay.appendChild(closeButton);
}


function removeCloseButton() {
  if (closeButton) {
    closeButton.remove();
    closeButton = null;
  }
}

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
    if (request.response || request.error || request.option === "stream-done") {
      if (!overlay) {
        createOverlay();
      }

      if (request.error) {
        updateOverlayContent("Erreur : " + request.data);
        if (!closeButton) {
          createCloseButton();
        }
      } else {
        switch (request.option) {
          case "stream":
            updateOverlayContent(request.response);
            if (!closeButton) {
              createCloseButton();
            }
            break;
          case "stream-done":
            if (!closeButton) {
              createCloseButton();
            }
            break;
          default:
            console.error("Option invalide.");
            break;
        }
      }
    }
  }
});
