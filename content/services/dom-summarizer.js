export class DOMSummarizer {
    constructor() {
      // Vous pouvez initialiser les propriétés ou les configurations ici si nécessaire
    }
  
    getDOMSummary() {
      // Ici, vous pouvez implémenter la logique pour créer un résumé du DOM
      // Par exemple, vous pouvez extraire les balises de titre, en-têtes et paragraphes
      const regex = /<(h[1-6]|title|p)[^>]*>(.*?)<\/\1>/gi;
      const matches = Array.from(document.documentElement.outerHTML.matchAll(regex), m => m[0]);
  
      // Concatène les balises extraites pour créer un DOM synthétique
      const domSummary = matches.join(' ');
  
      return domSummary;
    }
  }
  