import { config } from "dotenv";

import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import TransactionResolver from "./resolvers/Transaction";

const init = async () => {
  const schema = await buildSchema({
    resolvers: [TransactionResolver],
    emitSchemaFile: true,
  });

  const server = new ApolloServer({
    schema,
    playground: true,
  });

  const { url } = await server.listen(4000);
  console.log(`🚀 Server ready at ${url}`);
};

init();
