import * as React from "react";
import { useMotionValue, useSpring, useTransform } from "motion/react";

export interface UseParallaxTiltOptions {
  maxTilt?: number;
  duration?: number;
  shadowIntensity?: number;
  stiffness?: number;
  damping?: number;
  disabled?: boolean;
}

export function useParallaxTilt(options: UseParallaxTiltOptions = {}) {
  const {
    maxTilt = 15,
    duration = 0.3,
    shadowIntensity = 0.3,
    stiffness = 300,
    damping = 30,
    disabled = false,
  } = options;

  const ref = React.useRef<HTMLElement>(null);
  const [isCoarsePointer, setIsCoarsePointer] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsCoarsePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const isDisabled = disabled || isCoarsePointer;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness, damping });
  const mouseYSpring = useSpring(y, { stiffness, damping });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
  const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);
  const boxShadow = useTransform(
    [shadowX, shadowY],
    ([shadowOffsetX, shadowOffsetY]) =>
      `${shadowOffsetX}px ${shadowOffsetY}px 30px rgba(0, 0, 0, ${shadowIntensity})`,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isDisabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const tiltProps = isDisabled
    ? {}
    : {
        style: {
          rotateX,
          rotateY,
          transformStyle: "preserve-3d" as const,
          boxShadow,
        },
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        transition: { duration },
      };

  return { tiltProps, ref };
}
