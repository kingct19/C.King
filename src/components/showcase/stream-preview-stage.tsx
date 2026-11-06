import type { ReactNode } from "react";

import { STREAM_CANVAS, type StreamLayout } from "@/config/stream-components";
import { cn } from "@/lib/utils";

export function StreamPreviewStage({
  layout,
  canvas: canvasOverride,
  children,
  className,
  "aria-label": ariaLabel,
}: {
  layout: StreamLayout;
  canvas?: { width: number; height: number };
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  const canvas = canvasOverride ?? STREAM_CANVAS[layout];

  return (
    <div
      aria-label={ariaLabel}
      className={cn(
        "relative mx-auto w-full overflow-hidden border border-dashed bg-[#141414]",
        layout === "mobile" ? "max-w-[280px] sm:max-w-[320px]" : "max-w-full",
        className,
      )}
      style={{ aspectRatio: `${canvas.width} / ${canvas.height}` }}
    >
      <div className="stream-preview-wash pointer-events-none absolute inset-0" />
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
