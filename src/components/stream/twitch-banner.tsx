import { BannerScene, type BannerLayout } from "@/components/stream/banner-scene";
import { STREAM_COPY } from "@/config/stream-copy";
import type { StreamLayout } from "@/config/stream-components";

const DEFAULTS = STREAM_COPY["twitch-banner"];

/** Starting soon, fitted to Twitch's 1200×480 profile banner. */
export const twitchBannerLayout = {
  width: 1200,
  height: 480,
  forestTop: 0.4,
  showForest: true,
  statusSize: 0.0122,
  quoteSize: 0.027,
  badgeSize: 0.009,
  welcomeSize: 0.0104,
  creditSize: 0.009,
  avatarSize: 0.026,
  quoteGap: 0.012,
  badgeGap: 0.014,
  cardGap: 0.016,
  cardPadX: 0.01,
  cardPadY: 0.007,
  cardGapX: 0.01,
  creditGap: 0.012,
  textPad: 0.012,
  status: "making coffee",
  welcome: "welcome to kingcappuccinoo's stream",
  credit: "Crafted by Chandler King",
  filename: "kingcappuccinoo-twitch-banner.png",
} as const satisfies BannerLayout;

export function TwitchBanner({
  title = DEFAULTS.title,
  badge = DEFAULTS.badge,
}: {
  layout: StreamLayout;
  preview?: boolean;
  title?: string;
  badge?: string;
}) {
  return <BannerScene layout={twitchBannerLayout} title={title ?? ""} badge={badge ?? ""} />;
}
