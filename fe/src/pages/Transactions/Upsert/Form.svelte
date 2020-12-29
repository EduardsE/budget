<script lang="ts">
  import Datepicker from "svelte-calendar";
  import format from "date-fns/format";

  import Button from "components/Button.svelte";
  import TransactionType from "components/TransactionType.svelte";

  import { list as categories } from "stores/category";

  import { form as formData, list } from "stores/transactions";
  import http from "src/lib/http";

  export let onClose: () => void;

  const currencySymbols = {
    EUR: "€",
    USD: "$",
  };

  let currency = "EUR";

  let formattedSelected: string;

  const onUpdate = async () => {
    try {
      const { amount, id, ...rest } = $formData;

      const { transaction } = await http(`transaction/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...rest,
          amount: amount * 100,
        }),
      });

      list.update((transactions) =>
        transactions.map((item) => {
          if (item.id === id) {
            return transaction;
          }
          return item;
        })
      );
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const onCreate = async () => {
    try {
      const { amount, ...rest } = $formData;
      console.log(rest);

      const { transaction } = await http("transaction", {
        method: "POST",
        body: JSON.stringify({
          ...rest,
          amount: amount * 100,
        }),
      });

      list.update((transactions) => [...transactions, transaction]);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!$formData.categoryId) {
    formData.update((prev) => ({ ...prev, categoryId: $categories[0].id }));
  }
</script>

<div class="p-4">
  <form action="#" method="POST">
    <div class="grid grid-cols-6 gap-6">
      <div class="col-span-6">
        <TransactionType />
      </div>
      <div class="col-span-6">
        <label
          for="amount"
          class="block text-sm leading-5 font-medium text-gray-700">Price</label>
        <div class="mt-1 relative rounded-md shadow-sm">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span
              class="text-gray-500 sm:text-sm sm:leading-5">{currencySymbols[currency]}</span>
          </div>
          <input
            id="amount"
            type="number"
            min="0"
            bind:value={$formData.amount}
            class="form-input block w-full pl-7 pr-12 sm:text-sm sm:leading-5"
            placeholder="0.00" />
          <div class="absolute inset-y-0 right-0 flex items-center">
            <select
              bind:value={currency}
              aria-label="Currency"
              class="form-select h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm sm:leading-5">
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>
        </div>
      </div>

      <div class="col-span-6">
        <label
          for="title"
          class="block text-sm font-medium leading-5 text-gray-700">Title</label>
        <input
          id="title"
          bind:value={$formData.title}
          class="form-input mt-1 block w-full py-2 px-3 sm:text-sm sm:leading-5" />
      </div>

      <div class="col-span-6">
        <label
          for="category"
          class="block text-sm font-medium leading-5 text-gray-700">Category</label>
        <select
          id="category"
          bind:value={$formData.categoryId}
          class="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
          {#each $categories as { id, title }}
            <option value={id}>{title}</option>
          {/each}
        </select>
      </div>

      <div class="col-span-6">
        <label
          for="date"
          class="block text-sm font-medium leading-5 text-gray-700">Date</label>
        <Datepicker
          style="width: 100%"
          bind:selected={$formData.date}
          bind:formattedSelected
          format={(date) => format(date, 'dd/MM/yyyy')}>
          <input
            id="date"
            bind:value={formattedSelected}
            class="form-input mt-1 block w-full py-2 px-3 sm:text-sm sm:leading-5" />
        </Datepicker>
      </div>
    </div>

    <div class="px-4 py-4 text-right absolute w-full bottom-0 left-0 border-t">
      <Button addClass="mr-3" variant="light" on:click={onClose}>Cancel</Button>
      <Button
        variant="primary"
        type="button"
        on:click={$formData.id ? onUpdate : onCreate}>
        Save
      </Button>
    </div>
  </form>
</div>