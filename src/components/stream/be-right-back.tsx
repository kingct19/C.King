import type { CSSProperties } from "react";

import { OverlayRoot } from "@/components/stream/overlay-root";
import { footerConfig } from "@/config/site";
import { STREAM_COPY } from "@/config/stream-copy";
import type { StreamLayout } from "@/config/stream-components";
import { cn } from "@/lib/utils";

const DEFAULTS = STREAM_COPY["be-right-back"];

const night = {
  "--foreground": "oklch(0.985 0 0)",
} as CSSProperties;

export function BeRightBack({
  layout,
  title = DEFAULTS.title,
}: {
  layout: StreamLayout;
  preview?: boolean;
  title?: string;
}) {
  const mobile = layout === "mobile";
  const line = title ?? DEFAULTS.title ?? "";

  return (
    <OverlayRoot>
      <div style={night} className="absolute inset-0 text-foreground">
        <div className="absolute inset-0 bg-black/50" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={footerConfig.artwork.src}
          alt=""
          width={footerConfig.artwork.width}
          height={footerConfig.artwork.height}
          draggable={false}
          className={cn(
            "pointer-events-none absolute left-1/2 z-10 w-full max-w-none -translate-x-1/2 select-none",
            mobile ? "bottom-0" : "top-[56%]",
          )}
        />
        <p
          className={cn(
            "absolute inset-x-0 z-20 text-balance px-[8cqw] text-center font-serif leading-snug font-medium italic",
            mobile
              ? "top-1/2 -translate-y-1/2 text-[7.2cqw]"
              : "top-[34%] text-[3.6cqw]",
          )}
        >
          {line}
        </p>
      </div>
    </OverlayRoot>
  );
}
