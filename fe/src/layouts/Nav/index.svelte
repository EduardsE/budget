<script lang="ts">
  import Links from './Links.svelte';
  import MenuButton from './MenuButton.svelte';
  import ProfileDropdown from './ProfileDropdown.svelte';

  import BellIcon from 'svg/Bell.svelte';

  let menuOpen = false;

  const toggleMenu = () => {
    menuOpen = !menuOpen;
  };
</script>

<nav class="bg-gray-800">
  <div class="container mx-auto px-4">
    <div class="relative flex items-center justify-between h-16">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <MenuButton {menuOpen} {toggleMenu} />
      </div>
      <div
        class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex-shrink-0 flex items-center">
          <img
            class="block lg:hidden h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
            alt="Workflow" />
          <img
            class="hidden lg:block h-8 w-auto"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
            alt="Workflow" />
        </div>
        <div class="hidden sm:block sm:ml-6">
          <div class="flex space-x-4">
            <Links />
          </div>
        </div>
      </div>
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <button
          class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span class="sr-only">View notifications</span>
          <BellIcon />
        </button>
        <ProfileDropdown />
      </div>
    </div>
  </div>

  <div class="sm:hidden" class:hidden={!menuOpen}>
    <div class="px-2 pt-2 pb-3 space-y-1">
      <Links />
    </div>
  </div>
</nav>
