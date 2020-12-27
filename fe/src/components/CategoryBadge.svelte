<script lang="ts">
  import { Category } from "types/Category";

  export let wrapped: boolean = false;
  export let category: Category;

  const { color, title } = category;
</script>

<style>
  .category-wrap {
    max-width: 110px;
    display: inherit;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .category {
    text-overflow: ellipsis;
    max-width: 100%;
    white-space: nowrap;
  }
</style>

<span
  class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
  class:category-wrap={wrapped}>
  <span
    aria-hidden
    class="absolute inset-0  opacity-50 rounded-full"
    style={`background-color: #${color};`} />
  <span class="relative category whitespace-nowrap">{title}</span>
</span>
