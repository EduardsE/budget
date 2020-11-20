import { TransactionType } from "src/types/Transaction";
import { writable } from "svelte/store";
import { Category } from "../constants/Category";

const defaultValues = {
  amount: null,
  date: new Date(),
  title: "",
  category: Category.FOOD,
  type: TransactionType.EXPENSE,
};

export const form = writable(defaultValues);

export const reset = () => form.set(defaultValues);

export const upsertOpen = writable(false);

export const list = writable([]);
