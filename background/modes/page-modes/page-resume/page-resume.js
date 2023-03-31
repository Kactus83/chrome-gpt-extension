import { getDOMContent } from "../../../utils/dom-request.js";
import PageTypeAnalyzer from "../commons/page-type-analyzer.js";
import PageCodeAnalyzer from "./modules/page-code-analyzer.js";

export async function createPageResumeRequest(tabId, aiVersion, apiKey, apiAddress) {
  console.log(tabId, aiVersion, apiKey, apiAddress);
  try {
    const domContent = await getDOMContent(tabId);

    // Récupérer l'URL de la page courante
    const url = await new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        resolve(tabs[0].url);
      });
    });

    // Utiliser l'instance de la classe d'analyse
    const pageTypeAnalyzer = new PageTypeAnalyzer(url, domContent, apiKey, apiAddress, aiVersion);
    await pageTypeAnalyzer.init();
    const pageType = pageTypeAnalyzer.getPageType();
    const category = pageTypeAnalyzer.getSiteCategory();

    // Créer une instance de PageCodeAnalyzer avec les arguments supplémentaires
    const pageCodeAnalyzer = new PageCodeAnalyzer(url, category, pageType, domContent, apiKey, apiAddress, aiVersion);
    await pageCodeAnalyzer.init();

    // Afficher le résultat dans la console
    console.log(`URL: ${url}, Page type: ${pageType}, Category: ${category}`);
  } catch (error) {
    console.error('Error creating page resume request:', error);
    throw error;
  }
}
