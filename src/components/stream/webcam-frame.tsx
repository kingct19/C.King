"use client";

import { useEffect, useState, type CSSProperties, type ComponentType } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { OverlayRoot } from "@/components/stream/overlay-root";
import {
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
} from "@/components/site/social-icons";
import { footerConfig } from "@/config/site";
import type { StreamLayout } from "@/config/stream-components";
import { cn } from "@/lib/utils";

const night = {
  "--background": "#000000",
  "--foreground": "oklch(0.985 0 0)",
  "--muted": "oklch(0.269 0 0)",
  "--muted-foreground": "oklch(0.708 0 0)",
  "--border": "oklch(1 0 0 / 18%)",
} as CSSProperties;

const SOCIALS: readonly {
  id: string;
  label: string;
  handle: string;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  { id: "instagram", label: "Instagram", handle: "@chandler.t.king", Icon: InstagramIcon },
  { id: "tiktok", label: "TikTok", handle: "@kingcappuccinoo", Icon: TikTokIcon },
  { id: "youtube", label: "YouTube", handle: "@kingcappuccinoo", Icon: YouTubeIcon },
];

const card = "rounded-lg border border-dashed";

function SocialCarousel({
  mobile,
  placement = "below",
}: {
  mobile: boolean;
  placement?: "below" | "corner";
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % SOCIALS.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const social = SOCIALS[reduceMotion ? 0 : index] ?? SOCIALS[0];
  if (!social) return null;
  const Icon = social.Icon;

  return (
    <div
      className={cn(
        card,
        "relative overflow-hidden bg-background/60 font-mono tracking-[0.04em] text-muted-foreground",
        placement === "corner"
          ? "h-[6.4cqw] w-[52cqw]"
          : mobile
            ? "mx-auto mt-[2.2cqw] h-[7.2cqw] w-full"
            : "mx-auto mt-[0.7cqw] h-[2.8cqw] w-full",
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={social.id}
          initial={reduceMotion ? false : { y: "80%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduceMotion ? undefined : { y: "-80%", opacity: 0 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            mobile
              ? "gap-[2cqw] px-[2.6cqw] text-[2.6cqw]"
              : "gap-[0.7cqw] px-[1cqw] text-[1cqw]",
          )}
        >
          <Icon className={cn("shrink-0", mobile ? "size-[3.2cqw]" : "size-[1.15cqw]")} />
          <span className="uppercase">{social.label}</span>
          <span className="truncate tracking-tight text-foreground">{social.handle}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function WebcamFrame({
  layout,
  preview = false,
}: {
  layout: StreamLayout;
  preview?: boolean;
}) {
  const mobile = layout === "mobile";

  return (
    <OverlayRoot>
      <div
        style={night}
        className={cn(
          "absolute text-foreground",
          mobile
            ? "inset-x-0 top-0"
            : "bottom-[5.5cqw] left-[4.2cqw] w-[30cqw]",
        )}
      >
        <div
          className={cn(
            mobile && "overflow-hidden border-x border-b border-dashed",
            mobile && preview && "bg-background/60",
          )}
        >
          <div
            className={cn(
              "relative aspect-video overflow-hidden",
              mobile ? "rounded-none" : "rounded-lg border border-dashed",
              !mobile && (preview ? "bg-background/60" : "bg-transparent"),
            )}
          >
            {preview ? (
              <p
                className={cn(
                  "absolute inset-0 grid place-items-center font-mono tracking-[0.18em] text-muted-foreground uppercase",
                  mobile ? "text-[3.4cqw]" : "text-[1.35cqw]",
                )}
              >
                camera
              </p>
            ) : null}
            {mobile ? (
              <div className="absolute right-[2.2cqw] bottom-[3.2cqw] z-20">
                <SocialCarousel mobile placement="corner" />
              </div>
            ) : null}
          </div>
          {mobile ? (
            <div className="relative -mt-[1.05cqw] h-[20cqw]">
              {/* The tall peaks sit inset in the artwork, so the strip is
                  wider than the frame and shifted until those peaks meet
                  both side borders. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={footerConfig.artwork.src}
                alt=""
                draggable={false}
                style={{ width: "112%", marginLeft: "-7.5%" }}
                className="pointer-events-none relative block h-auto max-w-none select-none"
              />
            </div>
          ) : null}
        </div>
        {mobile ? null : <SocialCarousel mobile={mobile} />}
      </div>
    </OverlayRoot>
  );
}
