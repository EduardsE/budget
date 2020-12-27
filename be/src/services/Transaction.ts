import { Category, Prisma, Transaction } from "@prisma/client";
import prisma from "config/prisma";

class TransactionService {
  private model = prisma.transaction;

  public async list() {
    return await this.model.findMany();
  }

  public async create(
    transactionData: Prisma.TransactionCreateWithoutCategoryInput & {
      categoryId: Category["id"];
    }
  ) {
    const { categoryId, ...rest } = transactionData;

    return await this.model.create({
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

    return await this.model.update({
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
