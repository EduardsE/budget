import Router from "koa-router";

import userService from "services/User";

const router = new Router();

router.get("/", async (ctx, next) => {
  const users = await userService.list();

  ctx.body = {
    users,
  };
});

export default router;
