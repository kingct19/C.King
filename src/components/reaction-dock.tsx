"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { cn } from "@/lib/utils";

interface ReactionDockProps {
  items: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    href?: string;
  }[];
  className?: string;
}

export function ReactionDock({ items, className }: ReactionDockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 items-end gap-3 rounded-2xl border border-border bg-muted/80 px-4 pb-3 dark:bg-muted/40",
        className
      )}
    >
      {items.map((item) => (
        <DockItem
          key={item.label}
          mouseX={mouseX}
          onClick={item.onClick}
          href={item.href}
          label={item.label}
        >
          {item.icon}
        </DockItem>
      ))}
    </motion.div>
  );
}

function DockItem({
  mouseX,
  children,
  onClick,
  href,
  label,
}: {
  mouseX: MotionValue;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  label: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isHovered, setHovered] = React.useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 72, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const inner = (
    <>
      <AnimatePresence>
        {isHovered ? (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute -top-9 left-1/2 w-fit -translate-x-1/2 whitespace-nowrap rounded-full border border-border bg-background px-2 py-0.5 text-xs text-foreground shadow-sm"
          >
            {label}
          </motion.span>
        ) : null}
      </AnimatePresence>
      <motion.div
        ref={ref}
        style={{ width }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.92 }}
        className="relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-accent"
      >
        <span className="flex size-5 shrink-0 items-center justify-center [&_svg]:size-5">
          {children}
        </span>
      </motion.div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        aria-label={label}
        className="relative flex flex-col items-center"
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      className="relative flex flex-col items-center"
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
