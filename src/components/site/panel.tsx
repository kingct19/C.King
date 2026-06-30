import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function Panel({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn("screen-line-top screen-line-bottom border-x border-line", className)}
      {...props}
    />
  );
}

export function PanelHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("screen-line-bottom px-4", className)} {...props} />;
}

export function PanelTitle({
  className,
  sup,
  children,
  ...props
}: ComponentProps<"h2"> & { sup?: string }) {
  return (
    <h2 className={cn("text-3xl font-semibold tracking-tight", className)} {...props}>
      {children}
      {sup ? (
        <sup className="top-[-0.75em] ml-1 font-mono text-sm font-medium tracking-normal text-muted-foreground">
          {sup}
        </sup>
      ) : null}
    </h2>
  );
}

export function PanelContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("p-4", className)} {...props} />;
}

/** Diagonal-stripe strip used between page sections. */
export function SectionSeparator({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      className={cn(
        "section-stripes screen-line-top screen-line-bottom h-8 border-x border-line",
        className
      )}
      {...props}
    />
  );
}
