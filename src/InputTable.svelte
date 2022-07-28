<script>
    let rows = [];

    const addRow = () => {
        rows.push("AAA");
        rows = rows;
    };

    const removeRow = (i) =>{
        rows.splice(i, 1);
        rows = rows;
    }
</script>

<table>
    <thead>
        <tr>
            <th>Keyword</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        {#each rows as r, i}
            <tr>
                <td><input bind:value={r}></td>
                <td><button on:click={()=>removeRow(i)}>delete</button></td>
            </tr>
        {/each}
    </tbody>
    <tfoot>
        <tr>
            <th></th>
            <th><button on:click={addRow}>
                add
            </button></th>
        </tr>
    </tfoot>
</table>



