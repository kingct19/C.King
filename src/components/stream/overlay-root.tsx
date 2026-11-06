import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function OverlayRoot({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "@container relative h-full w-full overflow-hidden pointer-events-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
