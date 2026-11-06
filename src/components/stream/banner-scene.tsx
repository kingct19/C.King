import type { CSSProperties } from "react";

import { OverlayRoot } from "@/components/stream/overlay-root";
import { footerConfig, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export type BannerLayout = {
  width: number;
  height: number;
  forestTop: number;
  showForest: boolean;
  statusSize: number;
  quoteSize: number;
  badgeSize: number;
  welcomeSize: number;
  creditSize: number;
  avatarSize: number;
  quoteGap: number;
  badgeGap: number;
  cardGap: number;
  cardPadX: number;
  cardPadY: number;
  cardGapX: number;
  creditGap: number;
  textPad: number;
  status: string;
  welcome: string;
  credit: string;
  filename: string;
};

const night = {
  "--background": "#000000",
  "--foreground": "oklch(0.985 0 0)",
  "--muted": "oklch(0.269 0 0)",
  "--muted-foreground": "oklch(0.708 0 0)",
  "--border": "oklch(1 0 0 / 18%)",
} as CSSProperties;

export function BannerScene({
  layout,
  title,
  badge,
}: {
  layout: BannerLayout;
  title: string;
  badge: string;
}) {
  const quote = title.replace(/^["“]+|["”]+$/g, "");
  const titleLines = quote.split("|");
  const avatar = siteConfig.personal.avatar.src;

  return (
    <OverlayRoot>
      <div style={night} className="absolute inset-0 overflow-hidden bg-background text-foreground">
        <div
          className={cn(
            "absolute inset-x-0 z-10 flex flex-col items-center px-[6cqw] text-center",
            layout.showForest ? "top-0 justify-end" : "inset-0 justify-center",
          )}
          style={
            layout.showForest
              ? { bottom: `${layout.forestTop * 100}%`, paddingBottom: `${layout.textPad * 100}cqw` }
              : undefined
          }
        >
          <p
            className="font-mono leading-none tracking-[0.04em] text-muted-foreground lowercase"
            style={{ fontSize: `${layout.statusSize * 100}cqw` }}
          >
            {layout.status}
          </p>
          <h1
            className="max-w-[28ch] text-balance font-serif leading-snug font-medium text-foreground italic"
            style={{
              marginTop: `${layout.quoteGap * 100}cqw`,
              fontSize: `${layout.quoteSize * 100}cqw`,
            }}
          >
            “
            {titleLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {index > 0 ? <br /> : null}
                {line}
              </span>
            ))}
            ”
          </h1>
          <p
            className="font-mono leading-none tracking-[0.12em] text-muted-foreground"
            style={{
              marginTop: `${layout.badgeGap * 100}cqw`,
              fontSize: `${layout.badgeSize * 100}cqw`,
            }}
          >
            {badge}
          </p>
          <div
            className="flex w-max max-w-[88cqw] items-center border border-dashed bg-background/80 text-left"
            style={{
              marginTop: `${layout.cardGap * 100}cqw`,
              gap: `${layout.cardGapX * 100}cqw`,
              borderRadius: `${layout.cardPadY * 100}cqw`,
              paddingInline: `${layout.cardPadX * 100}cqw`,
              paddingBlock: `${layout.cardPadY * 100}cqw`,
            }}
          >
            <span
              className="relative shrink-0"
              style={{ width: `${layout.avatarSize * 100}cqw`, height: `${layout.avatarSize * 100}cqw` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatar}
                alt=""
                className="size-full rounded-[0.4cqw] bg-muted object-contain"
              />
              <span
                className="absolute -right-[0.15cqw] -bottom-[0.15cqw] rounded-full bg-emerald-500 ring-[0.16cqw] ring-background"
                style={{
                  width: `${layout.avatarSize * 23}cqw`,
                  height: `${layout.avatarSize * 23}cqw`,
                }}
              />
            </span>
            <span
              className="font-medium tracking-tight whitespace-nowrap"
              style={{ fontSize: `${layout.welcomeSize * 100}cqw` }}
            >
              {layout.welcome}
            </span>
          </div>
          <p
            className="font-mono leading-none tracking-[0.06em] whitespace-nowrap text-muted-foreground"
            style={{
              marginTop: `${layout.creditGap * 100}cqw`,
              fontSize: `${layout.creditSize * 100}cqw`,
            }}
          >
            {layout.credit}
          </p>
        </div>

        {layout.showForest ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={footerConfig.artwork.src}
            alt=""
            width={footerConfig.artwork.width}
            height={footerConfig.artwork.height}
            draggable={false}
            style={{ top: `${layout.forestTop * 100}%` }}
            className="pointer-events-none absolute left-1/2 z-0 w-full max-w-none -translate-x-1/2 select-none"
          />
        ) : null}
      </div>
    </OverlayRoot>
  );
}
