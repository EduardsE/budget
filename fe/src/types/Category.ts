export interface Category {
  id: string;
  title: string;
  color: string;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
