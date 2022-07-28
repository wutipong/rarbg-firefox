<script lang="ts">
  import InputTable from "./InputTable.svelte";

  let rows = ["hello", "world"];
  document.addEventListener("DOMContentLoaded", restoreOptions);

  function saveOptions() {
    const keywordsJSON = JSON.stringify(rows);

    browser.storage.local.set({
      keywordsJSON: keywordsJSON,
    });
  }

  async function restoreOptions() {
    var res = await browser.storage.local.get("keywordsJSON");

    if (res.keywordsJSON == null) {
      rows = [];
      return;
    }
    const keywordsJSON = res.keywordsJSON.toString();

    rows = JSON.parse(keywordsJSON);
  }
</script>

<main>
  <InputTable {rows} />
  <button on:click="{()=>saveOptions()}">Save</button>
</main>
