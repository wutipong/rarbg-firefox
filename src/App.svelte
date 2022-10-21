<script lang="ts">
    import InputTable from "./InputTable.svelte";
    import TransmissionOption from "./TransmissionOptionPanel.svelte";
    import {onMount} from "svelte";
    import {loadTransmissionOptions, storeTransmissionOption, TransmissionOptions} from "./transmission";
    import {loadKeywords, storeKeywords} from "./keywords";

    let keywords = [];
    let transmissionOptions: TransmissionOptions

    onMount(()=>{
        loadOptions()
    })

    async function saveOptions() {
        await storeKeywords(browser.storage.local, keywords)
        await storeTransmissionOption(browser.storage.local, transmissionOptions)
    }

    async function loadOptions() {
        transmissionOptions = await loadTransmissionOptions(browser.storage.local)
        keywords = await loadKeywords(browser.storage.local)
    }
</script>

<main>
    <nav class="navbar navbar-expand-lg sticky-top bg-dark">
        <div class="container-fluid">
            <div class="navbar-brand mb-0 h1 text-bg-dark">RARBG - Configuration</div>
            <div class="navbar-nav">
                <button class="btn btn-primary" on:click="{()=>saveOptions()}">Save</button>
            </div>
        </div>
    </nav>

    <div class="container-xxl">
        <h1>Keywords</h1>
        <InputTable bind:keywords="{keywords}"/>

        <h1>Transmission Options</h1>
        <TransmissionOption bind:options="{transmissionOptions}"/>
    </div>
</main>
