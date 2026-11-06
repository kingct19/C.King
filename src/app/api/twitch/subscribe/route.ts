import { alertKeyMatches, subscribeTwitchSession, type TwitchAlertKind } from "@/lib/twitch-eventsub";

function isKind(value: unknown): value is TwitchAlertKind {
  return value === "follow" || value === "sub";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
  const { sessionId, kind, key } = body as {
    sessionId?: unknown;
    kind?: unknown;
    key?: unknown;
  };
  if (!alertKeyMatches(key)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isKind(kind) || typeof sessionId !== "string" || sessionId.length < 8 || sessionId.length > 200) {
    return Response.json({ error: "Invalid subscription" }, { status: 400 });
  }

  const result = await subscribeTwitchSession(kind, sessionId);
  if (result.ok) return Response.json({ ok: true });
  if (result.status === 503) {
    return Response.json({ error: "Twitch is not connected" }, { status: 503 });
  }
  return Response.json({ error: "Twitch rejected the subscription" }, { status: 502 });
}
