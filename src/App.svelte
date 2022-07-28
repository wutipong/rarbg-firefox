<script lang="ts">
    import InputTable from "./InputTable.svelte";

    let rows = [];
    document.addEventListener("DOMContentLoaded", restoreOptions);

    function saveOptions() {
        const keywordsJSON = JSON.stringify(rows);

        browser.storage.local.set({
            keywordsJSON: keywordsJSON,
        });
    }

    async function restoreOptions() {
        const res = await browser.storage.local.get("keywordsJSON");

        if (res.keywordsJSON == null) {
            return;
        }
        const keywordsJSON = res.keywordsJSON.toString();

        rows = JSON.parse(keywordsJSON);
    }
</script>

<main>
    <header>
        <h1>custom rarbg extension - Configurations</h1>
    </header>
    <InputTable {rows}/>
    <footer>
        <button on:click="{()=>saveOptions()}">Save</button>
    </footer>
</main>
