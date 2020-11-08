import { config } from "dotenv";

import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { createContext } from "./context";
import TransactionResolver from "./gql/resolvers/Transaction/Transaction";

const init = async () => {
  const schema = await buildSchema({
    resolvers: [TransactionResolver],
    emitSchemaFile: true,
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    context: createContext,
    playground: true,
  });

  const { url } = await server.listen(4000);
  console.log(`🚀 Server ready at ${url}`);
};

init();
