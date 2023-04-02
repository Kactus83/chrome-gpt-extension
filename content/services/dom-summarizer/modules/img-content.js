import { TokenCounter } from '../../utils/token-counter.js';

export class ImgContent {
  constructor() {
    this.tokenCounter = new TokenCounter();
    // Initialisation si nécessaire
  }

  extractImgContent() {
    const regex = /<img[^>]*>/gi;
    const matches = Array.from(document.documentElement.outerHTML.matchAll(regex), m => m[0]);
    return matches.join(' ');
  }

  compressImgContent(domExtract) {
    const regex = /<(img\s+[^>]*src=['"][^'"]+['"])[^>]*>/gi;
    const matches = Array.from(domExtract.matchAll(regex), m => m[0].replace(/\s+(class|style)="[^"]*"/gi, ''));

    return matches.join(' ');
  }

  getImgContentTokens(domExtract) {
    return this.tokenCounter.countTokensWithHtmlTags(domExtract);
  }
}
