import admin from 'firebase-admin';
import jwt from 'jsonwebtoken';
import Router from 'koa-router';
import { seedTransactions } from 'src/db/seedTransactions';

import userService from 'services/User';

const router = new Router();

router.post('/verify', async (ctx, next) => {
  const { idToken, user } = ctx.request.body;

  const { uid } = await admin.auth().verifyIdToken(idToken);
  if (uid !== user.id) throw Error('Token verification failed');

  const dbUser = await userService.onAuth(user);

  const token = jwt.sign(
    {
      uid,
    },
    process.env.JWT_SECRET!
  );

  await seedTransactions(dbUser);

  ctx.cookies.set('jwt', token, {
    maxAge: 0,
    httpOnly: false,
  });
  ctx.body = {
    user: dbUser,
  };
});

export default router;
