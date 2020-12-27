<script lang="ts">
  import { onMount } from "svelte";

  import http from "src/lib/http";

  import { list } from "stores/category";

  import List from "./List.svelte";

  onMount(async () => {
    const { categories } = await http("category");
    list.set(categories);
  });
</script>

<div>
  <List />
</div>
