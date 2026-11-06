import { alertKeyMatches } from "@/lib/twitch-eventsub";
import { addTikTokListener, type TikTokAlertKind } from "@/lib/tiktok-live";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isKind(value: string | null): value is TikTokAlertKind {
  return value === "follow" || value === "sub";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const kind = url.searchParams.get("kind");
  if (!alertKeyMatches(url.searchParams.get("key") ?? undefined)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isKind(kind)) {
    return Response.json({ error: "Invalid alert" }, { status: 400 });
  }

  const encoder = new TextEncoder();
  let remove = () => {};
  const stream = new ReadableStream({
    start(controller) {
      const pulse = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(": ping\n\n"));
        } catch {
          clearInterval(pulse);
        }
      }, 15_000);
      remove = addTikTokListener((event) => {
        if (event.kind !== kind) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ name: event.name })}\n\n`));
        } catch {
          clearInterval(pulse);
          remove();
        }
      });
      const stop = () => {
        clearInterval(pulse);
        remove();
      };
      request.signal.addEventListener("abort", stop, { once: true });
      try {
        controller.enqueue(encoder.encode(": connected\n\n"));
      } catch {
        stop();
      }
    },
    cancel() {
      remove();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
