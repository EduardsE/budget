import { TransactionType } from "src/types/Transaction";
import { writable } from "svelte/store";
import { Category } from "../constants/Category";

interface FormData {
  id?: number;
  amount: number;
  date: Date;
  title: string;
  category: Category;
  type: TransactionType;
}

const defaultValues: FormData = {
  amount: null,
  date: new Date(),
  title: "",
  category: Category.FOOD,
  type: TransactionType.EXPENSE,
};

export const form = writable<FormData>(defaultValues);

export const reset = () => form.set(defaultValues);

export const upsertOpen = writable(false);

export const list = writable([]);
