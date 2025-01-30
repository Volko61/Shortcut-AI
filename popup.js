// Function to interact with OpenAI compatible API
async function fetchAIResponse(prompt) {
    const response = await fetch("https://groq.volko.org/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer dazd3jiojjoi4dzad978DF9D8ZDAdz"
        },
        body: JSON.stringify({
            model: "gemini-exp-2.0",
            prompt: prompt,
            max_tokens: 100
        })
    });
    return response.json();
}

document.getElementById('sendButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    if (!userInput) return;
    
    const responseDiv = document.getElementById('response');
    responseDiv.innerText = 'Anwsering...';
    
    const response = await chrome.runtime.onMessage({ prompt: userInput });
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

