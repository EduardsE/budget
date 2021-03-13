import type { TransactionType } from 'types/Transaction';

export interface Category {
  id: string;
  title: string;
  colorText: string;
  colorBackground: string;
  type: TransactionType;

  userId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
