const browser = require('webextension-polyfill')

function findMagnet(sendResponse) {
    let result = {}
    result.type = "magnet"

    const nodes = document.querySelectorAll('a');

    for(let i = 0; i< nodes.length; i++){
        e = nodes.item(i);
        if (e.href.includes("magnet:?")) {
           result.url = e.href;
           break;
        }
    }

    sendResponse(result);
}

browser.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    findMagnet(sendResponse)
});