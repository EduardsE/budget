<script lang="ts">
  import Chart from './Chart.svelte';

  import { onMount } from 'svelte';

  import type { Category } from 'types/Category';
  import http from 'lib/http';

  import Overview from './Overview.svelte';
  import { TransactionType } from 'types/Transaction';

  type Res = {
    stats: {
      categories: Array<Category & { amount: number }>;
    };
  };

  let stats: Res['stats'];

  onMount(async () => {
    let res = await http<Res>('stats');
    stats = res.stats;
  });
</script>

{#if stats}
  <div class="py-8">
    <div class="grid grid-cols-2">
      <!-- Expenses -->
      <div class="container mx-auto px-4">
        <Chart {stats} type={TransactionType.EXPENSE} />
        <Overview {stats} type={TransactionType.EXPENSE} />
      </div>

      <!-- Income -->
      <div class="container mx-auto px-4">
        <Chart {stats} type={TransactionType.INCOME} />
        <Overview {stats} type={TransactionType.INCOME} />
      </div>
    </div>
  </div>
{/if}
