<script lang="ts">
  import { gql } from "@apollo/client";
  import { query } from "svelte-apollo";

  import AddTransaction from "./sections/AddTransaction.svelte";
  import Expenses from "./sections/Expenses.svelte";
  import Income from "./sections/Income.svelte";

  import type { Transaction } from "./types/Transaction";

  const GET_TRANSACTIONS = gql`
    query Query {
      transactions {
        title
        date
        test
      }
    }
  `;

  const transactions = query<{ transactions: Transaction[] }>(GET_TRANSACTIONS);
</script>

<div class="grid lg:grid-cols-2">
  <Expenses {transactions} />
  <!-- <Income /> -->
  <AddTransaction />
</div>
