"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { coffeeShopConfig } from "@/config/coffee-shop";
import { revealOnMount } from "@/lib/motion";
import styles from "./coffee-shop-scene.module.css";

type Burst = { id: number; x: number; y: number };
const colors = [
  "var(--coffee-bean)",
  "var(--coffee-roast)",
  "var(--coffee-cream)",
  "var(--coffee-foam)",
];

function BeanConfetti({
  burst,
  onComplete,
}: {
  burst: Burst;
  onComplete: () => void;
}) {
  useEffect(() => {
    const timeout = window.setTimeout(onComplete, 2400);
    return () => window.clearTimeout(timeout);
  }, [onComplete]);

  if (typeof document === "undefined") return null;
  return createPortal(
    <div aria-hidden="true" className={styles.confetti}>
      {Array.from({ length: 28 }, (_, i) => (
        <span
          key={i}
          className={styles.bean}
          style={
            {
              left: burst.x,
              top: burst.y,
              background: colors[i % colors.length],
              "--bean-x": `${Math.sin(i * 2.4) * (60 + (i % 7) * 22)}px`,
              "--bean-rise": `${-48 - (i % 6) * 16}px`,
              "--bean-fall": `${150 + (i % 5) * 16}px`,
              "--bean-rotation": `${i * 23}deg`,
              "--bean-duration": `${1.55 + (i % 5) * 0.14}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>,
    document.body,
  );
}

export function CoffeeShopScene() {
  const descriptionId = useId();
  const host = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [sceneState, setSceneState] = useState<"loading" | "ready" | "error">("loading");
  const [burst, setBurst] = useState<Burst | null>(null);
  const clearBurst = useCallback(() => setBurst(null), []);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const wide = window.matchMedia("(min-width: 80rem)");
    let observer: IntersectionObserver | null = null;
    let visible = false;
    const publishVisibility = () => {
      frame.current?.contentWindow?.postMessage(
        { type: "coffee-visibility", visible },
        location.origin,
      );
    };
    const observe = () => {
      observer?.disconnect();
      if (!wide.matches) {
        visible = false;
        publishVisibility();
        setShouldMount(false);
        setSceneState("loading");
        return;
      }
      observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) setShouldMount(true);
          publishVisibility();
        },
        { rootMargin: "180px" },
      );
      observer.observe(element);
    };
    const handleMessage = (event: MessageEvent) => {
      if (
        event.origin !== location.origin ||
        event.source !== frame.current?.contentWindow ||
        event.data?.type !== "coffee-scene"
      ) {
        return;
      }
      if (event.data.status === "ready" || event.data.status === "error") {
        setSceneState(event.data.status);
        if (event.data.status === "ready") publishVisibility();
      }
    };
    observe();
    wide.addEventListener("change", observe);
    window.addEventListener("message", handleMessage);
    return () => {
      observer?.disconnect();
      wide.removeEventListener("change", observe);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (!shouldMount || sceneState !== "loading") return;
    const timeout = window.setTimeout(() => setSceneState("error"), 12000);
    return () => window.clearTimeout(timeout);
  }, [shouldMount, sceneState]);

  function celebrate(element: HTMLElement) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = element.getBoundingClientRect();
    setBurst({
      id: Date.now(),
      x: bounds.left + bounds.width / 2,
      y: bounds.top + bounds.height * 0.55,
    });
  }

  return (
    <div ref={host} className={styles.decoration} data-coffee-shop="">
      <span id={descriptionId} className="sr-only">
        {coffeeShopConfig.sceneDescription}
      </span>
      <Tooltip delayDuration={120}>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={coffeeShopConfig.actionLabel}
            aria-describedby={descriptionId}
            aria-busy={shouldMount && sceneState === "loading"}
            disabled={sceneState !== "ready"}
            className={styles.trigger}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") celebrate(event.currentTarget);
            }}
            onClick={(event) => celebrate(event.currentTarget)}
          >
            {shouldMount && sceneState !== "error" && (
              <motion.iframe
                {...revealOnMount({ y: 8 })}
                animate={
                  sceneState === "ready"
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 8 }
                }
                ref={frame}
                src={coffeeShopConfig.sceneUrl}
                title={coffeeShopConfig.sceneTitle}
                tabIndex={-1}
                aria-hidden="true"
                className={styles.frame}
                data-ready={sceneState === "ready"}
                onError={() => setSceneState("error")}
              />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={-8}>
          {coffeeShopConfig.greeting}
        </TooltipContent>
      </Tooltip>
      {burst && <BeanConfetti key={burst.id} burst={burst} onComplete={clearBurst} />}
    </div>
  );
}
