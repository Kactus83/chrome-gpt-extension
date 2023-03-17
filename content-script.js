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
  overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999999; opacity: 0; transition: opacity 0.3s;';
  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.style.opacity = 1;
  }, 50);
}

function removeOverlay() {
  if (overlay) {
    overlay.style.opacity = 0;
    setTimeout(() => {
      overlay.remove();
      overlay = null;
    }, 300);
  }
}

function updateOverlayContent(content) {
  if (!overlayContent) {
    overlayContent = document.createElement('div');
    overlayContent.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #ffffff; font-size: 1.5em; width: 90%; max-width: 800px; max-height: 70%; background-color: rgba(0, 0, 0, 0.95); border: 3px solid white; padding: 25px; line-height: 1.5; text-align: justify; overflow-y: auto;';
    overlay.appendChild(overlayContent);

    // Appliquer un style sombre à la barre de défilement
    overlayContent.style.cssText += `
      scrollbar-width: thin;
      scrollbar-color: #888 #111;
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-track {
        background-color: #111;
      }
    `;
  }

  overlayContent.textContent = content;
}

function createCloseButton() {
  closeButton = document.createElement('button');
  closeButton.textContent = 'Fermer';
  closeButton.style.cssText = 'position: absolute; bottom: 6%; left: 50%; transform: translateX(-50%); font-size: 1.2em; padding: 10px 20px; background-color: #444; color: #ffffff; border: 1px solid #ffffff; cursor: pointer; z-index: 1000000; opacity: 0; transition: opacity 0.3s;';
  closeButton.addEventListener('click', () => {
    overlay.style.opacity = 0;
    setTimeout(() => {
      removeOverlay();
    }, 300);
  });
  overlay.appendChild(closeButton);

  setTimeout(() => {
    closeButton.style.opacity = 1;
  }, 50);
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
