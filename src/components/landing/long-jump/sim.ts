export type Phase = "ready" | "runup" | "flight" | "landed";
export type Side = "left" | "right";

export const START_X = -80;
export const BOARD_X = 0;
export const WORLD_RECORD_M = 8.95;
export const PIT_END_M = 10;

const WALK_MPS = 3.0;
const MAX_RUN_MPS = 11.6;
const MIN_TAKEOFF_VX = 2.8;
const MAX_TAKEOFF_VX = 12.2;
const MIN_TAKEOFF_VY = 3.0;
const MAX_TAKEOFF_VY = 8.8;
const GRAVITY = 12.4;
const STEP_GAIN = 0.032;
const MISTAP_LOSS = 0.34;
const BLEED_AFTER = 0.1;
const BLEED_RATE = 2.1;
const TAKEOFF_CURVE = 2.95;
const READY_AUTO_START = 1.5;
const SUPER_BOARD_WINDOW = 0.045;
const SUPER_VX = 11.27;
const SUPER_VY = 55;
export const SUPER_JUMP_M = 100;

export type JumpState = {
  phase: Phase;
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  lastSide: Side | null;
  timeSinceStep: number;
  distance: number;
  readyAge: number;
  runStride: number;
  elapsed: number;
  justStepped: boolean;
  justLanded: boolean;
  justTookOff: boolean;
  justMistapped: boolean;
  faulted: boolean;
  secret: boolean;
};

export type JumpInput = {
  steps: Side[];
  restart: boolean;
};

export function createJumpState(): JumpState {
  return {
    phase: "ready",
    x: START_X,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastSide: null,
    timeSinceStep: 0,
    distance: 0,
    readyAge: 0,
    runStride: 0,
    elapsed: 0,
    justStepped: false,
    justLanded: false,
    justTookOff: false,
    justMistapped: false,
    faulted: false,
    secret: false,
  };
}

export function stepJump(prev: JumpState, dt: number, input: JumpInput): JumpState {
  const clampedDt = Math.min(dt, 0.05);
  const next: JumpState = {
    ...prev,
    elapsed: prev.elapsed + clampedDt,
    justStepped: false,
    justLanded: false,
    justTookOff: false,
    justMistapped: false,
  };

  if (input.restart && (next.phase === "landed" || next.phase === "ready")) {
    return createJumpState();
  }

  switch (next.phase) {
    case "ready":
      return stepReady(next, clampedDt, input.steps);
    case "runup":
      return stepRunup(next, clampedDt, input.steps);
    case "flight":
      return stepFlight(next, clampedDt);
    case "landed":
      return next;
    default: {
      const _exhaustive: never = next.phase;
      return _exhaustive;
    }
  }
}

function stepReady(state: JumpState, dt: number, steps: Side[]): JumpState {
  const readyAge = state.readyAge + dt;
  if (steps.length > 0) {
    const started = applySteps({ ...state, phase: "runup", speed: 0 }, steps, dt);
    return {
      ...started,
      phase: "runup",
      readyAge: 0,
      x: START_X,
      runStride: started.runStride + dt * (3.2 + started.speed * 8),
    };
  }
  if (readyAge >= READY_AUTO_START) {
    return {
      ...state,
      phase: "runup",
      readyAge: 0,
      speed: 0,
      lastSide: null,
    };
  }
  return { ...state, readyAge, speed: 0, lastSide: null, x: START_X };
}

function stepRunup(state: JumpState, dt: number, steps: Side[]): JumpState {
  const withSteps = applySteps(state, steps, dt);
  const runVx = WALK_MPS + withSteps.speed * (MAX_RUN_MPS - WALK_MPS);
  const x = withSteps.x + runVx * dt;
  const runStride = withSteps.runStride + dt * (3.2 + withSteps.speed * 8);

  if (x >= BOARD_X) {
    const secret = isSuperPerfect(withSteps);
    return {
      ...withSteps,
      phase: "flight",
      x: BOARD_X,
      y: 0.02,
      vx: secret ? SUPER_VX : lerp(MIN_TAKEOFF_VX, MAX_TAKEOFF_VX, takeoffPower(withSteps.speed)),
      vy: secret ? SUPER_VY : lerp(MIN_TAKEOFF_VY, MAX_TAKEOFF_VY, takeoffPower(withSteps.speed)),
      runStride,
      justTookOff: true,
      secret,
    };
  }

  return {
    ...withSteps,
    x,
    vx: runVx,
    runStride,
  };
}

function stepFlight(state: JumpState, dt: number): JumpState {
  const vy = state.vy - GRAVITY * dt;
  const x = state.x + state.vx * dt;
  const y = state.y + vy * dt;

  if (y <= 0) {
    const landedX = state.secret ? SUPER_JUMP_M : x;
    const distance = state.secret ? SUPER_JUMP_M : Math.round(Math.max(0, x) * 100) / 100;
    return {
      ...state,
      phase: "landed",
      x: landedX,
      y: 0,
      vx: 0,
      vy: 0,
      distance,
      justLanded: true,
    };
  }

  return { ...state, x, y, vy };
}

function applySteps(state: JumpState, steps: Side[], dt: number): JumpState {
  let speed = state.speed;
  let lastSide = state.lastSide;
  let timeSinceStep = state.timeSinceStep + dt;
  let justStepped = false;
  let justMistapped = false;
  let faulted = state.faulted;

  for (const side of steps) {
    justStepped = true;
    timeSinceStep = 0;
    if (lastSide === null || lastSide !== side) {
      speed = Math.min(1, speed + STEP_GAIN);
    } else {
      speed = Math.max(0, speed - MISTAP_LOSS);
      justMistapped = true;
      faulted = true;
    }
    lastSide = side;
  }

  if (timeSinceStep > BLEED_AFTER) {
    speed = Math.max(0, speed - BLEED_RATE * dt);
  }

  return { ...state, speed, lastSide, timeSinceStep, justStepped, justMistapped, faulted };
}

function isSuperPerfect(state: JumpState) {
  return state.speed >= 0.999 && !state.faulted && state.timeSinceStep <= SUPER_BOARD_WINDOW;
}

function takeoffPower(speed: number) {
  return speed ** TAKEOFF_CURVE;
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}
