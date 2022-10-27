<script lang="ts">
    export let keywords: string[];

    const addRow = () => {
        keywords.push("");
        keywords = keywords;
    };

    const removeRow = (i: number) => {
        keywords.splice(i, 1);
        keywords = keywords;
    };
</script>

<div class="overflow-auto" style="max-height:400px;">
    <table class="table">
        <thead>
        <tr>
            <th>Keyword</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {#each keywords as r, i}
            <tr class="align-middle">
                <td><input class="form-control" bind:value={r}/></td>
                <td>
                    <button class="btn btn-danger" on:click={() => removeRow(i)}>
                    <span>
                        <i class="bi bi-dash-square"></i>
                        &nbsp;Remove
                    </span>
                    </button>
                </td>
            </tr>
        {/each}
        </tbody>
        <tfoot>
        <tr>
            <th>&nbsp;</th>
            <th>
                <button class="btn btn-success" on:click={addRow}><span>
                    <i class="bi bi-plus-square"></i>
                    &nbsp;Add
                    </span>
                </button>
            </th>
        </tr>
        </tfoot>
    </table>
</div>
