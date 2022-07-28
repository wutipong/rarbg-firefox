<script lang="ts">
    export let rows: string[];

    const addRow = () => {
        rows.push("");
        rows = rows;
    };

    const removeRow = (i: number) => {
        rows.splice(i, 1);
        rows = rows;
    };
</script>

<table class="table">
    <thead>
    <tr>
        <th>Keyword</th>
        <th>Action</th>
    </tr>
    </thead>
    <tbody>
    {#each rows as r, i}
        <tr>
            <td><input class="form-control" bind:value={r}/></td>
            <td>
                <button class="btn btn-danger" on:click={() => removeRow(i)}>-</button>
            </td>
        </tr>
    {/each}
    </tbody>
    <tfoot>
    <tr>
        <th/>
        <th>
            <button class="btn btn-success" on:click={addRow}>+</button>
        </th>
    </tr>
    </tfoot>
</table>
