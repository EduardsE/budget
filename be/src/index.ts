import { config } from "dotenv";
import Koa from "koa";
import Router from "koa-router";
import cors from "@koa/cors";

import transactionService from "./services/Transaction";

import "reflect-metadata";

// const init = async () => {
//   const schema = await buildSchema({
//     resolvers: [TransactionResolver],
//     emitSchemaFile: true,
//     validate: false,
//   });

//   const server = new ApolloServer({
//     schema,
//     context: createContext,
//     playground: true,
//     stopOnTerminationSignals: true,
//     formatError: (error: GraphQLError): any => {
//       console.dir(error, { depth: null }); // `depth: null` ensures unlimited recursion
//     },
//   });

//   const { url } = await server.listen(4000);
//   console.log(`🚀 Server ready at ${url}`);
// };

const initKoa = async () => {
  const app = new Koa();
  const router = new Router();

  router.get("/transactions", async (ctx, next) => {
    const transactions = await transactionService.list();

    ctx.body = {
      transactions,
    };
  });

  app
    .use(cors({ credentials: true, origin: "http://localhost:5000" }))
    .use(router.routes())
    .use(router.allowedMethods());
  app.listen(3000);

  console.log(`👌 Koa started at http://localhost:3000`);
};

// init();
initKoa();
