import Router from "koa-router";

import categoryService from "services/Category";

const router = new Router();

router.get("/", async (ctx, next) => {
  const categories = await categoryService.list();

  ctx.body = {
    categories,
  };
});

export default router;
