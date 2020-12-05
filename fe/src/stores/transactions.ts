import { TransactionType } from "src/types/Transaction";
import { Category } from "types/Category";

import { writable } from "svelte/store";

interface FormData {
  id?: number;
  amount: number;
  date: Date;
  title: string;
  categoryId: Category["id"];
  type: TransactionType;
}

const defaultValues: FormData = {
  amount: null,
  date: new Date(),
  title: "",
  categoryId: null,
  type: TransactionType.EXPENSE,
};

export const form = writable<FormData>(defaultValues);

export const reset = () => form.set(defaultValues);

export const upsertOpen = writable(false);

export const list = writable([]);
