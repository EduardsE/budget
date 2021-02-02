import { Category, TransactionType, User } from '@prisma/client';
import faker from 'faker';

import transactionService from 'services/Transaction';

export const seedTransactions = async (
  user: User & { categories: Category[] }
) => {
  await Promise.all(
    user.categories.map((category) =>
      transactionService.create({
        title: faker.finance.transactionDescription(),
        date: new Date(),
        type: category.type,
        amount: faker.random.number({ min: 1000, max: 10000 }),
        categoryId: category.id,
      })
    )
  );
};
