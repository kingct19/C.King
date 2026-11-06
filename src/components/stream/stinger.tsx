"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { OverlayRoot } from "@/components/stream/overlay-root";
import { RotateCcw } from "@/components/shared/site-icons";
import { STREAM_COPY } from "@/config/stream-copy";
import type { StreamLayout } from "@/config/stream-components";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const DEFAULTS = STREAM_COPY.stinger;

export function Stinger({
  layout,
  preview = false,
  eyebrow = DEFAULTS.eyebrow,
  wordmark = DEFAULTS.wordmark,
}: {
  layout: StreamLayout;
  preview?: boolean;
  eyebrow?: string;
  wordmark?: string;
}) {
  const mobile = layout === "mobile";
  const reduceMotion = useReducedMotion();
  const [cycle, setCycle] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const hide = window.setTimeout(() => setVisible(false), reduceMotion ? 900 : 1400);
    return () => window.clearTimeout(hide);
  }, [cycle, reduceMotion]);

  return (
    <OverlayRoot>
      <AnimatePresence>
        {visible ? (
          <motion.div
            key={cycle}
            className="absolute inset-0 bg-background"
            initial={reduceMotion ? { opacity: 0 } : { x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: ease.inOut }}
          >
            <div className="absolute inset-[3.5cqw] border border-dashed border-foreground/25" />
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <p
                  className={cn(
                    "font-mono uppercase tracking-[0.28em] text-muted-foreground",
                    mobile ? "mb-[2cqw] text-[2.8cqw]" : "mb-[1cqw] text-[1.4cqw]",
                  )}
                >
                  {eyebrow}
                </p>
                <p
                  className={cn(
                    "font-serif font-medium tracking-tight text-foreground italic",
                    mobile ? "text-[14cqw]" : "text-[8cqw]",
                  )}
                >
                  {wordmark}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {preview ? (
        <button
          type="button"
          onClick={() => setCycle((value) => value + 1)}
          className={cn(
            "pointer-events-auto absolute inline-flex items-center gap-[0.8cqw] rounded-md border border-dashed bg-background/90 font-mono uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-muted",
            mobile
              ? "right-[8cqw] bottom-[8cqw] px-[3cqw] py-[1.6cqw] text-[2.4cqw]"
              : "right-[4cqw] bottom-[4cqw] px-[1.4cqw] py-[0.7cqw] text-[1.2cqw]",
          )}
        >
          <RotateCcw className={mobile ? "size-[3cqw]" : "size-[1.4cqw]"} />
          Replay
        </button>
      ) : null}
    </OverlayRoot>
  );
}
