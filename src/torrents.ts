import * as browser from 'webextension-polyfill'

class ResultType {
    type: string;
    urls: string[];
}

async function listURL() {
    const result: ResultType = {
        type: "urls",
        urls: []
    }

    const settings = await browser.storage?.local?.get('keywordsJSON');
    const keywords = settings.keywordsJSON ? JSON.parse(settings.keywordsJSON.toString()) : [];

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
