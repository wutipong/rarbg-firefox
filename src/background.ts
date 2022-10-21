import {pageAction, tabs, Tabs} from 'webextension-polyfill'
import {addTorrent, loadTransmissionOptions, testTransmissionConnection} from "./transmission";

pageAction.onClicked.addListener(onClicked);

async function onClicked(tab: Tabs.Tab) {
    if (tab.id == undefined) return

    const resp = await tabs.sendMessage(tab.id, 'getLinks');
    if (resp.type !== "urls") return

    await openTabs(tab.id, resp.urls)
}

async function openTabs(from: any, links: any[]) {
    const promises = []
    links.forEach(link => {
        const p = tabs.create({
            active: false,
            url: link,
            openerTabId: from
        })
        promises.push(p)
    })

    return await Promise.all(promises)
}

browser.runtime.onMessage.addListener(async (message, sender) => {
    const options = await loadTransmissionOptions(browser.storage.local);
    switch (message.type) {
        case "magnet":
            await addTorrent(options, message.url)
            await tabs.remove(sender.tab.id)
            break;

        case "test":
            return await testTransmissionConnection(options);
    }
})


