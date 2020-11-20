<script lang="ts">
  import format from "date-fns/esm/format";
  import type { Transaction } from "types/Transaction";
  import { TransactionType } from "types/Transaction";

  import Button from "components/Button.svelte";

  import { form, list, upsertOpen } from "stores/transactions";
  import currencyHelper from "src/helpers/currency";

  // https://tailwindcomponents.com/component/table-responsive-with-filters
  const columns = ["Date", "Amount", "Title", "Category", ""];

  export let type: TransactionType;

  const onAdd = () => {
    upsertOpen.set(true);
    form.set({ ...$form, type });
  };

  const onEdit = (transaction: Transaction) => {
    upsertOpen.set(true);
    console.log(transaction);

    form.set({ ...transaction, date: new Date(transaction.date) });
  };
</script>

<style>
  tr:nth-child(even) {
    background-color: #f9fafb;
  }
</style>

<div class="container mx-auto px-4">
  <div class="py-8">
    <div class="flex justify-between">
      <h2 class="text-2xl font-semibold leading-tight">
        {type === TransactionType.EXPENSE ? 'Expenses' : 'Income'}
      </h2>
      <Button on:click={onAdd}>Add</Button>
    </div>
    <div class="mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              {#each columns as column}
                <th
                  class="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {column}
                </th>
              {/each}
            </tr>
          </thead>
          <tbody>
            {#each $list.filter(({ type: type_ }) => type === type_) as expense}
              <tr>
                <td class="p-3 text-sm">
                  <div class="flex items-center">
                    <p class="text-gray-900 whitespace-no-wrap">
                      {format(new Date(expense.date), 'dd/MM/yyyy')}
                    </p>
                  </div>
                </td>
                <td class="p-3 text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {currencyHelper.format(expense.amount)}
                  </p>
                </td>
                <td class="p-3 text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {expense.title}
                  </p>
                </td>
                <td class="p-3 text-sm">
                  <span
                    class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                    <span
                      aria-hidden
                      class="absolute inset-0 bg-red-200 opacity-50 rounded-full" />
                    <span class="relative">{expense.category}</span>
                  </span>
                </td>
                <td
                  class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                  <a
                    on:click={() => onEdit(expense)}
                    href="void(0)"
                    class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
