<script>
  import Nav from "./Nav/index.svelte";
</script>

<Nav />
<slot name="nav" />
<div class="container mx-auto">
  <slot name="content" />
</div>
