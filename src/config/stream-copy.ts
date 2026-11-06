import { footerConfig, SITE } from "@/config/site";
import type { StreamComponentId } from "@/config/stream-components";

export interface StreamCopy {
  eyebrow?: string;
  title?: string;
  badge?: string;
  ticker?: string[];
  name?: string;
  role?: string;
  username?: string;
  label?: string;
  status?: string;
  wordmark?: string;
  avatar?: string;
}

export const STREAM_COPY = {
  "starting-soon": {
    eyebrow: "Starting soon",
    title: footerConfig.quote,
    badge: footerConfig.attribution,
    ticker: [
      "making coffee",
      "testing audio",
      "setting the lights",
      "framing the shot",
      "one more minute",
    ],
  },
  "lower-third": {
    eyebrow: "On stream",
    name: SITE.name,
    role: "Software Engineer",
    avatar: SITE.avatar,
  },
  "follow-alert": {
    label: "New follow",
    username: "sozo_fan",
  },
  "webcam-frame": {},
  stinger: {
    eyebrow: "Scene change",
    wordmark: SITE.wordmark,
  },
  "twitch-banner": {
    title: footerConfig.quote,
    badge: footerConfig.attribution,
  },
  "offline-banner": {
    title: footerConfig.quote,
    badge: footerConfig.attribution,
  },
  "be-right-back": {
    title: "I'll be right back",
  },
  "sub-alert": {
    username: "sozo_fan",
  },
  "twitch-panels": {},
} as const satisfies Record<StreamComponentId, StreamCopy>;

const TEXT_LIMIT = 80;
const TICKER_LIMIT = 8;

function readText(
  value: string | string[] | undefined,
  max = TEXT_LIMIT,
): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  const cleaned = raw.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max);
  return cleaned.length > 0 ? cleaned : undefined;
}

function readAvatar(value: string | string[] | undefined): string | undefined {
  const avatar = readText(value, 300);
  if (!avatar) return undefined;
  if (avatar.startsWith("/") && !avatar.startsWith("//")) return avatar;
  try {
    const url = new URL(avatar);
    if (url.protocol === "https:" || url.protocol === "http:") return url.toString();
  } catch {
    return undefined;
  }
  return undefined;
}

export function parseStreamCopy(
  query: Record<string, string | string[] | undefined>,
): StreamCopy {
  const ticker = readText(query.ticker, 240);
  return {
    eyebrow: readText(query.eyebrow),
    title: readText(query.title),
    badge: readText(query.badge, 24),
    ticker: ticker
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, TICKER_LIMIT),
    name: readText(query.name),
    role: readText(query.role),
    username: readText(query.username, 40),
    label: readText(query.label, 32),
    status: readText(query.status, 24),
    wordmark: readText(query.wordmark, 24),
    avatar: readAvatar(query.avatar),
  };
}
