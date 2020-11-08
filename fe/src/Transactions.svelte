<script lang="ts">
  import { query } from "svelte-apollo";

  import { GET_TRANSACTIONS } from "./gql/transaction/queries";

  import AddTransaction from "./sections/Transaction/Add/index.svelte";
  import Expenses from "./sections/Expenses.svelte";

  import type { Transaction } from "./types/Transaction";

  const transactions = query<{ transactions: Transaction[] }>(GET_TRANSACTIONS);
</script>

<div class="grid lg:grid-cols-2">
  <Expenses {transactions} />
  <!-- <Income /> -->
  <AddTransaction />
</div>
