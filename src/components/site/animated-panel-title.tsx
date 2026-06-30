"use client";

import type { ComponentProps } from "react";
import { useInView } from "motion/react";
import { useRef } from "react";

import { TextBlurIn } from "@/components/blur-in";
import { cn } from "@/lib/utils";

export function AnimatedPanelTitle({
  className,
  sup,
  children,
  ...props
}: ComponentProps<"h2"> & { sup?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <h2
      ref={ref}
      className={cn("text-3xl font-semibold tracking-tight", className)}
      {...props}
    >
      {inView ? (
        <TextBlurIn
          as="span"
          className="inline"
          duration={0.55}
          staggerDelay={0.05}
          aria-label={typeof children === "string" ? children : undefined}
        >
          {String(children)}
        </TextBlurIn>
      ) : (
        <span className="inline opacity-0">{children}</span>
      )}
      {sup ? (
        <sup className="top-[-0.75em] ml-1 font-mono text-sm font-medium tracking-normal text-muted-foreground">
          {sup}
        </sup>
      ) : null}
    </h2>
  );
}
