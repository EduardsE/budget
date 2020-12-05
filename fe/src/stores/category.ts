import { derived, writable } from "svelte/store";

import { Category } from "types/Category";

export const list = writable<Category[]>([]);
export const listById = derived<typeof list, Record<Category["id"], Category>>(
  list,
  ($list) =>
    $list.reduce((acc, category) => ({ ...acc, [category.id]: category }), {})
);
