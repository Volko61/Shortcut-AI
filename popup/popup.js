document.getElementById('sendButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    if (!userInput) return;
    
    const responseDiv = document.getElementById('response');
    responseDiv.innerText = 'Anwsering...';
    
    const response = await chrome.runtime.sendMessage({ prompt: userInput });
    responseDiv.innerText = response.text || 'Error while responding';
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.prompt) {
        fetchAIResponse(request.prompt).then(data => {
            sendResponse({ text: data.choices[0].text });
        });
        return true;
    }
});