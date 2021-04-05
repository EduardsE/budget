<script lang="ts">
  import { INPUT_STYLES } from 'components/Form/constants';

  export let id: string;
  export let value: string;
  export let options: { id: string; title: string }[];
</script>

<!-- class="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"> -->

<select {id} bind:value class={INPUT_STYLES}>
  {#each options as { id, title }}
    <option value={id}>{title}</option>
  {/each}
</select>
