export interface TransmissionOptions {
    host: string
    port: number
    username: string
    password: string
    ssl: boolean
    url: string
}

const storageKey = "transmissionOptions";

export async function LoadTransmissionOption(storage: browser.storage.StorageArea): Promise<TransmissionOptions> {
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

export async function StoreTransmissionOption(storage: browser.storage.StorageArea, options: TransmissionOptions): Promise<void> {
    let json = JSON.stringify(options)
    await storage.set({
        [storageKey]: json
    })
}
