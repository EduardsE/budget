import { TransactionType } from "@prisma/client";
import { Field, ObjectType, registerEnumType } from "type-graphql";

registerEnumType(TransactionType, {
  name: "TransactionType",
});

@ObjectType()
class Transaction {
  @Field(() => String)
  title!: string;

  @Field(() => Date)
  date!: Date;

  @Field(() => TransactionType)
  type!: TransactionType;
}

export default Transaction;
