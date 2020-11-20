<script lang="ts">
  import AddTransaction from "../../sections/Transaction/Add/index.svelte";
  import List from "./List.svelte";

  import { TransactionType } from "types/Transaction";

  const transactions = [];
</script>

<div class="grid lg:grid-cols-2">
  <List {transactions} type={TransactionType.INCOME} />
  <List {transactions} type={TransactionType.EXPENSE} />
  <AddTransaction />
</div>
