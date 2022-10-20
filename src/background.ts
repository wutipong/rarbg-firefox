import { pageAction, tabs, Tabs } from 'webextension-polyfill'

pageAction.onClicked.addListener(onClicked);

let createdTabs: Tabs.Tab[] = []
let magnets: string[] = []

async function onClicked(tab: Tabs.Tab) {
    if (tab.id == undefined) return

    const resp = await tabs.sendMessage(tab.id, 'getLinks');
    if (resp.type !== "urls") return

    createdTabs = await openTabs(tab.id, resp.urls)
    magnets = []
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

browser.runtime.onMessage.addListener(message => {
    if (message.type !== "magnet") return

    magnets.push(message.url)
    if (magnets.length != createdTabs.length) return

    console.log(magnets)
})
