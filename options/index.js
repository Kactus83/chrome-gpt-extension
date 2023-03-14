const apiKeyInput = document.getElementById("api-key");
const saveBtn = document.getElementById("save-btn");
const editBtn = document.getElementById("edit-btn");

function saveApiKey() {
  const apiKey = apiKeyInput.value.trim();

  if (!apiKey) {
    return alert("Please enter a valid API key.");
  }

  chrome.storage.local.set({ apiKey }, () => {
    apiKeyInput.classList.add("disabled");
    saveBtn.classList.add("hidden");
    editBtn.classList.remove("hidden");
    alert("API Key saved successfully!");
  });
}

function loadApiKey() {
  chrome.storage.local.get("apiKey", (result) => {
    const apiKey = result.apiKey || "";

    apiKeyInput.value = apiKey;

    if (apiKey) {
      apiKeyInput.classList.add("disabled");
      saveBtn.classList.add("hidden");
      editBtn.classList.remove("hidden");
    } else {
      apiKeyInput.classList.remove("disabled");
      saveBtn.classList.remove("hidden");
      editBtn.classList.add("hidden");
    }
  });
}

loadApiKey();

document.getElementById("options-form").addEventListener("submit", (e) => {
  e.preventDefault();
  saveApiKey();
});

editBtn.addEventListener("click", () => {
  apiKeyInput.classList.remove("disabled");
  saveBtn.classList.remove("hidden");
  editBtn.classList.add("hidden");
});
