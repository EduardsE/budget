import Router from "koa-router";

import userService from "services/User";

const router = new Router();

router.get("/", async (ctx, next) => {
  const users = await userService.list();

  ctx.body = {
    users,
  };
});

router.get("/me", async (ctx, next) => {
  const user = await userService.me(ctx.state.user.id);

  ctx.body = {
    user,
  };
});

export default router;
