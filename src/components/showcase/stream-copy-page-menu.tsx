"use client";

import type { ComponentType, SVGProps } from "react";
import { SiClaude, SiGithub, SiMarkdown } from "react-icons/si";

import { ArrowUpRight, ChevronDown, Copy } from "@/components/shared/site-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCopy } from "@/lib/use-copy";
import { cn } from "@/lib/utils";

function ChatGptMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
      >
        AI
      </text>
    </svg>
  );
}

const LABELS = {
  idle: "Copy page",
  copied: "Copied",
  error: "Copy failed",
} as const;

export function StreamCopyPageMenu({
  markdown,
  markdownUrl,
  githubUrl,
  componentTitle,
}: {
  markdown: string;
  markdownUrl: string;
  githubUrl: string;
  componentTitle: string;
}) {
  const { status, copy } = useCopy();
  const prompt = `Read ${markdownUrl} and help me use the ${componentTitle} stream overlay.`;
  const links: {
    href: string;
    icon: ComponentType<{ className?: string }>;
    label: string;
    external?: boolean;
  }[] = [
    { href: githubUrl, icon: SiGithub, label: "Open in GitHub" },
    { href: markdownUrl, icon: SiMarkdown, label: "View as markdown", external: false },
    {
      href: `https://chatgpt.com/?${new URLSearchParams({ q: prompt })}`,
      icon: ChatGptMark,
      label: "Open in ChatGPT",
    },
    {
      href: `https://claude.ai/new?${new URLSearchParams({ q: prompt })}`,
      icon: SiClaude,
      label: "Open in Claude",
    },
  ];

  return (
    <div className="inline-flex items-stretch overflow-hidden rounded-md border border-dashed bg-background">
      <button
        type="button"
        onClick={() => copy(markdown)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase hover:text-foreground"
      >
        <Copy className="size-3.5" />
        {LABELS[status]}
      </button>
      <Popover>
        <PopoverTrigger
          className="inline-flex items-center border-l border-dashed px-1.5 text-muted-foreground hover:text-foreground"
          aria-label="More ways to copy this page"
        >
          <ChevronDown className="size-3.5" />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-52 gap-0.5 p-1">
          {links.map(({ href, icon: Icon, label, external = true }) => (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-muted",
              )}
            >
              <Icon className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1">{label}</span>
              <ArrowUpRight className="size-3.5 text-muted-foreground" />
            </a>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
