import prisma from "config/prisma";

class TransactionService {
  public async list() {
    const transactions = await prisma.transaction.findMany();
    return transactions;
  }
}

export default new TransactionService();
