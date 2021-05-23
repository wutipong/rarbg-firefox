const browser = require('webextension-polyfill')

function listURL(sendResponse) {
    const result = [];

    document.querySelectorAll('a').forEach(e => {
        if (!e.text.includes("MetArt")) {
            return
        }
        result.push(e.href);
    });

    sendResponse(result);
}

function findMagnet(sendResponse) {
    const result = "";
    const nodes = document.querySelectorAll('a');

    for(let i = 0; i< nodes.length; i++){
        e = nodes.item(i);
        if (e.href.includes("magnet:?")) {
           result = e.href;
           break;
        }
    }

    sendResponse(result);
}

browser.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if (message === 'getLinks'){
        listURL(message, sender, sendResponse)
    } else if (message === 'getMagnet'){
        findMagnet(sendResponse)
    }
});