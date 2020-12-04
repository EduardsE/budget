import { User } from "@prisma/client";
import prisma from "config/prisma";

class UserService {
  public async list() {
    return await prisma.user.findMany();
  }

  public async onAuth(data: Pick<User, "email"> & Partial<User>) {
    const categories = [
      "Clothes",
      "Entertainment",
      "Fitness",
      "Food",
      "Gifts",
      "Health",
      "Home Improvement",
      "Other",
      "Personal",
      "Transportation",
      "Travel",
      "Utilities",
    ];

    return await prisma.user.upsert({
      where: {
        email: data.email,
      },
      create: {
        ...data,
        categories: {
          create: categories.map((cat) => ({ title: cat })),
        },
      },
      update: data,
    });
  }
}

export default new UserService();
