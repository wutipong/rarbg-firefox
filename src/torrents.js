const browser = require('webextension-polyfill')

function listURL(sendResponse) {
    const result = {};
    result.type = "urls"
    result.urls = []

    document.querySelectorAll('a').forEach(e => {
        if (!e.text.includes("MetArt")) {
            return
        }
        result.urls.push(e.href);
    });

    sendResponse(result);
}

browser.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    listURL(sendResponse)
});