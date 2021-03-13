<script lang="ts">
  import { onMount } from "svelte";

  import http from "lib/http";

  import CategoryUpsert from "./Upsert/index.svelte";

  import { list } from "stores/category";

  import List from "./List.svelte";

  onMount(async () => {
    const { categories } = await http("category");
    list.set(categories);
  });
</script>

<div>
  <List />
  <CategoryUpsert />
</div>
