const browser = require('webextension-polyfill')

async function listURL() {
    const result = {};
    result.type = "urls"
    result.urls = []
    
    let keywords = []
    let settings = await browser.storage.local.get('keywords');
    if (settings.keywords != null){
        keywords = settings.keywords
    }

    document.querySelectorAll('a').forEach(e => {
        for(let i = 0; i<keywords.length; i++){
            k = keywords[i]
            if (e.text.includes(k)){
                result.urls.push(e.href);
            }
        }
    });

    return result
}

browser.runtime.onMessage.addListener(listURL);