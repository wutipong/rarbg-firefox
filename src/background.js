const browser = require('webextension-polyfill')

browser.pageAction.onClicked.addListener(onClicked);

async function onClicked(tab) {
    let resp = await browser.tabs.sendMessage(tab.id, 'getLinks');

    console.log(resp)
    switch (resp.type) {
        case "urls":
            openTabs(tab.id, resp.urls)
            break;
        case "magnet":
            browser.tabs.update(tab.id, { url: resp.url })
            break;
    }
}

function openTabs(from, links) {
    links.forEach(link => {
        browser.tabs.create({
            active: false,
            url: link,
            openerTabId: from
        })
    })
}