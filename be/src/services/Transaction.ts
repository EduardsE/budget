import { Category, Prisma, Transaction } from "@prisma/client";
import prisma from "config/prisma";

class TransactionService {
  public async list() {
    return await prisma.transaction.findMany();
  }

  public async create(
    transactionData: Prisma.TransactionCreateWithoutCategoryInput & {
      categoryId: Category["id"];
    }
  ) {
    const { categoryId, ...rest } = transactionData;

    return await prisma.transaction.create({
      data: {
        ...rest,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  public async update(
    id: Transaction["id"],
    transactionData: Prisma.TransactionUpdateInput & {
      categoryId: Category["id"];
    }
  ) {
    const { categoryId, ...rest } = transactionData;

    return await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        ...rest,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  }

  public async listGrouped() {
    const result = await prisma.$queryRaw("SELECT * FROM User;");
  }
}

export default new TransactionService();
