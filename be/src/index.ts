import dotenv from "dotenv";
dotenv.config();

import Koa from "koa";
import Router from "koa-router";
import cors from "@koa/cors";
import koaBody from "koa-body";

import transactionRouter from "routes/Transaction";
import userRouter from "routes/User";
import oauthRouter from "routes/OAuth";

const initKoa = async () => {
  const app = new Koa();
  const router = new Router();

  router.use("/transaction", transactionRouter.routes());
  router.use("/user", userRouter.routes());
  router.use("/oauth", oauthRouter.routes());

  app
    .use(cors({ credentials: true, origin: "http://localhost:5000" }))
    .use(koaBody({ json: true }))
    .use(router.routes())
    .use(router.allowedMethods());
  app.listen(3000);

  console.log(`👌 Koa started at http://localhost:3000`);
};

initKoa();
