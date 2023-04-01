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

  getDOMExtract() {
    // Extraire les balises pertinentes (metadata, title, h1-h2, nav, a, et img)
    const regex = /<(title|h[1-2]|nav|a\s+[^>]*href=['"][^'"]+['"]|img\s+[^>]*src=['"][^'"]+['"])[^>]*>(.*?)(<\/(title|h[1-2]|nav)>|\/?>)?/gi;
    const matches = Array.from(document.documentElement.outerHTML.matchAll(regex), m => m[0]);

    // Extraire les balises meta
    const metaRegex = /<meta\s+[^>]*(name|property|itemprop)=['"][^'"]+['"]\s+content=['"][^'"]+['"][^>]*>/gi;
    const metaMatches = Array.from(document.documentElement.outerHTML.matchAll(metaRegex), m => m[0]);

    // Concatène les balises extraites pour créer un extrait de DOM
    const domExtract = [...matches, ...metaMatches].join(' ');

    // Vérifier et tronquer les titres si nécessaire
    const truncatedDomExtract = this.truncateTitlesIfNeeded(domExtract, 3000);

    return truncatedDomExtract;
  }

  truncateTitlesIfNeeded(domExtract, maxTokens) {
    const truncateLevels = [50, 35, 25, 15];

    for (const level of truncateLevels) {
      const truncated = this.truncateTitles(domExtract, level);
      if (this.countTokens(truncated) <= maxTokens) {
        return truncated;
      }
    }

    console.error("DOM Extract is too long even after truncating titles");
    return domExtract;
  }

  truncateTitles(domExtract, maxLength) {
    const regex = /<(h[1-2]|title)[^>]*>(.*?)<\/\1>/gi;

    return domExtract.replace(regex, (match, p1, p2) => {
      const truncatedContent = p2.length > maxLength ? p2.slice(0, maxLength) + '...' : p2;
      return `<${p1}>${truncatedContent}</${p1}>`;
    });
  }

  countTokens(domExtract) {
    // Une estimation simple du nombre de tokens en comptant les mots et en ajoutant un pour chaque balise HTML
    const words = domExtract.split(/\s+/).length;
    const htmlTags = domExtract.match(/<[^>]*>/gi).length;

    return words + htmlTags;
  }

}
