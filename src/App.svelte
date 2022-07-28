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
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <div class="navbar-brand">RARBG - Configuration</div>
            <div class="navbar-nav">
                <button class="btn btn-primary" on:click="{()=>saveOptions()}">Save</button>
            </div>
        </div>
    </nav>
    <InputTable {rows}/>
</main>
