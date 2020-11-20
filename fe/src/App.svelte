<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";

  import Tailwindcss from "./Tailwindcss.svelte";

  import AppBar from "./AppBar.svelte";
  import Dashboard from "./Dashboard.svelte";
  import Transactions from "./pages/Transactions/index.svelte";

  export let url = "";
</script>

<Tailwindcss />

<Router {url}>
  <AppBar />

  <div class="py-6 container mx-auto">
    <Route path="transactions" component={Transactions} />
    <Route path="/" component={Dashboard} />
  </div>
</Router>
