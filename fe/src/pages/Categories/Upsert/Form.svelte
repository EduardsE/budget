<script lang="ts">
  import Datepicker from "svelte-calendar";
  import format from "date-fns/format";

  import { COLOR_COMBINATIONS } from "constants/Category.ts";

  import Button from "components/Button.svelte";
  import TransactionType from "components/TransactionType.svelte";

  import { form as formData, list } from "stores/category";
  import http from "src/lib/http";
  import CategoryBadge from "components/CategoryBadge.svelte";
  import { form } from "stores/transactions";

  export let onClose: () => void;

  let currency = "EUR";

  let formattedSelected: string;

  // const onUpdate = async () => {
  //   try {
  //     const { amount, id, ...rest } = $formData;

  //     const { transaction } = await http(`transaction/${id}`, {
  //       method: "PATCH",
  //       body: JSON.stringify({
  //         ...rest,
  //         amount: amount * 100,
  //       }),
  //     });

  //     list.update((transactions) =>
  //       transactions.map((item) => {
  //         if (item.id === id) {
  //           return transaction;
  //         }
  //         return item;
  //       })
  //     );
  //     onClose();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const onCreate = async () => {
  //   try {
  //     const { amount, ...rest } = $formData;
  //     console.log(rest);

  //     const { transaction } = await http("transaction", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         ...rest,
  //         amount: amount * 100,
  //       }),
  //     });

  //     list.update((transactions) => [...transactions, transaction]);
  //     onClose();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // if (!$formData.categoryId) {
  //   formData.update((prev) => ({ ...prev, categoryId: $categories[0].id }));
  // }

  const onBadgeSelect = (colors) => {
    form.set({ ...$form, ...colors });
  };
</script>

<style>
  .large-padding {
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
  }
</style>

<div class="p-4">
  <form action="#" method="POST">
    <div class="grid grid-cols-6 gap-6">
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
          for="colors"
          class="block text-sm font-medium leading-5 text-gray-700">Badge</label>
        <div class="badges mt-3 gap-3 flex flex-wrap">
          {#each COLOR_COMBINATIONS as { colorBackground, colorText }}
            <a
              href={'#'}
              on:click={() => onBadgeSelect({
                  colorBackground,
                  colorText,
                })}><span
                class="px-2 inline-flex leading-5 font-semibold rounded-md text-sm large-padding"
                style={`background-color: #${colorBackground}; color: #${colorText}`}>
                {$formData.title || 'Badge'}
              </span></a>
          {/each}
        </div>
      </div>

      <div
        class="px-4 py-4 text-right absolute w-full bottom-0 left-0 border-t">
        <Button addClass="mr-3" variant="light" on:click={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="button" on:click={() => {}}>
          Save
        </Button>
      </div>
    </div>
  </form>
</div>
