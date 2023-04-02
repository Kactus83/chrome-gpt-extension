import { TextContent } from './modules/text-content.js';
import { Navigation } from './modules/navigation.js';
import { ImgContent } from './modules/img-content.js';

export class DOMSummarizer {
  constructor() {
    this.textContent = new TextContent();
    this.navigation = new Navigation();
    this.imgContent = new ImgContent();
  }

  getDOMSummary() {
    const domSummary = this.textContent.extractTitlesContent();
    return domSummary;
  }

  getDOMExtract() {
    const maxTokens = 3000;

    // Extraire et compresser les titres
    const titlesExtract = this.textContent.extractTitlesContent();
    const compressedTitles = this.textContent.compressTitlesContent(titlesExtract, maxTokens);
    const titlesTokens = this.textContent.getTitlesContentTokens(compressedTitles);
    console.log(compressedTitles);

    // Extraire et compresser le contenu de navigation
    const navigationExtract = this.navigation.extractNavigationContent();
    const compressedNavigation = this.navigation.compressNavigationContent(navigationExtract);
    const navigationTokens = this.navigation.getNavigationContentTokens(compressedNavigation);
    console.log(compressedNavigation);

    // Extraire et compresser le contenu des images
    const imgExtract = this.imgContent.extractImgContent();
    const compressedImg = this.imgContent.compressImgContent(imgExtract);
    const imgTokens = this.imgContent.getImgContentTokens(compressedImg);
    console.log(compressedImg);

    // Vérifier si les titres et la navigation tiennent dans les 3000 tokens
    if (titlesTokens + navigationTokens <= maxTokens) {
      // Vérifier si les titres, la navigation et les images tiennent dans les 3000 tokens
      if (titlesTokens + navigationTokens + imgTokens <= maxTokens) {
        return compressedTitles + compressedNavigation + compressedImg;
      } else {
        return compressedTitles + compressedNavigation;
      }
    } else {
      return compressedTitles;
    }
  }
}
