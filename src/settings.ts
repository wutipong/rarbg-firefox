document.querySelector("form")?.addEventListener("submit", saveOptions);
document.addEventListener('DOMContentLoaded', restoreOptions);

function saveOptions(e) {
    const keywordsTxt = document.getElementById('keywords-txt') as HTMLInputElement
    let arr = keywordsTxt?.value

    browser.storage.local.set({
        keywords: arr
    })
    e.preventDefault();
}

async function restoreOptions() {
    var res = await browser.storage.local.get('keywords',);

    if (res.keywords == null) return

    const keywordsTxt = document.getElementById('keywords-txt') as HTMLInputElement
    keywordsTxt.value = res.keywords.toString();
}
