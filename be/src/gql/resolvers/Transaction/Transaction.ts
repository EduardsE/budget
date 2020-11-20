import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../../context";
import Transaction from "../../models/Transaction";

import { AddTransactionInput } from "./Add";

@Resolver(Transaction)
class TransactionResolver {
  constructor() {}

  @Query((returns) => Transaction)
  async transaction() {
    return {
      date: new Date(),
      title: "Volejbolsss",
    };
  }

  @Query((returns) => [Transaction])
  async transactions(@Ctx() { prisma }: Context) {
    const transactions = await prisma.transaction.findMany();
    return transactions;
  }

  @Mutation((returns) => Transaction)
  async add(
    @Arg("transaction") data: AddTransactionInput,
    @Ctx() { prisma }: Context
  ) {
    const transaction = await prisma.transaction.create({
      data,
    });

    return transaction;
  }
}

export default TransactionResolver;
