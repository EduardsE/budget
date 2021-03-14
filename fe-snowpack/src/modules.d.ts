declare module "svelte-routing";

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onclickOutside?: () => void;
  }
}
