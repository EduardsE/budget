<script>
  import { slide, fade } from "svelte/transition";
  import TransactionUpsertForm from "./Form.svelte";

  import { reset, upsertOpen, form } from "stores/transactions";

  const onClose = () => {
    upsertOpen.set(false);
    reset();
  };
</script>

{#if $upsertOpen}
  <div class="fixed inset-0 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div
        transition:fade={{ duration: 200 }}
        on:click={onClose}
        class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div
          class="relative w-screen max-w-md"
          transition:slide={{ duration: 500, direction: 'right' }}>
          <div
            class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
            <button
              aria-label="Close panel"
              class="text-gray-300 hover:text-white transition ease-in-out duration-150"
              on:click={onClose}>
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div
            class="h-full flex flex-col space-y-6 pb-6 bg-white shadow-xl overflow-y-scroll">
            <header class="bg-teal-400">
              <div class="py-6 px-4 sm:px-6">
                <h2 class="text-lg leading-7 font-medium text-white">
                  {$form.id ? 'Edit transaction' : 'New transaction'}
                </h2>
              </div>
            </header>
            <TransactionUpsertForm {onClose} />
          </div>
        </div>
      </section>
    </div>
  </div>
{/if}
