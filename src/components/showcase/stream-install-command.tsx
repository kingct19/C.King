"use client";

import { useEffect, useState } from "react";

import { CopyStatusIcon } from "@/components/showcase/copy-status-icon";
import {
  getOverlaySize,
  getOverlayUrl,
  getStreamAppLabel,
  STREAM_APPS,
  type StreamApp,
  type StreamComponentId,
  type StreamLayout,
} from "@/config/stream-components";
import { useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/utils";

export function StreamInstallCommand({
  ids,
  layout,
  app,
  onAppChange,
  rotating = false,
  onActiveIdChange,
  size: sizeOverride,
  note,
  className,
}: {
  ids: StreamComponentId[];
  layout: StreamLayout;
  app: StreamApp;
  onAppChange: (app: StreamApp) => void;
  rotating?: boolean;
  onActiveIdChange?: (id: StreamComponentId) => void;
  size?: { label: string };
  note?: string;
  className?: string;
}) {
  const { status, copy } = useCopy();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeId = ids[Math.min(index, ids.length - 1)] ?? ids[0];
  const url = activeId ? getOverlayUrl(activeId, layout) : "";
  const size = sizeOverride ?? getOverlaySize(layout);

  useEffect(() => {
    if (activeId) onActiveIdChange?.(activeId);
  }, [activeId, onActiveIdChange]);

  useEffect(() => {
    if (!rotating || paused || ids.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % ids.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [ids.length, paused, rotating]);

  return (
    <div className={cn("space-y-3", className)}>
      <div
        className="overflow-hidden rounded-lg border border-dashed bg-background"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {note ? null : (
        <div className="flex items-center gap-1 border-b border-dashed px-2 py-1.5">
          {STREAM_APPS.map((item) => {
            const active = item === app;
            return (
              <button
                key={item}
                type="button"
                onClick={() => onAppChange(item)}
                className={cn(
                  "micro-press rounded-md px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {getStreamAppLabel(item)}
              </button>
            );
          })}
        </div>
        )}
        <button
          type="button"
          onClick={() => copy(url)}
          className="group flex w-full items-center gap-3 px-3 py-3 text-left"
          aria-label={note ? "Copy banner URL" : `Copy ${getStreamAppLabel(app)} overlay URL`}
        >
          <code className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">
            {url}
          </code>
          <CopyStatusIcon
            status={status}
            className="size-3.5 text-muted-foreground group-hover:text-foreground"
          />
        </button>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {note ? (
          note
        ) : app === "obs" ? (
          <>
            In OBS, add a Browser source, paste the URL, and set the size to{" "}
            <span className="font-mono text-foreground">{size.label}</span>.
            Leave the page background transparent.
          </>
        ) : (
          <>
            In TikTok Live Studio, add a Link source, paste the URL, and match
            the canvas at{" "}
            <span className="font-mono text-foreground">{size.label}</span>.
            The live page is already transparent.
          </>
        )}
      </p>
    </div>
  );
}
