"use client";

import { useEffect, useRef, useState } from "react";

import { OverlayRoot } from "@/components/stream/overlay-root";
import { useViewerQueue } from "@/components/stream/use-twitch-alerts";
import { STREAM_COPY } from "@/config/stream-copy";
import type { StreamLayout } from "@/config/stream-components";
import { cn } from "@/lib/utils";

const DEFAULTS = STREAM_COPY["sub-alert"];
const FADE_MS = 700;

type Phase = "idle" | "loading" | "ready" | "leaving" | "gone";

export function SubAlert({
  layout,
  preview = false,
  username,
  alertKey,
  demo = false,
}: {
  layout: StreamLayout;
  preview?: boolean;
  username?: string;
  alertKey?: string;
  demo?: boolean;
}) {
  const mobile = layout === "mobile";
  const frame = useRef<HTMLIFrameElement>(null);
  const { name, cycle, finish, replay } = useViewerQueue({
    preview,
    initialName: preview ? username || DEFAULTS.username || "" : username || "",
    demo,
    kind: "sub",
    alertKey,
    platform: layout === "mobile" ? "tiktok" : "twitch",
  });
  const [phase, setPhase] = useState<Phase>(name ? "loading" : "idle");
  const token = `${cycle}:${name}`;
  const [seen, setSeen] = useState(token);
  if (seen !== token) {
    setSeen(token);
    setPhase(name ? "loading" : "idle");
  }
  useEffect(() => {
    if (phase !== "loading") return;
    const timeout = window.setTimeout(() => setPhase("gone"), 12000);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== location.origin ||
        event.source !== frame.current?.contentWindow ||
        event.data?.type !== "coffee-scene"
      ) {
        return;
      }
      if (event.data.status === "ready") setPhase("ready");
      if (event.data.status === "complete") setPhase("leaving");
      if (event.data.status === "error") setPhase("gone");
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (phase !== "leaving") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(() => setPhase("gone"), reduce ? 150 : FADE_MS);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== "gone") return;
    const wait = window.setTimeout(() => {
      if (preview) replay();
      else finish();
    }, preview ? 700 : 400);
    return () => window.clearTimeout(wait);
  }, [finish, phase, preview, replay]);

  const src = `/coffee/index.html?alert=1&username=${encodeURIComponent(name)}`;

  return (
    <OverlayRoot>
      {phase === "gone" || phase === "idle" ? null : (
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2",
            mobile ? "bottom-[8%] w-[86cqw]" : "bottom-[5%] w-[34cqw]",
          )}
        >
          <iframe
            key={`${cycle}-${name}`}
            ref={frame}
            src={src}
            title={`${name} walks into the coffee shop`}
            tabIndex={-1}
            className={cn(
              "pointer-events-none aspect-[5/4] w-full border-0 bg-transparent transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-150",
              phase === "ready" ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
      )}
    </OverlayRoot>
  );
}
