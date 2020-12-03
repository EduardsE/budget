<script lang="ts">
  import { Router, Route } from "svelte-routing";

  import Tailwindcss from "./Tailwindcss.svelte";

  import Dashboard from "./Dashboard.svelte";

  import Transactions from "./pages/Transactions/index.svelte";
  // import Users from "./pages/User.svelte";
  import Auth from "pages/Auth/index.svelte";
  import Authorized from "./layouts/Authorized.svelte";

  export let url = "";
</script>

<Tailwindcss />

<Router {url}>
  <Route path="/auth" component={Auth} />

  <Route path="transactions">
    <Authorized>
      <Transactions />
    </Authorized>
  </Route>
  <Route path="/">
    <Authorized>
      <Dashboard />
    </Authorized>
  </Route>
  <!-- <Route path="users" component={Users} /> -->
</Router>
