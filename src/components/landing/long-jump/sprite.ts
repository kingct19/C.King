export const SPRITE_W = 120;
export const SPRITE_H = 150;
export const ATLAS_SRC = "/images/long-jump/chandler-atlas.png";

const ROWS = {
  run: 0,
  takeoff: 1,
  flight: 2,
  land: 3,
} as const;

const COUNTS = {
  run: 6,
  takeoff: 6,
  flight: 6,
  land: 6,
} as const;

export type AnimName = keyof typeof ROWS;
export type SpriteName = `${AnimName}:${number}`;

let sheet: HTMLImageElement | null = null;
let pending: Promise<void> | null = null;

export function loadSpriteSheet() {
  if (sheet) return Promise.resolve();
  if (typeof window === "undefined") return Promise.resolve();
  if (!pending) {
    pending = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        sheet = image;
        resolve();
      };
      image.onerror = () => reject(new Error("Could not load the long-jump sprite sheet."));
      image.src = ATLAS_SRC;
    });
  }
  return pending;
}

export function spriteName(anim: AnimName, index: number): SpriteName {
  return `${anim}:${((index % COUNTS[anim]) + COUNTS[anim]) % COUNTS[anim]}`;
}

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  name: SpriteName,
  originX: number,
  originY: number,
  scale: number,
) {
  if (!sheet) return;

  const splitAt = name.indexOf(":");
  const anim = name.slice(0, splitAt) as AnimName;
  const index = Number(name.slice(splitAt + 1));
  const row = ROWS[anim];
  if (row === undefined) return;

  const frame = ((index % COUNTS[anim]) + COUNTS[anim]) % COUNTS[anim];
  const dw = Math.round(SPRITE_W * scale);
  const dh = Math.round(SPRITE_H * scale);
  const left = Math.round(originX - dw / 2);
  const top = Math.round(originY - dh);

  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = "rgba(26, 20, 16, 0.22)";
  ctx.fillRect(left + dw * 0.28, originY - 2, dw * 0.44, 2);
  ctx.drawImage(
    sheet,
    frame * SPRITE_W,
    row * SPRITE_H,
    SPRITE_W,
    SPRITE_H,
    left,
    top,
    dw,
    dh,
  );
  ctx.restore();
}
