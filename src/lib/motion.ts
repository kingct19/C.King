import type { MotionProps, Transition, Variants } from "motion/react";

/* -------------------------------------------------------------------------------------------------
 * Stealth UI motion tokens
 * -----------------------------------------------------------------------------------------------*/

export const ease = {
  /** Entrances. Strong deceleration: the first 50ms carry the motion. */
  out: [0.16, 1, 0.3, 1] as const,
  /** Softer entrance for larger surfaces. */
  outQuart: [0.25, 1, 0.5, 1] as const,
  /** Things moving while on screen: indicators, reorders, resizes. */
  inOut: [0.76, 0, 0.24, 1] as const,
  /** Exits only. */
  in: [0.4, 0, 1, 1] as const,
  /** iOS-style sheets and drawers. */
  drawer: [0.32, 0.72, 0, 1] as const,
};

export const spring = {
  /** Indicators, chips, thumbs, small moves. */
  snappy: { type: "spring", stiffness: 520, damping: 38, mass: 0.7 },
  /** Cards, panels, list reorder. */
  soft: { type: "spring", stiffness: 260, damping: 28, mass: 0.9 },
  /** Highlights that glide after the pointer. */
  follow: { type: "spring", stiffness: 650, damping: 45, mass: 0.5 },
  /** Icon and label swaps that pop into place. */
  pop: { type: "spring", stiffness: 600, damping: 30, mass: 0.6 },
  /** Sheets settling after a release. */
  sheet: { type: "spring", stiffness: 300, damping: 32, mass: 1 },
  /** Rare: a single pixel of overshoot for delight moments. */
  bouncy: { type: "spring", stiffness: 420, damping: 20, mass: 0.7 },
} as const;

/** Seconds. Exits run at roughly 70% of the entrance. */
export const dur = {
  press: 0.12,
  hover: 0.16,
  tooltip: 0.16,
  menu: 0.18,
  indicator: 0.22,
  dialog: 0.26,
  toast: 0.28,
  page: 0.38,
  reveal: 0.8,
} as const;

export const stagger = { tight: 0.012, items: 0.02, words: 0.03, lines: 0.08 } as const;

/** The standard "nothing appears from nothing" entrance for small popups. */
export const pop = {
  initial: { opacity: 0, scale: 0.96, filter: "blur(2px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.97, filter: "blur(1px)", transition: { duration: 0.1 } },
} as const;

/** Content swap inside a fixed box: icons, labels, digits. */
export const swap = {
  initial: { opacity: 0, scale: 0.6, filter: "blur(3px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.6, filter: "blur(3px)" },
} as const;

/* -------------------------------------------------------------------------------------------------
 * Portfolio reveal helpers
 * -----------------------------------------------------------------------------------------------*/

export const MOTION_EASE = [0.22, 1, 0.36, 1] as const;

const REVEAL_SPRING = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.7,
} satisfies Transition;

const OPACITY_DURATION = 0.18;

export type RevealOptions = {
  y?: number;
  delay?: number;
  margin?: string;
  amount?: "some" | "all" | number;
};

type RevealProps = Pick<
  MotionProps,
  "initial" | "animate" | "whileInView" | "viewport" | "transition"
> & {
  "data-reveal": "";
};

function hiddenState(y: number) {
  return { opacity: 0, y };
}

function resolvedState() {
  return { opacity: 1, y: 0 };
}

function revealTransition(delay: number): Transition {
  return {
    default: { ...REVEAL_SPRING, delay },
    opacity: { duration: OPACITY_DURATION, ease: MOTION_EASE, delay },
  };
}

export function reveal({
  y = 8,
  delay = 0,
  margin = "-40px",
  amount,
}: RevealOptions = {}): RevealProps {
  return {
    "data-reveal": "",
    initial: hiddenState(y),
    whileInView: resolvedState(),
    viewport: { once: true, margin, amount },
    transition: revealTransition(delay),
  };
}

export function revealOnMount({
  y = 8,
  delay = 0,
}: Omit<RevealOptions, "margin" | "amount"> = {}): RevealProps {
  return {
    "data-reveal": "",
    initial: hiddenState(y),
    animate: resolvedState(),
    transition: revealTransition(delay),
  };
}

export function revealVariants({
  y = 8,
}: Pick<RevealOptions, "y"> = {}): Variants {
  return {
    hidden: hiddenState(y),
    visible: {
      ...resolvedState(),
      transition: revealTransition(0),
    },
  };
}

export function revealDelay(index: number, step = 0.04, max = 0.2) {
  return Math.min(index * step, max);
}
