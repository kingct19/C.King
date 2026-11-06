"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type TwitchAlertKind = "follow" | "sub";
export type AlertPlatform = "twitch" | "tiktok";

const TWITCH_WS = "wss://eventsub.wss.twitch.tv/ws?keepalive_timeout_seconds=30";

type TwitchMessage = {
  metadata?: {
    message_id?: string;
    message_type?: string;
  };
  payload?: {
    session?: {
      id?: string;
      keepalive_timeout_seconds?: number;
      reconnect_url?: string | null;
    };
    event?: {
      user_name?: string;
    };
  };
};

function cleanName(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, 40);
}

function useTikTokAlerts({
  enabled,
  kind,
  alertKey,
  onName,
}: {
  enabled: boolean;
  kind: TwitchAlertKind;
  alertKey?: string;
  onName: (name: string) => void;
}) {
  const onNameRef = useRef(onName);
  useEffect(() => {
    onNameRef.current = onName;
  });

  useEffect(() => {
    if (!enabled) return;
    let source: EventSource | null = null;
    let stopped = false;
    let retry = 0;

    const connect = () => {
      const url = new URL("/api/tiktok/alerts", window.location.origin);
      url.searchParams.set("kind", kind);
      if (alertKey) url.searchParams.set("key", alertKey);
      source = new EventSource(url);
      source.onmessage = (event) => {
        try {
          const body = JSON.parse(String(event.data)) as { name?: string };
          if (body.name) onNameRef.current(body.name);
        } catch {
          // Ignore a malformed event and wait for the next one.
        }
      };
      source.onerror = () => {
        source?.close();
        if (stopped) return;
        retry = window.setTimeout(connect, 3000);
      };
    };

    connect();
    return () => {
      stopped = true;
      window.clearTimeout(retry);
      source?.close();
    };
  }, [alertKey, enabled, kind]);
}

function useTwitchAlerts({
  enabled,
  kind,
  alertKey,
  onName,
}: {
  enabled: boolean;
  kind: TwitchAlertKind;
  alertKey?: string;
  onName: (name: string) => void;
}) {
  const onNameRef = useRef(onName);
  useEffect(() => {
    onNameRef.current = onName;
  });

  useEffect(() => {
    if (!enabled) return;
    let stopped = false;
    let generation = 0;
    let watchdog = 0;
    let keepaliveMs = 30_000;
    let retryMs = 2_000;
    let active: WebSocket | null = null;
    const seen = new Set<string>();

    const arm = (socket: WebSocket) => {
      window.clearTimeout(watchdog);
      watchdog = window.setTimeout(() => {
        socket.close();
      }, keepaliveMs + 15_000);
    };

    const connect = (url: string, migrated: boolean) => {
      if (stopped) return;
      const current = ++generation;
      active?.close();
      const socket = new WebSocket(url);
      active = socket;

      socket.onmessage = (event) => {
        if (current !== generation) return;
        arm(socket);
        let message: TwitchMessage;
        try {
          message = JSON.parse(String(event.data)) as TwitchMessage;
        } catch {
          return;
        }
        const type = message.metadata?.message_type;
        if (type === "session_welcome") {
          const timeout = message.payload?.session?.keepalive_timeout_seconds;
          if (typeof timeout === "number") keepaliveMs = timeout * 1000;
          const sessionId = message.payload?.session?.id;
          if (!migrated && sessionId) {
            void fetch("/api/twitch/subscribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId, kind, key: alertKey }),
            }).then((response) => {
              if (response.status === 401 || response.status === 503) {
                stopped = true;
                socket.close();
              }
            });
          }
          return;
        }
        if (type === "session_reconnect") {
          const next = message.payload?.session?.reconnect_url;
          if (next) connect(next, true);
          return;
        }
        if (type !== "notification") return;
        const id = message.metadata?.message_id;
        if (id) {
          if (seen.has(id)) return;
          seen.add(id);
          if (seen.size > 50) {
            const first = seen.values().next().value;
            if (first) seen.delete(first);
          }
        }
        const name = message.payload?.event?.user_name;
        if (name) onNameRef.current(name);
      };

      socket.onclose = () => {
        if (stopped || current !== generation) return;
        window.clearTimeout(watchdog);
        const wait = retryMs;
        retryMs = Math.min(retryMs * 2, 30_000);
        window.setTimeout(() => connect(TWITCH_WS, false), wait);
      };
    };

    connect(TWITCH_WS, false);
    return () => {
      stopped = true;
      generation += 1;
      window.clearTimeout(watchdog);
      active?.close();
    };
  }, [alertKey, enabled, kind]);
}

export function useViewerQueue({
  preview,
  initialName,
  demo,
  kind,
  alertKey,
  platform,
}: {
  preview: boolean;
  initialName: string;
  demo: boolean;
  kind: TwitchAlertKind;
  alertKey?: string;
  platform: AlertPlatform;
}) {
  const [name, setName] = useState(initialName);
  const [cycle, setCycle] = useState(0);
  const queue = useRef<string[]>([]);
  const playing = useRef(initialName.length > 0);

  const begin = useCallback((viewer: string) => {
    playing.current = true;
    setName(viewer);
    setCycle((value) => value + 1);
  }, []);

  const enqueue = useCallback(
    (viewer: string) => {
      const cleaned = cleanName(viewer);
      if (!cleaned) return;
      if (playing.current) {
        queue.current.push(cleaned);
        return;
      }
      begin(cleaned);
    },
    [begin],
  );

  const finish = useCallback(() => {
    const next = queue.current.shift();
    if (next) {
      begin(next);
      return;
    }
    playing.current = false;
  }, [begin]);

  const replay = useCallback(() => {
    setCycle((value) => value + 1);
  }, []);

  useTwitchAlerts({
    enabled: !preview && platform === "twitch",
    kind,
    alertKey,
    onName: enqueue,
  });

  useTikTokAlerts({
    enabled: !preview && platform === "tiktok",
    kind,
    alertKey,
    onName: enqueue,
  });

  useEffect(() => {
    if (!demo || preview) return;
    const first = window.setTimeout(() => enqueue("sozo_fan"), 1200);
    const second = window.setTimeout(() => enqueue("second_fan"), 8000);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
    };
  }, [demo, enqueue, preview]);

  return { name, cycle, finish, replay };
}
