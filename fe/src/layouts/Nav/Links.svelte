<script lang="ts">
  import Link from "./Link.svelte";

  const links = [
    { label: "Dashboard", link: "/" },
    { label: "Transactions", link: "/transactions" },
    { label: "Categories", link: "/categories" },
  ];
</script>

{#each links as link}
  <Link {...link} />
{/each}
