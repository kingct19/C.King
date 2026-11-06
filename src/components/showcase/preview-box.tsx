"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { CopyStatusIcon } from "@/components/showcase/copy-status-icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Tab = "preview" | "code";

const TABS = ["preview", "code"] as const;

const TAB_LABELS: Record<Tab, string> = {
  preview: "Preview",
  code: "Code",
};

export function PreviewBox({
  preview,
  rawCode,
  codeHtml,
  ariaLabel,
  componentId = "unknown",
  className,
}: {
  preview: ReactNode;
  rawCode: string;
  codeHtml: string;
  ariaLabel?: string;
  componentId?: string;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("preview");
  const [copied, setCopied] = useState(false);
  const copyResetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(copyResetTimer.current), []);

  const selectTab = useCallback(
    (tab: Tab) => {
      setActiveTab(tab);
      trackEvent("component_tab_switched", {
        component_id: componentId,
        tab,
      });
    },
    [componentId],
  );

  const handleCopy = useCallback(() => {
    if (typeof navigator === "undefined") return;
    navigator.clipboard
      .writeText(rawCode)
      .then(() => {
        setCopied(true);
        trackEvent("component_demo_source_copied", {
          component_id: componentId,
        });
        window.clearTimeout(copyResetTimer.current);
        copyResetTimer.current = window.setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        setCopied(false);
      });
  }, [rawCode, componentId]);

  return (
    <div
      aria-label={ariaLabel}
      className={cn(
        "preview-box relative mx-3 my-4 overflow-hidden rounded-2xl border bg-muted/10 sm:mx-6 no-scrollbar",
        className,
      )}
    >
      <div className="blueprint-bg pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative flex items-center justify-between gap-2 px-3 py-2 sm:px-4">
        <div className="inline-flex p-0.5">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => selectTab(tab)}
              aria-pressed={activeTab === tab}
              className={cn(
                "px-3 py-1 text-sm font-medium capitalize tracking-wider transition-colors",
                activeTab === tab
                  ? "border-b-2 border-foreground text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy source to clipboard"
              className="flex h-7 w-7 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
            >
              <CopyStatusIcon status={copied ? "copied" : "idle"} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? "Copied!" : "Copy source"}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="preview-body relative mx-1 mb-1 overflow-hidden rounded-xl border bg-background shadow-xs">
        <div
          data-active={activeTab === "preview"}
          className="preview-pane flex px-4 py-4 sm:px-6 sm:py-5"
        >
          <div className="m-auto flex w-full justify-center">{preview}</div>
        </div>

        <div
          data-active={activeTab === "code"}
          className="preview-pane preview-pane--code no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            className="px-3 py-3 font-mono text-[12.5px] leading-relaxed text-foreground sm:px-4 no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            dangerouslySetInnerHTML={{ __html: codeHtml }}
          />
        </div>
      </div>
    </div>
  );
}
