<script lang="ts">
    import InputTable from "./InputTable.svelte";
    import TransmissionOption from "./TransmissionOptionPanel.svelte";
    import {onMount} from "svelte";
    import {LoadTransmissionOption, StoreTransmissionOption, TransmissionOptions} from "./Transmission";
    import {LoadKeywords, StoreKeywords} from "./Keywords";

    let keywords = [];
    let transmissionOptions: TransmissionOptions

    onMount(()=>{
        restoreOptions()
    })

    async function saveOptions() {
        await StoreKeywords(browser.storage.local, keywords)
        await StoreTransmissionOption(browser.storage.local, transmissionOptions)
    }

    async function restoreOptions() {
        transmissionOptions = await LoadTransmissionOption(browser.storage.local)
        keywords = await LoadKeywords(browser.storage.local)

        console.log(transmissionOptions)
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
