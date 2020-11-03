<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import { ApolloClient, InMemoryCache } from "@apollo/client";
  import { setClient } from "svelte-apollo";

  import Tailwindcss from "./Tailwindcss.svelte";

  import AppBar from "./AppBar.svelte";
  import Dashboard from "./Dashboard.svelte";
  import Transactions from "./Transactions.svelte";

  export let url = "";

  const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
  });
  setClient(client);
</script>

<Tailwindcss />

<Router {url}>
  <AppBar />

  <div class="py-6 container mx-auto">
    <Route path="transactions" component={Transactions} />
    <Route path="/" component={Dashboard} />
  </div>
</Router>
