<script lang="ts">
  import { slide, fade } from "svelte/transition";
  import CloseIcon from "svg/Close.svelte";

  export let onClose: () => void;
</script>

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
            <CloseIcon />
          </button>
        </div>
        <div
          class="h-full flex flex-col space-y-6 pb-6 bg-white shadow-xl overflow-y-scroll">
          <slot />
        </div>
      </div>
    </section>
  </div>
</div>
