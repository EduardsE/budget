import { User } from '@prisma/client';

import prisma from 'config/prisma';

import { DEFAULT_CATEGORIES } from 'constants/Category';

class UserService {
  constructor(private model = prisma.user) {}

  public async list() {
    return await this.model.findMany();
  }

  public async onAuth(data: Pick<User, 'email'> & Partial<User>) {
    return await this.model.upsert({
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

  public async me(id: User['id']) {
    return await this.model.findUnique({
      where: { id },
      include: {
        categories: true,
      },
    });
  }
}

export default new UserService();
