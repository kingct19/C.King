"use client";

import { StaggerFadeList } from "@/components/stagger-fade";

export function AboutBullets({ bullets }: { bullets: string[] }) {
  return (
    <StaggerFadeList as="div" className="flex flex-col gap-3" staggerDelay={0.1}>
      {bullets.map((bullet) => (
        <div
          key={bullet}
          className="relative pl-4 text-sm leading-relaxed text-balance before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-muted-foreground/50"
        >
          {bullet}
        </div>
      ))}
    </StaggerFadeList>
  );
}
