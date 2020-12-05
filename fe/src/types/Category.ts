export interface Category {
  id: string;
  title: string;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
