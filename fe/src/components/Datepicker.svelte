<script lang="ts">
  import {
    getDaysInMonth,
    getMonth,
    getYear,
    startOfDay,
    startOfMonth,
  } from 'date-fns';
  import { enUS } from 'date-fns/locale';
  import { clickOutside } from 'directives/clickOutside';
  import Authorized from 'layouts/Authorized.svelte';
  import App from 'src/App.svelte';
  import Bell from 'svg/Bell.svelte';

  import ChevronLeft from 'svg/ChevronLeft.svelte';
  import ChevronRight from 'svg/ChevronRight.svelte';

  let visible = false;

  const today = new Date();

  const handleClickOutside = () => {
    visible = false;
  };

  let currentMonthYear = {
    month: getMonth(today),
    year: getYear(today),
  };

  const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const daysInMonth = getDaysInMonth(today);
  const firstDayOfMonth = startOfMonth(today).getDay();

  let dates = [...Array(31)].map((_, index) => index + 1);
  dates = [...Array(firstDayOfMonth - 1), ...dates];

  const changeMonth = (next: boolean) => {
    const { month, year } = currentMonthYear;

    if (next) {
      currentMonthYear = {
        month: month === 11 ? 0 : month + 1,
        year: month === 11 ? year + 1 : year,
      };
    } else {
      currentMonthYear = {
        month: month === 0 ? 11 : month - 1,
        year: month === 0 ? year - 1 : year,
      };
    }
  };

  const onSelect = (date: Date) => {
    console.log(date);
  };
</script>

<div class="wrap" use:clickOutside on:clickOutside={handleClickOutside}>
  <span class="trigger" on:click={() => (visible = !visible)}>
    <slot />
  </span>
  {#if visible}
    <div class="popover">
      <div class="month-selection">
        <button on:click={() => changeMonth(false)}
          ><ChevronLeft width={12} height={12} /></button
        >
        <span class="currentMonthYear"
          >{enUS.localize.month(currentMonthYear.month)}
          {currentMonthYear.year}</span
        >
        <button on:click={() => changeMonth(true)}
          ><ChevronRight width={12} height={12} /></button
        >
      </div>
      <div class="calendar">
        {#each weekdays as day}
          <span class="date">{day}</span>
        {/each}
        {#each dates as date}
          <button
            on:click={() =>
              onSelect(
                new Date(currentMonthYear.year, currentMonthYear.month, date)
              )}
            class="date">{date ? date : ''}</button
          >
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .wrap {
    position: relative;
  }

  .trigger {
    cursor: pointer;
  }

  .popover {
    position: absolute;
    top: 40px;
    left: 0px;
    background: white;
    width: 300px;
    height: 300px;
    border-radius: 5px;
    --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  .month-selection {
    padding: 10px 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: 1px solid grey;
  }

  .calendar {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .date {
    text-align: center;
    padding: 5px;
  }

  .currentMonthYear {
    width: 130px;
    text-align: center;
  }
</style>
