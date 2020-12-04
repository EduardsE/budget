<script>
  import queryString from "query-string";
  import { navigate } from "svelte-routing";

  export let location;

  $: {
    let queryParams = queryString.parse(location.search);

    if (queryParams.token) {
      sessionStorage.setItem("token", queryParams.token);

      // For some reasong svelte-routing will fail to load the next page,
      // without setTimeout
      setTimeout(() => {
        navigate("/transactions");
      }, 0);
    }
  }
</script>

<style>
  .lds-hourglass {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-hourglass:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid#5850ec;
    border-color: #5850ec transparent #5850ec transparent;
    animation: lds-hourglass 1.2s infinite;
  }
  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
</style>

<div class="h-screen w-screen flex items-center justify-center">
  <div class="lds-hourglass border-blue-500" />
</div>
