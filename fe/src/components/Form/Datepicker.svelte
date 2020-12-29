<script lang="ts">
  import format from 'date-fns/format';
  import Datepicker from 'svelte-calendar';

  import { INPUT_STYLES } from './constants';

  export let value: Date;

  let formattedSelected: string;
</script>

<Datepicker
  style="width: 100%"
  bind:selected={value}
  bind:formattedSelected
  format={(date) => format(date, 'dd/MM/yyyy')}>
  <input
    id="date"
    type="text"
    bind:value={formattedSelected}
    class={INPUT_STYLES} />
</Datepicker>
