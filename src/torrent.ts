import { runtime } from 'webextension-polyfill'

class ResultType {
    type: string;
    url: string;
}

async function findMagnet() {
    let result: ResultType ={
        type: "magnet",
        url: ""
    }
    const nodes = document.querySelectorAll('a');
    for (const n of nodes){
        if (n.href?.includes("magnet:?")) {
            result.url = n.href;
            break;
        }
    }

    return result;
}

runtime.onMessage.addListener(findMagnet);