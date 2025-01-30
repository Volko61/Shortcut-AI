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

