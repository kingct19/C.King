"use client";

import React, { memo, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

export type StickyFeature = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
};

type FeaturesWithStickyScrollProps = {
  heading: string;
  subheading: string;
  features: StickyFeature[];
  className?: string;
};

export default function FeaturesWithStickyScroll({
  heading,
  subheading,
  features,
  className,
}: FeaturesWithStickyScrollProps) {
  return (
    <div
      className={cn(
        "relative mx-auto h-full w-full bg-background pt-16 md:pt-24",
        className
      )}
    >
      <div className="flex flex-col items-center px-6 text-center">
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
          {subheading}
        </p>
      </div>
      <StickyScroll content={features} />
    </div>
  );
}

export const StickyScroll = memo(function StickyScroll({
  content,
}: {
  content: StickyFeature[];
}) {
  return (
    <div className="py-4 md:py-20">
      <div className="relative mx-auto hidden h-full max-w-7xl flex-col justify-between p-10 lg:flex">
        {content.map((item, index) => (
          <ScrollContent key={item.title + index} item={item} index={index} />
        ))}
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col justify-between p-10 lg:hidden">
        {content.map((item, index) => (
          <ScrollContentMobile key={item.title + index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
});

export const ScrollContent = memo(function ScrollContent({
  item,
  index,
}: {
  item: StickyFeature;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const translate = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const translateContent = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.5, 0.7, 1],
    [0, 1, 1, 0, 0]
  );

  const opacityContent = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 0, 1, 1, 0]
  );

  return (
    <div ref={ref} className="relative my-40 grid grid-cols-2 items-start gap-10">
      <div className="w-full">
        <motion.div
          style={{ y: translate, opacity: index === 0 ? opacityContent : 1 }}
        >
          <div>{item.icon}</div>
          <h3 className="mt-2 max-w-md text-left text-2xl font-semibold tracking-tight text-foreground lg:text-4xl">
            {item.title}
          </h3>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground lg:text-lg">
            {item.description}
          </p>
        </motion.div>
      </div>
      <motion.div
        style={{ y: translateContent, opacity }}
        className="sticky top-28 h-full w-full self-start rounded-md"
      >
        {item.content}
      </motion.div>
    </div>
  );
});

export const ScrollContentMobile = memo(function ScrollContentMobile({
  item,
}: {
  item: StickyFeature;
  index: number;
}) {
  return (
    <div className="relative my-10 flex flex-col md:flex-row md:gap-20">
      <div className="mb-8 w-full self-start rounded-md">{item.content}</div>
      <div className="w-full">
        <div className="mb-6">
          <div>{item.icon}</div>
          <h3 className="mt-2 text-left text-2xl font-semibold tracking-tight text-foreground lg:text-4xl">
            {item.title}
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
});
