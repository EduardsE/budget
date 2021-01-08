/* eslint-disable import/first */
import cors from '@koa/cors';
import dotenv from 'dotenv';
import Koa from 'koa';
import koaBody from 'koa-body';
import jwt from 'koa-jwt';
import Router from 'koa-router';

import categoryRouter from 'routes/Category';
import oauthRouter from 'routes/OAuth';
import statsRouter from 'routes/Stats';
import transactionRouter from 'routes/Transaction';
import userRouter from 'routes/User';

dotenv.config();

const initKoa = async () => {
  const app = new Koa();
  const publicRouter = new Router();
  const router = new Router();

  publicRouter.use('/oauth', oauthRouter.routes());
  router.use('/transaction', transactionRouter.routes());
  router.use('/category', categoryRouter.routes());
  router.use('/user', userRouter.routes());
  router.use('/stats', statsRouter.routes());

  app
    .use(cors({ credentials: true, origin: 'http://localhost:4200' }))
    .use(koaBody({ json: true }))
    .use(publicRouter.routes())
    .use(
      jwt({
        secret: process.env.JWT_SECRET!,
      })
    )
    .use(router.routes())
    .use(router.allowedMethods());
  app.listen(3000);

  console.log('👌 Koa started at http://localhost:3000');
};

initKoa();
