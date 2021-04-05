<script lang="ts">
  import { INPUT_STYLES } from 'components/Form/constants';

  export let name: string;
  export let id: string;
  export let autocomplete: string;
  export let value: string;
</script>

<input type="text" {name} {id} bind:value {autocomplete} class={INPUT_STYLES} />
