import Router from "koa-router";
import fetch from "node-fetch";

import userService from "services/User";

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
  const { code, scope } = ctx.query;

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

  const userInfo = await userInfoRes.json();
  console.log(userInfo);

  ctx.body = {
    // users,
  };
});

export default router;
