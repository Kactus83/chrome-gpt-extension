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
    chrome.storage.local.get("apiKey", (result) => {
      const apiKey = result.apiKey || "";
  
      if (!verifyApiKey(apiKey)) {
        activateForm();
        return;
      }
  
      apiKeyInput.value = apiKey;
      modelSelect.value = "gpt-3.5-turbo";
      languageSelect.value = "en";
      deactivateForm();
    });
  }

  function saveParameters() {
    const apiKey = apiKeyInput.value.trim();
    const model = modelSelect.value;
    const language = languageSelect.value;
  
    if (!apiKey) {
      return alert("Please enter a valid API key.");
    }
  
    chrome.storage.local.set({ apiKey, model, language }, () => {
      deactivateForm();
      alert("Options saved successfully!");
    });
  }
  
  saveBtn.addEventListener("click", () => {
    saveParameters();
  });
  
  
  loadParameters();
  
  document.getElementById("options-form").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const apiKey = apiKeyInput.value.trim();
  
    if (!verifyApiKey(apiKey)) {
      return alert("Please enter a valid API key.");
    }
  
    chrome.storage.local.set({ apiKey }, () => {
      deactivateForm();
      alert("Options saved successfully!");
    });
  });
  
  saveBtn.addEventListener("click", () => {
    saveParameters();
  });

  editBtn.addEventListener("click", () => {
    activateForm();
  });
    
});
