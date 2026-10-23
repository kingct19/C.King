"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { WritingUnderline } from "./writing-underline";
import { heroConfig } from "@/config/hero";
import { AVAILABILITY, CALENDLY_URL, RESUME, siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { RotatingGlobe } from "./rotating-globe";
import { motion, Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useHaptic } from "react-haptic";
import { ArrowUpRight, FileDownIcon } from "lucide-react";

const entryTransition = {
  duration: 0.2,
  ease: [0.22, 1, 0.36, 1] as const,
};
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0,
    },
  },
};
const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(4px)",
    y: 6,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 28,
      mass: 0.8,
    },
  },
};

const locationTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: siteConfig.personal.location.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export function Hero() {
  const { vibrate } = useHaptic();
  const vibrateAudio = useRef<HTMLAudioElement>(null);
  const lastWaveTrackRef = useRef<number>(0);
  const [isLocationHovered, setIsLocationHovered] = useState(false);
  const [isLocationTooltipOpen, setIsLocationTooltipOpen] = useState(false);
  const [locationTime, setLocationTime] = useState<string | null>(null);

  const [beforeHighlight, afterHighlight] = heroConfig.description.split(
    heroConfig.descriptionHighlight,
  );

  const handleWaveAudio = (play: boolean, interactionType: "hover" | "touch" = "hover") => {
    const audio = vibrateAudio.current;
    if (!audio) {
      return;
    }

    if (play) {
      const now = Date.now();
      if (now - lastWaveTrackRef.current > 5000) {
        trackEvent("hero_wave_hovered", { interaction_type: interactionType });
        lastWaveTrackRef.current = now;
      }
      audio.currentTime = 0;
      audio.playbackRate = 1;
      audio.volume = 0.6;
      audio.play().catch(() => {});
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  };

  useEffect(() => {
    if (!isLocationTooltipOpen) return;

    const updateLocationTime = () => {
      setLocationTime(locationTimeFormatter.format(new Date()));
    };

    updateLocationTime();
    const intervalId = window.setInterval(updateLocationTime, 1000);

    return () => window.clearInterval(intervalId);
  }, [isLocationTooltipOpen]);

  useEffect(() => {
    const vibrate = vibrateAudio.current;

    return () => {
      vibrate?.pause();
    };
  }, []);

  return (
    <motion.section
      className="no-js-visible relative z-20 space-y-4 px-6 pt-4"
      initial={{ y: 24 }}
      animate={{ y: 0 }}
      transition={entryTransition}
    >
      <div className="flex flex-col items-start gap-6">
        <div className="space-y-2">
          <motion.p
            className="no-js-visible mb-4 flex flex-wrap gap-x-1.5 gap-y-1 items-center text-lg font-mono font-semibold tracking-wide"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {heroConfig.greeting.split(" ").map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className="font-serif inline-block"
              >
                {word}
              </motion.span>
            ))}
            <span
              className="inline-block text-2xl hover:animate-wave"
              onMouseEnter={() => {
                vibrate();
                handleWaveAudio(true, "hover");
              }}
              onMouseLeave={() => handleWaveAudio(false)}
              onFocus={() => handleWaveAudio(true, "hover")}
              onBlur={() => handleWaveAudio(false)}
              onTouchStart={() => handleWaveAudio(true, "touch")}
              onTouchEnd={() => handleWaveAudio(false)}
              style={{ transformOrigin: "70% 70%" }}
            >
              {typeof heroConfig.waveEmoji === "string" ? (
                heroConfig.waveEmoji
              ) : (
                <heroConfig.waveEmoji className="fill-current" />
              )}
            </span>
          </motion.p>

          <motion.h1
            className="no-js-visible text-lg sm:text-xl md:text-2xl font-semibold leading-[1.05] tracking-tight text-balance"
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ ...entryTransition, delay: 0.08 }}
          >
            <span className="whitespace-nowrap">
              {heroConfig.headlineBefore}{" "}
              <span className="underline decoration-border/50 underline-offset-4 sm:hidden">
                {heroConfig.highlightedPhrases[0]}
              </span>
              <span className="hidden sm:inline">
                <WritingUnderline delay={0.22}>
                  {heroConfig.highlightedPhrases[0]}
                </WritingUnderline>
              </span>
            </span>{" "}
            <span className="whitespace-nowrap">
              in{" "}
              <WritingUnderline delay={0.36}>
                {heroConfig.highlightedPhrases[1]}
              </WritingUnderline>
            </span>{" "}
            {heroConfig.headlineAfter}
          </motion.h1>

          <motion.p
            className="no-js-visible mt-4 text-sm text-muted-foreground max-sm:text-sm"
            initial={{ y: 12 }}
            animate={{ y: 0 }}
            transition={{ ...entryTransition, delay: 0.14 }}
          >
            {afterHighlight === undefined ? (
              heroConfig.description
            ) : (
              <>
                {beforeHighlight}
                <span className="underline decoration-border/50 underline-offset-4">
                  {heroConfig.descriptionHighlight}
                </span>
                {afterHighlight}
              </>
            )}
          </motion.p>

          <motion.div
            className="no-js-visible mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...entryTransition, delay: 0.2 }}
          >
            <Tooltip onOpenChange={setIsLocationTooltipOpen}>
              <TooltipTrigger
                className="micro-transition flex items-center gap-1.5 rounded-sm py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/20 hover:text-foreground"
                onMouseEnter={() => setIsLocationHovered(true)}
                onMouseLeave={() => setIsLocationHovered(false)}
                onFocus={() => setIsLocationHovered(true)}
                onBlur={() => setIsLocationHovered(false)}
              >
                <RotatingGlobe isHovered={isLocationHovered} />
                <span className="font-sans">
                  {siteConfig.personal.location.label}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <span className="font-sans text-xs tracking-wider">
                  {locationTime ?? "--:--:--"} (Central Time)
                </span>
              </TooltipContent>
            </Tooltip>

            <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-500/10 px-2 py-0.5 font-sans text-xs text-emerald-600 dark:text-emerald-400">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              {AVAILABILITY.label}
            </span>
          </motion.div>

          <motion.div
            className="no-js-visible pt-2 flex flex-wrap items-center gap-2.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...entryTransition, delay: 0.24 }}
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="micro-press inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-medium text-background transition-opacity hover:opacity-90"
            >
              Book a 30-min scoping call
              <ArrowUpRight className="size-3.5" />
            </a>
            <a
              href={RESUME.href}
              download={RESUME.filename}
              className="micro-press inline-flex h-8 items-center gap-1.5 rounded-md border border-dashed bg-background px-3 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              <FileDownIcon className="size-3.5" />
              {RESUME.label}
            </a>
          </motion.div>
        </div>
      </div>

      <audio src="/vibration.mp3" ref={vibrateAudio} loop preload="none" />
    </motion.section>
  );
}
