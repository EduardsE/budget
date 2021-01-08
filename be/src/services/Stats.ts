import { Category, User } from '@prisma/client';
import { curry, pluck, sum } from 'ramda';

import prisma from 'config/prisma';

class StatsService {
  constructor(private model = prisma.user) {}

  public async get(userId: User['id']) {
    const userCategories = await prisma.category.findMany({
      where: {
        userId,
      },
    });

    const categoryIds = pluck('id', userCategories);

    const byCategory = await prisma.transaction.groupBy({
      by: ['categoryId'],
      sum: {
        amount: true,
      },
      where: {
        categoryId: {
          in: categoryIds,
        },
      },
    });

    const res: Record<Category['id'], number> = byCategory.reduce(
      (sum, cur) => {
        return { ...sum, [cur.categoryId as string]: cur.sum.amount };
      },
      {}
    );

    const categories = userCategories.map((category) => ({
      ...category,
      amount: res[category.id] || 0,
    }));

    return { categories };
  }
}

export default new StatsService();
