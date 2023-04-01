import { sendOpenAIRequest } from "../../../../utils/api-request.js";

class PageTypeAnalyzer {
  constructor(tab, url, apiKey, apiAddress, aiVersion) {
    this.tab = tab;
    this.url = url;
    this.apiKey = apiKey;
    this.apiAddress = apiAddress;
    this.siteCategory = "";
    this.pageType = "";
    this.aiVersion = aiVersion;
  }

  async init() {
    try {
      const domExtract = await this.getDOMExtractFromContentScript();
      const messages = this.createMessages(domExtract);
      const request = {
        model: this.aiVersion,
        messages: messages,
      };

      const response = await sendOpenAIRequest(this.apiKey, this.apiAddress, request);
      this.processResponse(response);
    } catch (error) {
      console.error("Error in PageTypeAnalyzer:", error);
    }
  }

  async getDOMExtractFromContentScript() {
    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(this.tab.id, { action: 'getDOMExtract' }, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response.domExtract);
        }
      });
    });
  }

  createMessages(domExtract) {
    return [
      {
        role: "system",
        content:
          "You are an AI assistant capable of analyzing website pages and determining their type and category. You can quickly process DOM content and URLs to provide accurate information.",
      },
      {
        role: "user",
        content: `Analyze the following website and provide its category and page type strictly in this format: {site category} | {page type}. Note that a script will analyze the response, so please ensure the category and page type are enclosed in curly braces and separated by a pipe character. The URL is ${this.url}. Here's a snippet of its DOM content: ${domExtract.slice(0, 100)}...`,
      },
    ];
  }

  processResponse(response) {
    if (response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content) {
      const assistantMessage = response.choices[0].message.content.trim();
      const regex = /\{(.*?)\}/g;
      const matches = Array.from(assistantMessage.matchAll(regex), m => m[1]);

      if (matches.length === 2) {
        this.siteCategory = matches[0].trim();
        this.pageType = matches[1].trim();
      }
    }
  }

  getSiteCategory() {
    return this.siteCategory;
  }

  getPageType() {
    return this.pageType;
  }
}

export default PageTypeAnalyzer;
