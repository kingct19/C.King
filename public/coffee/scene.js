import { THREE, material, cylinder, rod, makeRandom } from "./runtime.js";

// A 16-second loop: a customer walks up, the barista pours, steam rises.
export function buildCoffeeShop(options = {}) {
  const once = Boolean(options.once);
  const name = String(options.name || "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, 40);
  const world = new THREE.Group();
  world.name = "A small coffee shop";
  const random = makeRandom(19);
  const tau = Math.PI * 2;
  const paints = {
    plaster: material("#efe4cf"),
    plasterShade: material("#e4d2b4"),
    wood: material("#6d4630"),
    woodDark: material("#3c281c"),
    trim: material("#8d5a38"),
    floor: material("#c4a27a"),
    floorDark: material("#a48460"),
    espresso: material("#2b221c"),
    cream: material("#f6f1e6"),
    terracotta: material("#c56b45"),
    awning: material("#f3efe6"),
    leaf: material("#3d684c"),
    leafLight: material("#6d9464"),
    brass: material("#d7a441"),
    skin: material("#d2a27a"),
    hair: material("#2c2420"),
    apron: material("#24342c"),
    jacket: material("#6d8294"),
    pants: material("#3e4654"),
    cat: material("#c9844a"),
    cup: material("#f7f3ea"),
    foam: material("#fff8ee"),
    glass: material("#ffc07a", { emissive: "#ff9a3c", emissiveIntensity: 0.72 }),
    bulb: material("#ffe1a0", { emissive: "#ffb347", emissiveIntensity: 0.8 }),
  };

  const shapes = new Map();
  function mesh(parent, geometry, paint, position, scale) {
    const object = new THREE.Mesh(geometry, paint);
    object.position.set(...position);
    if (scale) object.scale.set(...scale);
    object.castShadow = object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  function softBox(parent, size, position, paint, bevel = 0.045) {
    const [w, h, d] = size;
    const b = Math.min(bevel, w / 4, h / 4, d / 4);
    const key = `${w},${h},${d},${b}`;
    if (!shapes.has(key)) {
      const s = new THREE.Shape();
      s.moveTo(-w / 2 + b, -h / 2 + b);
      s.lineTo(w / 2 - b, -h / 2 + b);
      s.lineTo(w / 2 - b, h / 2 - b);
      s.lineTo(-w / 2 + b, h / 2 - b);
      s.closePath();
      const g = new THREE.ExtrudeGeometry(s, {
        depth: d - 2 * b,
        bevelEnabled: true,
        bevelSize: b,
        bevelThickness: b,
        bevelSegments: 1,
        curveSegments: 1,
        steps: 1,
      });
      g.translate(0, 0, -d / 2 + b);
      shapes.set(key, g);
    }
    return mesh(parent, shapes.get(key), paint, position);
  }
  const pebbleGeometry = new THREE.IcosahedronGeometry(1, 1);
  function pebble(parent, position, scale, paint) {
    return mesh(parent, pebbleGeometry, paint, position, scale);
  }

  softBox(world, [7.6, 0.2, 5.5], [0, 0.02, 0.15], paints.woodDark, 0.08);
  softBox(world, [7.35, 0.08, 5.25], [0, 0.14, 0.15], paints.floor, 0.03);
  for (let i = 0; i < 8; i++) {
    softBox(world, [7.1, 0.012, 0.035], [-0.05, 0.185, -2.15 + i * 0.62], paints.floorDark, 0.004);
  }

  const shop = new THREE.Group();
  shop.position.set(-0.15, 0.18, -0.55);
  world.add(shop);
  softBox(shop, [4.85, 0.16, 2.45], [0, 0.08, -0.15], paints.trim, 0.05);
  softBox(shop, [4.55, 2.25, 2.15], [0, 1.28, -0.2], paints.plaster, 0.08);
  softBox(shop, [4.75, 0.14, 2.4], [0, 2.46, -0.18], paints.woodDark, 0.04);
  softBox(shop, [4.95, 0.1, 2.6], [0, 2.56, -0.18], paints.trim, 0.03);
  // Warm window, set into the front face so the counter reads through it.
  softBox(shop, [2.15, 1.35, 0.12], [0.45, 1.35, 0.9], paints.trim, 0.03);
  softBox(shop, [1.9, 1.12, 0.06], [0.45, 1.38, 0.98], paints.glass, 0.02);
  rod(shop, [0.45, 0.86, 1.02], [0.45, 1.9, 1.02], 0.02, paints.trim);
  rod(shop, [-0.4, 1.38, 1.02], [1.3, 1.38, 1.02], 0.02, paints.trim);

  const door = new THREE.Group();
  door.position.set(-1.35, 0.16, 0.95);
  door.rotation.y = -0.55;
  shop.add(door);
  softBox(door, [0.72, 1.85, 0.08], [0.28, 0.92, 0], paints.wood, 0.02);
  softBox(door, [0.48, 0.7, 0.03], [0.28, 1.25, 0.05], paints.glass, 0.01);
  pebble(door, [0.52, 0.9, 0.06], [0.035, 0.035, 0.035], paints.brass);
  softBox(shop, [0.9, 1.95, 0.1], [-1.35, 1.1, 0.88], paints.trim, 0.02);

  const awning = new THREE.Group();
  awning.position.set(0.15, 2.15, 1.15);
  awning.rotation.x = 0.18;
  shop.add(awning);
  softBox(awning, [3.3, 0.06, 0.95], [0, 0, 0], paints.terracotta, 0.02);
  for (const x of [-1.1, 0, 1.1]) {
    softBox(awning, [0.42, 0.02, 0.9], [x, 0.04, 0], paints.awning, 0.01);
  }

  const board = new THREE.Group();
  board.position.set(-2.05, 1.55, 0.95);
  shop.add(board);
  softBox(board, [0.62, 0.85, 0.06], [0, 0, 0], paints.espresso, 0.02);
  softBox(board, [0.7, 0.06, 0.08], [0, 0.46, 0], paints.trim, 0.01);
  for (const y of [0.12, -0.08, -0.26]) {
    softBox(board, [0.38, 0.035, 0.02], [0, y, 0.04], paints.cream, 0.006);
  }

  // Counter, machine, and a row of cups in front of the window.
  const counter = new THREE.Group();
  counter.position.set(0.4, 0, 1.22);
  shop.add(counter);
  softBox(counter, [2.45, 0.92, 0.7], [0, 0.46, 0], paints.wood, 0.04);
  softBox(counter, [2.55, 0.06, 0.78], [0, 0.94, 0], paints.woodDark, 0.02);
  const machine = new THREE.Group();
  machine.position.set(-0.55, 0.97, -0.05);
  counter.add(machine);
  softBox(machine, [0.62, 0.72, 0.42], [0, 0.36, 0], paints.espresso, 0.03);
  cylinder(machine, [0.08, 0.1, 0.16], [0.22, 0.62, 0.08], paints.brass, 8);
  rod(machine, [0.22, 0.55, 0.18], [0.34, 0.28, 0.28], 0.025, paints.brass, 6);
  pebble(machine, [-0.12, 0.74, 0.18], [0.06, 0.06, 0.06], paints.bulb);
  const tray = softBox(counter, [0.7, 0.04, 0.38], [0.7, 1.0, 0.05], paints.cream, 0.01);
  tray.castShadow = false;
  for (const x of [-0.2, 0, 0.2]) {
    cylinder(counter, [0.07, 0.06, 0.11], [0.7 + x, 1.08, 0.05], paints.cup, 10);
  }
  softBox(counter, [0.34, 0.06, 0.22], [0.55, 1.02, 0.22], paints.terracotta, 0.015);

  const pendant = new THREE.Group();
  pendant.position.set(0.35, 2.4, 1.05);
  shop.add(pendant);
  rod(pendant, [0, 0, 0], [0, -0.45, 0], 0.015, paints.brass, 5);
  cylinder(pendant, [0.16, 0.08, 0.16], [0, -0.55, 0], paints.brass, 8);
  pebble(pendant, [0, -0.62, 0], [0.07, 0.07, 0.07], paints.bulb);

  function planter(position) {
    const g = new THREE.Group();
    g.position.set(...position);
    world.add(g);
    cylinder(g, [0.22, 0.16, 0.32], [0, 0.16, 0], paints.terracotta, 8);
    cylinder(g, [0.24, 0.24, 0.05], [0, 0.33, 0], paints.trim, 8);
    for (let i = 0; i < 6; i++) {
      const a = i * 1.1;
      const tip = [Math.cos(a) * 0.22, 0.62 + random() * 0.16, Math.sin(a) * 0.22];
      rod(g, [0, 0.34, 0], tip, 0.016, paints.leaf);
      pebble(g, tip, [0.1, 0.16, 0.08], i % 2 ? paints.leaf : paints.leafLight);
    }
    return g;
  }
  planter([-2.55, 0.18, 0.85]);

  // A little table out front, so the shop has a sidewalk.
  const table = new THREE.Group();
  table.position.set(2.35, 0.18, 0.55);
  world.add(table);
  cylinder(table, [0.06, 0.08, 0.62], [0, 0.31, 0], paints.woodDark, 8);
  cylinder(table, [0.42, 0.42, 0.06], [0, 0.64, 0], paints.wood, 16);
  cylinder(table, [0.08, 0.07, 0.1], [0.05, 0.72, 0.02], paints.cup, 10);
  cylinder(table, [0.07, 0.07, 0.025], [0.05, 0.78, 0.02], paints.foam, 10);
  function chair(x, z, facing) {
    const c = new THREE.Group();
    c.position.set(x, 0.18, z);
    c.rotation.y = facing;
    world.add(c);
    for (const [px, pz] of [[-0.14, -0.14], [0.14, -0.14], [-0.14, 0.14], [0.14, 0.14]]) {
      rod(c, [px, 0, pz], [px, 0.38, pz], 0.025, paints.woodDark, 5);
    }
    softBox(c, [0.42, 0.05, 0.42], [0, 0.4, 0], paints.wood, 0.015);
    softBox(c, [0.42, 0.4, 0.05], [0, 0.62, -0.18], paints.wood, 0.015);
  }
  chair(2.35, 1.15, 0);
  chair(1.75, 0.35, Math.PI / 2);

  const steamCanvas = document.createElement("canvas");
  steamCanvas.width = steamCanvas.height = 64;
  const context = steamCanvas.getContext("2d");
  if (!context) throw new Error("A 2D canvas is required for the steam texture.");
  const gradient = context.createRadialGradient(32, 32, 2, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,248,236,0.7)");
  gradient.addColorStop(0.45, "rgba(255,248,236,0.18)");
  gradient.addColorStop(1, "rgba(255,248,236,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  const steamTexture = new THREE.CanvasTexture(steamCanvas);
  steamTexture.colorSpace = THREE.SRGBColorSpace;
  const steamPaint = new THREE.SpriteMaterial({
    map: steamTexture,
    transparent: true,
    depthWrite: false,
  });
  const steams = [];
  function steamAt(parent, position) {
    const puff = new THREE.Sprite(steamPaint);
    puff.position.set(...position);
    parent.add(puff);
    steams.push({ puff, origin: position.slice(), phase: random() * tau });
  }
  steamAt(world, [2.4, 1.15, 0.57]);

  function nameplate(label) {
    const fontSize = 64;
    const padX = 36;
    const padY = 20;
    const arrow = 16;
    const scratch = document.createElement("canvas").getContext("2d");
    if (!scratch) throw new Error("A 2D canvas is required for the name tooltip.");
    scratch.font = `600 ${fontSize}px ui-sans-serif, system-ui, sans-serif`;
    const textWidth = Math.ceil(scratch.measureText(label).width);
    const width = textWidth + padX * 2;
    const body = fontSize + padY * 2;
    const height = body + arrow;
    const canvas = document.createElement("canvas");
    const pixel = 2;
    canvas.width = width * pixel;
    canvas.height = height * pixel;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("A 2D canvas is required for the name tooltip.");
    ctx.scale(pixel, pixel);
    ctx.beginPath();
    ctx.roundRect(1, 1, width - 2, body - 1, 18);
    ctx.moveTo(width / 2 - 14, body - 1);
    ctx.lineTo(width / 2 + 14, body - 1);
    ctx.lineTo(width / 2, height - 2);
    ctx.closePath();
    ctx.fillStyle = "#f6f3ec";
    ctx.fill();
    ctx.fillStyle = "#1c1917";
    ctx.font = `600 ${fontSize}px ui-sans-serif, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, width / 2, body / 2 + 1);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        depthTest: false,
      }),
    );
    const worldHeight = 0.52;
    sprite.scale.set(worldHeight * (width / height), worldHeight, 1);
    sprite.center.set(0.5, 0);
    return sprite;
  }

  const up = new THREE.Vector3(0, 1, 0);
  const direction = new THREE.Vector3();
  function segment(parent, paint, radius) {
    return cylinder(parent, [radius, radius, 1], [0, 0, 0], paint, 7);
  }
  function connect(object, from, to) {
    direction.set(to[0] - from[0], to[1] - from[1], to[2] - from[2]);
    object.position.set((from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2);
    object.scale.y = Math.max(0.04, direction.length());
    object.quaternion.setFromUnitVectors(up, direction.normalize());
  }
  function arm(parent, shoulder, sleeve) {
    const upper = segment(parent, sleeve, 0.09);
    const lower = segment(parent, paints.skin, 0.065);
    const hand = new THREE.Group();
    pebble(hand, [0, 0, 0], [0.08, 0.07, 0.08], paints.skin);
    parent.add(hand);
    return { upper, lower, hand, shoulder };
  }
  function poseArm(limb, elbow, hand) {
    connect(limb.upper, limb.shoulder, elbow);
    connect(limb.lower, elbow, hand);
    limb.hand.position.set(...hand);
  }

  const barista = new THREE.Group();
  barista.position.set(0.2, 0.18, 0.78);
  world.add(barista);
  cylinder(barista, [0.22, 0.3, 0.62], [0, 0.72, 0], paints.apron, 7);
  softBox(barista, [0.34, 0.5, 0.08], [0, 0.78, 0.16], paints.cream, 0.02);
  const baristaHead = new THREE.Group();
  baristaHead.position.set(0, 1.32, 0);
  barista.add(baristaHead);
  pebble(baristaHead, [0, 0, 0], [0.24, 0.27, 0.23], paints.skin);
  pebble(baristaHead, [0, 0.12, -0.04], [0.26, 0.16, 0.22], paints.hair);
  const pourArm = arm(barista, [0.24, 0.98, 0.04], paints.apron);
  const restArm = arm(barista, [-0.24, 0.98, 0.04], paints.apron);
  const pitcher = new THREE.Group();
  pourArm.hand.add(pitcher);
  cylinder(pitcher, [0.07, 0.09, 0.16], [0, 0.08, 0], paints.cream, 8);
  rod(pitcher, [0.07, 0.06, 0], [0.13, 0.12, 0], 0.018, paints.brass, 5);
  poseArm(restArm, [-0.36, 0.72, 0.16], [-0.22, 0.58, 0.28]);

  const customer = new THREE.Group();
  customer.name = "Customer";
  world.add(customer);
  const legs = [];
  for (const x of [-0.13, 0.13]) {
    const upper = segment(customer, paints.pants, 0.08);
    const lower = segment(customer, paints.pants, 0.07);
    const foot = softBox(customer, [0.18, 0.1, 0.28], [x, 0.06, 0.06], paints.espresso);
    legs.push({ x, upper, lower, foot });
  }
  cylinder(customer, [0.24, 0.32, 0.66], [0, 0.74, 0], paints.jacket, 7);
  const head = new THREE.Group();
  head.position.set(0, 1.36, 0);
  customer.add(head);
  pebble(head, [0, 0, 0], [0.25, 0.28, 0.24], paints.skin);
  pebble(head, [0, 0.13, -0.03], [0.27, 0.16, 0.24], paints.hair);
  const leftArm = arm(customer, [-0.24, 1.0, 0], paints.jacket);
  const rightArm = arm(customer, [0.24, 1.0, 0], paints.jacket);
  const heldCup = new THREE.Group();
  rightArm.hand.add(heldCup);
  cylinder(heldCup, [0.07, 0.06, 0.1], [0, 0.02, 0], paints.cup, 10);
  cylinder(heldCup, [0.065, 0.065, 0.02], [0, 0.08, 0], paints.foam, 10);
  steamAt(heldCup, [0, 0.16, 0]);
  if (name) {
    const plate = nameplate(name);
    plate.position.set(0, 1.72, 0);
    customer.add(plate);
  }

  const cat = new THREE.Group();
  cat.position.set(1.45, 1.22, 1.02);
  cat.rotation.y = -0.8;
  world.add(cat);
  pebble(cat, [0, 0.12, 0], [0.32, 0.14, 0.2], paints.cat);
  const catHead = new THREE.Group();
  catHead.position.set(0.2, 0.18, 0.02);
  cat.add(catHead);
  pebble(catHead, [0, 0, 0], [0.16, 0.15, 0.15], paints.cat);
  for (const z of [-0.06, 0.08]) {
    mesh(catHead, new THREE.ConeGeometry(0.05, 0.1, 4), paints.cat, [0, 0.12, z]);
  }
  const tail = new THREE.Group();
  tail.position.set(-0.22, 0.12, 0);
  cat.add(tail);
  rod(tail, [0, 0, 0], [-0.18, 0.12, 0.08], 0.03, paints.cat, 5);

  const localLights = [];
  function light(position, power, distance) {
    const lamp = new THREE.PointLight("#ffb15a", power, distance, 2);
    lamp.position.set(...position);
    world.add(lamp);
    localLights.push({ lamp, power });
  }
  light([0.3, 1.7, 0.9], 4.5, 4.5);
  light([0.3, 2.2, 0.6], 3, 3.5);

  const smooth = (value) => {
    const t = Math.max(0, Math.min(1, value));
    return t * t * (3 - 2 * t);
  };
  const mix = (a, b, t) => a + (b - a) * t;

  function update(time) {
    const t = time % 16;
    const cycle = t * tau / 16;
    for (const { puff, origin, phase } of steams) {
      const age = (Math.sin(cycle * 2 + phase) + 1) / 2;
      puff.position.set(origin[0], origin[1] + age * 0.28, origin[2]);
      puff.scale.setScalar(0.28 + age * 0.35);
    }
    pendant.rotation.z = Math.sin(cycle * 3) * 0.06;
    for (let i = 0; i < localLights.length; i++) {
      const { lamp, power } = localLights[i];
      lamp.intensity = power * (1 + Math.sin(cycle * 8 + i) * 0.04);
    }

    const approach = smooth(t / 4.2);
    const leave = once ? 0 : smooth((t - 12.5) / 2.4);
    const travel = approach * (1 - leave);
    const from = [2.6, 0.18, 1.9];
    const to = [0.72, 0.18, 1.28];
    customer.position.set(
      mix(from[0], to[0], travel),
      0.18,
      mix(from[2], to[2], travel),
    );
    const heading = Math.atan2(to[0] - from[0], to[2] - from[2]);
    const faceCounter = Math.PI;
    customer.rotation.y = mix(heading, faceCounter, smooth((t - 3.4) / 1.1))
      + (heading + Math.PI - faceCounter) * leave;
    const walking = t < 4.2 ? approach : t > 12.5 ? leave : 0;
    const distance = travel * Math.hypot(to[0] - from[0], to[2] - from[2]);
    for (let i = 0; i < legs.length; i++) {
      const leg = legs[i];
      const phase = (distance / 0.55 + i * 0.5) % 1;
      const swing = Math.max(0, (phase - 0.6) / 0.4);
      const z = walking * (phase < 0.6 ? 0.5 * (0.3 - phase) : mix(-0.15, 0.15, smooth(swing)));
      const lift = Math.sin(swing * Math.PI) * 0.14 * walking;
      connect(leg.upper, [leg.x, 0.48, 0], [leg.x, 0.28 + lift * 0.35, z * 0.45]);
      connect(leg.lower, [leg.x, 0.28 + lift * 0.35, z * 0.45], [leg.x, 0.1 + lift, z]);
      leg.foot.position.set(leg.x, 0.06 + lift, z + 0.05);
    }

    const sip = smooth((t - 5) / 1.1) * (1 - smooth((t - 10.5) / 1.2));
    poseArm(leftArm, [-0.34, 0.78, 0.18], [-0.16, 0.7, 0.34]);
    poseArm(
      rightArm,
      [0.34, mix(0.78, 1.02, sip), 0.16],
      [0.12, mix(0.78, 1.18, sip), mix(0.32, 0.18, sip)],
    );
    head.rotation.x = -sip * 0.35;

    const pour = smooth((t - 4.6) / 0.8) * (1 - smooth((t - 9.2) / 0.9));
    poseArm(
      pourArm,
      [0.38, mix(0.78, 1.05, pour), 0.2],
      [0.42, mix(0.7, 1.22, pour), mix(0.34, 0.5, pour)],
    );
    pitcher.rotation.z = -pour * 0.9;
    baristaHead.rotation.x = pour * 0.12;

    tail.rotation.z = Math.sin(cycle * 5) * 0.45;
    catHead.rotation.y = Math.sin(cycle * 2) * 0.2;
  }

  return {
    world,
    duration: once ? 11 : 16,
    loop: !once,
    stillTime: 7,
    update,
    target: [0.2, 1.15, 0.35],
    bounds: new THREE.Box3(
      new THREE.Vector3(-3.9, -0.1, -2.6),
      new THREE.Vector3(3.5, 3.1, 2.7),
    ),
    lighting: {
      sky: "#f6e7cf",
      ground: "#6b5142",
      fill: 1.25,
      key: "#fff3dc",
      intensity: 2.2,
      position: [-4, 8, 6],
    },
  };
}
