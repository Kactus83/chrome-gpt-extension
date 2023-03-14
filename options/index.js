const apiKeyInput = document.getElementById("api-key");

function saveApiKey() {
  const apiKey = apiKeyInput.value.trim();

  if (!apiKey) {
    return alert("Veuillez entrer une clé API valide.");
  }

  chrome.storage.local.set({ apiKey }, () => {
    alert("Clé API enregistrée avec succès !");
  });
}

function loadApiKey() {
  chrome.storage.local.get("apiKey", (result) => {
    apiKeyInput.value = result.apiKey || "";
  });
}

loadApiKey();

document.getElementById("options-form").addEventListener("submit", (e) => {
  e.preventDefault();
  saveApiKey();
});
