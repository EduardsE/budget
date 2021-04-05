import { derived, writable } from "svelte/store";

import type { Category } from "types/Category";

export const list = writable<Category[]>([]);
export const listById = derived<typeof list, Record<Category["id"], Category>>(
  list,
  ($list) =>
    $list.reduce((acc, category) => ({ ...acc, [category.id]: category }), {})
);

interface FormData {
  id?: string;
  title: string;
  color: string;
}

const defaultValues: FormData = {
  title: "",
  color: "",
};

export const upsertOpen = writable(false);
export const form = writable<FormData>(defaultValues);
export const reset = () => form.set(defaultValues);
