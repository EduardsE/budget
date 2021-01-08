import Router from 'koa-router';

import statsService from 'services/Stats';

const router = new Router();

router.get('/', async (ctx, next) => {
  const stats = await statsService.get(ctx.state.user.id);

  ctx.body = {
    stats,
  };
});

export default router;
