(async () => {
  const { TextDetection } = await import('./services/text-detection.js');
  const { ResponseOverlay } = await import('./gui/response-overlay.js');

  // Instanciation des classes
  const textDetection = new TextDetection();
  const responseOverlay = new ResponseOverlay();

  // Écoute la sélection de texte dans le navigateur
  textDetection.observe();

  // Écoute les messages envoyés depuis le background script pour afficher l'image de chargement et le résultat des requêtes
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.processing) {
      responseOverlay.showLoadingImage();
    } else {
      responseOverlay.hideLoadingImage();

      // Afficher le résultat de la requête dans l'overlay
      if (request.response || request.error || request.option === "stream-done") {
        if (!responseOverlay.isVisible()) {
          responseOverlay.createOverlay();
        }

        if (request.error) {
          responseOverlay.updateOverlayContent("Erreur : " + request.data);
          if (!responseOverlay.closeButtonExists()) {
            responseOverlay.createCloseButton();
          }
        } else {
          switch (request.option) {
            case "stream":
              responseOverlay.updateOverlayContent(request.response);
              break;
            case "stream-done":
              if (!responseOverlay.closeButtonExists()) {
                responseOverlay.createCloseButton();
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

  // Envoie les sélections de texte au script d'arrière-plan
  document.addEventListener('mouseup', function (event) {
    var selectedText = textDetection.getSelectedText();
    chrome.runtime.sendMessage({ selectedText: selectedText || '' });
  });

  document.addEventListener('touchend', function (event) {
    var selectedText = textDetection.getSelectedText();
    chrome.runtime.sendMessage({ selectedText: selectedText || '' });
  });
})();
