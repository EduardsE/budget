<script lang="ts">
  import format from "date-fns/esm/format";

  import type { Transaction } from "types/Transaction";
  import { TransactionType } from "types/Transaction";

  import Button from "components/Button.svelte";
  import CategoryBadge from "components/CategoryBadge.svelte";

  import PlusIcon from "svg/Plus.svelte";

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

  const getCategory = (transaction: Transaction) => {
    if ($listById && $listById[transaction.categoryId]) {
      return $listById[transaction.categoryId];
    }
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
  th:nth-of-type(5) {
    width: 53px;
  }
</style>

<div class="container mx-auto px-4">
  <div class="py-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold leading-tight">
        {type === TransactionType.EXPENSE ? 'Expenses' : 'Income'}
      </h2>
      <Button on:click={onAdd}>
        <PlusIcon />
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
                <CategoryBadge category={getCategory(expense)} />
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
