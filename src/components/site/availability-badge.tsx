"use client";

import { cn } from "@/lib/utils";
import type { AvailabilityStatus } from "@/config/site";

const STATUS_STYLES: Record<
  AvailabilityStatus,
  { container: string; dot: string; ping: string }
> = {
  open: {
    container: "badge-accent",
    dot: "bg-white",
    ping: "bg-white",
  },
  selective: {
    container: "bg-muted text-foreground",
    dot: "bg-muted-foreground",
    ping: "bg-muted-foreground",
  },
  busy: {
    container: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
    ping: "bg-muted-foreground",
  },
};

export function AvailabilityBadge({
  status,
  label,
  className,
}: {
  status: AvailabilityStatus;
  label: string;
  className?: string;
}) {
  const styles = STATUS_STYLES[status];

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full px-2.5 py-1 font-mono text-xs font-medium",
        styles.container,
        className
      )}
    >
      <span className="relative flex size-2">
        <span
          className={cn(
            "absolute inline-flex size-full animate-ping rounded-full opacity-75",
            styles.ping
          )}
        />
        <span className={cn("relative inline-flex size-2 rounded-full", styles.dot)} />
      </span>
      {label}
    </span>
  );
}
