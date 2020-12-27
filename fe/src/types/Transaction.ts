import { Category } from "types/Category";

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export interface Transaction {
  type: TransactionType;
  date: Date;
  title: string;
  category?: Category;
  categoryId: string;
  amount: number;
}
