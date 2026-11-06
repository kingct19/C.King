import { cookies } from "next/headers";

function callbackUrl(request: Request) {
  const origin = new URL(request.url).origin;
  return `${origin}/api/twitch/oauth/callback`;
}

export async function GET(request: Request) {
  const clientId = process.env.TWITCH_CLIENT_ID;
  if (!clientId || !process.env.TWITCH_CLIENT_SECRET) {
    return new Response(
      "Add TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET, then open this page again.",
      { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  const state = crypto.randomUUID();
  const jar = await cookies();
  jar.set("twitch_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });

  const url = new URL("https://id.twitch.tv/oauth2/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", callbackUrl(request));
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "moderator:read:followers channel:read:subscriptions");
  url.searchParams.set("state", state);
  return Response.redirect(url);
}
