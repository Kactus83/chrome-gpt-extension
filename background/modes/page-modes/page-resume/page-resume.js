import { getDOMContent } from "../../../utils/dom-request.js";
import { PageTypeAnalyzer } from "../commons/page-type-analyzer.js";

export async function createPageResumeRequest(tabId, language, aiVersion) {
  try {
    const domContent = await getDOMContent(tabId);

    // Utilisez les instances des classes d'analyse
    const pageTypeAnalyzer = new PageTypeAnalyzer(domContent);
    const pageType = await pageTypeAnalyzer.getPageType();
    const category = await pageTypeAnalyzer.getCategory();

    // Utilisez les informations recueillies pour construire la requête
    const messages = getPageResumeMessage(language, pageType, category);

    const request = {
      model: aiVersion,
      messages: messages,
      stream: true
    };

    return request;
  } catch (error) {
    console.error('Error creating page resume request:', error);
    throw error;
  }
}
