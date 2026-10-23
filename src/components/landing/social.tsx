"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/shared/site-icons";
import { socialSectionConfig, socialsConfig } from "@/config/socials";
import type { SocialIcon, SocialLink } from "@/config/types";
import { trackEvent } from "@/lib/analytics";
import Peerlist from "@/public/peerlist";
import Gmail from "@/public/stacks/gmail";
import X from "@/public/x-icon";
import { Kbd } from "@/components/ui/kbd";
import { FaInstagram, FaLinkedin, FaReddit } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CopyStatusIcon } from "@/components/showcase/copy-status-icon";

const sortedSocials = socialsConfig
  .filter((item) => item.enabled !== false)
  .sort((a, b) => a.order - b.order);

function SocialIconNode({
  icon,
  size = 18,
}: {
  icon: SocialIcon;
  size?: number;
}) {
  switch (icon) {
    case "github":
      return (
        <Image src="/github.svg" alt="GitHub" width={size} height={size} />
      );
    case "x":
      return <X size={String(size)} color="currentColor" />;
    case "peerlist":
      return <Peerlist size={String(size)} />;
    case "discord":
      return (
        <Image src="/discord.svg" alt="Discord" width={size} height={size} />
      );
    case "gmail":
      return <Gmail size={String(size)} />;
    case "reddit":
      return <FaReddit size={size} className="fill-orange-500" />;
    case "linkedin":
      return <FaLinkedin size={size} className="fill-[#0A66C2]" />;
    case "instagram":
      return <FaInstagram size={size} className="fill-pink-500" />;
    case "globe":
      return (
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground"
        >
          <rect x="2.5" y="2.5" width="27" height="27" rx="5.5" />
          <path d="M 19.2 3.2 L 14.0 17.5 C 9.8 21.6 9.8 25.4 14.0 28.8" />
          <path d="M 3.2 11.4 C 6.8 13.5 10.6 17.5 14.0 18.1 C 18.2 18.7 23.8 17.9 28.8 15.2" />
        </svg>
      );
    case "google-meet":
      return (
        <svg
          viewBox="0 0 87.5 72"
          width={size}
          height={size}
          aria-hidden="true"
        >
          <path
            fill="#00832d"
            d="M49.5 36l8.53 9.75 11.47 7.33 2-17.02-2-16.64-11.69 6.44z"
          />
          <path
            fill="#0066da"
            d="M0 51.5V66c0 3.315 2.685 6 6 6h14.5l3-10.96-3-9.54-9.95-3z"
          />
          <path
            fill="#e94235"
            d="M20.5 0L0 20.5l10.55 3 9.95-3 2.95-9.41z"
          />
          <path fill="#2684fc" d="M20.5 20.5H0v31h20.5z" />
          <path
            fill="#00ac47"
            d="M82.6 8.68L69.5 19.42v33.66l13.16 10.79c1.97 1.54 4.85.135 4.85-2.37V11c0-2.535-2.945-3.925-4.91-2.32zM49.5 36v15.5h-29V72h43c3.315 0 6-2.685 6-6V53.08z"
          />
          <path
            fill="#ffba00"
            d="M63.5 0h-43v20.5h29V36l20-16.57V6c0-3.315-2.685-6-6-6z"
          />
        </svg>
      );
    default:
      return null;
  }
}

const Social = () => {
  const [copied, setCopied] = useState<Record<string, boolean>>({});

  const copyEnabled = useMemo(
    () =>
      sortedSocials.filter((item) => item.action === "copy" && item.copyValue),
    [],
  );

  const handleCopy = (social: SocialLink, method: "click" | "shortcut_key" = "click") => {
    if (!social.copyValue) {
      return;
    }

    navigator.clipboard.writeText(social.copyValue);
    trackEvent("social_handle_copied", {
      platform: social.platform,
      handle: social.handle,
      method,
      location: "social_section",
    });
    setCopied((prev) => ({ ...prev, [social.id]: true }));
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [social.id]: false }));
    }, 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      const target = copyEnabled.find(
        (item) => item.shortcutKey?.toLowerCase() === e.key.toLowerCase(),
      );

      if (!target) {
        return;
      }

      e.preventDefault();
      handleCopy(target, "shortcut_key");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [copyEnabled]);

  return (
    <section className="no-js-visible border-t border-dashed pt-6">
      <h2 className="section-heading">{socialSectionConfig.title}</h2>

      <div className="grid grid-cols-2 -mb-px overflow-hidden max-sm:grid-cols-1">
        {sortedSocials.map((social) => {
          const isCopyAction = social.action === "copy";

          const cellContent = (
            <div
              className="micro-transition relative no-js-visible flex items-center gap-3 overflow-hidden p-4 max-sm:border-r-0 group-hover:bg-muted/10 group-focus-visible:bg-muted/10 "
            >
              <div className="blueprint-bg pointer-events-none absolute inset-0 opacity-45 micro-transition group-hover:opacity-100 group-focus-visible:opacity-100" />

              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-muted-foreground/5 micro-transition group-hover:ring-muted-foreground/10 group-focus-visible:ring-muted-foreground/10" />

              <div className="relative z-10 flex w-full items-center gap-3">
                <div className="micro-transition relative flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-background text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5">
                  <SocialIconNode icon={social.icon} size={18} />
                  <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-inset ring-muted-foreground/5" />
                </div>

                <div className="flex min-w-0 flex-col">
                  <span className="text-sm font-medium leading-none">
                    {social.platform}
                  </span>
                  <span className="mt-1 truncate font-mono text-xs text-muted-foreground">
                    {social.handle}
                  </span>
                </div>

                {isCopyAction ? (
                  <div className="ml-auto">
                    <CopyStatusIcon
                      status={copied[social.id] ? "copied" : "idle"}
                      className="text-muted-foreground micro-transition group-hover:text-foreground group-focus-visible:text-foreground"
                    />
                  </div>
                ) : (
                  <ArrowRightIcon className="ml-auto size-3.5 text-muted-foreground/30 micro-transition group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:-rotate-45 group-hover:text-primary group-focus-visible:translate-x-0.5 group-focus-visible:translate-y-0.5 group-focus-visible:-rotate-45 group-focus-visible:text-primary" />
                )}
              </div>
            </div>
          );

          if (isCopyAction) {
            return (
              <Tooltip key={social.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleCopy(social, "click")}
                    className="group micro-press block w-full text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/20 focus-visible:ring-offset-0"
                  >
                    {cellContent}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="gap-1 flex items-center">
                    {copied[social.id] ? "Copied!" : social.tooltipDefault}
                    {social.shortcutKey ? <Kbd>{social.shortcutKey}</Kbd> : null}
                  </p>
                </TooltipContent>
              </Tooltip>
            );
          }

          return (
            <Tooltip key={social.id}>
              <TooltipTrigger asChild>
                <Link
                  href={social.href ?? "#"}
                  target={social.action === "external" ? "_blank" : undefined}
                  rel={social.action === "external" ? "noopener noreferrer" : undefined}
                  onClick={() => {
                    trackEvent("social_link_clicked", {
                      platform: social.platform,
                      url: social.href ?? "",
                      location: "social_section",
                    });
                  }}
                  className="group micro-press block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/20 focus-visible:ring-offset-0"
                >
                  {cellContent}
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{social.tooltipDefault ?? social.platform}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </section>
  );
};

export default Social;
