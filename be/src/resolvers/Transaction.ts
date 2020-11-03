import { Arg, Query, Resolver } from "type-graphql";
import TransactionModel from "../graphModels/Transaction";

import { Transaction } from "../types";

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
  async transactions() {
    return [
      {
        date: new Date(),
        title: "Volejbolsss",
        test: "adsf",
      },
    ];
  }
}

export default TransactionResolver;
