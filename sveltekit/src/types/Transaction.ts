import type { Category } from "types/Category";

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export interface Transaction {
  id: string;
  type: TransactionType;
  date: Date;
  title: string;
  category?: Category;
  categoryId: string;
  amount: number;
}
