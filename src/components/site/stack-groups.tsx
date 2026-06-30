"use client";

import { StaggerFadeList } from "@/components/stagger-fade";
import type { STACK } from "@/config/site";

type StackGroup = (typeof STACK)[number];

export function StackGroups({ groups }: { groups: StackGroup[] }) {
  return (
    <StaggerFadeList as="div" className="flex flex-col" staggerDelay={0.08}>
      {groups.map((group, index) => (
        <div
          key={group.label}
          className="grid grid-cols-[7.5rem_1fr] gap-4 px-4 py-3 not-last:screen-line-bottom max-sm:grid-cols-1"
        >
          <div className="flex items-baseline gap-2 font-mono text-xs text-muted-foreground">
            <span className="text-muted-foreground/50">
              {String(index + 1).padStart(2, "0")}.
            </span>
            {group.label}
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <li key={item} className="tag-fill">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </StaggerFadeList>
  );
}
