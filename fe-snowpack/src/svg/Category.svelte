<script lang="ts">
  export let fill: string = "none";
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
  <path d="M24 4L13 22H35L24 4Z" />
  <path
    d="M35 44C39.9706 44 44 39.9706 44 35C44 30.0294 39.9706 26 35 26C30.0294 26 26 30.0294 26 35C26 39.9706 30.0294 44 35 44Z"
  />
  <path d="M6 27H22V43H6V27Z" />
</svg>
