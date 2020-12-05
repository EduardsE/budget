import Router from "koa-router";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";

import services from "services/index";

import { Google } from "src/types/Google";

const router = new Router();

const REDIRECT_URI = "http://localhost:3000/oauth/google/callback";

interface CallbackResponse {
  access_token: string;
  expires_in: number;
  scope: string; // "https://www.googleapis.com/auth/userinfo.profile"
  token_type: "Bearer";
  id_token: string;
}

router.get("/google/callback", async (ctx, next) => {
  const { code } = ctx.query;

  const data = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
  };

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const json: CallbackResponse = await res.json();

  const userInfoRes = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    headers: {
      Authorization: `Bearer ${json.access_token}`,
    },
  });

  const {
    name,
    picture,
    id,
    email,
  }: Google.UserInfo = await userInfoRes.json();

  const upsertData = { name, email, picture, googleId: id };
  const user = await services.user.onAuth(upsertData);

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET!
  );

  ctx.redirect(`http://localhost:4200/auth/callback?token=${token}`);
});

export default router;
