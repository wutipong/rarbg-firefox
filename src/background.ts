import { pageAction, tabs, Tabs } from 'webextension-polyfill'

pageAction.onClicked.addListener(onClicked);

async function onClicked(tab: Tabs.Tab) {
    if (tab.id == undefined) return;

    const resp = await tabs.sendMessage(tab.id, 'getLinks');
    switch (resp.type) {
        case "urls":
            openTabs(tab.id, resp.urls)
            break;
        case "magnet":
            tabs.update(tab.id, { url: resp.url })
            break;
    }
}

function openTabs(from: any, links: any[]) {
    links.forEach(link => {
        tabs.create({
            active: false,
            url: link,
            openerTabId: from
        })
    })
}