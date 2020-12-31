import Router from "koa-router";

import categoryService from "services/Category";

const router = new Router();

router.get("/", async (ctx, next) => {
  const categories = await categoryService.list();

  ctx.body = {
    categories,
  };
});

router.patch("/:id", async (ctx, next) => {
  const category = await categoryService.update(
    ctx.params.id,
    ctx.request.body
  );

  ctx.body = {
    category,
  };
});

export default router;
