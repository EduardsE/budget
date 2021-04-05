<script lang="ts">
  import { Link } from "svelte-routing";

  export let label: string;
  export let link: string;
</script>

<Link to={link}>
  {label}
</Link>
