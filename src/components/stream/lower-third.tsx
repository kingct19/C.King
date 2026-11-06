import { OverlayRoot } from "@/components/stream/overlay-root";
import { STREAM_COPY } from "@/config/stream-copy";
import type { StreamLayout } from "@/config/stream-components";
import { cn } from "@/lib/utils";

const DEFAULTS = STREAM_COPY["lower-third"];

export function LowerThird({
  layout,
  eyebrow = DEFAULTS.eyebrow,
  name = DEFAULTS.name,
  role = DEFAULTS.role,
  avatar = DEFAULTS.avatar,
}: {
  layout: StreamLayout;
  preview?: boolean;
  eyebrow?: string;
  name?: string;
  role?: string;
  avatar?: string;
}) {
  const mobile = layout === "mobile";

  return (
    <OverlayRoot>
      <div
        className={cn(
          "absolute flex items-center rounded-[1.2cqw] border border-dashed border-white/70 bg-background/95 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.85)]",
          mobile
            ? "inset-x-[6cqw] bottom-[8cqw] gap-[3cqw] px-[4cqw] py-[3cqw]"
            : "bottom-[7cqw] left-[4.5cqw] gap-[1.6cqw] px-[1.8cqw] py-[1.3cqw]",
        )}
      >
        <span
          className={cn(
            "shrink-0 overflow-hidden rounded-[0.8cqw] border border-dashed border-primary/40 bg-muted",
            mobile ? "size-[12cqw]" : "size-[5.4cqw]",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatar}
            alt=""
            className="size-full object-cover"
          />
        </span>
        <div className="min-w-0">
          <p
            className={cn(
              "font-mono uppercase tracking-[0.22em] text-primary",
              mobile ? "text-[2.6cqw]" : "text-[1.15cqw]",
            )}
          >
            {eyebrow}
          </p>
          <p
            className={cn(
              "truncate font-medium tracking-tight text-foreground",
              mobile ? "text-[5.2cqw]" : "text-[2.2cqw]",
            )}
          >
            {name}
          </p>
          <p
            className={cn(
              "truncate text-muted-foreground",
              mobile ? "text-[3cqw]" : "text-[1.25cqw]",
            )}
          >
            {role}
          </p>
        </div>
      </div>
    </OverlayRoot>
  );
}
