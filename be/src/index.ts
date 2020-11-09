import { config } from "dotenv";

import "reflect-metadata";
import { ApolloError, ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { createContext } from "./context";
import TransactionResolver from "./gql/resolvers/Transaction/Transaction";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { formatError, isInstance } from "apollo-errors";

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
    stopOnTerminationSignals: true,
    formatError: (error: GraphQLError): any => {
      console.dir(error, { depth: null }); // `depth: null` ensures unlimited recursion
    },
  });

  const { url } = await server.listen(4000);
  console.log(`🚀 Server ready at ${url}`);
};

init();
