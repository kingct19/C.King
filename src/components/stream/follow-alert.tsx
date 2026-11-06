"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { OverlayRoot } from "@/components/stream/overlay-root";
import { useViewerQueue } from "@/components/stream/use-twitch-alerts";
import { STREAM_COPY } from "@/config/stream-copy";
import type { StreamLayout } from "@/config/stream-components";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

const DEFAULTS = STREAM_COPY["follow-alert"];
const POUR = "/images/stream/coffee-pour.webp";
const POUR_MS = 3300;
const TYPE_MS = 70;
const HOLD_MS = 1600;

type Phase = "idle" | "pour" | "type" | "hold" | "gone";

const night = {
  "--background": "#000000",
  "--foreground": "oklch(0.985 0 0)",
  "--muted-foreground": "oklch(0.708 0 0)",
  "--border": "oklch(1 0 0 / 18%)",
} as CSSProperties;

export function FollowAlert({
  layout,
  preview = false,
  label = DEFAULTS.label,
  username,
  alertKey,
  demo = false,
}: {
  layout: StreamLayout;
  preview?: boolean;
  label?: string;
  username?: string;
  alertKey?: string;
  demo?: boolean;
}) {
  const mobile = layout === "mobile";
  const reduceMotion = useReducedMotion();
  const { name, cycle, finish, replay } = useViewerQueue({
    preview,
    initialName: preview ? username || DEFAULTS.username || "" : username || "",
    demo,
    kind: "follow",
    alertKey,
    platform: layout === "mobile" ? "tiktok" : "twitch",
  });
  const [phase, setPhase] = useState<Phase>(name ? (reduceMotion ? "hold" : "pour") : "idle");
  const [count, setCount] = useState(reduceMotion ? name.length : 0);
  const token = `${cycle}:${name}:${reduceMotion ? "still" : "move"}`;
  const [seen, setSeen] = useState(token);
  if (seen !== token) {
    setSeen(token);
    if (name) {
      setCount(reduceMotion ? name.length : 0);
      setPhase(reduceMotion ? "hold" : "pour");
    }
  }
  useEffect(() => {
    if (phase !== "pour") return;
    const startType = window.setTimeout(() => setPhase("type"), POUR_MS);
    return () => window.clearTimeout(startType);
  }, [phase]);

  useEffect(() => {
    if (phase !== "type") return;
    if (count >= name.length) {
      const hold = window.setTimeout(() => setPhase("hold"), 0);
      return () => window.clearTimeout(hold);
    }
    const step = window.setTimeout(() => setCount((value) => value + 1), TYPE_MS);
    return () => window.clearTimeout(step);
  }, [count, name.length, phase]);

  useEffect(() => {
    if (phase !== "hold") return;
    const hide = window.setTimeout(() => setPhase("gone"), reduceMotion ? HOLD_MS + 800 : HOLD_MS);
    return () => window.clearTimeout(hide);
  }, [phase, reduceMotion]);

  useEffect(() => {
    if (phase !== "gone") return;
    const wait = window.setTimeout(() => {
      if (preview) replay();
      else finish();
    }, preview ? 700 : 400);
    return () => window.clearTimeout(wait);
  }, [finish, phase, preview, replay]);

  const shown = name.slice(0, count);

  return (
    <OverlayRoot>
      <div
        style={night}
        className={cn(
          "absolute left-1/2 -translate-x-1/2 text-foreground",
          mobile ? "top-[46%]" : "top-1/2 -translate-y-1/2",
        )}
      >
        {phase === "pour" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={cycle}
            src={POUR}
            alt=""
            width={784}
            height={779}
            draggable={false}
            className={cn(
              "pointer-events-none w-auto select-none",
              mobile ? "h-[64cqw]" : "h-[32cqw]",
            )}
          />
        ) : null}
        <AnimatePresence>
          {phase === "type" || phase === "hold" ? (
            <motion.div
              key={`${cycle}-name`}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={reduceMotion ? { duration: 0.15 } : spring.soft}
              className={cn(
                "rounded-lg border border-dashed bg-background/60 text-center font-mono tracking-[0.04em]",
                mobile ? "px-[3.2cqw] py-[1.8cqw]" : "px-[1.4cqw] py-[0.8cqw]",
              )}
            >
              <p
                className={cn(
                  "uppercase text-muted-foreground",
                  mobile ? "text-[2.4cqw]" : "text-[0.9cqw]",
                )}
              >
                {label}
              </p>
              <p
                className={cn(
                  "font-medium tracking-tight text-foreground",
                  mobile ? "min-h-[1.2em] text-[4.2cqw]" : "min-h-[1.2em] text-[1.7cqw]",
                )}
              >
                {shown}
                {phase === "type" ? (
                  <span className="ml-[0.12em] inline-block animate-caret" aria-hidden="true">
                    |
                  </span>
                ) : null}
                <span className="sr-only">{name}</span>
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </OverlayRoot>
  );
}
