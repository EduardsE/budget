import { User } from "@prisma/client";

import prisma from "config/prisma";
import { DEFAULT_CATEGORIES } from "src/constants/Category";

class UserService {
  public async list() {
    return await prisma.user.findMany();
  }

  public async onAuth(data: Pick<User, "email"> & Partial<User>) {
    return await prisma.user.upsert({
      where: {
        email: data.email,
      },
      create: {
        ...data,
        categories: {
          create: DEFAULT_CATEGORIES,
        },
      },
      update: data,
    });
  }

  public async me(id: User["id"]) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        categories: true,
      },
    });
  }
}

export default new UserService();
