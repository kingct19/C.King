"use client";

import { Monitor, Radio } from "@/components/shared/site-icons";
import type { StreamLayout } from "@/config/stream-components";
import { STREAM_CANVAS } from "@/config/stream-components";
import { cn } from "@/lib/utils";

const OPTIONS: Array<{
  id: StreamLayout;
  label: string;
  hint: string;
  Icon: typeof Monitor;
}> = [
  { id: "desktop", label: "Desktop", hint: "16:9 · OBS", Icon: Monitor },
  { id: "mobile", label: "Mobile", hint: "9:16 · TikTok", Icon: Radio },
];

export function StreamLayoutToggle({
  value,
  onChange,
}: {
  value: StreamLayout;
  onChange: (layout: StreamLayout) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Preview layout"
      className="inline-flex rounded-lg border border-dashed bg-background p-0.5"
    >
      {OPTIONS.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.id)}
            className={cn(
              "micro-press inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 text-left",
              active
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <option.Icon className="size-3.5 shrink-0" />
            <span className="flex flex-col leading-none">
              <span className="text-xs font-medium">{option.label}</span>
              <span className="mt-0.5 font-mono text-[10px] tracking-wide uppercase">
                {option.hint}
              </span>
            </span>
            <span className="sr-only">{STREAM_CANVAS[option.id].label}</span>
          </button>
        );
      })}
    </div>
  );
}
