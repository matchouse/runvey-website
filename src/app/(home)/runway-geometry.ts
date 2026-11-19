import type { CSSProperties } from "react";

/*
 * A runway drawn in true one-point perspective.
 *
 * Geometry is defined in world units (1 unit = half the runway width, ~22.5 m)
 * and projected with k = NEAR_Z / z, so markings foreshorten the way a real
 * runway does instead of being hand-placed on a flat trapezoid.
 */

export const VIEW_W = 480;
export const VIEW_H = 420;
export const VANISH_X = 192;
export const HORIZON_Y = 22;
export const NEAR_HALF_WIDTH = 168;
export const NEAR_Z = 3;
export const FAR_Z = 140;

export const project = (x: number, z: number) => {
  const k = NEAR_Z / z;
  return {
    x: VANISH_X + x * NEAR_HALF_WIDTH * k,
    y: HORIZON_Y + (VIEW_H - HORIZON_Y) * k,
    k,
  };
};

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Ground-plane rectangle from x1..x2, z1..z2, as an SVG path segment. */
const quad = (x1: number, x2: number, z1: number, z2: number) => {
  const a = project(x1, z1);
  const b = project(x2, z1);
  const c = project(x2, z2);
  const d = project(x1, z2);
  return `M${r1(a.x)} ${r1(a.y)}L${r1(b.x)} ${r1(b.y)}L${r1(c.x)} ${r1(c.y)}L${r1(d.x)} ${r1(d.y)}Z`;
};

const range = (start: number, end: number, step: number) => {
  const out: number[] = [];
  for (let v = start; v <= end; v += step) out.push(v);
  return out;
};

// Surface and painted markings (ICAO proportions, simplified).
export const surface = quad(-1, 1, NEAR_Z * 0.98, FAR_Z);
export const sideStripes = quad(-0.98, -0.94, 3.3, FAR_Z) + quad(0.94, 0.98, 3.3, FAR_Z);
export const pianoKeys = [0.14, 0.34, 0.54, 0.74]
  .flatMap((x) => [quad(x, x + 0.1, 3.5, 4.85), quad(-x - 0.1, -x, 3.5, 4.85)])
  .join("");
export const centerline = range(6.2, FAR_Z - 2, 2.22)
  .map((z) => quad(-0.03, 0.03, z, z + 1.33))
  .join("");
export const aimingPoint = quad(-0.8, -0.44, 21, 23.2) + quad(0.44, 0.8, 21, 23.2);
export const touchdownZone = [
  { z: 10, bars: 3 },
  { z: 16.7, bars: 2 },
  { z: 30, bars: 2 },
  { z: 36.7, bars: 1 },
  { z: 43.4, bars: 1 },
]
  .flatMap(({ z, bars }) =>
    [0.44, 0.58, 0.72]
      .slice(0, bars)
      .flatMap((x) => [quad(x, x + 0.08, z, z + 1), quad(-x - 0.08, -x, z, z + 1)]),
  )
  .join("");

// Lights.
const lightRadius = (k: number, scale: number) => r1(Math.max(0.55, scale * k));

export const edgeLights = range(3.4, FAR_Z, 1.78).flatMap((z) =>
  [-1.06, 1.06].map((x) => {
    const p = project(x, z);
    return { cx: r1(p.x), cy: r1(p.y), r: lightRadius(p.k, 2.2) };
  }),
);

export const thresholdLights = range(-0.95, 0.96, 0.19).map((x) => {
  const p = project(x, 3.22);
  return { cx: r1(p.x), cy: r1(p.y), r: lightRadius(p.k, 2.4) };
});

export const endLights = range(-0.9, 0.91, 0.3).map((x) => {
  const p = project(x, FAR_Z);
  return { cx: r1(p.x), cy: r1(p.y), r: 0.7 };
});

// Deployment stages, placed at depths along the runway.
export const LABEL_X = 350;

const stages = [
  { z: 3.9, name: "Push received", detail: "main · 84f2c1" },
  { z: 9.4, name: "Image built", detail: "38s · 142 MB" },
  { z: 30, name: "Live", detail: "3/3 health checks", live: true },
] as const;

export const stageGeometry = stages.map((stage) => {
  const left = project(-1, stage.z);
  const right = project(1, stage.z);
  return {
    ...stage,
    y: r1(right.y),
    mark: `M${r1(left.x)} ${r1(left.y)}H${r1(right.x)}`,
    leader: `M${r1(right.x + 7)} ${r1(right.y)}H${LABEL_X - 8}`,
  };
});

// The sequenced "rabbit" pulse runs from the threshold to the live stage.
const PULSE_START = 3.6;
const PULSE_END = stages[2].z;
const PULSE_TRAVEL = 2.4; // seconds

export const centerLights = range(PULSE_START, FAR_Z, 1.33).map((z) => {
  const p = project(0, z);
  const pulsed = z <= PULSE_END;
  // Constant ground speed: delay grows linearly with distance.
  const delay = ((z - PULSE_START) / (PULSE_END - PULSE_START)) * PULSE_TRAVEL;
  return {
    cx: r1(p.x),
    cy: r1(p.y),
    r: lightRadius(p.k, 2),
    style: pulsed ? ({ animationDelay: `${delay.toFixed(2)}s` } as CSSProperties) : undefined,
    pulsed,
  };
});

