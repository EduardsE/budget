<script lang="ts">
  import PlusIcon from "svg/Plus.svelte";
  import PageTitle from "components/PageTitle.svelte";
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="bg-white">
  <div class="container mx-auto px-4 py-6 flex items-center justify-between">
    <div class="flex-1 min-w-0">
      <PageTitle>Cateogories</PageTitle>
    </div>
    <span class="sm:ml-3">
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <!-- Heroicon name: check -->
        <PlusIcon />
        Add
      </button>
    </span>
  </div>
</div>
