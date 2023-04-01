import { sendOpenAIRequest } from "../../../../utils/api-request.js";

class PageCodeAnalyzer {
  constructor(url, siteCategory, pageType, apiKey, apiAddress, aiVersion) {
    this.url = url;
    this.siteCategory = siteCategory;
    this.pageType = pageType;
    this.apiKey = apiKey;
    this.apiAddress = apiAddress;
    this.aiVersion = aiVersion;
  }

  async init() {
    try {
      const domSummary = await this.getDOMSummaryFromContentScript();
      const messages = this.createMessages(domSummary);
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

  async getDOMSummaryFromContentScript() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { action: 'getDOMSummary' }, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response.domSummary);
          }
        });
      });
    });
  }

  createMessages(domSummary) {
    return [
      {
        role: "system",
        content:
          "You are an AI assistant capable of analyzing website pages and determining elements that are useful to summarize the page. You can quickly process DOM content and URLs to provide accurate information.",
      },
      {
        role: "user",
        content: `Analyze the following website and provide an array of elements needed for summarizing it. The return will be like this: "[element useful 1, element useful 2, etc...]". Your answer will be processed by a function that searches your array, looks on the page for your indicator, and gets the paragraph after it to summarize. I only need the array in response. The URL is ${this.url}. Here's a summary of its DOM content: ${domSummary}`,
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
