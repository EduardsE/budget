import { config } from "dotenv";
import Koa from "koa";
import Router from "koa-router";

import transactionService from "./services/Transaction";

import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { createContext } from "./context";
import TransactionResolver from "./gql/resolvers/Transaction/Transaction";
import { GraphQLError } from "graphql";

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

const initKoa = async () => {
  const app = new Koa();
  const router = new Router();

  router.get("/transactions", async (ctx, next) => {
    const transactions = await transactionService.list();

    ctx.body = {
      status: "success",
      data: {
        transactions,
      },
    };
  });

  app.use(router.routes()).use(router.allowedMethods());
  app.listen(3000);

  console.log(`👌 Koa started at http://localhost:3000`);
};

init();
initKoa();
