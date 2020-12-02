import {
  Transaction,
  TransactionCreateInput,
  TransactionUpdateInput,
} from "@prisma/client";
import prisma from "config/prisma";

class TransactionService {
  public async list() {
    return await prisma.transaction.findMany();
  }

  public async create(transactionData: TransactionCreateInput) {
    return await prisma.transaction.create({
      data: transactionData,
    });
  }

  public async update(
    id: Transaction["id"],
    transactionData: TransactionUpdateInput
  ) {
    return await prisma.transaction.update({
      where: {
        id,
      },
      data: transactionData,
    });
  }

  public async listGrouped() {
    const result = await prisma.$queryRaw("SELECT * FROM User;");
  }
}

export default new TransactionService();
