<script lang="ts">

    export let options = {}

    let errorMessage = '<div class="ms-3 text">idle</div>'
    let waiting = false;

    async function testConnection() {
        const p = browser.runtime.sendMessage({type: "test", options: options})
        waiting = true
        errorMessage = '<div class="ms-3 text">please wait.</div>'
        const result = await p
        waiting = false

        console.log(result)

        if (result.success){
            errorMessage = `<div class="ms-3 text text-success">${result.message}</div>`
        } else {
            errorMessage = `<div class="ms-3 text text-danger">${result.message}</div>`
        }

    }
</script>

<form>
    <div class="mb-3">
        <label class="form-label" for="hostnameInput">Hostname</label>
        <input type="text" id="hostnameInput" class="form-control" bind:value={options.host}>
    </div>
    <div class="mb-3">
        <label class="form-label" for="portInput">Port</label>
        <input type="number" id="portInput" class="form-control" bind:value={options.port}>
    </div>
    <div class="mb-3">
        <label class="form-label" for="usernameInput">Username</label>
        <input type="text" id="usernameInput" class="form-control" bind:value={options.username}>
    </div>
    <div class="mb-3">
        <label class="form-label" for="passwordInput">Password</label>
        <input type="password" id="passwordInput" class="form-control" bind:value={options.password}>
    </div>
    <div class="mb-3">
        <label class="form-label" for="ssl-input">SSL</label>
        <div class="form-check" id="ssl-input">
            <input type="checkbox" class="form-check-input" id="ssl-check" bind:checked={options.ssl}>
            <label for="ssl-check">Use SSL</label>
        </div>
    </div>
    <div class="mb-3">
        <label class="form-label" for="pathInput">Path</label>
        <input type="text" id="pathInput" class="form-control" bind:value={options.url}>
    </div>
</form>

<div class="d-flex align-items-baseline">
    {#if waiting}
        <button class="btn btn-info disabled">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Working...
        </button>
    {:else }
        <button class="btn btn-info" on:click={testConnection}>Test Connection</button>
    {/if}

    {@html errorMessage}
</div>
