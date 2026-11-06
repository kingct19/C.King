"use client";

import type { CSSProperties } from "react";

import { OverlayRoot } from "@/components/stream/overlay-root";
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
      </div>
    </OverlayRoot>
  );
}
