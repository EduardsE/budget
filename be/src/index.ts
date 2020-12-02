import Koa from "koa";
import Router from "koa-router";
import cors from "@koa/cors";
import koaBody from "koa-body";

import transactionService from "./services/Transaction";

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
    const transaction = await transactionService.create(ctx.request.body);

    ctx.body = {
      transaction,
    };
  });

  router.patch("/transaction/:id", async (ctx, next) => {
    const transaction = await transactionService.update(
      +ctx.params.id,
      ctx.request.body
    );

    ctx.body = {
      transaction,
    };
  });

  app
    .use(cors({ credentials: true, origin: "http://localhost:5000" }))
    .use(koaBody({ json: true }))
    .use(router.routes())
    .use(router.allowedMethods());
  app.listen(3000);

  console.log(`👌 Koa started at http://localhost:3000`);
};

initKoa();
