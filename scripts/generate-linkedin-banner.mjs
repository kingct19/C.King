import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images", "linkedin-banner");

const CHROME_CANDIDATES = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "google-chrome",
  "chromium",
];

function findChrome() {
  for (const bin of CHROME_CANDIDATES) {
    if (bin.startsWith("/") && fs.existsSync(bin)) {
      return bin;
    }
  }
  throw new Error("Google Chrome binary not found for headless banner generation.");
}

function toDataUrl(relPath, mime = "image/webp") {
  const fullPath = path.join(ROOT, relPath);
  const b64 = fs.readFileSync(fullPath).toString("base64");
  return `data:${mime};base64,${b64}`;
}

const pineForestDataUrl = toDataUrl("public/images/footer-pine-forest.webp");
const avatarDataUrl = toDataUrl("public/images/chandler-cowboy-doodle.webp");

function buildBannerHtml(theme = "dark") {
  const isDark = theme === "dark";

  return `<!DOCTYPE html>
<html lang="en" class="${isDark ? "dark" : "light"}">
<head>
  <meta charset="UTF-8" />
  <title>Chandler King — LinkedIn Banner (${theme})</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Geist+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: ${isDark ? "#141414" : "#ffffff"};
      --stage-bg: ${isDark ? "#181818" : "#fbfbfa"};
      --fg: ${isDark ? "#fafafa" : "#141414"};
      --fg-muted: ${isDark ? "#a1a1aa" : "#64646a"};
      --fg-subtle: ${isDark ? "#71717a" : "#8d8d95"};
      --border-dashed: ${isDark ? "rgba(255, 255, 255, 0.13)" : "rgba(20, 20, 20, 0.14)"};
      --dot-base: ${isDark ? "rgba(255, 255, 255, 0.16)" : "rgba(20, 20, 20, 0.16)"};
      --dot-lit: rgba(0, 149, 246, 0.55);
      --brand-blue: #0095f6;
      --card-bg: ${isDark ? "rgba(24, 24, 26, 0.78)" : "rgba(255, 255, 255, 0.84)"};
      --card-border: ${isDark ? "rgba(255, 255, 255, 0.16)" : "rgba(20, 20, 20, 0.18)"};
      --badge-bg: ${isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(20, 20, 20, 0.05)"};
      --pill-bg: ${isDark ? "rgba(20, 20, 22, 0.62)" : "rgba(255, 255, 255, 0.68)"};
      --pill-fg: ${isDark ? "#f4f4f5" : "#18181b"};
      --pill-muted: ${isDark ? "#d4d4d8" : "#52525b"};
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    html, body {
      width: 1584px;
      height: 396px;
      overflow: hidden;
      background: var(--bg);
      color: var(--fg);
      font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .banner {
      position: relative;
      width: 1584px;
      height: 396px;
      overflow: hidden;
      background: var(--bg);
    }

    /* Frame Gutters (Left & Right) matching FrameGutters component */
    .gutter {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 96px;
      z-index: 2;
      background-image: radial-gradient(var(--dot-base) 1.15px, transparent 1.15px);
      background-size: 14px 14px;
    }
    .gutter-left {
      left: 0;
      border-right: 1px dashed var(--border-dashed);
    }
    .gutter-right {
      right: 0;
      border-left: 1px dashed var(--border-dashed);
    }
    .gutter-glow {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(var(--dot-lit) 1.25px, transparent 1.25px);
      background-size: 14px 14px;
      -webkit-mask-image: radial-gradient(circle 140px at 50% 42%, black, transparent 75%);
      mask-image: radial-gradient(circle 140px at 50% 42%, black, transparent 75%);
    }

    /* Main central stage between dashed frame borders */
    .stage {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 96px;
      right: 96px;
      background: var(--stage-bg);
      overflow: hidden;
    }

    /* Subtle architectural horizontal dashed rule near top */
    .top-rule {
      position: absolute;
      top: 30px;
      left: 0;
      right: 0;
      height: 1px;
      border-top: 1px dashed var(--border-dashed);
      z-index: 3;
    }

    /* Top-left Vinland Saga quote watermark (sits well above LinkedIn profile avatar zone) */
    .left-quote-block {
      position: absolute;
      top: 52px;
      left: 36px;
      z-index: 5;
      max-width: 290px;
    }

    .left-quote-text {
      font-family: "Instrument Serif", Georgia, serif;
      font-style: italic;
      font-size: 23px;
      line-height: 1.2;
      color: var(--fg);
      opacity: 0.88;
    }

    .left-quote-text span.carve {
      text-decoration: underline;
      text-decoration-color: var(--border-dashed);
      text-underline-offset: 4px;
      text-decoration-thickness: 1px;
    }

    .left-quote-attr {
      margin-top: 6px;
      font-family: "Geist Mono", monospace;
      font-size: 9.5px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--fg-subtle);
    }

    /* Right-weighted main content area (clear of the left 380px avatar zone) */
    .main-lockup {
      position: absolute;
      top: 48px;
      left: 368px;
      right: 40px;
      z-index: 6;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 28px;
    }

    .editorial-col {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: "Geist Mono", monospace;
      font-size: 10.5px;
      font-weight: 500;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--fg-muted);
    }

    .eyebrow-dot {
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: var(--brand-blue);
      box-shadow: 0 0 8px rgba(0, 149, 246, 0.55);
    }

    .headline {
      font-family: "Instrument Serif", Georgia, serif;
      font-style: italic;
      font-weight: 400;
      font-size: 46px;
      line-height: 1.04;
      letter-spacing: -0.01em;
      color: var(--fg);
      white-space: nowrap;
    }

    .headline span.accent {
      font-style: normal;
      color: var(--fg-muted);
      font-size: 38px;
      margin: 0 4px;
    }

    .stack-line {
      margin-top: 2px;
      font-family: "Geist Mono", monospace;
      font-size: 11px;
      letter-spacing: 0.06em;
      color: var(--fg-muted);
    }

    .stack-line span.sep {
      color: var(--fg-subtle);
      margin: 0 6px;
    }

    /* Dashed DiscordStatus Card replica from FooterScene */
    .status-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px dashed var(--card-border);
      background: var(--card-bg);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow: ${
        isDark
          ? "0 10px 28px -14px rgba(0, 0, 0, 0.65)"
          : "0 10px 28px -14px rgba(0, 0, 0, 0.1)"
      };
      flex-shrink: 0;
    }

    .avatar-wrap {
      position: relative;
      width: 36px;
      height: 36px;
      flex-shrink: 0;
    }

    .avatar-box {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      overflow: hidden;
      background: ${isDark ? "#27272a" : "#f4f4f5"};
    }

    .avatar-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 18%;
      display: block;
    }

    .status-dot {
      position: absolute;
      bottom: -2px;
      right: -2px;
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: #10b981;
      border: 2px solid var(--stage-bg);
    }

    .status-meta {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .status-title {
      font-family: "DM Sans", sans-serif;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: var(--fg);
      line-height: 1.2;
    }

    .status-sub {
      font-family: "DM Sans", sans-serif;
      font-size: 11.5px;
      color: var(--fg-muted);
      line-height: 1.2;
    }

    .email-chip {
      margin-left: 6px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 9px;
      border-radius: 6px;
      background: var(--badge-bg);
      font-family: "Geist Mono", monospace;
      font-size: 10.5px;
      color: var(--fg-muted);
    }

    /* Pine Forest Panorama across the bottom */
    .forest-stage {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 224px;
      z-index: 4;
      overflow: hidden;
      pointer-events: none;
    }

    .forest-strip {
      position: absolute;
      left: -24px;
      right: -24px;
      bottom: -66px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .forest-img {
      width: 760px;
      height: auto;
      display: block;
      flex-shrink: 0;
    }

    .forest-img.left-tile {
      margin-right: -48px;
    }

    .forest-img.right-tile {
      margin-left: -48px;
    }

    /* Liquid-glass pill floating over the pine forest panorama */
    .glass-pill-wrap {
      position: absolute;
      left: 368px;
      right: 40px;
      bottom: 34px;
      z-index: 8;
      display: flex;
      justify-content: center;
    }

    .liquid-glass-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 7px 22px;
      border-radius: 9999px;
      background-color: var(--pill-bg);
      -webkit-backdrop-filter: blur(4px) saturate(180%) url("#glass-refraction");
      backdrop-filter: blur(4px) saturate(180%) url("#glass-refraction");
      box-shadow:
        inset 0 1px 0 0 rgba(255, 255, 255, 0.42),
        inset 0 -1px 0 0 rgba(255, 255, 255, 0.16),
        0 10px 28px -10px rgba(0, 0, 0, 0.45);
      border: 1px solid ${isDark ? "rgba(255, 255, 255, 0.14)" : "rgba(255, 255, 255, 0.55)"};
      font-family: "Geist Mono", monospace;
      font-size: 11px;
      letter-spacing: 0.14em;
      color: var(--pill-muted);
    }

    .liquid-glass-pill strong {
      font-weight: 600;
      color: var(--pill-fg);
      letter-spacing: 0.1em;
    }

    .pill-sep {
      opacity: 0.45;
    }
  </style>
</head>
<body>
  <div class="banner">
    <svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">
      <defs>
        <filter
          id="glass-refraction"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.01"
            numOctaves="2"
            seed="4"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="softNoise"
            scale="28"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>

    <div class="gutter gutter-left"><div class="gutter-glow"></div></div>
    <div class="gutter gutter-right"><div class="gutter-glow"></div></div>

    <div class="stage">
      <div class="top-rule"></div>

      <!-- Signature footer quote in top-left (above LinkedIn avatar overlap zone) -->
      <div class="left-quote-block">
        <p class="left-quote-text">
          &ldquo;<span class="carve">Carve</span> that warmth into me.&rdquo;
        </p>
        <p class="left-quote-attr">Vinland Saga &middot; C.KING</p>
      </div>

      <!-- Main right-weighted editorial + status lockup -->
      <div class="main-lockup">
        <div class="editorial-col">
          <div class="eyebrow">
            <span class="eyebrow-dot"></span>
            <span>CHANDLER KING &middot; FULL-STACK &middot; MOBILE &middot; AI</span>
          </div>
          <h1 class="headline">
            Software Engineer &amp; Founder
          </h1>
          <p class="stack-line">
            React<span class="sep">&middot;</span>Next.js<span class="sep">&middot;</span>React Native<span class="sep">&middot;</span>TypeScript<span class="sep">&middot;</span>PostgreSQL
          </p>
        </div>

        <div class="status-card">
          <div class="avatar-wrap">
            <div class="avatar-box">
              <img src="${avatarDataUrl}" alt="Chandler King" />
            </div>
            <span class="status-dot"></span>
          </div>
          <div class="status-meta">
            <p class="status-title">Building AnglerIQ &amp; The Sozo CRM</p>
            <p class="status-sub">Open to software engineering roles</p>
          </div>
          <div class="email-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>chandler@studiosozo.dev</span>
          </div>
        </div>
      </div>

      <!-- Halftone die-cut pine forest panorama -->
      <div class="forest-stage">
        <div class="forest-strip">
          <img class="forest-img left-tile" src="${pineForestDataUrl}" alt="" />
          <img class="forest-img right-tile" src="${pineForestDataUrl}" alt="" />
        </div>
      </div>

      <!-- Liquid-glass pill floating over the forest -->
      <div class="glass-pill-wrap">
        <div class="liquid-glass-pill">
          <span>Crafted in Kansas City, MO</span>
          <span class="pill-sep">&middot;</span>
          <strong>chandlerking.dev</strong>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const chrome = findChrome();

const jobs = [
  { theme: "dark", scale: 2, filename: "linkedin-banner-dark.png" },
  { theme: "light", scale: 2, filename: "linkedin-banner-light.png" },
  { theme: "dark", scale: 1, filename: "linkedin-banner-dark-1x.png" },
  { theme: "light", scale: 1, filename: "linkedin-banner-light-1x.png" },
];

for (const job of jobs) {
  const html = buildBannerHtml(job.theme);
  const tmpHtml = path.join(
    os.tmpdir(),
    `linkedin-banner-${job.theme}-${job.scale}x-${Date.now()}.html`,
  );
  const outPath = path.join(OUT_DIR, job.filename);
  fs.writeFileSync(tmpHtml, html, "utf8");

  try {
    execFileSync(
      chrome,
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        `--window-size=1584,396`,
        `--force-device-scale-factor=${job.scale}`,
        `--screenshot=${outPath}`,
        `file://${tmpHtml}`,
      ],
      { stdio: "inherit" },
    );
    console.log(`Generated ${outPath} (${1584 * job.scale}x${396 * job.scale})`);
  } finally {
    fs.rmSync(tmpHtml, { force: true });
  }
}
