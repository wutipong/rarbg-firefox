const browser = require('webextension-polyfill')

browser.pageAction.onClicked.addListener((tab) => {
    browser.tabs.sendMessage(tab.id, 'getLinks').then((r) => {
        switch (r.type) {
            case "urls":
                openTabs(tab.id, r.urls)
                break;
            case "magnet":
                browser.tabs.update(tab.id, {url: r.url})
                brak
        }
    });
});

function openTabs(from, links) {
    links.forEach(link => {
        browser.tabs.create({
            active: false,
            url: link,
            openerTabId: from
        })
    })
}