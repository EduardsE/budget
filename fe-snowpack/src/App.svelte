<script lang="ts">
  import { onMount } from "svelte";
  import { Router, Route, links } from "svelte-routing";

  import Tailwindcss from "./Tailwindcss.svelte";

  import Insights from "./pages/Insights/index.svelte";

  import http from "lib/http";

  import Auth from "pages/Auth/index.svelte";
  import Authorized from "./layouts/Authorized.svelte";

  import Categories from "pages/Categories/index.svelte";
  import CategoriesNav from "pages/Categories/Nav.svelte";

  import Loading from "pages/Auth/Loading.svelte";

  import TransactionNav from "pages/Transactions/Nav.svelte";
  import Transactions from "pages/Transactions/index.svelte";

  import InsightsNav from "pages/Insights/Nav.svelte";

  import config from "config/index";

  import { user as userStore } from "stores/user";
  import { list as categoryList } from "stores/category";

  onMount(async () => {
    if (window.location.href === `${config.BASE_URL}/auth`) return;

    const res = await http<any>("user/me");
    if (!res) return;

    const { categories, ...rest } = res.user;
    userStore.set(rest);
    categoryList.set(categories);
  });
</script>

<Tailwindcss />
<div class="w-screen h-screen absolute bg-gray-100 background" />

<div use:links>
  <Router>
    <Route path="/auth/callback" component={Loading} />
    <Route path="/auth" component={Auth} />

    <Route path="transactions">
      <Authorized>
        <div slot="nav">
          <TransactionNav />
        </div>
        <div slot="content">
          <Transactions />
        </div>
      </Authorized>
    </Route>
    <Route path="categories">
      <Authorized>
        <div slot="nav">
          <CategoriesNav />
        </div>
        <div slot="content">
          <Categories />
        </div>
      </Authorized>
    </Route>
    <Route path="/">
      <Authorized>
        <div slot="nav">
          <InsightsNav />
        </div>
        <div slot="content">
          <Insights />
        </div>
      </Authorized>
    </Route>
  </Router>
</div>

<style>
  .background {
    z-index: -1;
  }
</style>
