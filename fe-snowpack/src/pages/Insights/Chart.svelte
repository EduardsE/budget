<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js';

  import type { Category } from 'types/Category';

  import currencyHelper from 'helpers/currency';
  import { TransactionType } from 'types/Transaction';

  export let type: TransactionType = TransactionType.INCOME;
  export let stats: {
    categories: Array<Category & { amount: number }>;
  };

  onMount(async () => {
    if (!stats) return;

    const { categories } = stats;
    const items = categories.filter((category) => category.type === type);

    // @ts-ignore
    const ctx = document.getElementById(type).getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: items.map(({ amount }) => amount / 100),
            backgroundColor: items.map(
              ({ colorBackground }) => `#${colorBackground}`
            ),
          },
        ],
        labels: items.map(({ title }) => title),
      },
      options: {
        legend: {
          position: 'left',
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const { index } = tooltipItem;
              const value = data.datasets[tooltipItem.datasetIndex].data[index];

              return ` ${data.labels[index]} ${currencyHelper.format(
                value as number
              )}`;
            },
          },
        },
      },
    });
  });
</script>

<div class="bg-white shadow overflow-hidden sm:rounded-lg">
  <div class="px-4 py-5 sm:px-6"><canvas id={type} /></div>
</div>
