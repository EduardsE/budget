<script>
  import CategoryUpsertForm from "./Form.svelte";
  import Slideover from "components/Slidover.svelte";

  import { reset, upsertOpen, form } from "stores/category";

  const onClose = () => {
    upsertOpen.set(false);
    reset();
  };
</script>

{#if $upsertOpen}
  <Slideover {onClose}>
    <header class="bg-teal-400">
      <div class="py-6 px-4 sm:px-6">
        <h2 class="text-lg leading-7 font-medium text-white">
          {$form.id ? 'Edit category' : 'New category'}
        </h2>
      </div>
    </header>
    <CategoryUpsertForm {onClose} />
  </Slideover>
{/if}
