<script lang="ts">
  import Button from 'components/Button.svelte';
  import TransactionType from 'components/TransactionType.svelte';
  import InputText from 'components/Form/InputText.svelte';
  import Datepicker from 'components/Form/Datepicker.svelte';
  import Label from 'components/Form/Label.svelte';
  import Select from 'components/Form/Select.svelte';

  import { list as categories } from 'stores/category';

  import { form as formData, list } from 'stores/transactions';
  import http from 'src/lib/http';

  export let onClose: () => void;

  const currencySymbols = {
    EUR: '€',
    USD: '$',
  };

  let currency = 'EUR';

  let formattedSelected: string;

  const onUpdate = async () => {
    try {
      const { amount, id, ...rest } = $formData;

      const { transaction } = await http(`transaction/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...rest,
          amount: amount * 100,
        }),
      });

      list.update((transactions) =>
        transactions.map((item) => (item.id === id ? transaction : item))
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

      const { transaction } = await http('transaction', {
        method: 'POST',
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
        <Label id="amount">Price</Label>
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
        <Label id="title">Title</Label>
        <InputText id="title" name="title" bind:value={$formData.title} />
      </div>

      <div class="col-span-6">
        <Label id="category">Category</Label>
        <Select
          id="category"
          bind:value={$formData.categoryId}
          options={$categories} />
      </div>

      <div class="col-span-6">
        <Label id="date">Date</Label>
        <Datepicker value={$formData.date} />
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
