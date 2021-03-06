import { TransactionType, User } from '@prisma/client';

import prisma from 'config/prisma';

import {
  DEFAULT_INCOME_CATEGORIES,
  DEFAULT_EXPENSE_CATEGORIES,
} from 'constants/Category';

class UserService {
  constructor(private model = prisma.user) {}

  public async list() {
    return await this.model.findMany();
  }

  public async onAuth(
    data: Pick<User, 'email' | 'id' | 'name' | 'accessToken' | 'refreshToken'>
  ) {
    const incomeCategories = DEFAULT_INCOME_CATEGORIES.map((cat) => ({
      ...cat,
      type: TransactionType.INCOME,
    }));

    const expenseCategories = DEFAULT_EXPENSE_CATEGORIES.map((cat) => ({
      ...cat,
      type: TransactionType.EXPENSE,
    }));

    return await this.model.upsert({
      where: {
        id: data.id,
      },
      create: {
        ...data,
        categories: {
          create: [...incomeCategories, ...expenseCategories],
        },
      },
      update: data,
      include: {
        categories: true,
      },
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
