import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../../context";
import TransactionModel from "../../models/Transaction";

import { Add } from "./Add";

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
    Add;
    const transactions = await prisma.transaction.findMany();
    return transactions;
  }

  @Mutation((returns) => TransactionModel)
  async add(@Arg("transaction") data: Add, @Ctx() { prisma }: Context) {
    const transaction = await prisma.transaction.create({
      data,
    });

    // console.log(input);

    // const res = prisma.transaction.create({ data: input } as any);
    // return res;
    // const newTransaction = prisma..create({ title: "test title" });
    // return this.recipeRepository.save(newRecipe);
  }
}

export default TransactionResolver;
