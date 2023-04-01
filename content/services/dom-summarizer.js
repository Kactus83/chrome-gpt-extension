export class DOMSummarizer {
  constructor() {
    // Vous pouvez initialiser les propriétés ou les configurations ici si nécessaire
  }

  getDOMSummary() {
    // Extraire les balises de titre (h1-h6 et title) pour créer l'architecture de la page
    const regex = /<(h[1-6]|title)[^>]*>(.*?)<\/\1>/gi;
    const matches = Array.from(document.documentElement.outerHTML.matchAll(regex), m => m[0]);

    // Concatène les balises extraites pour créer un DOM synthétique
    const domSummary = matches.join(' ');

    return domSummary;
  }

  getDOMExtract(maxLength = 500) {
    // Extraire les balises pertinentes (title, h1-h6, p et img) pour aider l'IA à comprendre le type de site et le type de page
    const regex = /<(title|h[1-6]|p|img\s+[^>]*src=['"][^'"]+['"])[^>]*>(.*?)(<\/(title|h[1-6]|p)>|\/?>)?/gi;
    const matches = Array.from(document.documentElement.outerHTML.matchAll(regex), m => m[0]);

    // Concatène les balises extraites pour créer un extrait de DOM
    const domExtract = matches.join(' ');

    // Tronquer l'extrait de DOM pour obtenir la longueur désirée
    const truncatedExtract = domExtract.length <= maxLength ? domExtract : domExtract.slice(0, maxLength - 3) + '...';

    return truncatedExtract;
  }
}
