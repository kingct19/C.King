import { cookies } from "next/headers";

import { saveTwitchToken } from "@/lib/twitch-eventsub";

function callbackUrl(request: Request) {
  const origin = new URL(request.url).origin;
  return `${origin}/api/twitch/oauth/callback`;
}

function page(title: string, body: string, status = 200) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>${title}</title></head><body style="font-family:ui-sans-serif,system-ui;background:#000;color:#fbfbfb;padding:48px;line-height:1.5"><h1 style="font-weight:500">${title}</h1><p>${body}</p></body></html>`;
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const jar = await cookies();
  const expected = jar.get("twitch_oauth_state")?.value;
  jar.delete("twitch_oauth_state");
  if (!code || !state || !expected || state !== expected) {
    return page("Twitch did not connect", "The sign-in state did not match. Open /api/twitch/oauth and try again.", 400);
  }

  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return page("Twitch did not connect", "TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET are missing.", 500);
  }

  const tokenResponse = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: callbackUrl(request),
    }),
  });
  if (!tokenResponse.ok) {
    return page("Twitch did not connect", "Twitch rejected the sign-in code.", 502);
  }
  const token = (await tokenResponse.json()) as { access_token?: string; refresh_token?: string };
  if (!token.access_token || !token.refresh_token) {
    return page("Twitch did not connect", "Twitch did not return a refresh token.", 502);
  }

  const identity = await fetch("https://id.twitch.tv/oauth2/validate", {
    headers: { Authorization: `OAuth ${token.access_token}` },
  });
  if (!identity.ok) {
    return page("Twitch did not connect", "Twitch did not confirm the account.", 502);
  }
  const user = (await identity.json()) as { user_id?: string };
  if (!user.user_id) {
    return page("Twitch did not connect", "Twitch did not return the channel id.", 502);
  }

  let saved = true;
  try {
    await saveTwitchToken({ refreshToken: token.refresh_token, broadcasterId: user.user_id });
  } catch {
    saved = false;
  }

  const savedLine = saved
    ? "Saved on this machine."
    : "This machine could not store the token.";
  const escape = (value: string) =>
    value.replace(/[&<>]/g, (char) => (char === "&" ? "&amp;" : char === "<" ? "&lt;" : "&gt;"));
  return page(
    "Twitch is connected",
    `${savedLine} For the deployed site, set TWITCH_REFRESH_TOKEN and TWITCH_BROADCASTER_ID to the values below, then reload the alert sources.<br><br>TWITCH_BROADCASTER_ID=${escape(user.user_id)}<br>TWITCH_REFRESH_TOKEN=${escape(token.refresh_token)}`,
  );
}
