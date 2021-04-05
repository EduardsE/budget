<script lang="ts">
  import {
    addDays,
    compareAsc,
    getDaysInMonth,
    getMonth,
    getYear,
    startOfDay,
    startOfMonth,
  } from 'date-fns';
  import { enUS } from 'date-fns/locale';
  import { clickOutside } from 'directives/clickOutside';
  import { derived, writable } from 'svelte/store';

  import ChevronLeft from 'svg/ChevronLeft.svelte';
  import ChevronRight from 'svg/ChevronRight.svelte';

  let visible = false;

  const range = writable({
    start: new Date(),
    end: addDays(new Date(), 7),
  });

  const currentMonthYear = writable({
    month: getMonth($range.start),
    year: getYear($range.start),
  });

  const handleClickOutside = () => {
    visible = false;
  };

  const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const onSelect = (date: Date) => {
    range.update((range) => ({ ...range, start: date }));
  };

  const changeMonth = (next: boolean) => {
    const { month, year } = $currentMonthYear;

    if (next) {
      currentMonthYear.set({
        month: month === 11 ? 0 : month + 1,
        year: month === 11 ? year + 1 : year,
      });
    } else {
      currentMonthYear.set({
        month: month === 0 ? 11 : month - 1,
        year: month === 0 ? year - 1 : year,
      });
    }
  };

  const dates = derived(currentMonthYear, ($currentMonthYear) => {
    const { month, year } = $currentMonthYear;
    const date = new Date(year, month, 1);
    const daysInMonth = getDaysInMonth(date);
    const firstDayOfMonth = startOfMonth(date).getDay();

    let dates = [...Array(daysInMonth)].map((_, index) => index + 1);
    const paddedDates: Array<undefined | number> = [
      ...Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1),
      ...dates,
    ];

    return paddedDates.map((date) =>
      date
        ? new Date($currentMonthYear.year, $currentMonthYear.month, date)
        : undefined
    );

    // return paddedDates;
    // return paddedDates.map((date) => {

    // })

    // return [
    //   ...Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1),
    //   ...dates,
    // ];
  });
</script>

<div class="wrap" use:clickOutside on:clickOutside={handleClickOutside}>
  <span class="trigger" on:click={() => (visible = !visible)}>
    <slot />
  </span>
  {#if visible}
    <div class="popover">
      <div class="month-selection">
        <button on:click={() => changeMonth(false)}
          ><ChevronLeft color="white" width={12} height={12} /></button
        >
        <span class="currentMonthYear"
          >{enUS.localize.month($currentMonthYear.month)}
          {$currentMonthYear.year}</span
        >
        <button on:click={() => changeMonth(true)}
          ><ChevronRight color="white" width={12} height={12} /></button
        >
      </div>
      <div class="calendar">
        {#each weekdays as day}
          <span class="date day">{day}</span>
        {/each}
        {#each $dates as date}
          <button
            on:click={() => onSelect(date)}
            class:selected={compareAsc(
              startOfDay($range.start),
              startOfDay(date)
            ) === 0}
            class="date">{date ? date.getDate() : ''}</button
          >
        {/each}
      </div>
    </div>
  {/if}
</div>

<style type="text/scss">
  .wrap {
    position: relative;
  }

  .trigger {
    cursor: pointer;
  }

  .popover {
    border-radius: 20px;
    background: #25303f;
    color: white;
    position: absolute;
    top: 40px;
    left: 0px;
    width: 300px;
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
  }

  .calendar {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 13px;
  }

  .date {
    text-align: center;
    font-size: 12px;
    border-radius: 50%;

    &.selected {
      background: #596ac0;

      &:focus {
        outline: none;
      }
    }

    &.day {
      color: #535d68;
    }
  }

  .currentMonthYear {
    width: 130px;
    text-align: center;
  }
</style>
