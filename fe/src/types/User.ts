import { Category } from "types/Category";

export interface User {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
  googleId: string | null;
  createdAt: Date;
  updatedAt: Date | null;

  categories?: Category[];
}
