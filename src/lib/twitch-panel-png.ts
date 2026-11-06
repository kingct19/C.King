import { PANEL_MARK_SVG, type PanelMarkId } from "@/config/stream-panel-marks";
import { TWITCH_PANEL, TWITCH_PANELS, type TwitchPanel } from "@/config/stream-panels";
import { footerConfig, siteConfig } from "@/config/site";

const INK = "#171717";
const MUTED = "rgba(23, 23, 23, 0.52)";
const SOFT = "rgba(23, 23, 23, 0.78)";

function cssFamily(variable: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value.length > 0 ? value : fallback;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("A panel image failed to load."));
    image.src = src;
  });
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function rounded(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

async function savePng(canvas: HTMLCanvasElement, filename: string) {
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/png");
  });
  if (!blob) throw new Error("Could not save the panel.");
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function svgUrl(markup: string) {
  return URL.createObjectURL(new Blob([markup], { type: "image/svg+xml;charset=utf-8" }));
}

const COFFEE = "/images/profile-stickers/coffee.webp";

function drawContain(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  size: number,
) {
  const scale = Math.min(size / image.width, size / image.height);
  const dw = image.width * scale;
  const dh = image.height * scale;
  ctx.drawImage(image, x + (size - dw) / 2, y + (size - dh) / 2, dw, dh);
}

function drawPanel(
  panel: TwitchPanel,
  forest: HTMLImageElement,
  marks: Record<PanelMarkId, HTMLImageElement>,
  avatar: HTMLImageElement,
  coffee: HTMLImageElement,
  serif: string,
  mono: string,
  sans: string,
) {
  const { width, height, scale } = TWITCH_PANEL;
  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not draw the panel.");
  const s = scale;
  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  const forestHeight = w * (forest.height / forest.width);
  ctx.drawImage(forest, 0, h - forestHeight, w, forestHeight);

  const pad = 24 * s;
  const markSize = 32 * s;
  const markY = 46 * s;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = MUTED;
  ctx.font = `${12 * s}px ${mono}`;
  ctx.letterSpacing = "0.16em";
  ctx.fillText(panel.eyebrow.toUpperCase(), pad, 22 * s);

  const id = panel.id;
  switch (id) {
    case "about":
      drawContain(ctx, avatar, pad, markY, markSize);
      break;
    case "donations":
      drawContain(ctx, coffee, pad, markY, markSize);
      break;
    case "instagram":
    case "twitter":
    case "discord":
    case "subs":
      ctx.drawImage(marks[id], pad, markY, markSize, markSize);
      break;
    default: {
      const unreachable: never = id;
      throw new Error(unreachable);
    }
  }

  ctx.fillStyle = INK;
  ctx.font = `italic 500 ${30 * s}px ${serif}`;
  ctx.letterSpacing = "0px";
  ctx.fillText(panel.title, pad + markSize + 10 * s, markY + Math.max(0, (markSize - 30 * s) / 2));

  const textTop = markY + markSize + 16 * s;
  if ("body" in panel) {
    ctx.fillStyle = SOFT;
    ctx.font = `${15 * s}px ${sans}`;
    wrap(ctx, panel.body, w - pad * 2).forEach((line, index) => {
      ctx.fillText(line, pad, textTop + index * 22 * s);
    });
  }

  if ("lines" in panel) {
    ctx.font = `${14 * s}px ${mono}`;
    const textWidth = Math.max(...panel.lines.map((line) => ctx.measureText(line).width));
    const boxWidth = Math.min(w - pad * 2, textWidth + 28 * s);
    const lineHeight = 20 * s;
    const boxHeight = 14 * s + panel.lines.length * lineHeight;
    ctx.fillStyle = "#ffffff";
    rounded(ctx, pad, textTop, boxWidth, boxHeight, 8 * s);
    ctx.fill();
    ctx.strokeStyle = "rgba(23, 23, 23, 0.28)";
    ctx.lineWidth = Math.max(1, s);
    ctx.setLineDash([5 * s, 4 * s]);
    rounded(ctx, pad, textTop, boxWidth, boxHeight, 8 * s);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = INK;
    panel.lines.forEach((line, index) => {
      ctx.fillText(line, pad + 14 * s, textTop + 8 * s + index * lineHeight);
    });
  }

  return canvas;
}

export async function downloadTwitchPanels() {
  const serif = cssFamily("--font-serif", '"Instrument Serif", serif');
  const mono = cssFamily("--font-mono", "ui-monospace, monospace");
  const sans = cssFamily("--font-sans", "ui-sans-serif, system-ui, sans-serif");
  await document.fonts.load(`italic 60px ${serif}`);
  await document.fonts.load(`24px ${mono}`);
  await document.fonts.load(`30px ${sans}`);
  const forest = await loadImage(footerConfig.artwork.src);
  const avatar = await loadImage(siteConfig.personal.avatar.src);
  const coffee = await loadImage(COFFEE);

  const markIds = Object.keys(PANEL_MARK_SVG) as PanelMarkId[];
  const urls = markIds.map((id) => svgUrl(PANEL_MARK_SVG[id]));
  const loaded = await Promise.all(urls.map((url) => loadImage(url)));
  const marks = {} as Record<PanelMarkId, HTMLImageElement>;
  markIds.forEach((id, index) => {
    const image = loaded[index];
    if (image) marks[id] = image;
  });
  urls.forEach((url) => URL.revokeObjectURL(url));

  for (let index = 0; index < TWITCH_PANELS.length; index += 1) {
    const panel = TWITCH_PANELS[index];
    if (!panel) continue;
    if (index > 0) await new Promise((resolve) => window.setTimeout(resolve, 400));
    await savePng(drawPanel(panel, forest, marks, avatar, coffee, serif, mono, sans), panel.filename);
  }
}
