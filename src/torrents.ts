import * as browser from 'webextension-polyfill'
import {LoadKeywords} from "./Keywords";

class ResultType {
    type: string;
    urls: string[];
}

async function listURL() {
    const result: ResultType = {
        type: "urls",
        urls: []
    }

    const keywords = await LoadKeywords(browser.storage.local)

    document.querySelectorAll('a').forEach(e => {
        for (const k of keywords) {
            if (e.text.includes(k)) {
                result.urls.push(e.href);
                break;
            }
        }
    });

    return result
}

browser.runtime.onMessage.addListener(() => listURL());
