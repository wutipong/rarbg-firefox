const browser = require('webextension-polyfill')

browser.pageAction.onClicked.addListener(() => {
    browser.tabs.query({ currentWindow: true, active: true }).then(function (tabs) {
        let tab = tabs[0]
        if (tab.url.includes("torrents")) {
            browser.tabs.sendMessage(tab.id, 'getLinks').then((links) => {
                openTabs(tab.id, links)
            });
        } else {
            browser.tabs.sendMessage(tab.id, 'getMagnet').then((link) => {
                tabs.update(tab.id, link)
            });
        }
    })

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