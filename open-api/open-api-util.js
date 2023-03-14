function submitRequest(prompt) {
    chrome.storage.sync.get('openaiApiKey', function(data) {
      const apiKey = data.openaiApiKey;
  
      // Make API request here using fetch or XMLHttpRequest
      // Example using fetch:
      fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 50,
          n: 1,
          stop: '\n',
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle response data here
      })
      .catch(error => {
        console.error(error);
        // Handle error here
      });
    });
  }
  