document.addEventListener('DOMContentLoaded', function () {
    var apiKeyInput = document.getElementById('api-key');
    chrome.storage.sync.get('openaiApiKey', function (data) {
        apiKeyInput.value = data.openaiApiKey || '';
    });
    var saveButton = document.querySelector('button[type="submit"]');
    saveButton.addEventListener('click', function () {
        var apiKey = apiKeyInput.value.trim();
        if (apiKey !== '') {
            chrome.storage.sync.set({ 'openaiApiKey': apiKey }, function () {
                alert('API Key saved.');
            });
        }
        else {
            alert('Please enter your API Key.');
        }
    });
});
