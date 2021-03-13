<script lang="ts">
  import { Link } from "svelte-routing";

  export let label: string;
  export let link: string;

  const activeClasses = "bg-gray-900 text-white";
  const defaultClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";
  const commonClasses = "block px-3 py-2 rounded-md text-base font-medium";
</script>

<Link
  getProps={({ isCurrent }) => ({ class: `${commonClasses} ${isCurrent ? activeClasses : defaultClasses}` })}
  to={link}>
  {label}
</Link>
