// background.js
chrome.runtime.onInstalled.addListener(() => {
    chrome.action.onClicked.addListener((tab) => {
        openChatWindow();
    });

    chrome.commands.onCommand.addListener((command) => {
        if (command === "open_chat") {
            openChatWindow();
        }
    });
});

function openChatWindow() {
    chrome.windows.create({
        url: "popup.html",
        type: "popup",
        width: 400,
        height: 600
    });
}

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