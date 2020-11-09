import { TransactionType } from "src/types/Transaction";
import { writable } from "svelte/store";
import { Category } from "../constants/Category";

const expenses = [
  {
    date: new Date(),
    title: "Volejbols",
    category: Category.FITNESS,
    amount: 40,
  },
  {
    date: new Date(),
    title: "Viskijs Bushmill 20 gadus noturēts",
    category: Category.ALCOHOL,
    amount: 20.99,
  },
  {
    date: new Date(),
    title: "Bikses",
    category: Category.CLOTHES,
    amount: 40,
  },
];

export const transactions = writable(expenses);

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
