import { TransactionCreateInput } from "@prisma/client";
import prisma from "config/prisma";

class TransactionService {
  public async list() {
    const transactions = await prisma.transaction.findMany();
    return transactions;
  }

  public async create(transactionData: TransactionCreateInput) {
    const transactions = await prisma.transaction.create({
      data: transactionData,
    });
    return transactions;
  }
}

export default new TransactionService();
