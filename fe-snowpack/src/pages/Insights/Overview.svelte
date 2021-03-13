<script lang="ts">
  import { afterUpdate } from 'svelte';
  import Cell from 'components/Table/Cell.svelte';

  import type { Category } from 'types/Category';
  import currencyHelper from 'helpers/currency';
  import CategoryBadge from 'components/CategoryBadge.svelte';
  import { TransactionType } from 'types/Transaction';

  const columns = ['Category', 'Amount'];

  export let type: TransactionType = TransactionType.INCOME;

  export let stats: {
    categories: Array<Category & { amount: number }>;
  };

  afterUpdate(() => {
    // console.log(stats);
  });
</script>

{#if stats}
  <div class="inline-block w-full shadow rounded-lg overflow-hidden mt-3">
    <table class="w-full leading-normal">
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
        {#each stats?.categories.filter((category) => category.type === type) as category}
          <tr class="bg-white">
            <Cell>
              <CategoryBadge wrap {category} />
            </Cell>
            <Cell>{currencyHelper.format(category.amount / 100)}</Cell>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}
