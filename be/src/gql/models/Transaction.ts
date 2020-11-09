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

  @Field()
  amount!: number;

  @Field()
  category!: string;
}

export default Transaction;
