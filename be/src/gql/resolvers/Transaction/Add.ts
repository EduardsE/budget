import { Transaction, TransactionType } from "@prisma/client";
import { Field, InputType } from "type-graphql";

@InputType()
export class Add implements Partial<Transaction> {
  @Field()
  title!: string;

  @Field()
  date!: Date;

  @Field((type) => TransactionType)
  type!: TransactionType;
}
