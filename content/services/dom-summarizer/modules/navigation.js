import { TokenCounter } from '../../utils/token-counter.js';

export class Navigation {
  constructor() {
    this.tokenCounter = new TokenCounter();
    // Initialisation si nécessaire
  }

  extractNavigationContent() {
    const regex = /<nav[^>]*>(.*?)<\/nav>/gi;
    const matches = Array.from(document.documentElement.outerHTML.matchAll(regex), m => m[0]);
    return matches.join(' ');
  }

  compressNavigationContent(domExtract) {
    const regex = /<(nav|a\s+[^>]*href=['"][^'"]+['"])[^>]*>(.*?)(<\/(nav)>|\/?>)?/gi;
    const matches = Array.from(domExtract.matchAll(regex), m => m[0].replace(/\s+(class|style)="[^"]*"/gi, ''));

    return matches.join(' ');
  }

  getNavigationContentTokens(domExtract) {
    if (domExtract === null || domExtract === '') {
      return 0;
    }
  
    return this.tokenCounter.countTokensWithHtmlTags(domExtract);
  }  
}
