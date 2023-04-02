import { TokenCounter } from '../../utils/token-counter.js';

export class TextContent {
  constructor() {
    this.tokenCounter = new TokenCounter();
    // Initialisation si nécessaire
  }

  extractFullTextContent() {
    // Implémenter l'extraction du contenu textuel
  }

  extractTitlesContent() {
    const regex = /<(h[1-6]|title)[^>]*>(.*?)<\/\1>/gi;
    const matches = Array.from(document.documentElement.outerHTML.matchAll(regex), m => m[0]);
    return matches.join(' ');
  }

  compressFullTextContent() {
    // Implémenter la compression du contenu textuel
  }

  compressTitlesContent(domExtract, maxTokens) {
    const truncateLevels = [50, 35, 25, 15];

    for (const level of truncateLevels) {
      const truncated = this.truncateTitles(domExtract, level);
      if (this.tokenCounter.countTokensWithHtmlTags(truncated) <= maxTokens) {
        return truncated;
      }
    }

    console.error("DOM Extract is too long even after truncating titles");
    return domExtract;
  }

  truncateTitles(domExtract, maxLength) {
    const regex = /<(h[1-3]|title)[^>]*>(.*?)<\/\1>/gi;

    return domExtract.replace(regex, (match, p1, p2) => {
      const truncatedContent = p2.length > maxLength ? p2.slice(0, maxLength) + '...' : p2;
      return `<${p1}>${truncatedContent}</${p1}>`;
    });
  }

  getFullTextContentTokens() {
    // Calculer le nombre de tokens du contenu textuel compressé
  }

  getTitlesContentTokens(domExtract) {
    return this.tokenCounter.countTokensWithHtmlTags(domExtract);
  }
}
