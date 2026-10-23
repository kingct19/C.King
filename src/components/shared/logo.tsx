"use client";

import { motion, type Variants } from "motion/react";
import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

const markVariants: Variants = {
  rest: { opacity: 1, transition: { duration: 0.12 } },
  hover: {
    opacity: [0, 0, 1],
    transition: { duration: 0.7, times: [0, 0.75, 1], ease: "linear" },
  },
};

const strokeVariants: Variants = {
  rest: { pathLength: 0, opacity: 0, transition: { duration: 0.12 } },
  hover: {
    pathLength: [0, 1, 1],
    opacity: [1, 1, 0],
    transition: {
      pathLength: { duration: 0.7, times: [0, 0.8, 1], ease: "linear" },
      opacity: { duration: 0.7, times: [0, 0.8, 1], ease: "linear" },
    },
  },
};

export interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export function Logo({ size = 20, className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      className={cn("shrink-0 overflow-visible", className)}
      {...props}
    >
      {/* White rounded-square container inside the dark utility tile */}
      <rect
        width="32"
        height="32"
        rx="10"
        className="fill-foreground transition-colors"
      />

      {/* Small Studio Sozo logo centered inside the 32x32 white container (inset 7.5..24.5) */}
      <motion.g
        variants={markVariants}
        className="stroke-background transition-colors"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="8" y="8" width="16" height="16" rx="3.5" />
        <path d="M 17.8 8.5 L 14.9 16.5 C 12.6 18.8 12.6 21 14.9 23.5" />
        <path d="M 8.5 13.2 C 10.6 14.4 12.9 16.6 14.9 16.9 C 17.2 17.3 20.5 16.8 23.5 15.3" />
      </motion.g>

      {/* Hover stroke-draw animation */}
      <motion.rect
        x="8"
        y="8"
        width="16"
        height="16"
        rx="3.5"
        pathLength={0}
        variants={strokeVariants}
        className="stroke-background"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M 17.8 8.5 L 14.9 16.5 C 12.6 18.8 12.6 21 14.9 23.5"
        pathLength={0}
        variants={strokeVariants}
        className="stroke-background"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M 8.5 13.2 C 10.6 14.4 12.9 16.6 14.9 16.9 C 17.2 17.3 20.5 16.8 23.5 15.3"
        pathLength={0}
        variants={strokeVariants}
        className="stroke-background"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Logo;
