<script lang="ts">
  import format from "date-fns/esm/format";
  import type { Transaction } from "types/Transaction";
  import { TransactionType } from "types/Transaction";

  import Button from "components/Button.svelte";

  import { listById } from "stores/category";

  import { form, list, upsertOpen } from "stores/transactions";
  import currencyHelper from "src/helpers/currency";

  // https://tailwindcomponents.com/component/table-responsive-with-filters
  const columns = ["Date", "Amount", "Title", "Category", ""];

  export let type: TransactionType;

  const onAdd = () => {
    upsertOpen.set(true);
    form.set({ ...$form, type });
  };

  const onEdit = ({ date, amount, ...rest }: Transaction) => {
    upsertOpen.set(true);
    form.set({ ...rest, date: new Date(date), amount: amount / 100 });
  };
</script>

<style>
  th:nth-of-type(1) {
    width: 100px;
  }
  th:nth-of-type(2) {
    width: 84px;
  }
  th:nth-of-type(4) {
    width: 134px;
  }
  td .category {
    text-overflow: ellipsis;
    max-width: 100%;
    white-space: nowrap;
  }
  th:nth-of-type(5) {
    width: 53px;
  }
  .category-wrap {
    max-width: 110px;
    display: inherit;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>

<div class="container mx-auto px-4">
  <div class="py-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold leading-tight">
        {type === TransactionType.EXPENSE ? 'Expenses' : 'Income'}
      </h2>
      <Button on:click={onAdd}>
        <svg
          class="-ml-1 mr-2 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add
      </Button>
    </div>
    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            {#each columns as column}
              <th
                class="px-3 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {column}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each $list.filter(({ type: type_ }) => type === type_) as expense}
            <tr class="bg-white">
              <td class="p-3 text-sm">
                <div class="flex items-center">
                  <p class="text-gray-900 whitespace-no-wrap">
                    {format(new Date(expense.date), 'dd/MM/yyyy')}
                  </p>
                </div>
              </td>
              <td class="p-3 text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {currencyHelper.format(expense.amount / 100)}
                </p>
              </td>
              <td class="p-3 text-sm">
                <p class="text-gray-900 whitespace-no-wrap">
                  {expense && expense.title}
                </p>
              </td>
              <td class="p-3 text-sm">
                <span
                  class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight category-wrap">
                  <span
                    aria-hidden
                    class="absolute inset-0 bg-red-200 opacity-50 rounded-full" />
                  <span
                    class="relative category whitespace-nowrap">{$listById && $listById[expense.categoryId] && $listById[expense.categoryId].title}</span>
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                <a
                  on:click={() => onEdit(expense)}
                  href={'#'}
                  class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
