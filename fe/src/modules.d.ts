declare module "svelte-calendar";
declare module "svelte-routing";

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onclickOutside?: (event: any) => void;
  }
}
