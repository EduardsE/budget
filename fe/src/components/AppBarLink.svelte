<script lang="ts">
  import { Link } from "svelte-routing";

  export let label: string;
  export let href: string;
</script>

<Link
  getProps={() => ({ class: 'block mt-4 md:inline-block md:mt-0 text-teal-200 hover:text-white mr-4' })}
  to={href}>
  {label}
</Link>
