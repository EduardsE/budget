<script lang="ts">
  import CategoryBadge from "components/CategoryBadge.svelte";
  import { list } from "stores/category";

  const columns = ["Title"];
</script>

<style>
  th:nth-of-type(1) {
    width: 100px;
  }
  th:nth-of-type(2) {
    width: 84px;
  }
  th:nth-of-type(4) {
    width: 134px;
  }
  td .category {
    text-overflow: ellipsis;
    max-width: 100%;
    white-space: nowrap;
  }
  th:nth-of-type(5) {
    width: 53px;
  }
  .category-wrap {
    max-width: 110px;
    display: inherit;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>

<div class="container mx-auto px-4">
  <div class="py-8">
    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
      <table class="min-w-full leading-normal">
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
                <CategoryBadge {category} />
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
