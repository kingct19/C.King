"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useReducedMotion } from "motion/react";
import { trackEvent } from "@/lib/analytics";
import { createJumpState, stepJump, type JumpState, type Side } from "@/components/landing/long-jump/sim";
import {
  drawSprite,
  loadSpriteSheet,
  spriteName,
  type SpriteName,
} from "@/components/landing/long-jump/sprite";
import {
  bestLabelY,
  cameraLift,
  cameraX,
  drawClouds,
  drawScanlines,
  drawScoreCard,
  drawStadium,
  drawText,
  runnerScale,
  syncFrame,
  VIEW_H,
  VIEW_W,
  worldX,
  worldY,
} from "@/components/landing/long-jump/stadium";

const BEST_KEY = "ck-long-jump-best";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
};

const CROWD_SRC = "/audio/long-jump/crowd.mp3";
const MUSIC_SRC = "/audio/long-jump/music.mp3";

function gaugeBand(speed: number) {
  if (speed < 0.25) return 0;
  if (speed < 0.5) return 1;
  if (speed < 0.75) return 2;
  return 3;
}

class JumpAudio {
  private ctx: AudioContext | null = null;
  private bedOn = false;
  private lastBand = -1;
  private crowd: HTMLAudioElement | null = null;
  private music: HTMLAudioElement | null = null;

  unlock() {
    const ctx = this.ensure();
    if (ctx.state === "suspended") void ctx.resume();
    if (this.bedOn) void this.playBed();
  }

  startBed() {
    if (this.bedOn) {
      void this.playBed();
      return;
    }
    this.bedOn = true;
    this.lastBand = -1;
    this.unlock();
  }

  stopBed() {
    this.bedOn = false;
    this.lastBand = -1;
    for (const track of [this.crowd, this.music]) {
      if (!track) continue;
      track.pause();
      track.currentTime = 0;
    }
  }

  step(speed: number) {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== "running") return;
    const when = ctx.currentTime;
    this.tone(90 + speed * 40, when, 0.045, "triangle", 0.07);
    this.noise(when, 0.04, 900, 0.045);
    const stings = [262, 330, 392, 523] as const;
    this.tone(stings[gaugeBand(speed)], when, 0.07, "square", 0.038);
    this.gauge(speed);
  }

  miss() {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== "running") return;
    const when = ctx.currentTime;
    this.tone(140, when, 0.16, "sawtooth", 0.06);
    this.tone(118, when + 0.02, 0.14, "square", 0.045);
    this.noise(when, 0.08, 400, 0.035);
    this.lastBand = -1;
  }

  takeoff(secret: boolean) {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== "running") return;
    const when = ctx.currentTime;
    this.sweep(secret ? 280 : 220, secret ? 980 : 640, when, secret ? 0.32 : 0.18, "square", 0.055);
    this.noise(when, 0.12, 1600, 0.05);
  }

  land(distance: number) {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== "running") return;
    const when = ctx.currentTime;
    this.tone(70, when, 0.16, "triangle", 0.1);
    this.noise(when, 0.14, 700, 0.07);
    if (distance >= 100) {
      this.tone(523, when + 0.08, 0.12, "square", 0.06);
      this.tone(659, when + 0.16, 0.12, "square", 0.06);
      this.tone(784, when + 0.24, 0.14, "square", 0.06);
      this.tone(1046, when + 0.36, 0.28, "square", 0.06);
    } else if (distance >= 8) {
      this.tone(523, when + 0.08, 0.12, "square", 0.05);
      this.tone(784, when + 0.16, 0.18, "square", 0.05);
    }
  }

  gauge(speed: number) {
    const band = gaugeBand(speed);
    if (band === this.lastBand) return;
    this.lastBand = band;
    const ctx = this.ctx;
    if (!ctx || ctx.state !== "running") return;
    const when = ctx.currentTime;
    const stings = [
      [392, 523],
      [523, 659],
      [659, 784],
      [784, 1047],
    ] as const;
    const pair = stings[band];
    this.tone(pair[0], when, 0.08, "square", 0.045);
    this.tone(pair[1], when + 0.07, 0.1, "square", 0.05);
  }

  private ensure() {
    this.ctx ??= new AudioContext();
    return this.ctx;
  }

  private ensureLoops() {
    if (!this.crowd) {
      const crowd = new Audio(CROWD_SRC);
      crowd.loop = true;
      crowd.preload = "auto";
      crowd.volume = 0.12;
      this.crowd = crowd;
    }
    if (!this.music) {
      const music = new Audio(MUSIC_SRC);
      music.loop = true;
      music.preload = "auto";
      music.volume = 0.18;
      this.music = music;
    }
  }

  private async playBed() {
    if (!this.bedOn) return;
    this.ensureLoops();
    try {
      await Promise.all([this.crowd?.play(), this.music?.play()]);
    } catch {
      // The next click calls unlock, which retries playback.
    }
  }

  private sweep(
    from: number,
    to: number,
    when: number,
    dur: number,
    type: OscillatorType,
    vol: number,
  ) {
    const ctx = this.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(from, when);
    osc.frequency.exponentialRampToValueAtTime(Math.max(to, 1), when + dur);
    gain.gain.setValueAtTime(vol, when);
    gain.gain.exponentialRampToValueAtTime(0.001, when + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(when);
    osc.stop(when + dur + 0.02);
  }

  private noise(when: number, dur: number, freq: number, vol: number) {
    const ctx = this.ctx;
    if (!ctx) return;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = freq;
    filter.Q.value = 0.9;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(vol, when);
    gain.gain.exponentialRampToValueAtTime(0.001, when + dur);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start(when);
    source.stop(when + dur + 0.02);
  }

  private tone(
    freq: number,
    when: number,
    dur: number,
    type: OscillatorType,
    vol: number,
  ) {
    const ctx = this.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, when);
    gain.gain.exponentialRampToValueAtTime(0.001, when + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(when);
    osc.stop(when + dur + 0.02);
  }

}

function readBest() {
  try {
    const raw = window.localStorage.getItem(BEST_KEY);
    const value = raw ? Number(raw) : 0;
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
}

function writeBest(distance: number) {
  try {
    window.localStorage.setItem(BEST_KEY, String(distance));
  } catch {
    // Private mode can reject writes; the in-memory best still updates.
  }
}

function frameFor(state: JumpState): SpriteName {
  switch (state.phase) {
    case "ready":
      return spriteName("land", 5);
    case "runup":
      if (state.x > -4) return spriteName("takeoff", Math.min(5, Math.floor(((state.x + 4) / 4) * 6)));
      return spriteName("run", Math.floor(state.runStride));
    case "flight":
      if (state.vy > 4) return spriteName("flight", 1);
      if (state.vy > 1.2) return spriteName("flight", 2);
      if (state.vy > -1.2) return spriteName("flight", 3);
      if (state.vy > -4) return spriteName("flight", 4);
      return spriteName("flight", 5);
    case "landed":
      return spriteName("land", 2);
    default: {
      const _exhaustive: never = state.phase;
      return _exhaustive;
    }
  }
}

function spawnDust(particles: Particle[], x: number, y: number, count: number) {
  for (let i = 0; i < count; i += 1) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.65) * 3.4,
      vy: 1.2 + Math.random() * 2.6,
      life: 0.28 + Math.random() * 0.35,
      color: i % 2 === 0 ? "#ffe566" : "#f0d24a",
    });
  }
}

function stepParticles(particles: Particle[], dt: number) {
  for (const particle of particles) {
    particle.life -= dt;
    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
    particle.vy -= 14 * dt;
  }
  let write = 0;
  for (const particle of particles) {
    if (particle.life > 0 && particle.y > -0.2) {
      particles[write] = particle;
      write += 1;
    }
  }
  particles.length = write;
}

function drawScene(
  ctx: CanvasRenderingContext2D,
  state: JumpState,
  cam: number,
  shakeX: number,
  shakeY: number,
  particles: Particle[],
  reducedMotion: boolean,
  best: number,
  hint: string,
) {
  const rising = state.secret && state.phase === "flight";
  const lift = cameraLift(state.y, rising);
  ctx.fillStyle = "#9fd4f5";
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  ctx.save();
  ctx.translate(0, lift);
  drawClouds(ctx, cam, shakeX);
  drawStadium(ctx, {
    camX: cam,
    shakeX,
    shakeY,
    elapsed: state.elapsed,
    speed: state.speed,
    reducedMotion,
  });

  for (const particle of particles) {
    ctx.fillStyle = particle.color;
    ctx.fillRect(worldX(particle.x, cam, shakeX), worldY(particle.y, shakeY), 2, 2);
  }

  drawSprite(
    ctx,
    frameFor(state),
    worldX(state.x, cam, shakeX),
    worldY(state.y, shakeY),
    runnerScale(),
  );
  ctx.restore();

  drawText(ctx, best > 0 ? `BEST ${best.toFixed(2)}` : "BEST --", 8, bestLabelY(), "#ffffff", 2);

  if (state.phase === "landed") {
    drawScoreCard(ctx, state.distance, Math.max(best, state.distance));
  } else {
    drawText(ctx, hint, VIEW_W / 2 - 28, VIEW_H - 18, "#ffffff", 1);
  }

  if (!reducedMotion) drawScanlines(ctx);
}

function GardenTrigger({ onPlay }: { onPlay: () => void }) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let timeout = 0;
    const blinkOnce = () => {
      setBlink(true);
      timeout = window.setTimeout(() => {
        setBlink(false);
        timeout = window.setTimeout(blinkOnce, 2600 + Math.random() * 900);
      }, 150);
    };
    timeout = window.setTimeout(blinkOnce, 1600);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <button
      type="button"
      aria-label="Play the long jump."
      onClick={onPlay}
      className="group rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <img
        src={blink ? "/images/long-jump/chandler-ready-blink.png" : "/images/long-jump/chandler-ready.png"}
        alt=""
        width={120}
        height={150}
        className="h-16 w-auto transition-transform duration-200 group-hover:-translate-y-0.5 group-active:scale-95 motion-reduce:transform-none motion-reduce:transition-none"
      />
    </button>
  );
}

function LongJumpGame({
  open,
  onClose,
  audio,
}: {
  open: boolean;
  onClose: () => void;
  audio: JumpAudio;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(createJumpState());
  const pendingRef = useRef<{ steps: Side[]; restart: boolean }>({
    steps: [],
    restart: false,
  });
  const particlesRef = useRef<Particle[]>([]);
  const shakeRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const [hud, setHud] = useState({
    phase: "ready" as JumpState["phase"],
    speed: 0,
    distance: 0,
    best: 0,
  });
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const sync = () => setCoarsePointer(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (open) audio.startBed();
    else audio.stopBed();
  }, [audio, open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    stateRef.current = createJumpState();
    particlesRef.current = [];
    shakeRef.current = 0;
    pendingRef.current = { steps: [], restart: false };
    setHud({
      phase: "ready",
      speed: 0,
      distance: 0,
      best: readBest(),
    });

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let frame = 0;
    let last = performance.now();
    let cancelled = false;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const input = pendingRef.current;
      const next = stepJump(stateRef.current, dt, input);
      pendingRef.current = { steps: [], restart: false };
      stateRef.current = next;

      if (next.justMistapped) audio.miss();
      else if (next.justStepped) audio.step(next.speed);
      if (next.justTookOff) audio.takeoff(next.secret);
      if (next.justLanded) {
        audio.land(next.distance);
        const best = Math.max(readBest(), next.distance);
        if (next.distance >= readBest()) writeBest(next.distance);
        trackEvent("long_jump_landed", {
          distance: next.distance,
          best,
          speed: Number(next.speed.toFixed(2)),
        });
        if (!reducedMotion) {
          shakeRef.current = next.secret ? 9 : 5;
          spawnDust(particlesRef.current, next.x, 0.1, next.secret ? 28 : 16);
        }
      }
      if (next.justStepped && !reducedMotion) {
        spawnDust(particlesRef.current, next.x, 0.04, 3);
      }

      stepParticles(particlesRef.current, dt);
      shakeRef.current = reducedMotion ? 0 : shakeRef.current * 0.82;

      const shake = shakeRef.current;
      const shakeX = shake ? Math.round((Math.random() - 0.5) * shake) : 0;
      const shakeY = shake ? Math.round((Math.random() - 0.5) * shake) : 0;
      const box = canvas.getBoundingClientRect();
      const fit = syncFrame(box.width, box.height);
      if (canvas.width !== fit.bitmapW || canvas.height !== fit.bitmapH) {
        canvas.width = fit.bitmapW;
        canvas.height = fit.bitmapH;
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "#5b8cff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(fit.drawScale, 0, 0, fit.drawScale, fit.offsetX, fit.offsetY);
      ctx.imageSmoothingEnabled = false;
      drawScene(
        ctx,
        next,
        cameraX(next.x, next.phase, next.secret),
        shakeX,
        shakeY,
        particlesRef.current,
        Boolean(reducedMotion),
        readBest(),
        coarsePointer ? "TAP L R" : "A  D",
      );

      const speedBucket = Math.round(next.speed * 20);
      setHud((current) => {
        if (
          current.phase === next.phase &&
          current.distance === next.distance &&
          Math.round(current.speed * 20) === speedBucket
        ) {
          return current;
        }
        return {
          phase: next.phase,
          speed: next.speed,
          distance: next.distance,
          best: Math.max(current.best, next.distance),
        };
      });

      frame = window.requestAnimationFrame(tick);
    };

    void loadSpriteSheet().then(
      () => {
        if (cancelled) return;
        last = performance.now();
        frame = window.requestAnimationFrame(tick);
      },
      () => {
        if (cancelled) return;
        last = performance.now();
        frame = window.requestAnimationFrame(tick);
      },
    );
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [audio, coarsePointer, open, reducedMotion]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      switch (event.code) {
        case "KeyA":
        case "ArrowLeft":
          event.preventDefault();
          event.stopImmediatePropagation();
          pendingRef.current.steps.push("left");
          return;
        case "KeyD":
        case "ArrowRight":
          event.preventDefault();
          event.stopImmediatePropagation();
          pendingRef.current.steps.push("right");
          return;
        case "Space":
        case "Enter":
          if (stateRef.current.phase === "landed") {
            event.preventDefault();
            event.stopImmediatePropagation();
            pendingRef.current.restart = true;
          }
          return;
        default:
          return;
      }
    };

    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [open]);

  const queueSide = (event: PointerEvent<HTMLDialogElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    const side: Side = event.clientX < window.innerWidth / 2 ? "left" : "right";
    if (stateRef.current.phase === "landed") {
      pendingRef.current.restart = true;
      return;
    }
    pendingRef.current.steps.push(side);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onPointerDown={queueSide}
      className="fixed inset-0 z-[80] m-0 h-dvh w-dvw max-h-none max-w-none border-0 bg-[#5b8cff] p-0 text-[#1a1a1a] backdrop:bg-[#2a4a9a]/90"
      style={{ touchAction: "none" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full"
        style={{ imageRendering: "pixelated" }}
      />

      <button
        type="button"
        onClick={onClose}
        className="pointer-events-auto absolute top-3 right-3 z-10 border-2 border-[#1a1a1a] bg-white px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-[#1a1a1a] outline-none hover:bg-[#ffe566]"
      >
        CLOSE
      </button>

      {hud.phase === "landed" ? (
        <button
          type="button"
          onClick={() => {
            pendingRef.current.restart = true;
          }}
          className="pointer-events-auto absolute bottom-4 left-1/2 z-10 -translate-x-1/2 border-2 border-[#1a1a1a] bg-white px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-[#1a1a1a] outline-none hover:bg-[#ffe566]"
        >
          JUMP AGAIN
        </button>
      ) : null}
    </dialog>
  );
}

export function LongJumpEgg() {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<JumpAudio | null>(null);
  if (audioRef.current === null) {
    audioRef.current = new JumpAudio();
  }

  useEffect(() => {
    if (window.location.hash === "#long-jump") {
      audioRef.current?.startBed();
      setOpen(true);
    }
  }, []);

  return (
    <>
      <GardenTrigger
        onPlay={() => {
          audioRef.current?.startBed();
          setOpen(true);
          trackEvent("long_jump_opened", {});
        }}
      />
      <LongJumpGame
        open={open}
        onClose={() => setOpen(false)}
        audio={audioRef.current}
      />
    </>
  );
}
