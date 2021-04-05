import Router from 'koa-router';

import transactionService from 'services/Transaction';

const router = new Router();

router.get('/', async (ctx, next) => {
  const transactions = await transactionService.list();

  ctx.body = {
    transactions,
  };
});

router.post('/', async (ctx, next) => {
  const transaction = await transactionService.create(ctx.request.body);

  ctx.body = {
    transaction,
  };
});

router.patch('/:id', async (ctx, next) => {
  const transaction = await transactionService.update(
    ctx.params.id,
    ctx.request.body
  );

  ctx.body = {
    transaction,
  };
});

export default router;
