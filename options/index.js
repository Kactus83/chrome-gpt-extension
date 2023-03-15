document.addEventListener("DOMContentLoaded", function() {
  const apiKeyInput = document.getElementById("api-key");
  const modelSelect = document.getElementById("model-select");
  const languageSelect = document.getElementById("language-select");
  const saveBtn = document.getElementById("save-btn");
  const editBtn = document.getElementById("edit-btn");
  
  function verifyApiKey(apiKey) {
    if (!apiKey) {
      return false;
    }
  
    // Vérification de l'API key ici
  
    return true;
  }
  
  function activateForm() {
    apiKeyInput.disabled = false;
    modelSelect.disabled = false;
    languageSelect.disabled = false;
    saveBtn.disabled = false; 
    saveBtn.classList.remove("hidden");
    editBtn.classList.add("hidden");
  }
  
  
  function deactivateForm() {
    apiKeyInput.disabled = true;
    modelSelect.disabled = true;
    languageSelect.disabled = true;
    saveBtn.disabled = true; 
    saveBtn.classList.add("hidden");
    editBtn.classList.remove("hidden");
  }
  function loadParameters() {
    chrome.storage.local.get(["apiKey", "ai_version", "language", "api_address"], (result) => {
      const apiKey = result.apiKey || "";
      const aiVersion = result.ai_version || "gpt-3.5-turbo";
      const apiAddress = result.api_address || "https://api.openai.com/v1/chat/completions";
      const lang = result.language || "fr";
  
      // Vérifier si l'API key est valide
      if (!verifyApiKey(apiKey)) {
        activateForm();
        return;
      }
  
      // Définir les valeurs des inputs
      apiKeyInput.value = apiKey;
      modelSelect.value = aiVersion;
      languageSelect.value = lang;
  
      // Enregistrer la version d'IA et la langue dans le stockage local s'ils ne sont pas définis
      if (!result.ai_version) {
        chrome.storage.local.set({ "ai_version": "gpt-3.5-turbo" });
        chrome.storage.local.set({ "api_address": "https://api.openai.com/v1/chat/completions" });
      }
      if (!result.language) {
        chrome.storage.local.set({ "language": lang });
      }
  
      // Désactiver le formulaire
      deactivateForm();
    });
  }
  

  async function saveParameters() {
    const apiKey = apiKeyInput.value.trim();
    const model = modelSelect.value;
    const language = languageSelect.value;
    let apiAddress;
    
    if (model === "gpt-3.5-turbo" || model === "gpt-4" || model === "gpt-4-32k") {
      apiAddress = "https://api.openai.com/v1/chat/completions";
    }
    
    if (!apiKey) {
      return alert("Please enter a valid API key.");
    };
  
    await chrome.storage.local.set({ apiKey, model, language, apiAddress }, () => {
      deactivateForm();
      alert("Options saved successfully!");
    });
  }
  
  loadParameters();
  
  saveBtn.addEventListener("click", () => {
    saveParameters();
  });

  editBtn.addEventListener("click", () => {
    activateForm();
  });
    
});
