<script lang="ts">
  import { onMount } from "svelte";

  // import TransactionUpsert from "./Upsert/index.svelte";

  import { TransactionType } from "types/Transaction";
  import http from "lib/http";

  import { list } from "stores/transactions";

  import List from "pages/Transaction/List.svelte";

  onMount(async () => {
    // const { transactions } = await http("transaction");
    // list.set(transactions);
  });
</script>

<div class="grid xl:grid-cols-2">
  <List type={TransactionType.INCOME} />
  <List type={TransactionType.EXPENSE} />
  <!-- <TransactionUpsert /> -->
</div>
