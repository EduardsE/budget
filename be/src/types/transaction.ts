import { registerEnumType } from "type-graphql";

export enum Category {
  ALCOHOL = "Alcohol",
  CLOTHES = "Clothes",
  COMMUNICATION = "Communication",
  ENTERTAINMENT = "Entertainment",
  FITNESS = "Fitness",
  FOOD = "Food",
  GIFTS = "Gifts",
  HEALTH = "Health",
  HOME_IMPROVEMENT = "Home Improvement",
  INTERNET_SERVICES = "Internet Services",
  INVESTMENT = "Investment",
  MORTGAGE = "Mortgage",
  OTHER = "Other",
  PERSONAL = "Personal",
  TRANSPORTATION = "Transportation",
  TRAVEL = "Travel",
  UTILITIES = "Utilities",
}

export enum TransactionType {
  INCOME,
  EXPENSE,
}

export interface Transaction {
  type: TransactionType;
  date: Date;
  title: string;
  category: Category;
  // amount: number;
}
