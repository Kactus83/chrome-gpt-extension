let request1 = '';
let request2 = '';
let request3 = '';
let request4 = '';

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.requests) {
    [request1, request2, request3, request4] = message.requests;
  }
});

document.addEventListener('DOMContentLoaded', function () {
    var apiKeyInput = document.getElementById('api-key-input');
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
