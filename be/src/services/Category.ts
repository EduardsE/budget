import { Category, Prisma, User } from '@prisma/client';

import prisma from 'config/prisma';

class CategoryService {
  constructor(private model = prisma.category) {}

  public async list() {
    return await this.model.findMany({
      orderBy: {
        title: 'asc',
      },
    });
  }

  public async create(
    data: Prisma.CategoryCreateInput & {
      userId: User['id'];
    }
  ) {
    const { userId, ...rest } = data;

    return await this.model.create({
      data: {
        ...rest,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  public async update(id: Category['id'], data: Prisma.CategoryUpdateInput) {
    return await this.model.update({
      where: {
        id,
      },
      data,
    });
  }
}

export default new CategoryService();
