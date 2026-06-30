"use client";

import type * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  useStrokeDraw,
  type UseStrokeDrawOptions,
} from "@/lib/use-stroke-draw";
export interface StrokeDrawIconProps
  extends Omit<React.SVGProps<SVGSVGElement>, "children">,
    UseStrokeDrawOptions {
  pathData: string;
  strokeColor?: string;
  strokeWidth?: number;
}
export function StrokeDrawIcon({
  pathData,
  className,
  duration,
  delay,
  repeat,
  ease,
  strokeColor = "currentColor",
  strokeWidth = 2,
  ...props
}: StrokeDrawIconProps) {
  const strokeProps = useStrokeDraw({ duration, delay, repeat, ease });
  return (
    <motion.svg
      className={cn(className)}
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox={props.viewBox || "0 0 24 24"}
      width={props.width}
      height={props.height}
    >
      <motion.path d={pathData} {...strokeProps} />
    </motion.svg>
  );
}
