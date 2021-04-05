<script>
  import Chart from "svg/Chart.svelte";
  import List from "svg/List.svelte";
  import { blur } from "svelte/transition";
  import Category from "svg/Category.svelte";
  import { Link, link } from "svelte-routing";

  const NAV_COLOR = "#9c9be5";

  let hoveredItem: string | null = null;

  const links = [
    { label: "Insights", link: "/", icon: Chart },
    { label: "Transactions", link: "/transactions", icon: List },
    { label: "Categories", link: "/categories", icon: Category },
  ];

  //  <a
  //       href={"#"}
  //       class="nav-item"
  //       on:mouseenter={() => (hoveredItem = item.id)}
  //       on:mouseleave={() => (hoveredItem = null)}
  //     >
  //       {#if hoveredItem === item.id}
  //         <div class="left" transition:blur={{ duration: 400 }} />
  //       {/if}
  //       <svelte:component this={item.icon} size={28} stroke={NAV_COLOR} />
  //     </a>
</script>

<div class="nav">
  <div class="nav-aligner">
    <!-- @component But only the last documentation comment will be used -->

  </div>
</div>

<style type="text/scss">
  .nav {
    width: 70px;
    background: white;

    .nav-aligner {
      display: flex;
      align-items: center;
      height: 100%;
      flex-direction: column;
      justify-content: center;

      .nav-item {
        margin: 10px 0;
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .left {
          height: 100%;
          position: absolute;
          left: -20px;
          width: 25px;
          background: #9c9be5;
          border-radius: 34px;
        }
      }
    }
  }
</style>
