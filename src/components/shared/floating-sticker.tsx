"use client";

import Image from "next/image";
import { motion, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useRef, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

const pointerSpring = { stiffness: 350, damping: 24, mass: 0.6 };
const gestureSpring = { type: "spring", duration: 0.35, bounce: 0.3 } as const;

export interface FloatingStickerProps {
  src: string;
  alt: string;
  label: string;
  tilt?: number;
  width?: number;
  height?: number;
  soundSrc?: string;
  className?: string;
}

export function FloatingSticker({
  src,
  alt,
  label,
  tilt = -6,
  width = 120,
  height = 100,
  soundSrc = "/profile-pop.mp3",
  className,
}: FloatingStickerProps) {
  const reduceMotion = useReducedMotion();
  const bounds = useRef<DOMRect | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const x = useSpring(0, pointerSpring);
  const y = useSpring(0, pointerSpring);
  const rotateX = useTransform(y, [-14, 14], [7, -7]);
  const rotateY = useTransform(x, [-8, 8], [-8, 8]);

  const resetPointer = () => {
    x.set(0);
    y.set(0);
    bounds.current = null;
  };

  const playSound = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const followPointer = (event: PointerEvent<HTMLButtonElement>) => {
    if (reduceMotion || event.pointerType !== "mouse" || !bounds.current) return;

    const rect = bounds.current;
    const horizontal = Math.max(
      -1,
      Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2),
    );
    const vertical = Math.max(
      -1,
      Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2),
    );
    x.set(horizontal * 6);
    y.set(vertical * 5 - 7);
  };

  return (
    <div
      style={{ perspective: "650px" }}
      className={cn("inline-flex shrink-0 select-none", className)}
    >
      <motion.button
        type="button"
        aria-label={label}
        className="relative block cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        initial={false}
        style={reduceMotion ? undefined : { x, y, rotateX, rotateY }}
        whileHover={reduceMotion ? { opacity: 0.85 } : { scale: 1.08, rotate: tilt }}
        whileTap={
          reduceMotion
            ? { opacity: 0.65 }
            : { scale: 0.94, rotate: -tilt * 0.6 }
        }
        transition={gestureSpring}
        onClick={soundSrc ? playSound : undefined}
        onPointerEnter={(event) => {
          bounds.current = event.currentTarget.getBoundingClientRect();
        }}
        onPointerMove={followPointer}
        onPointerLeave={resetPointer}
        onPointerCancel={resetPointer}
        onBlur={resetPointer}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="pointer-events-none select-none object-contain"
          draggable={false}
        />
      </motion.button>
      {soundSrc ? (
        <audio ref={audioRef} src={soundSrc} preload="none" />
      ) : null}
    </div>
  );
}
