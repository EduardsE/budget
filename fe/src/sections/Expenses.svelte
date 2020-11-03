<script lang="ts">
  import { format } from "date-fns";
  import { afterUpdate } from "svelte";
  import type { ReadableQuery } from "svelte-apollo";
  import type { Transaction } from "../types/Transaction";

  import Button from "./../components/Button.svelte";

  import { form, upsertOpen } from "./../stores/transactions";

  // https://tailwindcomponents.com/component/table-responsive-with-filters
  const columns = ["Date", "Amount", "Title", "Category", ""];
  export let transactions: ReadableQuery<{ transactions: Transaction[] }>;

  // let internalTrans;

  // transactions.subscribe((res) => {
  //   internalTrans = res;
  //   console.log(internalTrans);
  // });

  afterUpdate(() => {
    console.log($transactions);
  });
</script>

<style>
  tr:nth-child(even) {
    background-color: #f9fafb;
  }
</style>

<div class="container mx-auto px-4">
  {#if $transactions.loading}
    Loading...
  {:else if $transactions.error}
    Error...
  {:else}
    <div class="py-8">
      <div class="flex justify-between">
        <h2 class="text-2xl font-semibold leading-tight">Expenses</h2>
        <Button on:click={() => upsertOpen.set(true)}>Add</Button>
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
              {#each $transactions.data.transactions as expense}
                <tr>
                  <td class="p-3 text-sm">
                    <div class="flex items-center">
                      <p class="text-gray-900 whitespace-no-wrap">
                        {format(new Date(expense.date), 'dd/MM/yyyy')}
                      </p>
                    </div>
                  </td>
                  <td class="p-3 text-sm">
                    <p class="text-gray-900 whitespace-no-wrap">Admin</p>
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
                      on:click={() => {
                        upsertOpen.set(true);
                        // form.set(expense);
                      }}
                      href="javascript:void(0)"
                      class="text-indigo-600 hover:text-indigo-900">Edit</a>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  {/if}
</div>
