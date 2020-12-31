<script lang="ts">
  import CategoryBadge from 'components/CategoryBadge.svelte';
  import { list } from 'stores/category';
  import type { Category } from 'types/Category';

  import { upsertOpen, form } from 'stores/category.ts';

  const columns = ['Title', ''];

  const onEdit = (category: Category) => {
    upsertOpen.set(true);
    const { id, title, colorBackground, colorText } = category;
    form.set({
      id,
      title,
      color: JSON.stringify([colorBackground, colorText]),
    });
  };
</script>

<div class="container mx-auto px-4">
  <div class="py-8">
    <div class="inline-block w-full shadow rounded-lg overflow-hidden">
      <table class="w-full leading-normal">
        <thead>
          <tr>
            {#each columns as column}
              <th
                class="px-3 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                {column}
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each $list as category}
            <tr class="bg-white">
              <td class="p-3 text-sm">
                <CategoryBadge {category} size="large" />
              </td>
              <td class="px-6 py-4 text-right text-sm leading-5 font-medium">
                <a
                  on:click={() => onEdit(category)}
                  href={'#'}
                  class="text-indigo-600 hover:text-indigo-900">Edit</a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
