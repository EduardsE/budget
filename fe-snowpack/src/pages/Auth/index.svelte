<script lang="ts">
  import ButtonSocial from './ButtonSocial.svelte';

  import Google from 'svg/Auth/Google.svelte';
  import Twitter from 'svg/Auth/Twitter.svelte';
  import Github from 'svg/Auth/Github.svelte';
  import LockIcon from 'svg/Lock.svelte';

  import InputText from 'components/Form/InputText.svelte';
  import Label from 'components/Form/Label.svelte';

  import { INPUT_STYLES } from 'components/Form/constants';

  const socialButtons = [Google, Twitter, Github];

</script>

<style>
  .bg-auth {
    background-image: url("../../images/auth-bg.jpg");
  }
</style>

<div class="grid lg:grid-cols-2 xl:grid-cols-3 bg-auth bg-cover">
  <div
    class="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="flex flex-col items-start">
        <img
          class="h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div>
        <label
          for="title"
          class="block text-sm font-medium leading-5 text-gray-700 mb-1">Sign in
          with</label>
        <div class="grid grid-cols-3 gap-x-2">
          {#each socialButtons as button}
            <ButtonSocial>
              <svelte:component this={button} />
            </ButtonSocial>
          {/each}
        </div>
      </div>

      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300" />
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-400">Or continue with</span>
        </div>
      </div>

      <form class="mt-8 space-y-6" action="#" method="POST">
        <div>
          <Label id="title">Email</Label>
          <InputText id="title" />
        </div>

        <div>
          <Label id="password">Password</Label>
          <input class={INPUT_STYLES} id="password" type="password" />
        </div>

        <input type="hidden" name="remember" value="true" />

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label for="remember_me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              href={'#'}
              class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockIcon />
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
