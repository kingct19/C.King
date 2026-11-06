import { BannerScene, type BannerLayout } from "@/components/stream/banner-scene";
import { STREAM_COPY } from "@/config/stream-copy";
import type { StreamLayout } from "@/config/stream-components";

const DEFAULTS = STREAM_COPY["offline-banner"];

/** The starting-soon type on black, without the pine forest. */
export const offlineBannerLayout = {
  width: 1920,
  height: 1080,
  forestTop: 0,
  showForest: false,
  statusSize: 0.0145,
  quoteSize: 0.0315,
  badgeSize: 0.0105,
  welcomeSize: 0.012,
  creditSize: 0.0105,
  avatarSize: 0.031,
  quoteGap: 0.014,
  badgeGap: 0.016,
  cardGap: 0.022,
  cardPadX: 0.012,
  cardPadY: 0.0085,
  cardGapX: 0.012,
  creditGap: 0.016,
  textPad: 0,
  status: "offline",
  welcome: "welcome to kingcappuccinoo's stream",
  credit: "Crafted by Chandler King",
  filename: "kingcappuccinoo-offline-banner.png",
} as const satisfies BannerLayout;

export function OfflineBanner({
  title = DEFAULTS.title,
  badge = DEFAULTS.badge,
}: {
  layout: StreamLayout;
  preview?: boolean;
  title?: string;
  badge?: string;
}) {
  return <BannerScene layout={offlineBannerLayout} title={title ?? ""} badge={badge ?? ""} />;
}
