import { config } from "dotenv";
import Koa from "koa";
import Router from "koa-router";
import cors from "@koa/cors";

import transactionService from "./services/Transaction";

// import "reflect-metadata";

const initKoa = async () => {
  const app = new Koa();
  const router = new Router();

  router.get("/transaction", async (ctx, next) => {
    const transactions = await transactionService.list();

    ctx.body = {
      transactions,
    };
  });

  router.post("/transaction", async (ctx, next) => {
    console.log(ctx.get);
    console.log(ctx.get);
    console.log(ctx.get);

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

initKoa();
