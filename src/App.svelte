<script lang="ts">
    import InputTable from "./InputTable.svelte";
    import TransmissionOption from "./TransmissionOptionPanel.svelte";
    import {onMount} from "svelte";
    import {loadTransmissionOptions, storeTransmissionOption, TransmissionOptions} from "./transmission";
    import {loadKeywords, storeKeywords} from "./keywords";
    import * as bootstrap from "bootstrap"

    let keywords = [];
    let transmissionOptions: TransmissionOptions

    let modalTitle = ""
    let modalBody = ""
    let modalIcon = ""

    onMount(()=>{
        loadOptions()
    })

    async function saveOptions() {
        try {
            await storeKeywords(browser.storage.local, keywords)
            await storeTransmissionOption(browser.storage.local, transmissionOptions)
            await showModal("Configuration Updated", "Configuration is updated successfully.")
        } catch (e) {
            await showModal("Error", e.message)
        }
    }

    async function loadOptions() {
        transmissionOptions = await loadTransmissionOptions(browser.storage.local)
        keywords = await loadKeywords(browser.storage.local)
    }

    enum Severity {
        Information,
        Warning,
        Error
    }
    async function showModal(title: string, body: string, severity = Severity.Information): Promise<void> {
        const modal = new bootstrap.Modal(document.getElementById('modal'))
        modalTitle = title
        modalBody = body

        switch (severity)  {
            case Severity.Information:
                modalIcon = "<i class=\"bi bi-info-circle text-info\"></i>"
                break;

            case Severity.Warning:
                modalIcon = "<i class=\"bi bi-exclamation-circle text-warning\"></i>"
                break;

            case Severity.Error:
                modalIcon = "<i class=\"bi bi-x-circle text-danger\"></i>"
                break;
        }
        await modal.show()
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

    <div class="modal" tabindex="-1" id="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{@html modalIcon} &nbsp; {modalTitle}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>{modalBody}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</main>
