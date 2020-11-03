<script lang="ts">
  export let variant: "primary" | "danger" | "success" | "light" = "primary";
  export let addClass: string;

  const dic = {
    primary: "indigo",
  };

  const color = dic[variant];
  const common =
    "inline-flex items-center justify-center px-4 py-2 border text-sm leading-5 font-medium rounded-md focus:outline-none transition duration-150 ease-in-out";

  let additional = "";
  if (variant === "light") {
    additional = `border-gray-300 text-gray-700 bg-white hover:text-gray-500 focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50`;
  } else {
    additional = `bg-${color}-600 text-white hover:bg-${color}-500 focus:border-${color}-700 focus:shadow-outline-${color} active:bg-${color}-700`;
  }
</script>

<button on:click type="button" class={`${common} ${additional} ${addClass}`}>
  <slot />
</button>
