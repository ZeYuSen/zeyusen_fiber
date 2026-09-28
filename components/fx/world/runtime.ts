import {
  BufferAttribute,
  BufferGeometry,
  Group,
  LineSegments,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { WORLD_KEYS, PRESETS, type WorldState } from "@/lib/fx/world/state";

// The one persistent WebGL scene behind the whole site: thousands of carbon
// (warp) and glass (weft) filaments. A sampler supplied by the page layer says
// which "shot" the world should be in; the runtime eases every parameter toward
// it and only renders while something is actually changing or drifting.

export type WorldSample = { state: WorldState; covered: boolean };

export type WorldRuntime = {
  attach(host: HTMLElement): void;
  setSampler(sampler: () => WorldSample): void;
  /** Ease slowly (camera-move pacing) for the next moment, e.g. on navigation. */
  transit(): void;
  setActive(active: boolean): void;
  setPaused(paused: boolean): void;
  dispose(): void;
};

type Options = { lite: boolean; onContextLost: () => void };

const PX_PER_UNIT = 120;
const FOV = 30;
const WEAVE_AMPLITUDE = 0.06;
const SEED = 20260927;

const vertexShader = /* glsl */ `
attribute vec3 aRand;
attribute vec4 aMeta; // x: delay, y: random side, z: kind (0 carbon warp, 1 glass weft), w: angle in the mat
attribute vec2 aTow;  // x: position along the tow 0..1, y: offset across it (about -1..1)
attribute float aSeed;
uniform float uForm;
uniform float uBundle;
uniform float uSplit;
uniform float uSplitShift;
uniform float uTime;
uniform float uIntro;
uniform float uCarbon;
uniform float uGlass;
uniform float uDensity;
uniform float uIntensity;
uniform float uTint;
uniform float uGlow;
uniform vec2 uVis;      // visible width/height in world units (camera at rest)
uniform vec2 uLightPos; // slow point light in the fabric plane
uniform vec2 uShift;    // woven fabric travel (scroll parallax, production-line run)
varying float vShade;
varying float vKind;
varying float vAlpha;
varying float vAcross;
varying float vWoven;
varying float vTow;
varying float vBand;
varying float vGlint;

vec2 bez(vec2 a, vec2 b, vec2 c, vec2 d, float t) {
  float u = 1.0 - t;
  return u * u * u * a + 3.0 * u * u * t * b + 3.0 * u * t * t * c + t * t * t * d;
}
vec2 bezD(vec2 a, vec2 b, vec2 c, vec2 d, float t) {
  float u = 1.0 - t;
  return 3.0 * u * u * (b - a) + 6.0 * u * t * (c - b) + 3.0 * t * t * (d - c);
}
float hash(float n) { return fract(sin(n) * 43758.5453); }

void main() {
  float kind = aMeta.z;
  float p = clamp(uForm * 1.6 - aMeta.x, 0.0, 1.0);
  p = p * p * (3.0 - 2.0 * p);
  vec3 q = mix(aRand, position + vec3(uShift, 0.0), p);

  float drift = 1.0 - p;
  q.x += drift * 0.08 * sin(uTime * 0.35 + aMeta.x * 40.0);
  q.y += drift * 0.06 * cos(uTime * 0.30 + aMeta.y * 20.0);
  q.z += drift * 0.08 * sin(uTime * 0.80 + aMeta.x * 30.0);

  // The opening shot: every carbon filament gathered into one tow and every
  // glass filament into one roving, crossing on the right of the screen.
  vec2 A = mix(vec2(-0.10, 0.64), vec2(-0.06, -0.64), kind);
  vec2 B = mix(vec2(0.12, 0.22), vec2(0.12, -0.22), kind);
  vec2 C = mix(vec2(0.30, -0.12), vec2(0.28, 0.20), kind);
  vec2 D = mix(vec2(0.58, -0.64), vec2(0.58, 0.64), kind);
  float t = aTow.x;
  vec2 P = bez(A, B, C, D, t) * uVis;
  vec2 T = normalize(bezD(A, B, C, D, t) * uVis);
  vec2 N = vec2(-T.y, T.x);
  float ends = abs(t - 0.5) * 2.0;
  float width = mix(0.062, 0.078, kind) * uVis.y * (1.0 + 1.3 * ends * ends * ends);
  float sway = 0.004 * uVis.y * sin(t * 38.0 + aSeed * 60.0 + uTime * 0.6);
  vec3 towPos = vec3(P + N * (aTow.y * width + sway), aTow.y * 0.12);
  float b = clamp(uBundle * 1.5 - aMeta.x * 0.5, 0.0, 1.0);
  b = b * b * (3.0 - 2.0 * b);
  q = mix(q, towPos, b);
  q.z += (1.0 - uIntro) * (aMeta.y * 1.5 + 1.2);

  float s = smoothstep(aMeta.x * 0.35, aMeta.x * 0.35 + 0.65, uSplit);
  q.x += mix(-1.0, 1.0, kind) * s * uSplitShift;

  // Anisotropic sheen: a filament lights up where it runs across the light.
  vec2 matDir = vec2(cos(aMeta.w), sin(aMeta.w));
  vec2 weaveDir = kind < 0.5 ? vec2(0.0, 1.0) : vec2(1.0, 0.0);
  vec2 dir = normalize(mix(mix(matDir, weaveDir, p), T, b) + 1e-4);
  vec2 toLight = normalize(uLightPos - q.xy + 1e-4);
  vAcross = abs(dir.x * toLight.y - dir.y * toLight.x);
  vWoven = p * (1.0 - b);
  vTow = b;
  // A highlight that travels along the tows (tighter on carbon), and glints
  // that sparkle on the glass roving.
  vBand = b * exp(-pow((t - uGlow) * mix(15.0, 9.0, kind), 2.0));
  float h = hash(floor(t * 60.0) + aSeed * 977.0);
  vGlint = b * kind * step(0.8, h) * pow(max(0.0, sin(uTime * 1.6 + h * 40.0)), 28.0);

  vShade = clamp(mix(mix(0.6 + aMeta.y * 0.3, 0.5 + position.z * 8.0, p), 0.55 + aTow.y * 0.25, b), 0.0, 1.0);
  vKind = clamp(kind + uTint, 0.0, 1.0);
  float kindVisible = mix(uCarbon, uGlass, kind);
  float weight = smoothstep(aSeed, aSeed + 0.05, uDensity);
  vAlpha = uIntro * uIntensity * kindVisible * weight * mix(mix(0.75, 0.95, p), 1.0, b);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(q, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uCarbonLo;
uniform vec3 uCarbonHi;
uniform vec3 uGlassLo;
uniform vec3 uGlassHi;
uniform float uWarm;
uniform float uSilver;
uniform float uInk;
uniform float uScrim;
uniform vec2 uResolution;
varying float vShade;
varying float vKind;
varying float vAlpha;
varying float vAcross;
varying float vWoven;
varying float vTow;
varying float vBand;
varying float vGlint;

void main() {
  // Carbon: near black, a thin silver streak only where it crosses the light.
  vec3 carbonLo = mix(uCarbonLo, vec3(0.30, 0.28, 0.25), uSilver);
  vec3 carbonHi = mix(uCarbonHi, vec3(0.96, 0.91, 0.82), uSilver);
  float carbonSheen = pow(vAcross, 90.0);
  float carbonLight = clamp((mix(0.12, 0.5, vWoven) + 0.2 * vTow) * vShade + 0.95 * carbonSheen * (0.35 + vShade) + 0.9 * vBand, 0.0, 1.0);
  vec3 carbon = mix(carbonLo, carbonHi, carbonLight);
  float carbonAlpha = 0.7 + 0.3 * carbonLight + 0.15 * vTow;
  // Glass: milky and translucent, a broad soft glow toward the light, sparkling.
  vec3 glassLo = mix(uGlassLo, vec3(0.05, 0.055, 0.06), uInk);
  vec3 glassHi = mix(uGlassHi, vec3(0.36, 0.38, 0.40), uInk);
  float glassSheen = pow(vAcross, 10.0);
  float glassLight = clamp(0.5 + 0.35 * vShade + 0.3 * glassSheen + 0.5 * vBand, 0.0, 1.0);
  vec3 glass = mix(glassLo, glassHi, glassLight) + vGlint;
  float glassAlpha = mix(0.24, 0.5, vWoven) + 0.14 * vTow + 0.22 * glassSheen + 0.3 * vBand + vGlint;

  vec3 c = mix(carbon, glass, vKind);
  float a = mix(carbonAlpha, glassAlpha, vKind);
  c *= mix(vec3(1.0), vec3(1.06, 0.8, 0.55), uWarm);
  // Headlines sit on the left of wide screens; on portrait screens they span
  // the full width, so the dimming does too (a little lighter).
  float sx = gl_FragCoord.x / uResolution.x;
  float portrait = step(uResolution.x, uResolution.y * 1.05);
  float region = mix(1.0 - smoothstep(0.08, 0.62, sx), 1.0, portrait);
  float scrim = 1.0 - uScrim * mix(0.72, 0.5, portrait) * region;
  // Fade out under the header so nothing crosses the navigation.
  float top = smoothstep(uResolution.y, uResolution.y * 0.84, gl_FragCoord.y);
  gl_FragColor = vec4(c, clamp(vAlpha * a, 0.0, 1.0) * scrim * top);
}
`;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGeometry(width: number, height: number, lite: boolean) {
  const random = mulberry32(SEED);
  const maxCrossings = lite ? 2200 : 4200;
  const threadsPerUnit = Math.min(lite ? 3 : 4, Math.sqrt(maxCrossings / (width * height)));
  const warpCount = Math.max(8, Math.round(width * threadsPerUnit));
  const weftCount = Math.max(6, Math.round(height * threadsPerUnit));
  const filamentsPerTow = lite ? 2 : 4;
  const segmentsPerCrossing = 5;
  const warpPoints = weftCount * segmentsPerCrossing + 1;
  const weftPoints = warpCount * segmentsPerCrossing + 1;
  const filaments = (warpCount + weftCount) * filamentsPerTow;
  const vertexCount = warpCount * filamentsPerTow * warpPoints + weftCount * filamentsPerTow * weftPoints;

  const position = new Float32Array(vertexCount * 3);
  const rand = new Float32Array(vertexCount * 3);
  const meta = new Float32Array(vertexCount * 4);
  const tow = new Float32Array(vertexCount * 2);
  const seed = new Float32Array(vertexCount);
  const index = new Uint32Array((vertexCount - filaments) * 2);
  let v = 0;
  let ii = 0;
  const out = [0, 0, 0];

  const filament = (points: number, kind: number, woven: (t: number, o: number[]) => void) => {
    const cx = (random() - 0.5) * width;
    const cy = (random() - 0.5) * height;
    const cz = (random() - 0.5) * 0.5;
    const angle = random() * Math.PI;
    const length = 0.8 + random() * 1.4;
    const bow = (random() - 0.5) * 0.36;
    // The weave (and the split) sweep in from left to right with some jitter.
    const delay = random() * 0.35 + (cx / width + 0.5) * 0.25;
    const side = random() * 2 - 1;
    const weightSeed = random() * 0.95;
    // Place in the tow's cross-section: roughly normal, denser at the core.
    const across = Math.max(-1, Math.min(1, (random() + random() + random() - 1.5) * 0.8));
    const ca = Math.cos(angle);
    const sa = Math.sin(angle);
    for (let i = 0; i < points; i++) {
      const t = i / (points - 1);
      woven(t, out);
      const s = (t - 0.5) * length;
      const b = bow * Math.sin(t * Math.PI);
      position[v * 3] = out[0];
      position[v * 3 + 1] = out[1];
      position[v * 3 + 2] = out[2];
      rand[v * 3] = cx + ca * s - sa * b;
      rand[v * 3 + 1] = cy + sa * s + ca * b;
      rand[v * 3 + 2] = cz;
      meta[v * 4] = delay;
      meta[v * 4 + 1] = side;
      meta[v * 4 + 2] = kind;
      meta[v * 4 + 3] = angle;
      tow[v * 2] = t;
      tow[v * 2 + 1] = across;
      seed[v] = weightSeed;
      if (i > 0) {
        index[ii++] = v - 1;
        index[ii++] = v;
      }
      v++;
    }
  };

  const towWarp = (width / warpCount) * 0.6;
  const towWeft = (height / weftCount) * 0.6;
  for (let j = 0; j < warpCount; j++) {
    const x = -width / 2 + (j + 0.5) * (width / warpCount);
    const sign = j % 2 ? -1 : 1;
    for (let f = 0; f < filamentsPerTow; f++) {
      const offset = (f / (filamentsPerTow - 1) - 0.5) * towWarp;
      filament(warpPoints, 0, (t, o) => {
        o[0] = x + offset;
        o[1] = -height / 2 + t * height;
        o[2] = WEAVE_AMPLITUDE * Math.cos(Math.PI * (t * weftCount - 0.5)) * sign;
      });
    }
  }
  for (let k = 0; k < weftCount; k++) {
    const y = -height / 2 + (k + 0.5) * (height / weftCount);
    const sign = k % 2 ? -1 : 1;
    for (let f = 0; f < filamentsPerTow; f++) {
      const offset = (f / (filamentsPerTow - 1) - 0.5) * towWeft;
      filament(weftPoints, 1, (u, o) => {
        o[0] = -width / 2 + u * width;
        o[1] = y + offset;
        o[2] = -WEAVE_AMPLITUDE * Math.cos(Math.PI * (u * warpCount - 0.5)) * sign;
      });
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(position, 3));
  geometry.setAttribute("aRand", new BufferAttribute(rand, 3));
  geometry.setAttribute("aMeta", new BufferAttribute(meta, 4));
  geometry.setAttribute("aTow", new BufferAttribute(tow, 2));
  geometry.setAttribute("aSeed", new BufferAttribute(seed, 1));
  geometry.setIndex(new BufferAttribute(index, 1));
  // One full weave repeat (two threads) each way: shifting by these is seamless.
  return { geometry, repeatX: (2 * width) / warpCount, repeatY: (2 * height) / weftCount };
}


// Critically damped spring toward a moving target (Unity-style SmoothDamp).
function smoothDamp(current: number, target: number, velocity: number, smoothTime: number, dt: number) {
  const omega = 2 / smoothTime;
  const x = omega * dt;
  const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = current - target;
  const temp = (velocity + omega * change) * dt;
  return [target + (change + temp) * decay, (velocity - omega * temp) * decay] as const;
}

let instance: WorldRuntime | null = null;

export function getWorldRuntime(options: Options): WorldRuntime {
  instance ??= createWorldRuntime(options);
  return instance;
}

function createWorldRuntime({ lite, onContextLost }: Options): WorldRuntime {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  let pixelRatio = Math.min(window.devicePixelRatio || 1, lite ? 1.25 : 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;";
  canvas.setAttribute("aria-hidden", "true");

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 400);
  const group = new Group();
  scene.add(group);

  const uniforms = {
    uForm: { value: 0 },
    uBundle: { value: 0 },
    uGlow: { value: 0 },
    uVis: { value: new Vector2(1, 1) },
    uLightPos: { value: new Vector2(0, 0) },
    uShift: { value: new Vector2(0, 0) },
    uSplit: { value: 0 },
    uSplitShift: { value: 1 },
    uTime: { value: 0 },
    uIntro: { value: 0 },
    uCarbon: { value: 1 },
    uGlass: { value: 1 },
    uDensity: { value: 1 },
    uIntensity: { value: 1 },
    uTint: { value: 0 },
    uWarm: { value: 0 },
    uSilver: { value: 0 },
    uInk: { value: 0 },
    uScrim: { value: 1 },
    uResolution: { value: new Vector2(1, 1) },
    uCarbonLo: { value: new Vector3(0.07, 0.075, 0.085) },
    uCarbonHi: { value: new Vector3(0.82, 0.86, 0.9) },
    uGlassLo: { value: new Vector3(0.28, 0.36, 0.46) },
    uGlassHi: { value: new Vector3(0.94, 0.97, 1.0) },
  };
  const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true, depthWrite: false });

  let lines: LineSegments | null = null;
  let builtWidth = 0;
  let builtHeight = 0;
  let baseZ = 10;
  let visibleWidth = 1;
  let repeatX = 1;
  let repeatY = 1;
  let dirty = true;

  // One world unit ≈ PX_PER_UNIT CSS pixels. The fabric is built wide enough
  // for the widest pan and farthest dolly, and only rebuilt when it must grow.
  const layout = (w: number, h: number) => {
    renderer.setSize(w, h, false);
    renderer.getDrawingBufferSize(uniforms.uResolution.value);
    const visibleHeight = h / PX_PER_UNIT;
    visibleWidth = w / PX_PER_UNIT;
    uniforms.uVis.value.set(visibleWidth, visibleHeight);
    camera.aspect = w / h;
    baseZ = visibleHeight / 2 / Math.tan((FOV / 2) * (Math.PI / 180));
    camera.updateProjectionMatrix();
    const needWidth = visibleWidth * 1.9 + 1;
    const needHeight = visibleHeight * 1.7 + 1;
    if (!lines || needWidth > builtWidth || needHeight > builtHeight) {
      builtWidth = needWidth * 1.05;
      builtHeight = needHeight * 1.05;
      const built = buildGeometry(builtWidth, builtHeight, lite);
      const geometry = built.geometry;
      repeatX = built.repeatX;
      repeatY = built.repeatY;
      if (lines) {
        lines.geometry.dispose();
        lines.geometry = geometry;
      } else {
        lines = new LineSegments(geometry, material);
        lines.frustumCulled = false;
        group.add(lines);
      }
    }
    uniforms.uSplitShift.value = builtWidth / 2 + visibleWidth * 0.1;
    dirty = true;
  };

  let host: HTMLElement | null = null;
  let resizeTimer = 0;
  const resizeObserver = new ResizeObserver(() => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (host) layout(Math.max(1, host.clientWidth), Math.max(1, host.clientHeight));
    }, 120);
  });

  let lost = false;
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    lost = true;
    onContextLost();
  });

  let sampler: () => WorldSample = () => ({ state: PRESETS.mat, covered: false });
  const current: WorldState = { ...PRESETS.mat };
  const velocity: Record<string, number> = {};
  for (const key of WORLD_KEYS) velocity[key] = 0;
  let initialised = false;
  let transitUntil = 0;
  let active = true;
  let paused = false;
  let time = 0;
  let lightTime = 0;
  let shiftX = 0;
  let shiftY = 0;
  let lastScroll = window.scrollY;
  let intro = 0;
  let last = performance.now();
  let lastRender = 0;
  const frameTimes: number[] = [];
  let raf = 0;

  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (lost || !host) return;

    const { state: target, covered } = sampler();
    if (!initialised) {
      Object.assign(current, target);
      initialised = true;
    }
    const smoothTime = now < transitUntil ? 0.55 : 0.14;
    let moving = false;
    for (const key of WORLD_KEYS) {
      const [value, vel] = smoothDamp(current[key], target[key], velocity[key], smoothTime, Math.max(dt, 1e-4));
      current[key] = value;
      velocity[key] = vel;
      if (Math.abs(value - target[key]) > 1e-3 || Math.abs(vel) > 1e-3) moving = true;
    }

    const drifting = current.drift > 0.01 && !paused;
    if (drifting) time += dt * current.drift;
    // The light keeps sweeping (slowly) even when the fibers hold still.
    const lightSpeed = Math.max(current.drift, current.glow);
    const glowing = lightSpeed > 0.01 && !paused;
    if (glowing) lightTime += dt * lightSpeed;
    // Woven fabric travel: scroll parallax plus a production-line run,
    // wrapped by whole weave repeats so it never runs out of cloth.
    const scroll = window.scrollY;
    const scrolled = scroll !== lastScroll;
    shiftY = (shiftY + ((scroll - lastScroll) / PX_PER_UNIT) * current.parallax) % repeatY;
    lastScroll = scroll;
    const flowing = Math.abs(current.flow) > 0.001 && !paused;
    if (flowing) shiftX = (shiftX + dt * current.flow) % repeatX;
    const introRunning = intro < 1;
    if (active && !covered) intro = Math.min(1, intro + dt / 1.8);

    const visible = active && !covered && current.intensity > 0.005;
    const scrollMoved = scrolled && current.parallax > 0.001;
    if (!visible || !(moving || drifting || glowing || flowing || scrollMoved || dirty || introRunning)) return;
    // Ambient motion (light, run, drift on light hardware) settles for ~30fps;
    // scroll and camera moves stay at full rate.
    const ambientOnly = !moving && !dirty && !scrollMoved;
    if (ambientOnly && (lite || current.intensity < 0.5) && now - lastRender < 32) return;

    uniforms.uForm.value = current.form;
    uniforms.uBundle.value = current.bundle;
    // Travelling highlight along the tows; a slow point light for the sheen.
    uniforms.uGlow.value = ((lightTime * 0.06) % 1.6) - 0.3;
    uniforms.uLightPos.value.set(
      Math.cos(lightTime * 0.16) * visibleWidth * 0.45 + visibleWidth * 0.15,
      Math.sin(lightTime * 0.11) * uniforms.uVis.value.y * 0.55,
    );
    uniforms.uShift.value.set(shiftX, shiftY);
    uniforms.uSplit.value = current.split;
    uniforms.uCarbon.value = current.carbon;
    uniforms.uGlass.value = current.glass;
    uniforms.uDensity.value = current.density;
    uniforms.uIntensity.value = current.intensity;
    uniforms.uTint.value = current.tint;
    uniforms.uWarm.value = current.warm;
    uniforms.uSilver.value = current.silver;
    uniforms.uInk.value = current.ink;
    uniforms.uScrim.value = current.scrim;
    uniforms.uTime.value = time;
    uniforms.uIntro.value = 1 - Math.pow(1 - intro, 3);
    group.rotation.x = current.tilt;
    camera.position.set(current.pan * visibleWidth, 0, baseZ * current.dolly);

    const start = performance.now();
    renderer.render(scene, camera);
    dirty = false;
    if (lastRender && now - lastRender < 100 && frameTimes.length < 120) {
      frameTimes.push(now - lastRender);
      // Too slow after a short warm-up: drop to 1x pixels.
      if (frameTimes.length === 120 && pixelRatio > 1) {
        const sorted = [...frameTimes].sort((a, b) => a - b);
        if (sorted[60] > 24) {
          pixelRatio = 1;
          renderer.setPixelRatio(1);
          renderer.getDrawingBufferSize(uniforms.uResolution.value);
          if (host) layout(Math.max(1, host.clientWidth), Math.max(1, host.clientHeight));
        }
      }
    }
    lastRender = start;
  };
  raf = requestAnimationFrame(tick);

  return {
    attach(nextHost) {
      if (host === nextHost) return;
      if (host) resizeObserver.unobserve(host);
      host = nextHost;
      nextHost.appendChild(canvas);
      resizeObserver.observe(nextHost);
      layout(Math.max(1, nextHost.clientWidth), Math.max(1, nextHost.clientHeight));
    },
    setSampler(next) {
      sampler = next;
      dirty = true;
    },
    transit() {
      transitUntil = performance.now() + 1300;
    },
    setActive(value) {
      active = value;
      dirty = true;
    },
    setPaused(value) {
      paused = value;
    },
    dispose() {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      lines?.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      instance = null;
    },
  };
}
