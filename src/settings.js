document.querySelector("form").addEventListener("submit", saveOptions);
document.addEventListener('DOMContentLoaded', restoreOptions);

function saveOptions(e) {
    const keywordsTxt = document.getElementById('keywords-txt')
    let arr = keywordsTxt.value.split(',')

    browser.storage.local.set({
        keywords: arr
    })
    e.preventDefault();
}

async function restoreOptions() {
    var res = await browser.storage.local.get('keywords');

    if (res.keywords == null) return
    const keywordsTxt = document.getElementById('keywords-txt')
    keywordsTxt.value = res.keywords.join(',');
}
