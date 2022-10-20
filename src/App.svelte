<script lang="ts">
    import InputTable from "./InputTable.svelte";
    import TransmissionOption from "./TransmissionOption.svelte";

    let rows = [];
    let transmissionOptions = {};

    document.addEventListener("DOMContentLoaded", restoreOptions);

    function saveOptions() {
        const keywordsJSON = JSON.stringify(rows);
        const transmissionOptionsJSON = JSON.stringify(transmissionOptions)

        browser.storage.local.set({
            keywordsJSON: keywordsJSON,
            transmissionOptions: transmissionOptionsJSON,
        });
    }

    async function restoreOptions() {
        const res = await browser.storage.local.get(["keywordsJSON", "transmissionOptions"]);

        if (res.keywordsJSON !== undefined && res.keywordsJSON !== null) {
            const json = res.keywordsJSON.toString();
            rows = JSON.parse(json);
        }

        if (res.tranmissionOptions !== undefined && res.transmissionOptions !== null) {
            const json = res.transmissionOptions.toString();
            transmissionOptions = JSON.parse(json);
        }

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
    <InputTable bind:rows="{rows}"/>

    <TransmissionOption bind:host="{transmissionOptions.host}" bind:port="{transmissionOptions.port}"
                        bind:username="{transmissionOptions.username}" bind:password="{transmissionOptions.password}"
                        bind:ssl="{transmissionOptions.ssl}" bind:path="{transmissionOptions.url}"/>
</main>
