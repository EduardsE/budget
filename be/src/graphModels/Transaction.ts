import { Field, ObjectType } from "type-graphql";

@ObjectType()
class Transaction {
  @Field(() => String)
  title!: string;

  @Field(() => Date)
  date!: Date;

  @Field(() => String)
  test!: string;
}

export default Transaction;
