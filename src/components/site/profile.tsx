"use client";

import Image from "next/image";
import { BadgeCheckIcon } from "lucide-react";
import { motion } from "motion/react";

import { TextBlurIn } from "@/components/blur-in";
import { CardParallaxTilt } from "@/components/parallax-tilt";
import { AvailabilityBadge } from "@/components/site/availability-badge";
import { TextFlip } from "@/components/text-flip";
import { AVAILABILITY, SITE } from "@/config/site";

export function Profile() {
  return (
    <div className="border-x border-line">
      <div className="relative p-4">
        <CardParallaxTilt
          maxTilt={8}
          className="group/cover relative aspect-[16/10] w-full overflow-hidden sm:aspect-[569/362]"
        >
          <Image
            src={SITE.avatar}
            alt={SITE.name}
            fill
            priority
            className="object-cover object-[50%_20%] grayscale transition-[filter] duration-700 group-hover/cover:grayscale-0"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(var(--color-background)_1px,transparent_1px)] bg-size-[4px_4px] opacity-60"
          />
          <div aria-hidden className="absolute inset-0 bg-background/30" />
        </CardParallaxTilt>
        <div className="absolute right-4 bottom-4 border border-border bg-background px-0.5 sm:right-[19px]">
          <span className="font-mono text-xs leading-3 text-muted-foreground/50 uppercase">
            Fig.01
          </span>
        </div>
      </div>

      <div className="screen-line-top px-4 pb-4">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 sm:h-9">
          <TextBlurIn
            as="h1"
            className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
            duration={0.6}
            staggerDelay={0.06}
            aria-label={SITE.name}
          >
            {SITE.name}
          </TextBlurIn>
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.35, ease: "easeOut" }}
            className="inline-flex shrink-0"
          >
            <BadgeCheckIcon
              className="size-[18px] fill-verified-blue text-white"
              aria-label="Verified"
            />
          </motion.span>
        </div>

        <div className="screen-line-top flex h-9 items-center">
          <TextFlip className="font-mono text-sm text-muted-foreground" interval={4}>
            {SITE.flipTitles}
          </TextFlip>
        </div>

        <TextBlurIn
          className="mt-3 max-w-prose text-sm leading-relaxed text-balance text-muted-foreground"
          duration={0.55}
          delay={0.35}
          staggerDelay={0.025}
        >
          {SITE.tagline}
        </TextBlurIn>

        <AvailabilityBadge
          status={AVAILABILITY.status}
          label={AVAILABILITY.label}
          className="mt-3"
        />
      </div>
    </div>
  );
}
