const Transmission = require('transmission-promise')

export interface TransmissionOptions {
    host: string
    port: number
    username: string
    password: string
    ssl: boolean
    url: string
}

const storageKey = "transmissionOptions";

export async function loadTransmissionOptions(storage: browser.storage.StorageArea): Promise<TransmissionOptions> {
    let output: TransmissionOptions = {
        host: 'localhost',
        port: 9091,
        username: '',
        password: '',
        ssl: false,
        url: '/transmission/rpc',
    }
    const res = await storage.get(storageKey)

    if (res[storageKey] !== undefined && res[storageKey] !== null) {
        const json = res.transmissionOptions.toString();
        output = JSON.parse(json);
    }

    return output
}

export async function storeTransmissionOption(storage: browser.storage.StorageArea, options: TransmissionOptions): Promise<void> {
    let json = JSON.stringify(options)
    await storage.set({
        [storageKey]: json
    })
}

export async function testTransmissionConnection(options: TransmissionOptions): Promise<{success: boolean, message: string}>{
    try {
        const transmission = new Transmission(options)
        await transmission.sessionStats();
        return {success: true, message: 'success'}
    } catch (e) {
        console.log(e)
        return {success: false, message: e.message}
    }
}

export async function addTorrent(options: TransmissionOptions, url: string) {
    try {
        const transmission = new Transmission(options)
        await transmission.addUrl(url)
    } catch (e) {
        console.log(e)
    }
}
