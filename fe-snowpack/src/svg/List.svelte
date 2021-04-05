<script lang="ts">
  export let fill: string | undefined = "none";
  export let stroke: string | undefined;
  export let size = 48;
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 48 48"
  {fill}
  {stroke}
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M8 28H16V20H8V28ZM8 38H16V30H8V38ZM8 18H16V10H8V18ZM18 28H42V20H18V28ZM18 38H42V30H18V38ZM18 10V18H42V10H18Z"
  />
</svg>
