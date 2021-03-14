<script lang="ts">
  import { navigate } from "svelte-routing";

  import { user } from "stores/user";

  import { clickOutside } from "directives/clickOutside.ts";

  let open = false;

  const signOut = () => {
    sessionStorage.removeItem("token");
    navigate("/auth");
  };

  const handleClickOutside = (event: Event) => {
    open = false;
  };

  const options = [
    {
      label: "Your profile",
    },
    {
      label: "Settings",
    },
    {
      label: "Sign out",
      onClick: signOut,
    },
  ];
</script>

<div
  class="ml-3 relative"
  use:clickOutside
  on:clickOutside={handleClickOutside}>
  <div>
    <button
      on:click={() => (open = !open)}
      class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      id="user-menu"
      aria-haspopup="true">
      <span class="sr-only">Open user menu</span>
      <!-- <img
        class="h-8 w-8 rounded-full"
        src={$user?.picture || '/images/default-avatar.jpg'}
        alt="" /> -->
    </button>
  </div>
  <!--
    Profile dropdown panel, show/hide based on dropdown state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
  <div
    class:hidden={!open}
    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="user-menu">
    {#each options as { label, onClick }}
      <a
        on:click={onClick}
        href={'#'}
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem">{label}</a>
    {/each}
  </div>
</div>
