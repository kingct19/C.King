import { timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const TOKEN_PATH = path.join(process.cwd(), "data", "twitch-token.json");
const HELIX = "https://api.twitch.tv/helix/eventsub/subscriptions";

export type TwitchAlertKind = "follow" | "sub";

type StoredToken = {
  refreshToken: string;
  broadcasterId: string;
};

type AccessToken = {
  token: string;
  expiresAt: number;
};

let stored: StoredToken | null = null;
let access: AccessToken | null = null;

function clientConfig() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret };
}

async function readStored(): Promise<StoredToken | null> {
  if (stored) return stored;
  try {
    const parsed = JSON.parse(await readFile(TOKEN_PATH, "utf8")) as Partial<StoredToken>;
    if (parsed.refreshToken && parsed.broadcasterId) {
      stored = { refreshToken: parsed.refreshToken, broadcasterId: parsed.broadcasterId };
      return stored;
    }
  } catch {
    // The token file is created by the one-time Twitch connect.
  }
  const refreshToken = process.env.TWITCH_REFRESH_TOKEN;
  const broadcasterId = process.env.TWITCH_BROADCASTER_ID;
  if (!refreshToken || !broadcasterId) return null;
  stored = { refreshToken, broadcasterId };
  return stored;
}

export async function saveTwitchToken(next: StoredToken) {
  stored = next;
  access = null;
  await mkdir(path.dirname(TOKEN_PATH), { recursive: true });
  await writeFile(TOKEN_PATH, JSON.stringify(next), "utf8");
}

async function getAccess() {
  const config = clientConfig();
  const current = await readStored();
  if (!config || !current) return null;
  if (access && access.expiresAt > Date.now() + 60_000) {
    return { ...config, ...current, token: access.token };
  }

  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: "refresh_token",
      refresh_token: current.refreshToken,
    }),
  });
  if (!response.ok) return null;
  const body = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
    refresh_token?: string;
  };
  if (!body.access_token || !body.expires_in) return null;
  access = { token: body.access_token, expiresAt: Date.now() + body.expires_in * 1000 };
  if (body.refresh_token && body.refresh_token !== current.refreshToken) {
    await saveTwitchToken({ refreshToken: body.refresh_token, broadcasterId: current.broadcasterId });
  }
  return { ...config, broadcasterId: current.broadcasterId, token: body.access_token };
}

export function alertKeyMatches(key: unknown) {
  const expected = process.env.ALERT_KEY;
  if (!expected) return process.env.NODE_ENV !== "production";
  if (typeof key !== "string" || key.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(key), Buffer.from(expected));
}

function subscriptionBody(kind: TwitchAlertKind, broadcasterId: string, sessionId: string) {
  const transport = { method: "websocket", session_id: sessionId };
  switch (kind) {
    case "follow":
      return {
        type: "channel.follow",
        version: "2",
        condition: {
          broadcaster_user_id: broadcasterId,
          moderator_user_id: broadcasterId,
        },
        transport,
      };
    case "sub":
      return {
        type: "channel.subscribe",
        version: "1",
        condition: { broadcaster_user_id: broadcasterId },
        transport,
      };
    default: {
      const unreachable: never = kind;
      return unreachable;
    }
  }
}

export async function subscribeTwitchSession(kind: TwitchAlertKind, sessionId: string) {
  const auth = await getAccess();
  if (!auth) return { ok: false as const, status: 503 };
  const response = await fetch(HELIX, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth.token}`,
      "Client-Id": auth.clientId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscriptionBody(kind, auth.broadcasterId, sessionId)),
  });
  if (response.status === 202 || response.status === 409) return { ok: true as const, status: 202 };
  return { ok: false as const, status: response.status };
}
