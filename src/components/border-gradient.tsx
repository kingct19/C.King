"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

import { ACCENT_GRADIENT } from "@/lib/animation-config";
import { cn } from "@/lib/utils";

type BorderGradientBaseProps = {
  children: React.ReactNode;
  duration?: number;
  colors?: string[];
  className?: string;
};

function useBorderGradientDimensions(
  ref: React.RefObject<HTMLElement | null>
) {
  const [dimensions, setDimensions] = React.useState({
    width: 0,
    height: 0,
    radius: 0,
    perimeter: 0,
  });

  React.useEffect(() => {
    if (!ref.current) return;

    const updateDimensions = () => {
      if (!ref.current) return;

      const styles = window.getComputedStyle(ref.current);
      const width = ref.current.offsetWidth;
      const height = ref.current.offsetHeight;
      const borderRadius =
        parseFloat(styles.borderTopLeftRadius) ||
        parseFloat(styles.borderRadius) ||
        0;
      const maxRadius = Math.min(width, height) / 2;
      const actualRadius = Math.min(borderRadius, maxRadius);
      const straightEdges =
        2 * (width - 2 * actualRadius + (height - 2 * actualRadius));
      const curvedEdges = 2 * Math.PI * actualRadius;
      const perimeter = straightEdges + curvedEdges;

      setDimensions({
        width,
        height,
        radius: actualRadius,
        perimeter: perimeter || 1,
      });
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return dimensions;
}

function BorderGradientFrame({
  dimensions,
  gradientId,
  colors,
  duration,
  children,
}: BorderGradientBaseProps & {
  dimensions: ReturnType<typeof useBorderGradientDimensions>;
  gradientId: string;
}) {
  return (
    <>
      {dimensions.width > 0 ? (
        <svg
          className="pointer-events-none absolute inset-0"
          width={dimensions.width}
          height={dimensions.height}
          aria-hidden
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              {colors!.map((color, index) => (
                <stop
                  key={`${gradientId}-${index}`}
                  offset={`${(index / (colors!.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          </defs>
          <motion.rect
            x="1"
            y="1"
            width={dimensions.width - 2}
            height={dimensions.height - 2}
            rx={dimensions.radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            strokeDasharray={dimensions.perimeter}
            strokeDashoffset={0}
            animate={{ strokeDashoffset: [0, -dimensions.perimeter] }}
            transition={{
              duration,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ strokeLinecap: "round" }}
          />
        </svg>
      ) : null}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );
}

export function BorderGradientButton({
  children,
  className,
  duration = 2,
  colors = [...ACCENT_GRADIENT],
  ...props
}: BorderGradientBaseProps &
  Omit<HTMLMotionProps<"button">, "children">) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const dimensions = useBorderGradientDimensions(buttonRef);
  const gradientId = React.useId();

  return (
    <motion.button
      ref={buttonRef}
      className={cn("relative", className)}
      {...props}
    >
      <BorderGradientFrame
        dimensions={dimensions}
        gradientId={gradientId}
        colors={colors}
        duration={duration}
      >
        {children}
      </BorderGradientFrame>
    </motion.button>
  );
}

export function BorderGradientLink({
  children,
  className,
  duration = 2,
  colors = [...ACCENT_GRADIENT],
  ...props
}: BorderGradientBaseProps & Omit<HTMLMotionProps<"a">, "children">) {
  const linkRef = React.useRef<HTMLAnchorElement>(null);
  const dimensions = useBorderGradientDimensions(linkRef);
  const gradientId = React.useId();

  return (
    <motion.a ref={linkRef} className={cn("relative", className)} {...props}>
      <BorderGradientFrame
        dimensions={dimensions}
        gradientId={gradientId}
        colors={colors}
        duration={duration}
      >
        {children}
      </BorderGradientFrame>
    </motion.a>
  );
}
