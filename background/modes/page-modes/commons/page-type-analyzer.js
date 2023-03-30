import { sendOpenAIRequest } from "../../utils/api-request.js";

class PageTypeAnalyzer {
  constructor(url, domContent, apiKey, apiAddress) {
    this.url = url;
    this.domContent = domContent;
    this.apiKey = apiKey;
    this.apiAddress = apiAddress;
    this.siteCategory = "";
    this.pageType = "";
  }

  async init() {
    try {
      const messages = this.createMessages();
      const request = {
        model: "text-davinci-002",
        messages: messages,
      };

      const response = await sendOpenAIRequest(this.apiKey, this.apiAddress, request);
      this.processResponse(response);
    } catch (error) {
      console.error("Error in PageTypeAnalyzer:", error);
    }
  }

  createMessages() {
    return [
      {
        role: "system",
        content:
          "You are an AI assistant capable of analyzing website pages and determining their type and category. You can quickly process DOM content and URLs to provide accurate information.",
      },
      {
        role: "user",
        content: `Analyze the following website and provide its category and page type in this format: [site category / page type]. The URL is ${this.url}. Here's a snippet of its DOM content: ${this.domContent.slice(0, 100)}...`,
      },
    ];
  }

  processResponse(response) {
    const assistantMessage = response.choices[0].text.trim();
    const [siteCategory, pageType] = assistantMessage.split(" / ");

    this.siteCategory = siteCategory;
    this.pageType = pageType;
  }

  getSiteCategory() {
    return this.siteCategory;
  }

  getPageType() {
    return this.pageType;
  }
}

export default PageTypeAnalyzer;
