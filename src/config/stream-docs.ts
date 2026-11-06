import { STREAM_COPY } from "@/config/stream-copy";
import {
  getOverlayUrl,
  type StreamComponentId,
  type StreamLayout,
} from "@/config/stream-components";

export interface StreamPropDoc {
  name: string;
  type: string;
  defaultValue: string;
  notes: string;
}

export interface StreamNote {
  title: string;
  body: string;
}

export interface StreamSourceFile {
  path: string;
  language: "tsx" | "css" | "bash";
  contents?: string;
}

export interface StreamComponentDocs {
  usage: string;
  browserSource: string;
  usageNotes: string;
  props: StreamPropDoc[];
  notes: StreamNote[];
  files: StreamSourceFile[];
  dependencies: string[];
}

const OVERLAY_ROOT: StreamSourceFile = {
  path: "src/components/stream/overlay-root.tsx",
  language: "tsx",
};

const sharedProps: StreamPropDoc[] = [
  {
    name: "layout",
    type: '"desktop" | "mobile"',
    defaultValue: "Required",
    notes:
      "Canvas orientation. Desktop is 1920×1080 for OBS. Mobile is 1080×1920 for TikTok Live Studio. Query `layout`.",
  },
  {
    name: "preview",
    type: "boolean",
    defaultValue: "false",
    notes:
      "Site-only helpers: a sample webcam fill, a looping alert, and a stinger replay control. Leave it off on the live route.",
  },
];

function browserSource(
  id: StreamComponentId,
  layout: StreamLayout,
  params: Record<string, string>,
  comment: string,
) {
  const url = new URL(getOverlayUrl(id, layout));
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return `// ${comment}\nconst src = ${JSON.stringify(url.toString())};`;
}

const starting = STREAM_COPY["starting-soon"];
const lower = STREAM_COPY["lower-third"];
const follow = STREAM_COPY["follow-alert"];
const stinger = STREAM_COPY.stinger;
const banner = STREAM_COPY["twitch-banner"];
const offline = STREAM_COPY["offline-banner"];
const brb = STREAM_COPY["be-right-back"];
const sub = STREAM_COPY["sub-alert"];

export const streamDocs: Record<StreamComponentId, StreamComponentDocs> = {
  "starting-soon": {
    usage: `import { StartingSoon } from "@/components/stream/starting-soon";

export function Overlay() {
  return (
    <StartingSoon
      layout="desktop"
      title="Carve that warmth into me."
      badge="Vinland Saga"
      ticker={["making coffee", "testing audio", "setting the lights"]}
    />
  );
}`,
    browserSource: browserSource(
      "starting-soon",
      "desktop",
      {
        title: starting.title,
        badge: starting.badge,
        ticker: (starting.ticker ?? []).join(","),
      },
      "OBS Browser source, 1920×1080. The forest stickers sit on the bottom.",
    ),
    usageNotes:
      "A full-canvas waiting scene. The activity line types itself, then the pine-tree stickers hold the bottom of the frame.",
    props: [
      {
        name: "ticker",
        type: "string[]",
        defaultValue: (starting.ticker ?? []).map((item) => `"${item}"`).join(", "),
        notes: "Activities the line types, one at a time. Query `ticker` is comma-separated.",
      },
      {
        name: "title",
        type: "string",
        defaultValue: `"${starting.title}"`,
        notes: "Serif quote. Split on `|` for a line break. Query `title`.",
      },
      {
        name: "badge",
        type: "string",
        defaultValue: `"${starting.badge}"`,
        notes: "Attribution under the quote. Query `badge`.",
      },
      ...sharedProps,
    ],
    notes: [
      {
        title: "Typed activity",
        body: "The line above the quote types a phrase, holds, deletes, and types the next one. Pass ticker to change the list.",
      },
      {
        title: "Tree stickers",
        body: "The pine forest is the footer cutout. The peaks stay in frame on both 16:9 and 9:16.",
      },
      {
        title: "Welcome",
        body: "The card beside the avatar reads welcome to kingcappuccinoo's stream. The credit has no city.",
      },
    ],
    files: [
      { path: "src/components/stream/starting-soon.tsx", language: "tsx" },
      OVERLAY_ROOT,
    ],
    dependencies: [],
  },
  "lower-third": {
    usage: `import { LowerThird } from "@/components/stream/lower-third";

export function Overlay() {
  return (
    <LowerThird
      layout="desktop"
      eyebrow="On stream"
      name="${lower.name}"
      role="${lower.role}"
    />
  );
}`,
    browserSource: browserSource(
      "lower-third",
      "desktop",
      { eyebrow: lower.eyebrow, name: lower.name, role: lower.role },
      "OBS Browser source, 1920×1080.",
    ),
    usageNotes:
      "Pins a name plate to the lower third on desktop and stretches it across the bottom on mobile. Everything outside the plate stays transparent.",
    props: [
      {
        name: "eyebrow",
        type: "string",
        defaultValue: `"${lower.eyebrow}"`,
        notes: "Small label above the name. Query `eyebrow`.",
      },
      {
        name: "name",
        type: "string",
        defaultValue: `"${lower.name}"`,
        notes: "Primary line on the plate. Query `name`.",
      },
      {
        name: "role",
        type: "string",
        defaultValue: `"${lower.role}"`,
        notes: "Secondary line under the name. Query `role`.",
      },
      {
        name: "avatar",
        type: "string",
        defaultValue: `"${lower.avatar}"`,
        notes: "Portrait on the plate. Query `avatar` accepts a site path or an http(s) URL.",
      },
      ...sharedProps,
    ],
    notes: [
      {
        title: "Desktop vs mobile",
        body: "Desktop pins the plate bottom-left. Mobile stretches it edge to edge so the name stays readable on a phone canvas.",
      },
      {
        title: "Portrait",
        body: "The avatar is a square crop. On the live URL, pass a path on this site or a full image URL.",
      },
      {
        title: "Transparent outside the plate",
        body: "The rest of the browser source stays clear, so it can sit over gameplay or a camera.",
      },
    ],
    files: [
      { path: "src/components/stream/lower-third.tsx", language: "tsx" },
      OVERLAY_ROOT,
    ],
    dependencies: [],
  },
  "follow-alert": {
    usage: `import { FollowAlert } from "@/components/stream/follow-alert";

export function Overlay() {
  return (
    <FollowAlert
      layout="desktop"
      label="New follow"
      username="${follow.username}"
      preview
    />
  );
}`,
    browserSource: browserSource(
      "follow-alert",
      "desktop",
      { label: follow.label, username: follow.username },
      "OBS Browser source, 1920×1080, transparent. Leave it open. Twitch sends each follower's name.",
    ),
    usageNotes:
      "The coffee pour plays through once. When it finishes, the follower's name types out on a dashed card. Desktop stays open for Twitch follows. The TikTok Live Studio link stays open for TikTok follows. Preview loops a sample follow.",
    props: [
      {
        name: "label",
        type: "string",
        defaultValue: `"${follow.label}"`,
        notes: "Small line above the username. Query `label`.",
      },
      {
        name: "username",
        type: "string",
        defaultValue: `"${follow.username}"`,
        notes: "Name on the toast. A `username` query plays that name once. After that, Twitch sends the name.",
      },
      ...sharedProps,
    ],
    notes: [
      {
        title: "One play on stream",
        body: "Leave the source open. On OBS, Twitch sends the follower's name. On the TikTok Live Studio link, TikTok sends it. The pour plays, the name types out, and the card leaves. The next follow waits its turn.",
      },
      {
        title: "Preview loop",
        body: "`preview` repeats the toast so you can watch it on the site. The live route never loops.",
      },
      {
        title: "Reduced motion",
        body: "The slide becomes a short fade when the viewer asks for less motion.",
      },
      {
        title: "Motion",
        body: "The toast uses the `motion` package. Install it if you copy the file into another project.",
      },
    ],
    files: [
      { path: "src/components/stream/follow-alert.tsx", language: "tsx" },
      OVERLAY_ROOT,
    ],
    dependencies: ["motion"],
  },
  "webcam-frame": {
    usage: `import { WebcamFrame } from "@/components/stream/webcam-frame";

export function Overlay() {
  return <WebcamFrame layout="desktop" preview />;
}`,
    browserSource: browserSource(
      "webcam-frame",
      "desktop",
      {},
      "OBS Browser source, 1920×1080. Leave the hole empty for the camera.",
    ),
    usageNotes:
      "A dashed camera card, matching the footer status. Preview shows a camera label in the hole. On the live route the center stays empty so the camera can sit behind it. Desktop sits bottom-left. Mobile covers the top of the 9:16 phone.",
    props: sharedProps,
    notes: [
      {
        title: "Clear hole",
        body: "The center of the bezel is transparent on the live route. Put the camera source behind this browser source. Preview shows a camera label instead of a photo.",
      },
      {
        title: "Dashed card",
        body: "The frame uses the footer status card: rounded, dashed border, and a translucent fill in preview. The live hole stays clear.",
      },
      {
        title: "9:16 placement",
        body: "Mobile fills the top of the phone. The pine-forest sticker and a dashed rule divide the camera from the gameplay.",
      },
    ],
    files: [
      { path: "src/components/stream/webcam-frame.tsx", language: "tsx" },
      OVERLAY_ROOT,
    ],
    dependencies: [],
  },
  stinger: {
    usage: `import { Stinger } from "@/components/stream/stinger";

export function Overlay() {
  return (
    <Stinger
      layout="desktop"
      eyebrow="Scene change"
      wordmark="${stinger.wordmark}"
      preview
    />
  );
}`,
    browserSource: browserSource(
      "stinger",
      "desktop",
      { eyebrow: stinger.eyebrow, wordmark: stinger.wordmark },
      "OBS Browser source, 1920×1080. Plays once when the source is shown.",
    ),
    usageNotes:
      "A paper wipe across the canvas with the wordmark, then a clear. Preview adds a replay control. On stream it plays once when the browser source is shown.",
    props: [
      {
        name: "eyebrow",
        type: "string",
        defaultValue: `"${stinger.eyebrow}"`,
        notes: "Small line above the wordmark. Query `eyebrow`.",
      },
      {
        name: "wordmark",
        type: "string",
        defaultValue: `"${stinger.wordmark}"`,
        notes: "Large italic mark in the center of the wipe. Query `wordmark`.",
      },
      ...sharedProps,
    ],
    notes: [
      {
        title: "One play on stream",
        body: "The panel wipes in, holds the wordmark, then wipes off. Show the browser source when you change scenes.",
      },
      {
        title: "Replay",
        body: "`preview` adds a replay button on the site. The live route has no button and plays once.",
      },
      {
        title: "Reduced motion",
        body: "The wipe becomes a fade, and the hold is shorter.",
      },
      {
        title: "Motion",
        body: "The wipe uses the `motion` package. Install it if you copy the file into another project.",
      },
    ],
    files: [
      { path: "src/components/stream/stinger.tsx", language: "tsx" },
      OVERLAY_ROOT,
    ],
    dependencies: ["motion"],
  },
  "twitch-banner": {
    usage: `import { TwitchBanner } from "@/components/stream/twitch-banner";

export function Overlay() {
  return (
    <TwitchBanner
      layout="desktop"
      title="${banner.title}"
      badge="${banner.badge}"
    />
  );
}`,
    browserSource: browserSource(
      "twitch-banner",
      "desktop",
      {
        title: banner.title,
        badge: banner.badge,
      },
      "Still Twitch profile banner, 1200×480. Download the PNG from the component page.",
    ),
    usageNotes:
      "The starting-soon scene as a still 1200×480 image. Nothing animates. Download the PNG and upload it as the Twitch profile banner.",
    props: [
      {
        name: "title",
        type: "string",
        defaultValue: `"${banner.title}"`,
        notes: "Serif quote. Query `title`.",
      },
      {
        name: "badge",
        type: "string",
        defaultValue: `"${banner.badge}"`,
        notes: "Attribution under the quote. Query `badge`.",
      },
      {
        name: "layout",
        type: '"desktop" | "mobile"',
        defaultValue: "Required",
        notes: "Accepted for the overlay API. The banner is always 1200×480.",
      },
    ],
    notes: [
      {
        title: "Download",
        body: "The banner is a still image. Download the 1200×480 PNG from the component page and upload that file to Twitch.",
      },
      {
        title: "Same scene",
        body: "Quote, welcome card, credit, and the pine forest, in the starting-soon arrangement. The banner is the still version of that scene.",
      },
    ],
    files: [
      { path: "src/components/stream/twitch-banner.tsx", language: "tsx" },
      { path: "src/components/stream/banner-scene.tsx", language: "tsx" },
      OVERLAY_ROOT,
    ],
    dependencies: [],
  },
  "offline-banner": {
    usage: `import { OfflineBanner } from "@/components/stream/offline-banner";

export function Overlay() {
  return (
    <OfflineBanner
      layout="desktop"
      title="${offline.title}"
      badge="${offline.badge}"
    />
  );
}`,
    browserSource: browserSource(
      "offline-banner",
      "desktop",
      {
        title: offline.title ?? "",
        badge: offline.badge ?? "",
      },
      "Still Twitch offline screen, 1920×1080. No pine forest. Download the PNG from the component page.",
    ),
    usageNotes:
      "A still 1920×1080 image for the video player. Same type as the profile banner, without the pine forest.",
    props: [
      {
        name: "title",
        type: "string",
        defaultValue: `"${offline.title}"`,
        notes: "Serif quote. Query `title`.",
      },
      {
        name: "badge",
        type: "string",
        defaultValue: `"${offline.badge}"`,
        notes: "Attribution under the quote. Query `badge`.",
      },
      {
        name: "layout",
        type: '"desktop" | "mobile"',
        defaultValue: "Required",
        notes: "Accepted for the overlay API. The image is always 1920×1080.",
      },
    ],
    notes: [
      {
        title: "Download",
        body: "Download the 1920×1080 PNG and upload it in Twitch’s offline banner slot.",
      },
      {
        title: "No forest",
        body: "The pine forest stays on the profile banner. This screen is the quote and welcome card on black.",
      },
    ],
    files: [
      { path: "src/components/stream/offline-banner.tsx", language: "tsx" },
      { path: "src/components/stream/banner-scene.tsx", language: "tsx" },
      OVERLAY_ROOT,
    ],
    dependencies: [],
  },
  "be-right-back": {
    usage: `import { BeRightBack } from "@/components/stream/be-right-back";

export function Overlay() {
  return <BeRightBack layout="desktop" title="${brb.title}" />;
}`,
    browserSource: browserSource(
      "be-right-back",
      "desktop",
      { title: brb.title ?? "" },
      "OBS Browser source, 1920×1080. Leave the page background transparent so the camera shows through.",
    ),
    usageNotes:
      "A translucent black veil over the camera. Pine trees sit along the bottom, and the line sits in the middle. Viewers can still see you through it.",
    props: [
      {
        name: "title",
        type: "string",
        defaultValue: `"${brb.title}"`,
        notes: "The line in the middle. Query `title`.",
      },
      ...sharedProps,
    ],
    notes: [
      {
        title: "See-through",
        body: "The black is half transparent. In OBS, leave the browser source background transparent so the camera shows through the veil.",
      },
      {
        title: "Trees",
        body: "The pine forest sticker sits along the bottom, above the veil, so the peaks stay solid.",
      },
    ],
    files: [
      { path: "src/components/stream/be-right-back.tsx", language: "tsx" },
      OVERLAY_ROOT,
    ],
    dependencies: [],
  },
  "sub-alert": {
    usage: `import { SubAlert } from "@/components/stream/sub-alert";

export function Overlay() {
  return <SubAlert layout="desktop" username="${sub.username}" preview />;
}`,
    browserSource: browserSource(
      "sub-alert",
      "desktop",
      { username: sub.username ?? "" },
      "OBS Browser source, 1920×1080, transparent. Leave it open. Twitch sends each subscriber's name.",
    ),
    usageNotes:
      "The subscriber walks into the coffee shop. Their name stays in a tooltip over their head while the barista pours. Desktop hears a Twitch sub. The TikTok Live Studio link hears a TikTok sub. Preview loops a sample sub.",
    props: [
      {
        name: "username",
        type: "string",
        defaultValue: `"${sub.username}"`,
        notes: "The name in the tooltip over their head. A `username` query plays that name once. After that, Twitch sends the name.",
      },
      ...sharedProps,
    ],
    notes: [
      {
        title: "One play on stream",
        body: "Leave the source open. On OBS, Twitch sends the subscriber's name. On the TikTok Live Studio link, a TikTok sub sends it. They walk in with that name over their head, and the shop fades out. The next sub waits its turn.",
      },
      {
        title: "Name tooltip",
        body: "The tooltip is part of the miniature, so it follows the subscriber as they walk up to the counter.",
      },
      {
        title: "Preview loop",
        body: "`preview` repeats the walk-in so you can watch it on the site. The live route never loops.",
      },
    ],
    files: [
      { path: "src/components/stream/sub-alert.tsx", language: "tsx" },
      OVERLAY_ROOT,
    ],
    dependencies: [],
  },
  "twitch-panels": {
    usage: `import { TwitchPanels } from "@/components/stream/twitch-panels";

export function Overlay() {
  return <TwitchPanels layout="desktop" />;
}`,
    browserSource: browserSource(
      "twitch-panels",
      "desktop",
      {},
      "Still Twitch panels, 320×400. Download the PNGs and upload them in the About section.",
    ),
    usageNotes:
      "Six footer-style panels in the same grid as the channel About page: about, Instagram, Twitter, Discord, subs, and donations. White field, black type, a colored mark beside each title, and the pine forest along the bottom.",
    props: [
      {
        name: "layout",
        type: '"desktop" | "mobile"',
        defaultValue: "Required",
        notes: "Accepted for the overlay switch. The panels themselves are a fixed 320×400.",
      },
    ],
    notes: [
      {
        title: "Download",
        body: "Download saves six PNGs. Upload each one in Twitch’s panel slots, in the same order as the preview.",
      },
      {
        title: "Footer",
        body: "Every panel is the footer on a white card: black serif title, a colored mark beside it, and the pine forest holding the bottom.",
      },
      {
        title: "Copy",
        body: "The words live in the panel config. About reads “A caffeinated beverage.”",
      },
    ],
    files: [
      { path: "src/components/stream/twitch-panels.tsx", language: "tsx" },
      OVERLAY_ROOT,
    ],
    dependencies: [],
  },
};
