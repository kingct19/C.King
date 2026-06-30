"use client";

import * as React from "react";
import { motion, useReducedMotion, type SVGMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

export interface MorphIconProps extends Omit<SVGMotionProps<SVGSVGElement>, "children"> {
  paths: string[];
  /** Controlled path index — use 0/1 for toggles like menu ↔ close */
  index?: number;
  duration?: number;
  interval?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

export function MorphIcon({
  paths,
  index: controlledIndex,
  className,
  duration = 0.3,
  interval = 2,
  strokeColor = "currentColor",
  strokeWidth = 2,
  ...props
}: MorphIconProps) {
  const reducedMotion = useReducedMotion();
  const [internalIndex, setInternalIndex] = React.useState(0);
  const isControlled = controlledIndex !== undefined;
  const currentIndex = isControlled ? controlledIndex : internalIndex;
  const morphDuration = reducedMotion ? 0 : duration;

  React.useEffect(() => {
    if (isControlled || interval >= 999999) return;

    const timer = window.setInterval(() => {
      setInternalIndex((prev) => (prev + 1) % paths.length);
    }, interval * 1000);

    return () => window.clearInterval(timer);
  }, [paths.length, interval, isControlled]);

  return (
    <motion.svg
      className={cn(className)}
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <motion.path
        d={paths[currentIndex]}
        animate={{ d: paths[currentIndex] }}
        transition={{ duration: morphDuration, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

const MENU_PATHS = [
  "M4 6h16M4 12h16M4 18h16",
  "M6 18L18 6M6 6l12 12",
] as const;

export function MenuMorphIcon({
  open,
  className,
  duration = 0.32,
}: {
  open: boolean;
  className?: string;
  duration?: number;
}) {
  return (
    <MorphIcon
      paths={[...MENU_PATHS]}
      index={open ? 1 : 0}
      viewBox="0 0 24 24"
      className={cn("size-5", className)}
      duration={duration}
      interval={999999}
    />
  );
}
