export interface Category {
  id: string;
  title: string;
  colorText: string;
  colorBackground: string;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}
