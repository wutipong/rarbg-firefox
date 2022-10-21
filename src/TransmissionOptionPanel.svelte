<script lang="ts">

    export let options = {}

    let errorMessage = ''

    async function testConnection() {
        const result = await browser.runtime.sendMessage({type: "test", options: options})
        console.log(result)
        errorMessage = result.message
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

<div>
    <button class="btn btn-info" on:click={testConnection}>Test Connection</button>
    <p>{errorMessage}</p>
</div>
