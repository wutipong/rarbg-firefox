const storageKey = "keywordsJSON";

export async function storeKeywords(storage: browser.storage.StorageArea, rows: string[]) {
    const json = JSON.stringify(rows);

    await storage.set({
        [storageKey]: json,
    });
}

export async function loadKeywords(storage: browser.storage.StorageArea): Promise<string[]> {
    let rows = []

    const res = await storage.get(storageKey);

    if (res[storageKey] !== undefined && res[storageKey] !== null) {
        const json = res[storageKey].toString();
        rows = JSON.parse(json);
    }

    return rows;
}
