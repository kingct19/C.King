"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

type BlurInElement = "p" | "h1" | "h2" | "span";

export interface TextBlurInProps extends Omit<HTMLMotionProps<"p">, "children"> {
  children: string;
  duration?: number;
  delay?: number;
  by?: "character" | "word";
  staggerDelay?: number;
  as?: BlurInElement;
}

export function TextBlurIn({
  children,
  className,
  duration = 0.8,
  delay = 0,
  by = "word",
  staggerDelay = 0.04,
  as = "p",
  ...props
}: TextBlurInProps) {
  const units = by === "word" ? children.split(" ") : children.split("");
  const MotionComponent = motion[as];

  return (
    <MotionComponent className={cn(className)} {...props}>
      {units.map((unit, index) => (
        <motion.span
          key={`${unit}-${index}`}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration,
            delay: delay + index * staggerDelay,
          }}
          style={{ display: "inline-block" }}
        >
          {unit === " " ? "\u00A0" : unit}
          {by === "word" && index < units.length - 1 ? "\u00A0" : null}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
