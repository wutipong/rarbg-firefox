<script lang="ts">
    export let host = 'localhost'
    export let port = 9091
    export let username = ''
    export let password = ''
    export let ssl= false
    export let path= '/transmission/rpc'
</script>

<form>
    <div class="mb-3">
        <label class="form-label">Hostname</label>
        <input type="text" class="form-control" bind:value={host}>
    </div>
    <div class="mb-3">
        <label class="form-label">Port</label>
        <input type="number" class="form-control" bind:value={port}>
    </div>
    <div class="mb-3">
        <label class="form-label">Username</label>
        <input type="text" class="form-control" bind:value={username}>
    </div>
    <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" class="form-control" bind:value={password}>
    </div>
    <div class="mb-3">
        <label class="form-label" for="ssl-check">SSL</label>
        <input type="checkbox" class="form-check-input" id="ssl-check" bind:checked={ssl}><label>ON</label>
    </div>
    <div class="mb-3">
        <label class="form-label">Path</label>
        <input type="text" class="form-control" bind:value={path}>
    </div>
</form>
