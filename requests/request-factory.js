import { getAnswerMessage } from "./modes/answer-mode.js";
import { getSolveMessage } from "./modes/solve-mode.js";
import { getResumeMessage } from "./modes/resume-mode.js";
import { getExplainMessage } from "./modes/explain-mode.js";

export async function createRequest(mode, selectedText, lang, _aiVersion) {
  let messages = [];
  switch (mode) {
    case 1:
      messages = getExplainMessage(selectedText, lang);
      break;
    case 2:
      messages = getResumeMessage(selectedText, lang);
      break;
    case 3:
      messages = getSolveMessage(selectedText, lang);
      break;
    case 4:
      messages = getAnswerMessage(selectedText, lang);
      break;
    default:
      throw new Error("Invalid mode");
  }

  // Construire la requête
  const request = {
    model: _aiVersion,
    messages: messages,
  };
  return request;
}
