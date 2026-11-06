import { ControlEvent, TikTokLiveConnection, WebcastEvent } from "tiktok-live-connector";

export type TikTokAlertKind = "follow" | "sub";

type AlertEvent = {
  kind: TikTokAlertKind;
  name: string;
};

type Listener = (event: AlertEvent) => void;

const listeners = new Set<Listener>();
let running = false;
let abort: AbortController | null = null;
let active: TikTokLiveConnection | null = null;

function clean(value: string | undefined) {
  return (value ?? "").replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, 40);
}

function viewerName(event: { user?: { nickname?: string } }) {
  return clean(event.user?.nickname);
}

function emit(event: AlertEvent) {
  if (!event.name) return;
  for (const listener of listeners) listener(event);
}

function uniqueId() {
  return (process.env.TIKTOK_UNIQUE_ID || "kingcappuccinoo").replace(/^@/, "");
}

async function run(signal: AbortSignal) {
  while (!signal.aborted && listeners.size > 0) {
    const live = new TikTokLiveConnection(uniqueId(), { processInitialData: false });
    active = live;
    live.on(WebcastEvent.FOLLOW, (event) => {
      const name = viewerName(event);
      if (name) emit({ kind: "follow", name });
    });
    live.on(WebcastEvent.SUB_NOTIFY, (event) => {
      const name = viewerName(event);
      if (name) emit({ kind: "sub", name });
    });

    try {
      await live.connect();
      await new Promise<void>((resolve) => {
        const done = () => resolve();
        live.once(ControlEvent.DISCONNECTED, done);
        live.once(WebcastEvent.STREAM_END, done);
        signal.addEventListener("abort", done, { once: true });
      });
    } catch {
      // The room is offline, or TikTok refused the connection. Wait and try again.
    }

    active = null;
    await live.disconnect().catch(() => undefined);
    if (signal.aborted || listeners.size === 0) return;

    try {
      await live.waitUntilLive(30, signal);
    } catch {
      if (signal.aborted) return;
      await new Promise((resolve) => setTimeout(resolve, 30_000));
    }
  }
}

export function addTikTokListener(listener: Listener) {
  listeners.add(listener);
  if (!running) {
    running = true;
    const controller = new AbortController();
    abort = controller;
    void run(controller.signal).finally(() => {
      if (abort === controller) {
        running = false;
        abort = null;
      }
    });
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size > 0) return;
    abort?.abort();
    void active?.disconnect().catch(() => undefined);
    active = null;
  };
}
