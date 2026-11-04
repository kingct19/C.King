import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "images", "long-jump");
const JSON_PATH = path.join(ROOT, "src", "components", "landing", "long-jump", "sprite-frames.json");

const PALETTE = {
  o: "#161311",
  h: "#1c140f",
  s: "#c17a4a",
  e: "#ffffff",
  w: "#f7f4ee",
  g: "#e6b423",
  n: "#1d408c",
  F: "#f4e7c4",
};

const RGB = Object.fromEntries(
  Object.entries(PALETTE).map(([key, hex]) => [
    key,
    [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16), 255],
  ]),
);

const INK = [22, 32, 48, 255];
const PAPER = [181, 208, 234, 255];
const GRID = [143, 180, 214, 255];
const FRAME_W = 20;
const BODY_H = 18;
const FRAME_H = 24;

const GLYPH = {
  A: ["0110", "1001", "1111", "1001", "1001"],
  D: ["1110", "1001", "1001", "1001", "1110"],
  E: ["1111", "1000", "1110", "1000", "1111"],
  I: ["111", "010", "010", "010", "111"],
  J: ["0111", "0001", "0001", "1001", "0110"],
  K: ["1001", "1010", "1100", "1010", "1001"],
  L: ["1000", "1000", "1000", "1000", "1111"],
  M: ["10001", "11011", "10101", "10001", "10001"],
  N: ["1001", "1101", "1011", "1001", "1001"],
  P: ["1110", "1001", "1110", "1000", "1000"],
  R: ["1110", "1001", "1110", "1010", "1001"],
  U: ["1001", "1001", "1001", "1001", "0110"],
  W: ["10001", "10001", "10101", "10101", "01010"],
};

function L(label, line) {
  if (line.length !== FRAME_W) {
    throw new Error(`${label} is ${line.length} wide: ${line}`);
  }
  return line;
}

function frame(label, lines) {
  if (lines.length !== BODY_H) {
    throw new Error(`${label} has ${lines.length} rows`);
  }
  const blank = ".".repeat(FRAME_W);
  const padded = [...Array.from({ length: FRAME_H - BODY_H }, () => blank), ...lines];
  return padded.map((line, index) => L(`${label} row ${index}`, line));
}

function raise(lines, amount) {
  const blank = ".".repeat(FRAME_W);
  const next = Array.from({ length: lines.length }, () => blank);
  lines.forEach((line, index) => {
    if (index - amount >= 0) next[index - amount] = line;
  });
  return next;
}

function outlineFrame(lines) {
  const grid = lines.map((line) => line.split(""));
  const next = grid.map((row) => row.slice());
  for (let y = 0; y < FRAME_H; y += 1) {
    for (let x = 0; x < FRAME_W; x += 1) {
      if (grid[y][x] !== ".") continue;
      const touches = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ].some(([dx, dy]) => {
        const nx = x + dx;
        const ny = y + dy;
        return nx >= 0 && ny >= 0 && nx < FRAME_W && ny < FRAME_H && grid[ny][nx] !== ".";
      });
      if (touches) next[y][x] = "o";
    }
  }
  return next.map((row) => row.join(""));
}

const idle = frame("idle", [
  "....................",
  "....................",
  ".......hhhh.........",
  "......hhhhhh........",
  "......hhsshh........",
  "......hsesss........",
  "......hsssss........",
  ".......ssss.........",
  "......swwwws........",
  ".....sswggwss.......",
  ".....snnnnnns.......",
  "......nnnnnn........",
  "......ss..ss........",
  "......ss..ss........",
  "......ss..ss........",
  "......ss..ss........",
  ".....FF....FF.......",
  ".....FF....FF.......",
]);

const idleBlink = frame("idleBlink", [
  "....................",
  "....................",
  ".......hhhh.........",
  "......hhhhhh........",
  "......hhsshh........",
  "......hsssss........",
  "......hsssss........",
  ".......ssss.........",
  "......swwwws........",
  ".....sswggwss.......",
  ".....snnnnnns.......",
  "......nnnnnn........",
  "......ss..ss........",
  "......ss..ss........",
  "......ss..ss........",
  "......ss..ss........",
  ".....FF....FF.......",
  ".....FF....FF.......",
]);

const walk = [
  frame("walk-contact", [
    "....................",
    "....................",
    ".......hhhh.........",
    "......hhhhhh........",
    "....sshhsshh........",
    "....sshsesss........",
    "......hsssss........",
    ".......ssss.........",
    "......swwwwsss......",
    ".....sswggwsss......",
    ".....snnnnnnss......",
    "......nnnnnn........",
    ".....ss...ss........",
    "....ss.....ss.......",
    "....ss.....ss.......",
    "...ss.......ss......",
    "..FF.........FF.....",
    "..FF.........FF.....",
  ]),
  frame("walk-pass", [
    "....................",
    "....................",
    ".......hhhh.........",
    "......hhhhhh........",
    "......hhsshh........",
    "......hsesss........",
    "......hsssss........",
    ".......ssss.........",
    ".....sswggws........",
    ".....sswggwss.......",
    ".....snnnnnns.......",
    "......nnnnnn........",
    ".......ssss.........",
    "......ss..ss........",
    "......ss...FF.......",
    "......ss............",
    ".....FF.............",
    ".....FF.............",
  ]),
  frame("walk-push", [
    "....................",
    "....................",
    ".......hhhh.........",
    "......hhhhhh........",
    "......hhsshhss......",
    "......hsesss.ss.....",
    "......hsssss..ss....",
    ".......ssss.........",
    "...ss.swwwws........",
    "....ssswggws........",
    ".....snnnnnn........",
    "......nnnnnn........",
    "...ss...ssss........",
    "..ss....ss.ss.......",
    ".FF.....ss.ss.......",
    "........ss..........",
    ".......FF...........",
    ".......FF...........",
  ]),
  frame("walk-reach", [
    "....................",
    "....................",
    ".......hhhh.........",
    "......hhhhhh........",
    "....sshhsshh........",
    "....sshsesssss......",
    "......hsssss.ss.....",
    ".......ssss.........",
    "......swwwws........",
    ".....sswggws........",
    ".....snnnnnn........",
    "....ssnnnnss........",
    "..FF..ss..ss........",
    "......ss...ss.......",
    "......ss....FF......",
    "......ss............",
    ".....FF.............",
    ".....FF.............",
  ]),
];

const run = [
  frame("run-contact", [
    "....................",
    "........hhhh........",
    ".......hhhhhh.......",
    ".......hhsshh.......",
    "..ss...hsesss.......",
    "...ss..hsssss.ss....",
    "........ssss...ss...",
    "........wwwww..ss...",
    ".......swgggwsss....",
    ".......nnnnnnss.....",
    "......nnnnnn........",
    ".....ss...ss........",
    "....ss.....ss.......",
    "...ss.......ss......",
    "..FF.........ss.....",
    "..............FF....",
    "..............FF....",
    "....................",
  ]),
  frame("run-recoil", [
    "....................",
    "........hhhh........",
    ".......hhhhhh.......",
    ".......hhsshh.......",
    ".......hsesss.ss....",
    "....ss.hsssss.ss....",
    ".....ssssss.........",
    "........wwwww.......",
    ".......swgggws......",
    ".......nnnnnn.......",
    "......nnnnnn........",
    "....ssnnnnss........",
    "...ss.ss..ss........",
    "..FF..ss...FF.......",
    "......ss............",
    ".....FF.............",
    ".....FF.............",
    "....................",
  ]),
  frame("run-knee", [
    "....................",
    "........hhhh........",
    ".......hhhhhh.......",
    "..ss...hhsshh..ss...",
    ".ss....hsesss..ss...",
    ".......hsssss...ss..",
    "........ssss........",
    "........wwwww.......",
    ".......swgggws......",
    ".......nnnnnn.......",
    "....ssnnnnnnss......",
    "...ss.nnnn.ss.ss....",
    "..FF......ss.ss.....",
    "..........ss........",
    ".........FF.........",
    ".........FF.........",
    "....................",
    "....................",
  ]),
  frame("run-flight", [
    "........hhhh........",
    ".......hhhhhh.......",
    "..ss...hhsshh..ss...",
    ".ss....hsesss...ss..",
    ".......hsssss....ss.",
    "........ssss........",
    "........wwwww.......",
    ".......swgggws......",
    "....ss.nnnnnn.ss....",
    "...ss...nnnn..ss....",
    "..FF..........ss....",
    "..............FF....",
    "....................",
    "....................",
    "....................",
    "....................",
    "....................",
    "....................",
  ]),
];

const jump = [
  frame("jump-plant", [
    "....................",
    "........hhhh........",
    ".......hhhhhh.......",
    ".......hhsshh.......",
    "..ss...hsesss.......",
    ".ss....hsssss.......",
    "........ssss........",
    "........wwwww.......",
    ".......swgggws......",
    ".......nnnnnn.......",
    ".....ssnnnnnss......",
    "....ss..nnnn.ss.....",
    "...FF........ss.....",
    ".............ss.....",
    "............FF......",
    "............FF......",
    "....................",
    "....................",
  ]),
  frame("jump-takeoff", [
    "..ss................",
    "...ss.hhhh..........",
    "......hhhhhhss......",
    "......hhsshh.ss.....",
    "......hsesss..ss....",
    "......hsssss........",
    ".......ssss.........",
    "......swwwws........",
    "......swggws........",
    "....ssnnnnnnss......",
    "...FF.nnnnnn.ss.....",
    ".........ss..ss.....",
    "........ss..........",
    ".......FF...........",
    ".......FF...........",
    "....................",
    "....................",
    "....................",
  ]),
  frame("jump-flight", [
    ".......ss...........",
    "......sshhhh........",
    "......hhhhhhss......",
    "......hhsshh.ss.....",
    "......hsesss........",
    "......hsssss........",
    ".......ssss.........",
    "......swwwws........",
    "...ss.swggws.ss.....",
    "..FF...nnnnn..ss....",
    "......nnnnnn...FF...",
    "....ss..............",
    "...FF...............",
    "....................",
    "....................",
    "....................",
    "....................",
    "....................",
  ]),
  frame("jump-reach", [
    "..ss................",
    "...sshhhh...........",
    "......hhhhhh........",
    "......hhsshh........",
    "......hsesss........",
    "......hsssss........",
    ".......ssss.........",
    "......swwwws........",
    "......swggws.ss.....",
    ".....snnnnnn.ss.....",
    "....ss.nnnnn..ss....",
    "...FF..........ss...",
    "...............FF...",
    "....................",
    "....................",
    "....................",
    "....................",
    "....................",
  ]),
];

const land = [
  frame("land-absorb", [
    "....................",
    "....................",
    ".......hhhh.........",
    "......hhhhhh........",
    "......hhsshh........",
    "......hsesss..ss....",
    "......hsssss...ss...",
    ".......ssss.........",
    "......swwwws........",
    ".....sswggws........",
    ".....snnnnnn........",
    "....ssnnnnss........",
    "..FF..ss..ss........",
    "......ss....ss......",
    "......ss.....FF.....",
    "......ss............",
    ".....FF.............",
    ".....FF.............",
  ]),
  frame("land-sit", [
    "....................",
    "....................",
    "....................",
    ".......hhhh.........",
    "......hhhhhh........",
    "......hhsshh........",
    "......hsesss........",
    "......hsssss.ss.....",
    ".......ssss...ss....",
    "......swwwws........",
    ".....sswggws........",
    ".....snnnnnnssssFF..",
    "....FF..............",
    "....................",
    "....................",
    "....................",
    "....................",
    "....................",
  ]),
  frame("land-rest", [
    "....................",
    "....................",
    "....................",
    "....................",
    ".......hhhh.ss......",
    "......hhhhhh.ss.....",
    "......hhsshh........",
    "......hsesss........",
    "......hsssss........",
    ".......ssss.........",
    "......swwwws........",
    ".....sswggws........",
    ".....snnnnnnssssFF..",
    "....FF..............",
    "....................",
    "....................",
    "....................",
    "....................",
  ]),
];

const step = frame("step", [
  "....................",
  "....................",
  ".......hhhh.........",
  "......hhhhhh........",
  "......hhsshh........",
  "......hsesss........",
  "......hsssss........",
  ".......ssss.........",
  "......swwwws........",
  ".....sswggwss.......",
  ".....snnnnnns.......",
  "......nnnnnn........",
  "......ss..ss........",
  "......ss..ss........",
  ".....ss....ss.......",
  ".....ss....ss.......",
  "....FF......FF......",
  "....FF......FF......",
]);

const pass = frame("pass", [
  "....................",
  "....................",
  ".......hhhh.........",
  "......hhhhhh........",
  "......hhsshh........",
  "......hsesss........",
  "......hsssss........",
  ".......ssss.........",
  "......swwwws........",
  ".....sswggwss.......",
  ".....snnnnnns.......",
  "......nnnnnn........",
  "......ss..ss........",
  "......ss..ss........",
  "......ss..FF........",
  "......ss............",
  ".....FF.............",
  ".....FF.............",
]);

const push = frame("push", [
  "....................",
  "....................",
  ".......hhhh.........",
  "......hhhhhh........",
  "......hhsshh........",
  "......hsesss........",
  "......hsssss........",
  ".......ssss.........",
  "......swwwws........",
  ".....sswggwss.......",
  ".....snnnnnns.......",
  "......nnnnnn........",
  "......ss..ss........",
  "......ss..ss........",
  ".....FF...ss........",
  ".........ss.........",
  "........FF..........",
  "........FF..........",
]);

const knee = frame("knee", [
  "....................",
  "....................",
  ".......hhhh.........",
  "......hhhhhh........",
  "......hhsshh........",
  "......hsesss........",
  "......hsssss........",
  ".......ssss.........",
  "......swwwws........",
  ".....sswggwss.......",
  ".....snnnnnns.......",
  "......nnnnnn........",
  "......ss..ssss......",
  "......ss....ss......",
  "......ss....FF......",
  "......ss............",
  ".....FF.............",
  ".....FF.............",
]);

const armsUp = frame("armsUp", [
  "....................",
  "....................",
  ".......hhhh.........",
  "......hhhhhh........",
  "....sshhsshhss......",
  "....sshsesssss......",
  "....sshsssssss......",
  "....ss.ssss.ss......",
  ".....sswwwwss.......",
  ".....sswggwss.......",
  ".....snnnnnns.......",
  "......nnnnnn........",
  "......ss..ss........",
  "......ss..ss........",
  "......ss..ss........",
  "......ss..ss........",
  ".....FF....FF.......",
  ".....FF....FF.......",
]);

const squat = frame("squat", [
  "....................",
  "....................",
  "....................",
  "....................",
  ".......hhhh.........",
  "......hhhhhh........",
  "......hhsshh........",
  "......hsesss........",
  "......hsssss........",
  ".......ssss.........",
  "......swwwws........",
  ".....sswggwss.......",
  ".....snnnnnns.......",
  "......nnnnnn........",
  ".....ss....ss.......",
  "....ss......ss......",
  "...FF........FF.....",
  "...FF........FF.....",
]);

const sit = frame("sit", [
  "....................",
  "....................",
  "....................",
  "....................",
  "....................",
  ".......hhhh.........",
  "......hhhhhh........",
  "......hhsshh........",
  "......hsesss........",
  "......hsssss........",
  ".......ssss.........",
  "......swwwws........",
  ".....sswggwss.......",
  ".....snnnnnns.......",
  "......nnnnnn........",
  "......ssssssss......",
  "............FF......",
  "............FF......",
]);

const BOX_W = 40;
const BOX_H = 44;

function emptyGrid() {
  return Array.from({ length: BOX_H }, () => Array.from({ length: BOX_W }, () => "."));
}

function stamp(grid, x, y, w, h, key) {
  for (let py = 0; py < h; py += 1) {
    for (let px = 0; px < w; px += 1) {
      const xx = x + px;
      const yy = y + py;
      if (xx >= 0 && yy >= 0 && xx < BOX_W && yy < BOX_H) grid[yy][xx] = key;
    }
  }
}

function outlineGrid(grid) {
  const copy = grid.map((row) => row.slice());
  for (let y = 0; y < BOX_H; y += 1) {
    for (let x = 0; x < BOX_W; x += 1) {
      if (copy[y][x] !== ".") continue;
      const touches = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ].some(([dx, dy]) => {
        const nx = x + dx;
        const ny = y + dy;
        return nx >= 0 && ny >= 0 && nx < BOX_W && ny < BOX_H && copy[ny][nx] !== ".";
      });
      if (touches) grid[y][x] = "o";
    }
  }
}

function drawArm(grid, style, shoulderX, shoulderY, side) {
  const left = side === "back";
  if (style === "down") {
    stamp(grid, left ? shoulderX - 3 : shoulderX + 8, shoulderY + 1, 3, 7, "s");
    return;
  }
  if (style === "back") {
    stamp(grid, shoulderX - 7, shoulderY, 7, 3, "s");
    stamp(grid, shoulderX - 7, shoulderY + 3, 3, 5, "s");
    return;
  }
  if (style === "forward") {
    stamp(grid, shoulderX + 5, shoulderY - 1, 8, 3, "s");
    stamp(grid, shoulderX + 10, shoulderY + 2, 3, 5, "s");
    return;
  }
  if (style === "up") {
    stamp(grid, left ? shoulderX - 3 : shoulderX + 8, shoulderY - 7, 3, 9, "s");
  }
}

function drawLeg(grid, style, hipX, hipY, side) {
  const origin = side === "back" ? hipX : hipX + 5;
  if (style === "down") {
    stamp(grid, origin, hipY + 3, 4, 8, "s");
    stamp(grid, origin - 1, hipY + 10, 6, 3, "F");
    return;
  }
  if (style === "back") {
    stamp(grid, hipX - 6, hipY + 2, 8, 4, "s");
    stamp(grid, hipX - 7, hipY + 6, 4, 5, "s");
    stamp(grid, hipX - 8, hipY + 10, 6, 3, "F");
    return;
  }
  if (style === "forward") {
    stamp(grid, hipX + 4, hipY + 2, 8, 4, "s");
    stamp(grid, hipX + 9, hipY + 6, 4, 5, "s");
    stamp(grid, hipX + 9, hipY + 10, 6, 3, "F");
    return;
  }
  if (style === "knee") {
    stamp(grid, hipX + 3, hipY + 1, 8, 4, "s");
    stamp(grid, hipX + 8, hipY + 5, 4, 4, "s");
    stamp(grid, hipX + 8, hipY + 8, 6, 3, "F");
    return;
  }
  if (style === "tuck") {
    stamp(grid, origin - 1, hipY + 1, 6, 4, "s");
    stamp(grid, origin - 1, hipY + 4, 6, 3, "F");
  }
}

function drawAthlete(pose) {
  const grid = emptyGrid();
  const hipX = 15;
  const hipY = 24 + (pose.drop || 0) - (pose.lift || 0);
  const shoulderX = hipX + 1 + (pose.lean || 0);
  const shoulderY = hipY - 9;

  drawArm(grid, pose.backArm, shoulderX, shoulderY, "back");
  drawLeg(grid, pose.backLeg, hipX, hipY, "back");

  stamp(grid, shoulderX, shoulderY - 8, 8, 3, "h");
  stamp(grid, shoulderX + 1, shoulderY - 9, 2, 1, "h");
  stamp(grid, shoulderX + 5, shoulderY - 9, 2, 1, "h");
  stamp(grid, shoulderX, shoulderY - 5, 8, 5, "s");
  if (!pose.blink) stamp(grid, shoulderX + 5, shoulderY - 4, 2, 2, "e");
  stamp(grid, shoulderX + 1, shoulderY, 2, 2, "s");
  stamp(grid, shoulderX, shoulderY + 1, 8, 5, "w");
  stamp(grid, hipX, hipY, 10, 4, "n");

  drawLeg(grid, pose.frontLeg, hipX, hipY, "front");
  drawArm(grid, pose.frontArm, shoulderX, shoulderY, "front");
  stamp(grid, shoulderX + 3, shoulderY + 3, 3, 2, "g");
  outlineGrid(grid);
  return grid.map((row) => row.join(""));
}

function pose(values) {
  return {
    lean: 0,
    drop: 0,
    lift: 0,
    blink: false,
    backArm: "down",
    frontArm: "down",
    backLeg: "down",
    frontLeg: "down",
    ...values,
  };
}

const stand = pose({});
const standBlink = pose({ blink: true });
const stride = pose({ backArm: "back", frontArm: "forward", backLeg: "back", frontLeg: "forward" });
const passing = pose({ backLeg: "down", frontLeg: "knee" });
const otherStride = pose({ backArm: "forward", frontArm: "back", backLeg: "forward", frontLeg: "back" });
const otherPass = pose({ backLeg: "knee", frontLeg: "down" });

const ANIMATIONS = [
  { name: "IDLE", id: "idle", frames: [drawAthlete(stand), drawAthlete(standBlink), drawAthlete(stand), drawAthlete(standBlink)] },
  {
    name: "WALK",
    id: "walk",
    frames: [stride, passing, otherStride, otherPass].map((item) => drawAthlete(item)),
  },
  {
    name: "RUN",
    id: "run",
    frames: [
      pose({ lean: 3, backArm: "back", frontArm: "forward", backLeg: "back", frontLeg: "forward" }),
      pose({ lean: 2, backArm: "down", frontArm: "forward", backLeg: "down", frontLeg: "knee" }),
      pose({ lean: 4, backArm: "forward", frontArm: "back", backLeg: "forward", frontLeg: "knee" }),
      pose({ lean: 3, lift: 5, backArm: "back", frontArm: "forward", backLeg: "back", frontLeg: "knee" }),
      pose({ lean: 3, backArm: "forward", frontArm: "back", backLeg: "forward", frontLeg: "back" }),
      pose({ lean: 4, lift: 5, backArm: "forward", frontArm: "back", backLeg: "knee", frontLeg: "forward" }),
    ].map((item) => drawAthlete(item)),
  },
  {
    name: "JUMP",
    id: "jump",
    frames: [
      pose({ lean: 2, drop: 2, backArm: "back", frontArm: "back", backLeg: "down", frontLeg: "knee" }),
      pose({ lean: 3, backArm: "up", frontArm: "up", backLeg: "down", frontLeg: "knee" }),
      pose({ lean: 1, lift: 6, backArm: "up", frontArm: "up", backLeg: "knee", frontLeg: "knee" }),
      pose({ lean: -1, lift: 4, backArm: "back", frontArm: "forward", backLeg: "forward", frontLeg: "forward" }),
    ].map((item) => drawAthlete(item)),
  },
  {
    name: "LAND",
    id: "land",
    frames: [
      pose({ drop: 3, backArm: "forward", frontArm: "forward", backLeg: "knee", frontLeg: "knee" }),
      pose({ drop: 6, lean: -2, backArm: "back", frontArm: "forward", backLeg: "forward", frontLeg: "forward" }),
      pose({ drop: 6, lean: -1, backArm: "down", frontArm: "down", backLeg: "forward", frontLeg: "down" }),
    ].map((item) => drawAthlete(item)),
  },
];

function cropFrames(rows) {
  let minX = BOX_W;
  let minY = BOX_H;
  let maxX = 0;
  let maxY = 0;
  for (const row of rows) {
    for (const sprite of row.frames) {
      sprite.forEach((line, y) => {
        [...line].forEach((key, x) => {
          if (key === ".") return;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        });
      });
    }
  }
  minX = Math.max(0, minX - 1);
  minY = Math.max(0, minY - 1);
  maxX = Math.min(BOX_W - 1, maxX + 1);
  maxY = Math.min(BOX_H - 1, maxY + 1);
  return rows.map((row) => ({
    ...row,
    frames: row.frames.map((sprite) => sprite.slice(minY, maxY + 1).map((line) => line.slice(minX, maxX + 1))),
  }));
}

const ANIMATION_FRAMES = cropFrames(ANIMATIONS);
const packed = ANIMATION_FRAMES.map((row) => row.frames);

function crc32(buffer) {
  let crc = ~0;
  for (let i = 0; i < buffer.length; i += 1) {
    crc ^= buffer[i];
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return ~crc >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const tag = Buffer.from(type);
  const payload = Buffer.concat([tag, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(payload));
  return Buffer.concat([length, payload, crc]);
}

function encodePng(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function paint(rgba, width, x, y, color) {
  if (x < 0 || y < 0 || x >= width) return;
  const i = (y * width + x) * 4;
  if (i < 0 || i >= rgba.length) return;
  rgba[i] = color[0];
  rgba[i + 1] = color[1];
  rgba[i + 2] = color[2];
  rgba[i + 3] = color[3];
}

function paintBlock(rgba, width, x, y, color, scale) {
  for (let dy = 0; dy < scale; dy += 1) {
    for (let dx = 0; dx < scale; dx += 1) paint(rgba, width, x + dx, y + dy, color);
  }
}

function textWidth(text, scale) {
  return [...text].reduce((sum, char) => sum + ((GLYPH[char]?.[0].length ?? 3) + 1) * scale, 0);
}

function drawLabel(rgba, width, text, x, y, scale) {
  let cursor = x;
  for (const char of text) {
    const glyph = GLYPH[char];
    if (!glyph) {
      cursor += 4 * scale;
      continue;
    }
    glyph.forEach((line, gy) => {
      [...line].forEach((pixel, gx) => {
        if (pixel === "1") paintBlock(rgba, width, cursor + gx * scale, y + gy * scale, INK, scale);
      });
    });
    cursor += (glyph[0].length + 1) * scale;
  }
}

function renderSheet(scale) {
  const labelW = 72;
  const gap = 6;
  const spriteW = packed[0][0][0].length;
  const spriteH = packed[0][0].length;
  const cols = Math.max(...packed.map((row) => row.length));
  const cellW = spriteW + gap;
  const cellH = spriteH + gap;
  const width = (labelW + cols * cellW) * scale;
  const height = ANIMATIONS.length * cellH * scale;
  const rgba = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const grid = x % (8 * scale) === 0 || y % (8 * scale) === 0;
      paint(rgba, width, x, y, grid ? GRID : PAPER);
    }
  }

  ANIMATIONS.forEach((row, rowIndex) => {
    const labelWidth = textWidth(row.name, scale);
    const labelX = Math.max(4, Math.round((labelW * scale - labelWidth) / 2));
    const labelY = rowIndex * cellH * scale + Math.round((cellH * scale - 5 * scale) / 2);
    drawLabel(rgba, width, row.name, labelX, labelY, scale);

    packed[rowIndex].forEach((sprite, frameIndex) => {
      const originX = (labelW + frameIndex * cellW) * scale;
      const originY = rowIndex * cellH * scale;
      sprite.forEach((line, y) => {
        [...line].forEach((key, x) => {
          const color = RGB[key];
          if (!color) return;
          paintBlock(rgba, width, originX + x * scale, originY + y * scale, color, scale);
        });
      });
    });
  });

  return encodePng(width, height, rgba);
}

const animations = Object.fromEntries(ANIMATIONS.map((row, index) => [row.id, packed[index]]));
const spriteW = packed[0][0][0].length;
const spriteH = packed[0][0].length;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, "generated-sheet.png"), renderSheet(2));
fs.writeFileSync(path.join(OUT_DIR, "generated-sheet-preview.png"), renderSheet(3));
fs.writeFileSync(
  JSON_PATH,
  `${JSON.stringify({ width: spriteW, height: spriteH, palette: PALETTE, animations }, null, 2)}\n`,
);
