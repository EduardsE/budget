// import { Transaction, TransactionType } from "types/Transaction";
import type { Category } from "types/Category";

import { writable } from "svelte/store";

interface FormData {
  // id?: Transaction["id"];
  amount: number;
  date: Date;
  title: string;
  categoryId: Category["id"];
  // type: TransactionType;
}

const defaultValues: FormData = {
  amount: null,
  date: new Date(),
  title: "",
  categoryId: null,
  // type: TransactionType.EXPENSE,
};

export const form = writable<FormData>(defaultValues);

export const reset = () => form.set(defaultValues);

export const upsertOpen = writable(false);

export const list = writable([]);
