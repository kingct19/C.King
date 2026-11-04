"use client";

import Image from "next/image";
import { AVAILABILITY, OVERVIEW, siteConfig } from "@/config/site";
import { useCopy } from "@/lib/use-copy";
import { CopyStatusIcon } from "@/components/showcase/copy-status-icon";
import Gmail from "@/public/stacks/gmail";

export function DiscordStatus() {
  const { status, copy } = useCopy();

  const handleCopy = () => {
    copy(OVERVIEW.email);
  };

  const label =
    status === "copied"
      ? "Copied!"
      : status === "error"
        ? "Copy failed"
        : OVERVIEW.email;

  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-dashed bg-background/60 px-3 py-2">
      <div className="relative size-7 shrink-0">
        <div className="flex size-full items-center justify-center overflow-hidden rounded-md bg-muted text-muted-foreground">
          <Image
            src={siteConfig.personal.avatar.src}
            alt={siteConfig.personal.fullName}
            width={28}
            height={28}
            className="size-full object-contain"
          />
        </div>
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-emerald-500 ring-[1.5px] ring-background"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium leading-tight tracking-tight text-foreground">
          Building AnglerIQ &amp; The Sozo CRM
        </p>
        <p className="truncate text-[11px] leading-tight text-muted-foreground">
          {AVAILABILITY.label}
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy email ${OVERVIEW.email}`}
        className="micro-transition inline-flex h-6 shrink-0 items-center gap-1 rounded-md px-1.5 font-mono text-[10px] text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/20 cursor-pointer"
      >
        <CopyStatusIcon
          status={status}
          className="size-3"
          idleIcon={<Gmail size="12" />}
        />
        <span className="hidden sm:inline" aria-live="polite">
          {label}
        </span>
      </button>
    </div>
  );
}

export default DiscordStatus;
