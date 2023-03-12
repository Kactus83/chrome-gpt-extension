// Récupération de l'élément du formulaire où l'utilisateur peut entrer sa clé API
const apiKeyInput = document.getElementById("api-key-input");

// Fonction pour sauvegarder la clé API dans le stockage local
function saveApiKey() {
  const apiKey = apiKeyInput.value.trim();

  if (!apiKey) {
    return alert("Veuillez entrer une clé API valide.");
  }

  chrome.storage.local.set({ apiKey }, () => {
    alert("Clé API enregistrée avec succès !");
  });
}

// Fonction pour charger la clé API depuis le stockage local
function loadApiKey() {
  chrome.storage.local.get("apiKey", (result) => {
    apiKeyInput.value = result.apiKey || "";
  });
}

// Chargement de la clé API lors du chargement de la page des options
loadApiKey();

// Enregistrement de la clé API lors de la soumission du formulaire
document.getElementById("options-form").addEventListener("submit", (e) => {
  e.preventDefault();
  saveApiKey();
});
