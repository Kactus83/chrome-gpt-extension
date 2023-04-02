export class TokenCounter {
    constructor() {
      // Initialisation si nécessaire
    }
  
    countTokensWithHtmlTags(domExtract) {
      const words = domExtract.split(/\s+/).length;
      const htmlTags = domExtract.match(/<[^>]*>/gi).length;
      return words + htmlTags;
    }
  
    countTokensWithTextOnly(text) {
      const words = text.split(/\s+/).length;
      return words;
    }
  }
  