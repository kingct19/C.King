import { BOARD_X, PIT_END_M, START_X, WORLD_RECORD_M } from "@/components/landing/long-jump/sim";

export const SCENE_ZOOM = 0.68;
export const SCREEN_W = 480;
export const SCREEN_H = 270;
export const VIEW_W = Math.round(SCREEN_W / SCENE_ZOOM);
export const VIEW_H = Math.round(SCREEN_H / SCENE_ZOOM);
export const PX_PER_M = 12;
const PIT_DRAW_SCALE = 4;

export function layoutY(y: number) {
  return Math.round((y / SCREEN_H) * VIEW_H);
}

export const TRACK_FAR = layoutY(196);
export const GROUND_Y = layoutY(226);
const STAND_ROWS = 8;
const STAND_ROW = 16;
const STAND_BOTTOM = STAND_ROWS * STAND_ROW;
const BANNER_TOP = STAND_BOTTOM;
const BANNER_BOTTOM = BANNER_TOP + 26;
export const SPRITE_SCALE = 0.22;

const BANNER = "#f7f4ee";
const INK = "#1a1a1a";
const TRACK = "#c65a2c";
const SAND = "#ffe566";
const SAND_DEEP = "#f0d24a";
const SAND_GRAIN = "#fff1a3";
const GOLD = "#e6b423";
const SEAT = "#3a68d0";
const SEAT_DARK = "#315dbf";
const WALL = "#6ea2ea";
const LEDGE = "#8a4f28";
const LEDGE_TOP = "#a05d30";
const CLAY_LIP = "#9a3f1e";
const CLAY_EDGE = "#7a3218";
const RAIL = "#8d939c";
const RAIL_LIGHT = "#c5c8ce";
const LANE = "#f7f4ee";
const RING_COLORS = ["#0081c8", "#f4c300", "#000000", "#009f3d", "#ee334e"] as const;

const GLYPHS: Record<string, string[]> = {
  "0": ["111", "101", "101", "101", "111"],
  "1": ["010", "110", "010", "010", "111"],
  "2": ["111", "001", "111", "100", "111"],
  "3": ["111", "001", "111", "001", "111"],
  "4": ["101", "101", "111", "001", "001"],
  "5": ["111", "100", "111", "001", "111"],
  "6": ["111", "100", "111", "101", "111"],
  "7": ["111", "001", "001", "001", "001"],
  "8": ["111", "101", "111", "101", "111"],
  "9": ["111", "101", "111", "001", "111"],
  A: ["010", "101", "111", "101", "101"],
  B: ["110", "101", "110", "101", "110"],
  D: ["110", "101", "101", "101", "110"],
  E: ["111", "100", "110", "100", "111"],
  J: ["111", "010", "010", "010", "110"],
  K: ["101", "101", "110", "101", "101"],
  L: ["100", "100", "100", "100", "111"],
  M: ["101", "111", "101", "101", "101"],
  N: ["110", "101", "101", "101", "101"],
  O: ["111", "101", "101", "101", "111"],
  P: ["111", "101", "111", "100", "100"],
  R: ["110", "101", "110", "101", "101"],
  S: ["011", "100", "010", "001", "110"],
  T: ["111", "010", "010", "010", "010"],
  U: ["101", "101", "101", "101", "111"],
  Y: ["101", "101", "010", "010", "010"],
  "°": ["010", "000", "000", "000", "000"],
  ".": ["000", "000", "000", "000", "010"],
  "-": ["000", "000", "111", "000", "000"],
  " ": ["000", "000", "000", "000", "000"],
};

function metersToPx(meters: number) {
  if (meters <= BOARD_X) return meters * PX_PER_M;
  return (meters - BOARD_X) * PX_PER_M * PIT_DRAW_SCALE;
}

export function worldX(x: number, camX: number, shake: number) {
  return Math.round(metersToPx(x) - metersToPx(camX) + shake);
}

export function worldY(y: number, shake: number) {
  return Math.round(GROUND_Y - y * PX_PER_M + shake);
}

export function cameraX(x: number, phase: "ready" | "runup" | "flight" | "landed", secret = false) {
  if (secret && (phase === "flight" || phase === "landed")) return x - 3.2;
  switch (phase) {
    case "ready":
    case "runup":
      return x - 3;
    case "flight":
    case "landed":
      return flightCamera(x);
    default: {
      const _exhaustive: never = phase;
      return _exhaustive;
    }
  }
}

export function cameraLift(y: number, secret: boolean) {
  if (!secret) return 0;
  const target = Math.round(VIEW_H * 0.34);
  const lock = (GROUND_Y - target) / PX_PER_M;
  return Math.round(Math.max(0, y - lock) * PX_PER_M);
}

function flightCamera(x: number) {
  const hold = Math.min(x - 3, -1.5);
  const athlete = metersToPx(x) - metersToPx(hold);
  const rightMargin = 90;
  if (athlete <= VIEW_W - rightMargin) return hold;
  return x - (VIEW_W - rightMargin) / (PX_PER_M * PIT_DRAW_SCALE);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function takeoffAngle(speed: number) {
  return Math.round(10 + speed * 72);
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
  scale = 1,
) {
  ctx.fillStyle = color;
  let cursor = Math.round(x);
  for (const character of text.toUpperCase()) {
    const glyph = GLYPHS[character];
    if (!glyph) {
      cursor += 4 * scale;
      continue;
    }
    for (let row = 0; row < glyph.length; row += 1) {
      for (let col = 0; col < glyph[row].length; col += 1) {
        if (glyph[row][col] === "1") {
          ctx.fillRect(cursor + col * scale, Math.round(y) + row * scale, scale, scale);
        }
      }
    }
    cursor += (glyph[0].length + 1) * scale;
  }
}

function fill(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  if (w < 1 || h < 1) return;
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

const PERSON_OUTLINE = "#16110e";
const PERSON_EYE = "#f7f4ee";
const PERSON_WHITE = "#f4f1ec";
const PERSON_NAVY = "#1e2544";
const PERSON_SHOE = "#c8e6b4";
const PERSON_MARK = "#e6b423";
const PERSON_HAIR = ["#2c1a12", "#1a120e", "#4a2c1c", "#24160f", "#3a2418"] as const;
const PERSON_SKIN = ["#d99754", "#c17a4a", "#e0aa72", "#a86b3e", "#c4844e"] as const;
const CROWD_SHIRTS = ["#f4f1ec", "#1e2544", "#e23b32", "#e6b423", "#4a78be"] as const;

type PersonKey = "h" | "s" | "e" | "t" | "n" | "f" | "g" | "w";

const SPECTATOR = [
  "................",
  "..hh.hhhh.hh....",
  ".hhhhhhhhhhhh...",
  ".hhhhhhhhhhhhh..",
  ".hhhsssssshhhh..",
  ".hhhsessesshhh..",
  "..hhssssssshh...",
  "...hsssssssh....",
  "...ttttttttt....",
  "..ttttttttttt...",
  "..nnnnnnnnnnn...",
  "................",
] as const;

const OFFICIAL = [
  "........................",
  "......hh.hhhh.hh........",
  "....hhhhhhhhhhhhh.......",
  "...hhhhhhhhhhhhhhh......",
  "..hhhhhhhhhhhhhhhhh.....",
  "..hhhhhsssssshhhhhh.....",
  "..hhhhssssessshhhhh.....",
  "...hhhssssssssshhh......",
  "....hhssssssssshh.......",
  ".....hhhhhhhhhh.........",
  "......sssssss...........",
  "....wwwwwwwwwww.........",
  "...wwwwwwwwwwwww........",
  "...wwwnnnnnnnwww........",
  "...wwwnnngnnnwww........",
  "...wwwnnnnnnnwww........",
  "....wwwnnnnnwww.........",
  "......nnnnnnn...........",
  ".....nnnnnnnnn..........",
  ".....nnnnnnnnn..........",
  "....nnnn...nnnn.........",
  "...fff.....fff..........",
  "...ffff...ffff..........",
  "...ffff...ffff..........",
  "........................",
] as const;

function personColors(variant: number, shirt: string): Record<PersonKey, string> {
  const hair = PERSON_HAIR[((variant % PERSON_HAIR.length) + PERSON_HAIR.length) % PERSON_HAIR.length];
  const skin = PERSON_SKIN[((variant % PERSON_SKIN.length) + PERSON_SKIN.length) % PERSON_SKIN.length];
  return {
    h: hair,
    s: skin,
    e: PERSON_EYE,
    t: shirt,
    n: PERSON_NAVY,
    f: PERSON_SHOE,
    g: PERSON_MARK,
    w: PERSON_WHITE,
  };
}

function stampPerson(
  ctx: CanvasRenderingContext2D,
  rows: readonly string[],
  colors: Record<PersonKey, string>,
  x: number,
  y: number,
) {
  const height = rows.length;
  const width = rows[0]?.length ?? 0;
  const painted = Array.from({ length: height }, () => Array.from({ length: width }, () => false));

  for (let row = 0; row < height; row += 1) {
    for (let col = 0; col < width; col += 1) {
      const key = rows[row][col];
      if (key === "." || key === undefined) continue;
      if (!(key in colors)) continue;
      painted[row][col] = true;
      ctx.fillStyle = colors[key as PersonKey];
      ctx.fillRect(x + col, y + row, 1, 1);
    }
  }

  ctx.fillStyle = PERSON_OUTLINE;
  for (let row = 0; row < height; row += 1) {
    for (let col = 0; col < width; col += 1) {
      if (painted[row][col]) continue;
      const beside =
        (col > 0 && painted[row][col - 1]) ||
        (col + 1 < width && painted[row][col + 1]) ||
        (row > 0 && painted[row - 1][col]) ||
        (row + 1 < height && painted[row + 1][col]);
      if (beside) ctx.fillRect(x + col, y + row, 1, 1);
    }
  }
}

function drawSeatedFan(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  variant: number,
  bob: number,
) {
  fill(ctx, x, y, 24, 20, variant % 2 === 0 ? SEAT : SEAT_DARK);
  fill(ctx, x, y, 24, 3, "#244ea8");
  const shirt = CROWD_SHIRTS[((variant % CROWD_SHIRTS.length) + CROWD_SHIRTS.length) % CROWD_SHIRTS.length];
  stampPerson(ctx, SPECTATOR, personColors(variant, shirt), x + 4, y + 4 - bob);
}

function drawOfficial(ctx: CanvasRenderingContext2D, footX: number, footY: number, variant: number) {
  stampPerson(
    ctx,
    OFFICIAL,
    personColors(variant, PERSON_WHITE),
    Math.round(footX) - 12,
    Math.round(footY) - 23,
  );
}

function drawStairs(ctx: CanvasRenderingContext2D, x: number, y: number, height: number) {
  fill(ctx, x + 4, y, 16, height, "#8d939c");
  fill(ctx, x + 4, y, 16, 2, RAIL_LIGHT);
  for (let step = 5; step < height; step += 5) {
    fill(ctx, x + 6, y + step, 12, 1, "#6f747c");
  }
}

function drawCrowd(
  ctx: CanvasRenderingContext2D,
  elapsed: number,
  reducedMotion: boolean,
  camX: number,
  shakeX: number,
) {
  const standHeight = layoutY(STAND_BOTTOM);
  fill(ctx, 0, 0, VIEW_W, standHeight, "#2a54b4");
  const seatW = 24;
  const aisleEvery = 7;
  const origin = camX * PX_PER_M;
  const first = Math.floor((origin - seatW) / seatW);
  const last = Math.ceil((origin + VIEW_W + seatW) / seatW);
  for (let seat = first; seat <= last; seat += 1) {
    const x = Math.round(seat * seatW - origin + shakeX);
    if (((seat % aisleEvery) + aisleEvery) % aisleEvery === 0) {
      drawStairs(ctx, x, 0, standHeight);
      continue;
    }
    for (let row = 0; row < STAND_ROWS; row += 1) {
      const bob =
        reducedMotion ? 0 : Math.sin(elapsed * 5 + seat * 1.3 + row) > 0.72 ? 1 : 0;
      drawSeatedFan(ctx, x, layoutY(row * STAND_ROW), seat * 3 + row * 5, bob);
    }
  }
}

function drawDisc(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, color: string) {
  ctx.fillStyle = color;
  for (let y = -radius; y <= radius; y += 1) {
    for (let x = -radius; x <= radius; x += 1) {
      if (x * x + y * y <= radius * radius) ctx.fillRect(cx + x, cy + y, 1, 1);
    }
  }
}

function drawRing(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, color: string) {
  const inner = (radius - 1) * (radius - 1);
  const outer = radius * radius;
  ctx.fillStyle = color;
  for (let y = -radius; y <= radius; y += 1) {
    for (let x = -radius; x <= radius; x += 1) {
      const d = x * x + y * y;
      if (d <= outer && d >= inner) ctx.fillRect(cx + x, cy + y, 1, 1);
    }
  }
}

function drawEmblem(ctx: CanvasRenderingContext2D, x: number, y: number) {
  drawDisc(ctx, x + 10, y + 7, 7, "#e23b32");
  const rings = [
    { x: 3, y: 18, color: RING_COLORS[0] },
    { x: 10, y: 18, color: RING_COLORS[2] },
    { x: 17, y: 18, color: RING_COLORS[4] },
    { x: 6, y: 22, color: RING_COLORS[1] },
    { x: 14, y: 22, color: RING_COLORS[3] },
  ] as const;
  for (const ring of rings) {
    drawRing(ctx, x + ring.x, y + ring.y, 4, ring.color);
  }
}

function drawBanner(
  ctx: CanvasRenderingContext2D,
  camX: number,
  shakeX: number,
) {
  fill(ctx, 0, layoutY(BANNER_TOP), VIEW_W, layoutY(BANNER_BOTTOM) - layoutY(BANNER_TOP), BANNER);
  fill(ctx, 0, layoutY(BANNER_TOP), VIEW_W, 2, "#e7e2d6");
  const periodPx = 188;
  const origin = camX * PX_PER_M;
  const first = Math.floor((origin - periodPx) / periodPx);
  const last = Math.ceil((origin + VIEW_W + periodPx) / periodPx);
  for (let index = first; index <= last; index += 1) {
    const x = Math.round(index * periodPx - origin + shakeX);
    drawText(ctx, "TOKYO", x + 4, layoutY(BANNER_TOP + 6), GOLD, 3);
    drawEmblem(ctx, x + 76, layoutY(BANNER_TOP + 1));
    drawText(ctx, "1964", x + 102, layoutY(BANNER_TOP + 6), GOLD, 3);
  }
}

function drawPot(ctx: CanvasRenderingContext2D, x: number, y: number) {
  fill(ctx, x + 3, y, 8, 3, "#2f8a3c");
  fill(ctx, x + 1, y + 2, 12, 5, "#3d9a46");
  fill(ctx, x + 4, y + 3, 6, 3, "#8ed36a");
  fill(ctx, x + 3, y + 7, 8, 4, "#c47a3a");
  fill(ctx, x + 2, y + 8, 10, 2, "#a8642c");
}

function drawBroadcastCamera(ctx: CanvasRenderingContext2D, x: number, y: number) {
  fill(ctx, x + 14, y + 22, 3, 16, RAIL_LIGHT);
  fill(ctx, x + 6, y + 36, 20, 3, RAIL_LIGHT);
  fill(ctx, x + 2, y + 8, 26, 16, "#8d939c");
  fill(ctx, x + 24, y + 11, 10, 8, "#5c636e");
  fill(ctx, x + 6, y + 11, 8, 7, INK);
  fill(ctx, x + 32, y + 6, 8, 12, "#f2c84a");
  fill(ctx, x + 34, y + 10, 2, 2, INK);
}

function drawDistanceBoard(ctx: CanvasRenderingContext2D, x: number, y: number, label: string) {
  fill(ctx, x + 11, y + 18, 3, 20, RAIL_LIGHT);
  fill(ctx, x, y, 26, 18, INK);
  drawText(ctx, label, x + 3, y + 4, BANNER, 2);
}

function drawPedestal(ctx: CanvasRenderingContext2D, x: number, y: number) {
  fill(ctx, x, y + 22, 16, 8, BANNER);
  fill(ctx, x + 4, y + 8, 8, 14, RAIL);
  fill(ctx, x + 5, y, 6, 8, RAIL_LIGHT);
  fill(ctx, x + 6, y + 3, 1, 1, INK);
  fill(ctx, x + 9, y + 3, 1, 1, INK);
}


function drawLaneLine(
  ctx: CanvasRenderingContext2D,
  y: number,
  left: number,
  right: number,
) {
  fill(ctx, left, y, Math.max(0, right - left), 2, LANE);
}

function drawSandGrain(
  ctx: CanvasRenderingContext2D,
  left: number,
  top: number,
  width: number,
  height: number,
) {
  const x0 = Math.round(left);
  const y0 = Math.round(top);
  const x1 = x0 + Math.round(width);
  const y1 = y0 + Math.round(height);
  for (let y = y0; y < y1; y += 3) {
    for (let x = x0; x < x1; x += 4) {
      const hash = (x * 17 + y * 31) % 11;
      if (hash === 0) {
        ctx.fillStyle = SAND_DEEP;
        ctx.fillRect(x, y, 1, 1);
      } else if (hash === 4) {
        ctx.fillStyle = SAND_GRAIN;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}

function gaugeColor(degrees: number) {
  if (degrees < 22) return "#3d9e4a";
  if (degrees < 45) return "#f0c93a";
  if (degrees < 68) return "#e67a1a";
  return "#e23a3a";
}

function drawAngleMeter(ctx: CanvasRenderingContext2D, angle: number) {
  const cx = 12;
  const cy = VIEW_H - 18;
  const outer = 34;
  const inner = 13;
  for (let y = -outer; y <= 0; y += 1) {
    for (let x = 0; x <= outer; x += 1) {
      const dist = x * x + y * y;
      if (dist > outer * outer || dist < inner * inner) continue;
      const degrees = (Math.atan2(-y, x) * 180) / Math.PI;
      ctx.fillStyle =
        dist > (outer - 2) * (outer - 2) || dist < (inner + 1) * (inner + 1)
          ? INK
          : gaugeColor(degrees);
      ctx.fillRect(cx + x, cy + y, 1, 1);
    }
  }

  const radians = (Math.PI * clamp(angle, 8, 82)) / 180;
  const length = outer - 6;
  const nx = Math.round(cx + Math.cos(radians) * length);
  const ny = Math.round(cy - Math.sin(radians) * length);
  ctx.fillStyle = INK;
  const steps = 28;
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    ctx.fillRect(
      Math.round(cx + (nx - cx) * t),
      Math.round(cy + (ny - cy) * t),
      2,
      2,
    );
  }
  fill(ctx, cx - 2, cy - 2, 5, 5, LANE);
  fill(ctx, cx - 1, cy - 1, 3, 3, "#e23a3a");
}

export function drawStadium(
  ctx: CanvasRenderingContext2D,
  options: {
    camX: number;
    shakeX: number;
    shakeY: number;
    elapsed: number;
    speed: number;
    reducedMotion: boolean;
  },
) {
  const { camX, shakeX, shakeY, elapsed, speed, reducedMotion } = options;
  const angle = takeoffAngle(speed);

  ctx.imageSmoothingEnabled = false;
  const trackTop = TRACK_FAR + shakeY;
  const trackNear = GROUND_Y + layoutY(12) + shakeY;
  const ledgeH = layoutY(18);
  const ledgeY = trackTop - ledgeH;
  const runwayLeft = worldX(START_X - 8, camX, shakeX);
  const startLine = worldX(START_X + 0.7, camX, shakeX);
  const board = worldX(BOARD_X, camX, shakeX);
  const pitRight = worldX(PIT_END_M, camX, shakeX);
  const clayRight = Math.max(worldX(PIT_END_M + 10, camX, shakeX), VIEW_W + 40);

  fill(ctx, 0, 0, VIEW_W, VIEW_H, WALL);
  drawCrowd(ctx, elapsed, reducedMotion, camX, shakeX);
  drawBanner(ctx, camX, shakeX);
  fill(ctx, 0, layoutY(BANNER_BOTTOM), VIEW_W, Math.max(1, ledgeY - layoutY(BANNER_BOTTOM)), WALL);
  fill(ctx, 0, ledgeY, VIEW_W, ledgeH, LEDGE);
  fill(ctx, 0, ledgeY, VIEW_W, 3, LEDGE_TOP);

  fill(ctx, runwayLeft, trackTop, clayRight - runwayLeft, trackNear - trackTop, TRACK);
  fill(ctx, runwayLeft, trackTop, clayRight - runwayLeft, 3, CLAY_EDGE);
  fill(ctx, runwayLeft, trackNear, clayRight - runwayLeft, VIEW_H - trackNear, CLAY_LIP);

  const trackDepth = trackNear - trackTop;
  drawLaneLine(ctx, trackTop + Math.round(trackDepth * 0.34), runwayLeft, board);
  drawLaneLine(ctx, GROUND_Y + layoutY(4) + shakeY, runwayLeft, board);
  fill(ctx, startLine, trackTop + Math.round(trackDepth * 0.18), 3, Math.max(8, trackDepth - layoutY(10)), LANE);
  fill(ctx, startLine - 1, trackTop + 22, 5, 8, LANE);
  fill(ctx, startLine - 1, GROUND_Y + 6 + shakeY, 5, 8, LANE);
  fill(ctx, board - 2, trackTop, 4, trackNear - trackTop, LANE);

  const pitTop = trackTop;
  const pitBottom = Math.min(VIEW_H - layoutY(8), trackNear + layoutY(52));
  const pitW = pitRight - board;
  const pitH = pitBottom - pitTop;
  fill(ctx, board - 3, pitTop - 16, pitW + 6, pitH + 22, RAIL);
  fill(ctx, board, pitTop - 14, pitW, 12, RAIL_LIGHT);
  fill(ctx, board, pitTop, pitW, pitH, SAND);
  fill(ctx, board, pitTop + Math.floor(pitH * 0.62), pitW, Math.floor(pitH * 0.38), SAND_DEEP);
  drawSandGrain(ctx, board + 2, pitTop + 2, pitW - 4, pitH - 4);

  for (let meter = 2; meter <= PIT_END_M; meter += 1) {
    const mark = worldX(BOARD_X + meter, camX, shakeX);
    drawText(ctx, String(meter), mark - 3, pitTop - 12, INK, 1);
  }
  fill(ctx, worldX(WORLD_RECORD_M, camX, shakeX), pitTop - 14, 2, pitH + 14, GOLD);

  for (let meter = START_X - 2; meter < PIT_END_M + 10; meter += 1.2) {
    drawPot(ctx, worldX(meter, camX, shakeX), ledgeY + 2);
  }

  const ledgeFoot = ledgeY + 15;
  drawOfficial(ctx, worldX(START_X + 1.6, camX, shakeX), ledgeFoot, 0);
  drawOfficial(ctx, worldX(START_X + 4.2, camX, shakeX), ledgeFoot, 1);
  drawOfficial(ctx, worldX(START_X + 11.2, camX, shakeX), ledgeFoot, 2);
  drawBroadcastCamera(ctx, worldX(START_X + 6.2, camX, shakeX), ledgeY - 22);
  drawDistanceBoard(ctx, worldX(START_X + 8.2, camX, shakeX), ledgeY - 16, "80");
  drawPedestal(ctx, worldX(START_X + 9.6, camX, shakeX), ledgeY - 12);
  drawDistanceBoard(ctx, worldX(-60, camX, shakeX), ledgeY - 16, "60");
  drawDistanceBoard(ctx, worldX(-40, camX, shakeX), ledgeY - 16, "40");
  drawDistanceBoard(ctx, worldX(-20, camX, shakeX), ledgeY - 16, "20");
  drawOfficial(ctx, worldX(-3.6, camX, shakeX), ledgeFoot, 3);
  drawOfficial(ctx, worldX(-6.4, camX, shakeX), ledgeFoot, 4);
  fill(ctx, worldX(-0.55, camX, shakeX), ledgeY + 2, 22, 12, BANNER);
  drawText(ctx, `${angle}°`, worldX(-0.55, camX, shakeX) + 3, ledgeY + 4, INK, 1);

  drawAngleMeter(ctx, angle);
}

function drawCloudPuff(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  fill(ctx, x, y, size, 6, "#f7fbff");
  fill(ctx, x + 4, y - 4, size - 12, 5, "#f7fbff");
  fill(ctx, x + 8, y - 7, Math.max(8, size - 22), 4, "#ffffff");
  fill(ctx, x + 2, y + 5, size - 8, 3, "#d7ebf8");
}

export function drawClouds(ctx: CanvasRenderingContext2D, camX: number, shakeX: number) {
  const bands = [34, 50, 68, 86, 104] as const;
  for (const band of bands) {
    const spacing = 12;
    const first = Math.floor(camX / spacing) - 2;
    const last = first + 14;
    for (let index = first; index <= last; index += 1) {
      const shift = ((index * 5 + band) % 7) - 3;
      const x = worldX(index * spacing + shift, camX, shakeX);
      const y = worldY(band + (index % 3), 0);
      drawCloudPuff(ctx, x, y, 36 + ((index % 4) + 4) % 4 * 8);
    }
  }
}

export function drawScanlines(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "rgba(16, 20, 40, 0.08)";
  for (let y = 0; y < VIEW_H; y += 2) {
    ctx.fillRect(0, y, VIEW_W, 1);
  }
}

export function drawScoreCard(
  ctx: CanvasRenderingContext2D,
  distance: number,
  best: number,
) {
  fill(ctx, VIEW_W / 2 - 70, layoutY(188), 140, 42, BANNER);
  fill(ctx, VIEW_W / 2 - 70, layoutY(188), 140, 2, INK);
  fill(ctx, VIEW_W / 2 - 70, layoutY(188) + 40, 140, 2, INK);
  drawText(ctx, distance.toFixed(2), VIEW_W / 2 - 36, layoutY(188) + 8, INK, 3);
  drawText(ctx, `BEST ${best.toFixed(2)}`, VIEW_W / 2 - 38, layoutY(188) + 28, INK, 1);
}
