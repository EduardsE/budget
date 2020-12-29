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
  colorBackground: string;
  colorText: string;
}

const defaultValues: FormData = {
  title: "",
  colorBackground: "F9FAFB",
  colorText: "1F2937",
};

export const upsertOpen = writable(false);
export const form = writable<FormData>(defaultValues);
export const reset = () => form.set(defaultValues);
