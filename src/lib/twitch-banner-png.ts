import type { BannerLayout } from "@/components/stream/banner-scene";
import { footerConfig, siteConfig } from "@/config/site";

const FOREGROUND = "#fbfbfb";
const MUTED = "#b4b4b4";
const BORDER = "rgba(255, 255, 255, 0.18)";
const EMERALD = "#10b981";

function cssFamily(variable: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value.length > 0 ? value : fallback;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("The banner artwork failed to load."));
    image.src = src;
  });
}

export async function downloadBannerPng(
  layout: BannerLayout,
  { title, badge }: { title: string; badge: string },
) {
  const { width, height } = layout;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not draw the banner.");

  const serif = cssFamily("--font-serif", '"Instrument Serif", serif');
  const mono = cssFamily("--font-mono", "ui-monospace, monospace");
  const sans = cssFamily("--font-sans", "ui-sans-serif, system-ui, sans-serif");
  const quotePx = width * layout.quoteSize;
  const welcomePx = width * layout.welcomeSize;
  await document.fonts.load(`italic ${Math.round(quotePx)}px ${serif}`);
  await document.fonts.load(`${Math.round(welcomePx)}px ${mono}`);
  await document.fonts.load(`500 ${Math.round(welcomePx)}px ${sans}`);

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  const forestTop = height * layout.forestTop;
  if (layout.showForest) {
    const artwork = await loadImage(footerConfig.artwork.src);
    const imageHeight = width * (artwork.height / artwork.width);
    ctx.drawImage(artwork, 0, forestTop, width, imageHeight);
  }

  const quote = `“${title.replace(/^["“]+|["”]+$/g, "").replaceAll("|", "\n")}”`;
  const quoteLines = quote.split("\n");
  const quoteLine = quotePx * 1.375;
  const statusPx = width * layout.statusSize;
  const badgePx = width * layout.badgeSize;
  const creditPx = width * layout.creditSize;
  const avatar = width * layout.avatarSize;
  const padX = width * layout.cardPadX;
  const padY = width * layout.cardPadY;
  const cardGapX = width * layout.cardGapX;

  ctx.font = `500 ${welcomePx}px ${sans}`;
  ctx.letterSpacing = "0px";
  const welcomeWidth = ctx.measureText(layout.welcome).width;
  const cardWidth = padX * 2 + avatar + cardGapX + welcomeWidth;
  const cardHeight = avatar + padY * 2;

  const blockHeight =
    statusPx +
    width * layout.quoteGap +
    quoteLines.length * quoteLine +
    width * layout.badgeGap +
    badgePx +
    width * layout.cardGap +
    cardHeight +
    width * layout.creditGap +
    creditPx;

  const yStart = layout.showForest
    ? forestTop - width * layout.textPad - blockHeight
    : (height - blockHeight) / 2;
  let y = Math.max(width * 0.012, yStart);

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = `${statusPx}px ${mono}`;
  ctx.fillStyle = MUTED;
  ctx.letterSpacing = "0.04em";
  ctx.fillText(layout.status, width / 2, y);

  y += statusPx + width * layout.quoteGap;
  ctx.font = `italic ${quotePx}px ${serif}`;
  ctx.fillStyle = FOREGROUND;
  ctx.letterSpacing = "0px";
  for (const line of quoteLines) {
    ctx.fillText(line, width / 2, y);
    y += quoteLine;
  }

  y += width * layout.badgeGap;
  ctx.font = `${badgePx}px ${mono}`;
  ctx.fillStyle = MUTED;
  ctx.letterSpacing = "0.12em";
  ctx.fillText(badge, width / 2, y);

  y += badgePx + width * layout.cardGap;
  const cardX = (width - cardWidth) / 2;
  ctx.beginPath();
  ctx.roundRect(cardX, y, cardWidth, cardHeight, width * layout.cardPadY);
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fill();
  ctx.strokeStyle = BORDER;
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 3]);
  ctx.stroke();
  ctx.setLineDash([]);

  const avatarImage = await loadImage(siteConfig.personal.avatar.src);
  const avatarX = cardX + padX;
  const avatarY = y + padY;
  const radius = avatar * 0.14;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(avatarX, avatarY, avatar, avatar, radius);
  ctx.clip();
  ctx.drawImage(avatarImage, avatarX, avatarY, avatar, avatar);
  ctx.restore();

  const dot = avatar * 0.24;
  ctx.beginPath();
  ctx.arc(avatarX + avatar - dot * 0.15, avatarY + avatar - dot * 0.15, dot / 2, 0, Math.PI * 2);
  ctx.fillStyle = EMERALD;
  ctx.fill();
  ctx.lineWidth = dot * 0.28;
  ctx.strokeStyle = "#000000";
  ctx.stroke();

  ctx.font = `500 ${welcomePx}px ${sans}`;
  ctx.fillStyle = FOREGROUND;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "-0.01em";
  ctx.fillText(layout.welcome, avatarX + avatar + cardGapX, y + cardHeight / 2);

  y += cardHeight + width * layout.creditGap;
  ctx.font = `${creditPx}px ${mono}`;
  ctx.fillStyle = MUTED;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.letterSpacing = "0.06em";
  ctx.fillText(layout.credit, width / 2, y);

  await savePng(canvas, layout.filename);
}

async function savePng(canvas: HTMLCanvasElement, filename: string) {
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/png");
  });
  if (!blob) throw new Error("Could not save the banner.");

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
