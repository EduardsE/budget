<script lang="ts">
  import { TransactionType } from "../types/Transaction";

  let active: TransactionType = TransactionType.INCOME;

  const classes =
    "p-4 py-2 rounded-md border border-white-500 text-gray-700 w-full";

  const activeClasses = "border-indigo-500 bg-indigo-100 text-indigo-900 ";

  const toggle = (type: TransactionType) => {
    console.log(type);
    active = type;
  };
</script>

<div class="flex">
  <button
    type="button"
    on:click={() => toggle(TransactionType.EXPENSE)}
    class={`${classes} rounded-r-none ${active === TransactionType.EXPENSE ? activeClasses : 'border-r-0'}`}>Expense</button>
  <button
    type="button"
    on:click={() => toggle(TransactionType.INCOME)}
    class={`${classes} rounded-l-none ${active === TransactionType.INCOME ? activeClasses : 'border-l-0'}`}>Income</button>
</div>
