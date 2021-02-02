declare module 'svelte-routing';
declare module '@beyonk/svelte-calendar';

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onclickOutside?: (event: any) => void;
  }
}
