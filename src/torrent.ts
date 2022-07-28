import * as browser from 'webextension-polyfill'

class ResultType {
    type: string;
    url: string;
}

async function findMagnet() {
    let result: ResultType = {
        type: "magnet",
        url: ""
    }
    const nodes = document.querySelectorAll('a');
    nodes.forEach((n) => {
        if (n.href?.includes("magnet:?")) {
            result.url = n.href;
        }
    })

    return result;
}

browser.runtime.onMessage.addListener(findMagnet);