import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../../context";
import TransactionModel from "../../models/Transaction";

import { AddTransactionInput } from "./Add";

@Resolver(TransactionModel)
class TransactionResolver {
  constructor() {}

  @Query((returns) => TransactionModel)
  async transaction() {
    return {
      date: new Date(),
      title: "Volejbolsss",
    };
  }

  @Query((returns) => [TransactionModel])
  async transactions(@Ctx() { prisma }: Context) {
    const transactions = await prisma.transaction.findMany();
    return transactions;
  }

  @Mutation((returns) => TransactionModel)
  async add(
    @Arg("transaction") data: AddTransactionInput,
    @Ctx() { prisma }: Context
  ) {
    console.log(data);

    const transaction = await prisma.transaction.create({
      data,
    });

    return transaction;
  }
}

export default TransactionResolver;
