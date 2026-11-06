import { SITE } from "@/config/site";
import type { ComponentIcon } from "@/config/types";

export type StreamLayout = "desktop" | "mobile";
export type StreamApp = "obs" | "tiktok";
export type StreamComponentId =
  | "starting-soon"
  | "lower-third"
  | "follow-alert"
  | "webcam-frame"
  | "stinger"
  | "twitch-banner"
  | "offline-banner"
  | "be-right-back"
  | "sub-alert"
  | "twitch-panels";

export interface StreamComponentDoc {
  id: StreamComponentId;
  title: string;
  summary: string;
  description: string;
  icon: ComponentIcon;
  sourcePath: string;
  order: number;
  enabled: boolean;
  new?: boolean;
  /** Fixed preview and export size. Overrides the 16:9 and 9:16 canvases. */
  previewCanvas?: { width: number; height: number; label: string; detail: string };
}

export const STREAM_LAYOUTS: readonly StreamLayout[] = ["desktop", "mobile"];
export const STREAM_APPS: readonly StreamApp[] = ["obs", "tiktok"];

export const STREAM_CANVAS = {
  desktop: { width: 1920, height: 1080, label: "1920 × 1080" },
  mobile: { width: 1080, height: 1920, label: "1080 × 1920" },
} as const;

export const streamComponentRegistry: StreamComponentDoc[] = [
  {
    id: "starting-soon",
    title: "Starting soon",
    summary: "The site footer, with the pine forest, as a waiting scene.",
    description:
      "A full-canvas waiting scene in the site's footer voice: the serif quote, status line, and pine forest. Drop it on an OBS browser source or a TikTok Live Studio link while you get set.",
    icon: "overlay",
    sourcePath: "src/components/stream/starting-soon.tsx",
    order: 0,
    enabled: true,
    new: true,
  },
  {
    id: "lower-third",
    title: "Lower third",
    summary: "A name plate that sits on the lower third of the frame.",
    description:
      "A compact name and title banner for the lower third. Desktop pins it bottom-left; mobile stretches it across the bottom so it stays readable on a 9:16 canvas.",
    icon: "banner",
    sourcePath: "src/components/stream/lower-third.tsx",
    order: 1,
    enabled: true,
    new: true,
  },
  {
    id: "follow-alert",
    title: "Follow alert",
    summary: "A coffee pour that plays on a new follow.",
    description:
      "The line-art coffee pour plays through when someone follows. After it finishes, their name types out on a dashed card. The OBS source hears Twitch. The TikTok Live Studio link hears TikTok. Preview loops a sample follow.",
    icon: "alert",
    sourcePath: "src/components/stream/follow-alert.tsx",
    order: 2,
    enabled: true,
    new: true,
  },
  {
    id: "webcam-frame",
    title: "Webcam frame",
    summary: "A dashed camera card.",
    description:
      "A dashed camera card in the same style as the footer status. The center stays clear on the live route so the camera can sit behind it. On 9:16 the frame covers the top of the phone.",
    icon: "webcam",
    sourcePath: "src/components/stream/webcam-frame.tsx",
    order: 3,
    enabled: true,
    new: true,
  },
  {
    id: "stinger",
    title: "Stinger",
    summary: "A full-canvas wipe with the C.KING wordmark.",
    description:
      "A stinger transition that wipes a paper panel across the canvas, holds the wordmark, then clears. Replay it on the site preview; on stream it plays once when the source is shown.",
    icon: "transition",
    sourcePath: "src/components/stream/stinger.tsx",
    order: 4,
    enabled: true,
    new: true,
  },
  {
    id: "twitch-banner",
    title: "Twitch banner",
    summary: "Starting soon, as a still 1200×480 banner.",
    description:
      "The starting-soon scene as a still Twitch profile banner. Quote, welcome card, and the pine forest. Download the PNG at 1200×480.",
    icon: "banner",
    sourcePath: "src/components/stream/twitch-banner.tsx",
    order: 5,
    enabled: true,
    new: true,
    previewCanvas: {
      width: 1200,
      height: 480,
      label: "1200 × 480",
      detail:
        "Upload it as the Twitch profile banner. The bottom-left stays clear for the channel avatar.",
    },
  },
  {
    id: "offline-banner",
    title: "Offline banner",
    summary: "The offline screen, without the pine forest.",
    description:
      "A still 1920×1080 image for the Twitch offline screen. The quote and welcome card on black, with no pine forest, so it doesn’t repeat the profile banner.",
    icon: "banner",
    sourcePath: "src/components/stream/offline-banner.tsx",
    order: 6,
    enabled: true,
    new: true,
    previewCanvas: {
      width: 1920,
      height: 1080,
      label: "1920 × 1080",
      detail: "Upload it as the Twitch offline screen. Twitch adds the offline card on top.",
    },
  },
  {
    id: "be-right-back",
    title: "Be right back",
    summary: "A see-through hold so the camera stays visible.",
    description:
      "A translucent black veil over the camera, pine trees along the bottom, and “I'll be right back” in the middle. The camera shows through, so viewers can see when you step back in.",
    icon: "overlay",
    sourcePath: "src/components/stream/be-right-back.tsx",
    order: 7,
    enabled: true,
    new: true,
  },
  {
    id: "sub-alert",
    title: "Sub alert",
    summary: "A new sub walks into the coffee shop.",
    description:
      "When someone subscribes, they walk into the coffee shop. Their name sits in a tooltip over their head while the barista pours. The OBS source hears Twitch. The TikTok Live Studio link hears a TikTok sub. Preview loops a sample sub.",
    icon: "alert",
    sourcePath: "src/components/stream/sub-alert.tsx",
    order: 8,
    enabled: true,
    new: true,
  },
  {
    id: "twitch-panels",
    title: "Twitch panels",
    summary: "Six channel panels in the footer style.",
    description:
      "About, Instagram, Twitter, Discord, subs, and donations. White field, black type, a colored mark beside each title, and the pine forest along the bottom. Download a PNG for each and upload them in Twitch’s About section.",
    icon: "banner",
    sourcePath: "src/components/stream/twitch-panels.tsx",
    order: 9,
    enabled: true,
    new: true,
    previewCanvas: {
      width: 1016,
      height: 844,
      label: "320 × 400",
      detail: "Six panels. Upload each PNG in Twitch’s About section.",
    },
  },
];

export function getEnabledStreamComponents(): StreamComponentDoc[] {
  return [...streamComponentRegistry]
    .filter((component) => component.enabled !== false)
    .sort((a, b) => a.order - b.order);
}

export function findStreamComponent(id: string): StreamComponentDoc | undefined {
  return getEnabledStreamComponents().find((component) => component.id === id);
}

export function isStreamLayout(value: string | undefined): value is StreamLayout {
  return value === "desktop" || value === "mobile";
}

export function parseStreamLayout(value: string | undefined): StreamLayout {
  return value === "mobile" ? "mobile" : "desktop";
}

export function getOverlayUrl(id: StreamComponentId, layout: StreamLayout) {
  return `${SITE.url}/live/${id}?layout=${layout}`;
}

export function getOverlaySize(layout: StreamLayout) {
  return STREAM_CANVAS[layout];
}

export function getStreamSourceUrl(sourcePath: string) {
  return `https://github.com/${SITE.github.username}/${SITE.github.repo}/blob/main/${sourcePath}`;
}

export function getStreamAppLabel(app: StreamApp) {
  switch (app) {
    case "obs":
      return "OBS";
    case "tiktok":
      return "TikTok Live";
    default: {
      const exhaustive: never = app;
      return exhaustive;
    }
  }
}
