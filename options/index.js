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
  
  async function loadParameters() {
    const defaultOptions = {
      ai_version: "gpt-3.5-turbo",
      api_address: "https://api.openai.com/v1/chat/completions",
      language: "fr"
    };
    const storedOptions = await new Promise((resolve) => {
      chrome.storage.local.get(["apiKey", "ai_version", "language", "api_address"], (result) => {
        resolve({
          apiKey: result.apiKey || "",
          ai_version: result.ai_version || "",
          api_address: result.api_address || "",
          language: result.language || "",
        });
      });
    });
    
    // Enregistrer la version d'IA et la langue dans le stockage local s'ils ne sont pas définis
    Object.keys(defaultOptions).forEach((key) => {
      if (!storedOptions[key]) {
        chrome.storage.local.set({ [key]: defaultOptions[key] });
        storedOptions[key] = defaultOptions[key];
      }
    });
  
    // Vérifier si l'API key est valide
    if (!verifyApiKey(storedOptions.apiKey)) {
      activateForm();
      return;
    }
  
    // Définir les valeurs des inputs
    apiKeyInput.value = storedOptions.apiKey;
    modelSelect.value = storedOptions.ai_version;
    languageSelect.value = storedOptions.language;
  
    // Désactiver le formulaire
    deactivateForm();
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
  
    await new Promise((resolve) => {
      chrome.storage.local.set({ apiKey, ai_version: model, language, api_address: apiAddress }, () => {
        deactivateForm();
        console.log("Options saved successfully!");
        resolve();
      });
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
