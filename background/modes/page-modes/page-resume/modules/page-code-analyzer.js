import { sendOpenAIRequest } from "../../../../utils/api-request.js";

class PageCodeAnalyzer {
  constructor(url, siteCategory, pageType, domContent, apiKey, apiAddress, aiVersion) {
    this.url = url;
    this.siteCategory = siteCategory;
    this.pageType = pageType;
    this.domContent = domContent;
    this.apiKey = apiKey;
    this.apiAddress = apiAddress;
    this.aiVersion = aiVersion;
  }

  async init() {
    try {
      const syntheticDOM = await this.getSyntheticDOM();
      const messages = this.createMessages(syntheticDOM);
      const request = {
        model: this.aiVersion,
        messages: messages,
      };
  
      const response = await sendOpenAIRequest(this.apiKey, this.apiAddress, request);
      console.log("api key : ", this.apiKey);
      console.log(response);
      this.processResponse(response);
    } catch (error) {
      console.error("Error in PageCodeAnalyzer:", error);
    }
  }

  async getSyntheticDOM() {
    // Extrait les balises de titre, en-têtes et paragraphes
    const regex = /<(h[1-6]|title|p)[^>]*>(.*?)<\/\1>/gi;
    const matches = Array.from(this.domContent.matchAll(regex), m => m[0]);

    // Concatène les balises extraites pour créer un DOM synthétique
    const syntheticDOM = matches.join(' ');

    return syntheticDOM;
  }

  createMessages(syntheticDOM) {
    return [
      {
        role: "system",
        content:
          "You are an AI assistant capable of analyzing website pages and determining elements that are usefull to summarize the page. You can quickly process DOM content and URLs to provide accurate information.",
      },
      {
        role: "user",
        content: `Analyze the following website and provide an array of elements needed for summarizing it.return will be like that : " [element usefull 1, element usefull 2, etc ...] ". Your answer will be processed by a fonction that search in your array, looks on the page for your indicator and get paragraph after it to summarize. I only need the array in response. The URL is ${this.url}. Here's a summary of its DOM content: ${syntheticDOM}`,
      },
    ];
  }  

  processResponse(response) {
    if (response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content) {
      const assistantMessage = response.choices[0].message.content.trim();
      console.log("Structured list of elements for summary:", assistantMessage);

    }
  }
}

export default PageCodeAnalyzer;
