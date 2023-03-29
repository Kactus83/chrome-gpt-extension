// content/services/text-detection.js
export class TextDetection {
    constructor() {
      this.selectedText = '';
      this.selectionObserver = null;
    }
  
    observe() {
      if (this.selectionObserver) {
        return;
      }
  
      this.selectionObserver = new MutationObserver(this.updateSelectedText.bind(this));
  
      const observerConfig = {
        childList: true,
        subtree: true,
        characterData: true
      };
  
      this.selectionObserver.observe(document, observerConfig);
      document.addEventListener('selectionchange', this.updateSelectedText.bind(this));
    }
  
    stopObserving() {
      if (!this.selectionObserver) {
        return;
      }
  
      this.selectionObserver.disconnect();
      this.selectionObserver = null;
      document.removeEventListener('selectionchange', this.updateSelectedText.bind(this));
    }
  
    updateSelectedText() {
      this.selectedText = window.getSelection().toString();
    }
  
    getSelectedText() {
      return this.selectedText;
    }
  }
  