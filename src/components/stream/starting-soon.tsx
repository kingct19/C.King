"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";

import { OverlayRoot } from "@/components/stream/overlay-root";
import { footerConfig, siteConfig } from "@/config/site";
import { STREAM_COPY } from "@/config/stream-copy";
import type { StreamLayout } from "@/config/stream-components";
import { cn } from "@/lib/utils";

const DEFAULTS = STREAM_COPY["starting-soon"];
const WELCOME = "welcome to kingcappuccinoo's stream";
const CREDIT = "Crafted by Chandler King";

const paper = {
  "--background": "#000000",
  "--foreground": "oklch(0.985 0 0)",
  "--muted": "oklch(0.269 0 0)",
  "--muted-foreground": "oklch(0.708 0 0)",
  "--border": "oklch(1 0 0 / 18%)",
} as CSSProperties;

function ActivityLine({
  phrases,
  className,
}: {
  phrases: readonly string[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(() => phrases[0]?.length ?? 0);
  const [deleting, setDeleting] = useState(false);
  const phrase = phrases[index] ?? phrases[0] ?? "";

  useEffect(() => {
    if (reduceMotion || phrases.length === 0) return;
    const typed = count >= phrase.length;
    const empty = count === 0;
    const delay = deleting ? 36 : typed ? 1400 : 72;
    const timer = window.setTimeout(() => {
      if (!deleting && !typed) {
        setCount((value) => value + 1);
        return;
      }
      if (!deleting && typed) {
        setDeleting(true);
        return;
      }
      if (deleting && !empty) {
        setCount((value) => value - 1);
        return;
      }
      setDeleting(false);
      setIndex((value) => (value + 1) % phrases.length);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [count, deleting, phrase, phrases.length, reduceMotion]);

  const shown = reduceMotion ? phrase : phrase.slice(0, count);

  return (
    <p className={className}>
      <span>{shown}</span>
      <span className="ml-[0.2em] inline-block w-[0.55ch] animate-caret" aria-hidden="true">
        |
      </span>
      <span className="sr-only">{phrase}</span>
    </p>
  );
}

export function StartingSoon({
  layout,
  title = DEFAULTS.title,
  badge = DEFAULTS.badge,
  ticker = DEFAULTS.ticker,
}: {
  layout: StreamLayout;
  preview?: boolean;
  eyebrow?: string;
  title?: string;
  badge?: string;
  ticker?: readonly string[];
}) {
  const mobile = layout === "mobile";
  const quote = title.replace(/^["“]+|["”]+$/g, "");
  const titleLines = quote.split("|");
  const phrases = ticker && ticker.length > 0 ? ticker : DEFAULTS.ticker ?? [];
  const avatar = siteConfig.personal.avatar.src;

  return (
    <OverlayRoot>
      <div style={paper} className="absolute inset-0 bg-background text-foreground">
        <div
          className={cn(
            "absolute inset-x-0 top-0 z-10 flex flex-col items-center justify-end text-center",
            mobile ? "bottom-[40%] px-[8cqw] pb-[4cqw]" : "bottom-[50%] px-[6cqw] pb-[2.4cqw]",
          )}
        >
          <ActivityLine
            phrases={phrases}
            className={cn(
              "font-mono tracking-[0.04em] text-muted-foreground lowercase",
              mobile ? "text-[3.2cqw]" : "text-[1.45cqw]",
            )}
          />
          <h1
            className={cn(
              "mt-[1.4cqw] text-balance font-serif leading-snug font-medium text-foreground italic",
              mobile ? "max-w-[18ch] text-[6.2cqw]" : "max-w-[24ch] text-[3.15cqw]",
            )}
          >
            “
            {titleLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
            ”
          </h1>
          <p
            className={cn(
              "mt-[1.6cqw] font-mono tracking-[0.12em] text-muted-foreground",
              mobile ? "text-[2.4cqw]" : "text-[1.05cqw]",
            )}
          >
            {badge}
          </p>

          <div
            className={cn(
              "flex items-center border border-dashed bg-background/80 text-left",
              mobile
                ? "mt-[5cqw] w-[84cqw] gap-[2.6cqw] rounded-[1.8cqw] px-[3cqw] py-[2.4cqw]"
                : "mt-[2.2cqw] w-max max-w-[78cqw] gap-[1.2cqw] rounded-[0.7cqw] px-[1.2cqw] py-[0.85cqw]",
            )}
          >
            <span className={cn("relative shrink-0", mobile ? "size-[9cqw]" : "size-[3.1cqw]")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatar}
                alt=""
                className="size-full rounded-[0.45cqw] bg-muted object-contain"
              />
              <span
                className={cn(
                  "absolute -right-[0.15cqw] -bottom-[0.15cqw] rounded-full bg-emerald-500 ring-background",
                  mobile ? "size-[2cqw] ring-[0.45cqw]" : "size-[0.7cqw] ring-[0.18cqw]",
                )}
              />
            </span>
            <span
              className={cn(
                "font-medium tracking-tight whitespace-nowrap",
                mobile ? "text-[3.1cqw]" : "text-[1.2cqw]",
              )}
            >
              {WELCOME}
            </span>
          </div>

          <p
            className={cn(
              "font-mono tracking-[0.06em] whitespace-nowrap text-muted-foreground",
              mobile ? "mt-[3.2cqw] text-[2.3cqw]" : "mt-[1.6cqw] text-[1.05cqw]",
            )}
          >
            {CREDIT}
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={footerConfig.artwork.src}
          alt=""
          width={footerConfig.artwork.width}
          height={footerConfig.artwork.height}
          draggable={false}
          className={cn(
            "absolute left-1/2 z-0 w-full max-w-none -translate-x-1/2 select-none",
            mobile ? "bottom-0" : "top-[48%]",
          )}
        />
      </div>
    </OverlayRoot>
  );
}
