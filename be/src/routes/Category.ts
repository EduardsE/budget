import Router from "koa-router";

import categoryService from "services/Category";

const router = new Router();

router.get("/", async (ctx, next) => {
  const categories = await categoryService.list();

  ctx.body = {
    categories,
  };
});

router.post("/", async (ctx, next) => {
  const category = await categoryService.create({
    ...ctx.request.body,
    userId: ctx.state.user.id,
  });

  ctx.body = {
    category,
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
