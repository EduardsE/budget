<script lang="ts">
  import type { Category } from "types/Category";

  export let category: Category;
  export let size: "small" | "large" = "small";

  const { colorText, title, colorBackground } = category;

  const smallClasses = "text-xs";
  const largeClasses = "text-sm large-padding";

  const classes = size === "small" ? smallClasses : largeClasses;
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
  .large-padding {
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
  }
</style>

<span
  class={'px-2 inline-flex leading-5 font-semibold rounded-md ' + classes}
  style={`background-color: #${colorBackground}; color: #${colorText}`}>
  {title}
</span>
