export class ResponseOverlay {
    constructor() {
      this.overlay = null;
      this.overlayContent = null;
      this.closeButton = null;
    }
  
    createOverlay() {
      this.overlay = document.createElement('div');
      this.overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999999; opacity: 0; transition: opacity 0.3s;';
      document.body.appendChild(this.overlay);
  
      setTimeout(() => {
        this.overlay.style.opacity = 1;
      }, 50);
    }
  
    removeOverlay() {
      if (this.overlay) {
        this.overlay.style.opacity = 0;
        setTimeout(() => {
          this.overlay.remove();
          this.overlay = null;
        }, 300);
      }
    }
  
    updateOverlayContent(content) {
      if (!this.overlayContent) {
        this.overlayContent = document.createElement('div');
        this.overlayContent.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #ffffff; font-size: 1.5em; width: 90%; max-width: 800px; max-height: 70%; background-color: rgba(0, 0, 0, 0.95); border: 3px solid white; padding: 25px; line-height: 1.5; text-align: justify; overflow-y: auto;';
        this.overlay.appendChild(this.overlayContent);
  
        // Appliquer un style sombre à la barre de défilement
        this.overlayContent.style.cssText += `
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
  
      this.overlayContent.textContent = content;
    }
  
    createCloseButton() {
      this.closeButton = document.createElement('button');
      this.closeButton.textContent = 'Fermer';
      this.closeButton.style.cssText = 'position: absolute; bottom: 6%; left: 50%; transform: translateX(-50%); font-size: 1.2em; padding: 10px 20px; background-color: #444; color: #ffffff; border: 1px solid #ffffff; cursor: pointer; z-index: 1000000; opacity: 0; transition: opacity 0.3s;';
      this.closeButton.addEventListener('click', () => {
        this.removeOverlay();
      });
      this.overlay.appendChild(this.closeButton);
  
      setTimeout(() => {
        this.closeButton.style.opacity = 1;
      }, 50);
    }
  
    removeCloseButton() {
      if (this.closeButton) {
        this.closeButton.remove();
        this.closeButton = null;
      }
    }

    showLoadingImage() {
      this.loadingImg = document.createElement("img");
      this.loadingImg.src = chrome.runtime.getURL("assets/loading.svg");
      this.loadingImg.style.cssText =
        "position: fixed; top: 20px; right: 20px; z-index: 999999;";
      document.body.appendChild(this.loadingImg);
    }
  
    hideLoadingImage() {
      if (this.loadingImg) {
        this.loadingImg.remove();
        this.loadingImg = null;
      }
    }
  
    show(content) {
      if (!this.overlay) {
        this.createOverlay();
      }
      this.updateOverlayContent(content);
      if (!this.closeButton) {
        this.createCloseButton();
      }
    }
  
    hide() {
      this.removeOverlay();
    }

    isVisible() {
      return this.overlay !== null;
    }
    
    closeButtonExists() {
      return this.closeButton !== null;
    }
  }
  