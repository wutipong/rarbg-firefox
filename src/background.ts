import {pageAction, tabs, Tabs} from 'webextension-polyfill'
import {LoadTransmissionOption} from "./Transmission";

const Transmission = require('transmission-promise')

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
    switch (message.type) {
        case "magnet":
            await addTorrent(message.url)
            await tabs.remove(sender.tab.id)
            break;

        case "test":
            return await testConnection();
    }
})

async function testConnection(): Promise<{success: boolean, message: string}>{
    const options = await LoadTransmissionOption(browser.storage.local);

    try {
        const transmission = new Transmission(options)
        await transmission.sessionStats();
        return {success: true, message: 'success'}
    } catch (e) {
        console.log(e)
        return {success: false, message: e.message}
    }
}

async function addTorrent(url: string) {
    const options = await LoadTransmissionOption(browser.storage.local);

    try {
        const transmission = new Transmission(options)
        await transmission.addUrl(url)
    } catch (e) {
        console.log(e)
    }
}
