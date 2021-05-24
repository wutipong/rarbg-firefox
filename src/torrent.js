const browser = require('webextension-polyfill')

async function findMagnet() {
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

    return result;
}

browser.runtime.onMessage.addListener(findMagnet);