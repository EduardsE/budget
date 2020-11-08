<script lang="ts">
  import { TransactionType } from "../types/Transaction";

  let selected = TransactionType.EXPENSE;

  const radios = [
    {
      label: "Expense",
      value: TransactionType.EXPENSE,
    },
    {
      label: "Income",
      value: TransactionType.INCOME,
    },
  ];
</script>

<div class="grid gap-1 grid-cols-2">
  {#each radios as { label, value }}
    <label
      class={`
        px-9 py-2 rounded-md border border-white-500 text-gray-700 w-full 
        cursor-pointer relative flex items-center hover:border-indigo-500 
        ${value === selected && 'border-indigo-500 bg-indigo-100 text-indigo-900'}`}>
      {label}
      <input
        type="radio"
        {value}
        bind:group={selected}
        class="absolute left-3 cursor-pointer"
        name="radio" />
    </label>
  {/each}
</div>
