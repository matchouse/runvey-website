"use client";

import { useAnimationFrame, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import styles from "./roadmap.module.css";

/*
 * Side-view flight between roadmap stages, on a loop.
 *
 * Each leg is a full profile driven by distance along the ground:
 * takeoff roll → rotation on the main gear → liftoff → gear up → climb →
 * cruise → descent (gear down, landing light on) → flare → touchdown →
 * rollout to a stop, then a short wait on the runway before the next leg.
 */

type Stage = {
  period: string;
  title: string;
  status: "done" | "now" | "next" | "later";
};

const W = 1200;
const GROUND = 150;
const MARGIN = 120;
const RUNWAY_HALF = 64;
const CRUISE = 84; // altitude in viewBox units
const TOP = GROUND - CRUISE - 44;
const BOTTOM = GROUND + 74;
const PLANE_SCALE = 1.3;

const LEG_MS = 5600;
const DWELL_MS = 1500;
const FADE_MS = 500;

const smooth = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

export function FlightHero({ stages }: { stages: Stage[] }) {
  const reduced = useReducedMotion();
  const plane = useRef<SVGGElement>(null);
  const gear = useRef<SVGGElement>(null);
  const beam = useRef<SVGPathElement>(null);
  const shadow = useRef<SVGEllipseElement>(null);

  const n = stages.length;
  const portX = stages.map(
    (_, i) => MARGIN + (i * (W - 2 * MARGIN)) / Math.max(1, n - 1),
  );
  const legs = Math.max(1, n - 1);
  const cycle = legs * (LEG_MS + DWELL_MS) + DWELL_MS + FADE_MS * 2;
  const nowIndex = Math.max(
    0,
    stages.findIndex((s) => s.status === "now"),
  );

  /** Altitude, pitch (deg, nose up positive) and gear state at distance u along a leg of length d. */
  const profile = (u: number, d: number) => {
    const lift = RUNWAY_HALF;
    const touch = d - RUNWAY_HALF;
    const toc = lift + (d - 2 * RUNWAY_HALF) * 0.32;
    const tod = touch - (d - 2 * RUNWAY_HALF) * 0.36;

    let alt = 0;
    if (u > lift && u < toc) alt = CRUISE * smooth((u - lift) / (toc - lift));
    else if (u >= toc && u <= tod) alt = CRUISE;
    else if (u > tod && u < touch)
      alt = CRUISE * smooth((touch - u) / (touch - tod));

    // Pitch follows how an airliner is actually flown, not the path's slope:
    // ~9° rotation on the runway, ~14° climb attitude, level in cruise,
    // slightly nose-up on the approach, then a flare just before touchdown.
    let pitch = 0;
    if (u > lift - 26 && u <= lift) {
      pitch = 9 * smooth((u - (lift - 26)) / 26);
    } else if (u > lift && u < toc) {
      const t = (u - lift) / (toc - lift);
      pitch = 9 + 5 * smooth(t / 0.25) - 14 * smooth((t - 0.62) / 0.38);
    } else if (u > tod && u < touch) {
      const t = (u - tod) / (touch - tod);
      pitch = 1.5 * smooth(t / 0.3) + 3.5 * smooth((t - 0.8) / 0.2); // approach, then flare
    } else if (u >= touch && u < touch + 18) {
      pitch = 5 * (1 - smooth((u - touch) / 18)); // nose wheel comes down
    }

    const gearDown = u < lift + 34 || u > touch - 70;
    const landingLight = u < lift + 40 || u > touch - 110 ? 1 : 0;
    return { alt, pitch, gearDown, landingLight };
  };

  const render = (
    x: number,
    alt: number,
    pitch: number,
    gearDown: boolean,
    light: number,
    opacity: number,
  ) => {
    const y = GROUND - alt;
    plane.current?.setAttribute(
      "transform",
      `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${(-pitch).toFixed(2)}) scale(${PLANE_SCALE})`,
    );
    plane.current?.setAttribute("opacity", opacity.toFixed(3));
    gear.current?.setAttribute("opacity", gearDown ? "1" : "0");
    beam.current?.setAttribute("opacity", (light * 0.9 * opacity).toFixed(3));
    const a = alt / CRUISE;
    if (shadow.current) {
      shadow.current.setAttribute("cx", (x - 2 + alt * 0.35).toFixed(2));
      shadow.current.setAttribute("rx", (26 * (1 - 0.45 * a)).toFixed(2));
      shadow.current.setAttribute(
        "opacity",
        ((0.55 - 0.45 * a) * opacity).toFixed(3),
      );
    }
  };

  useAnimationFrame((time) => {
    if (!plane.current) return;
    if (reduced) {
      render(portX[nowIndex], 0, 0, true, 0, 1);
      return;
    }
    let t = time % cycle;

    // Fade in at the first stage.
    if (t < FADE_MS) return render(portX[0], 0, 0, true, 0, t / FADE_MS);
    t -= FADE_MS;

    for (let i = 0; i < legs; i++) {
      if (t < DWELL_MS) return render(portX[i], 0, 0, true, 0, 1);
      t -= DWELL_MS;
      if (t < LEG_MS) {
        const d = portX[i + 1] - portX[i];
        const u = d * easeInOutSine(t / LEG_MS);
        const p = profile(u, d);
        return render(
          portX[i] + u,
          p.alt,
          p.pitch,
          p.gearDown,
          p.landingLight,
          1,
        );
      }
      t -= LEG_MS;
    }

    // Parked at the last stage, then fade out before the loop restarts.
    const last = portX[n - 1];
    if (t < DWELL_MS) return render(last, 0, 0, true, 0, 1);
    t -= DWELL_MS;
    render(last, 0, 0, true, 0, Math.max(0, 1 - t / FADE_MS));
  });

  return (
    <div className={styles.hero} aria-hidden="true">
      <svg className={styles.heroSvg} viewBox={`0 ${TOP} ${W} ${BOTTOM - TOP}`}>
        <defs>
          <linearGradient id="fh-beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff4d6" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff4d6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fh-ground" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="currentColor" stopOpacity="0" />
            <stop offset="0.08" stopColor="currentColor" stopOpacity="1" />
            <stop offset="0.92" stopColor="currentColor" stopOpacity="1" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Planned route between stages */}
        {portX.slice(0, -1).map((x, i) => {
          const d = portX[i + 1] - x;
          const pts: string[] = [];
          for (let u = RUNWAY_HALF; u <= d - RUNWAY_HALF; u += 4) {
            pts.push(
              `${(x + u).toFixed(1)} ${(GROUND - profile(u, d).alt).toFixed(1)}`,
            );
          }
          return (
            <path
              key={x}
              className={styles.heroRoute}
              d={`M${pts.join("L")}`}
            />
          );
        })}

        {/* Ground */}
        <rect
          className={styles.heroGround}
          x="0"
          y={GROUND}
          width={W}
          height="1"
          fill="url(#fh-ground)"
        />

        {/* Runways */}
        {stages.map((s, i) => {
          const x = portX[i];
          return (
            <g key={s.title} className={styles.heroPort} data-status={s.status}>
              <rect
                className={styles.heroRunway}
                x={x - RUNWAY_HALF - 8}
                y={GROUND}
                width={(RUNWAY_HALF + 8) * 2}
                height="5"
                rx="1"
              />
              <path
                className={styles.heroCenterline}
                d={`M${x - RUNWAY_HALF} ${GROUND + 2.5}H${x + RUNWAY_HALF}`}
              />
              {Array.from({ length: 9 }, (_, k) => (
                <circle
                  key={k}
                  className={styles.heroEdgeLight}
                  cx={x - RUNWAY_HALF - 4 + k * ((RUNWAY_HALF * 2 + 8) / 8)}
                  cy={GROUND - 1}
                  r="1.6"
                />
              ))}
              <text
                className={styles.heroPeriod}
                x={x}
                y={GROUND + 40}
                textAnchor="middle"
              >
                {s.period}
              </text>
              <text
                className={styles.heroTitle}
                x={x}
                y={GROUND + 64}
                textAnchor="middle"
              >
                {s.title}
              </text>
            </g>
          );
        })}

        {/* Shadow on the ground */}
        <ellipse
          ref={shadow}
          className={styles.heroShadow}
          cx={portX[0]}
          cy={GROUND + 1.5}
          rx="26"
          ry="2.6"
        />

        {/* Aircraft: origin at the main gear contact point, nose to the right */}
        <g
          ref={plane}
          transform={`translate(${portX[0]} ${GROUND}) scale(${PLANE_SCALE})`}
        >
          <path
            ref={beam}
            className={styles.heroBeam}
            d="M26 -9 L120 -3 L120 16 Z"
            fill="url(#fh-beam)"
            opacity="0"
          />
          <g ref={gear} className={styles.heroGear}>
            <path d="M-4 -7V-2.4M18 -7V-2.4" />
            <circle cx="-4" cy="-1.7" r="1.7" />
            <circle cx="18" cy="-1.7" r="1.5" />
          </g>
          <g className={styles.heroAircraft}>
            {/* Vertical and horizontal stabilisers */}
            <path d="M-31 -13 L-38 -28 H-33 L-21 -14 Z" />
            <path d="M-35 -10.5 L-41 -13 H-37.5 L-29 -10.5 Z" />
            {/* Fuselage */}
            <path d="M-36 -10 C-36 -12.6 -33 -15 -27 -15 H13 C20 -15 25 -12.5 28 -9.8 C25.5 -7.4 21 -6.4 14 -6.4 H-27 C-32 -6.4 -36 -7.6 -36 -10 Z" />
            {/* Wing (seen edge-on, swept) and engine */}
            <path d="M-2 -8.5 L-16 -3.4 H-11.5 L7 -8.5 Z" />
            <rect x="-3" y="-7.6" width="11" height="4.2" rx="2.1" />
          </g>
          {/* Windows */}
          <path className={styles.heroWindows} d="M-22 -11.6H10" />
          <path
            className={styles.heroCockpit}
            d="M19.2 -12.6 L24.2 -11.2 L23.4 -10 L18.6 -10.6 Z"
          />
          {/* Lights: starboard (green) faces the viewer, tail white, beacon red */}
          <circle
            className={styles.heroNavGreen}
            cx="-13.6"
            cy="-3.8"
            r="1.3"
          />
          <circle
            className={styles.heroTailLight}
            cx="-36.6"
            cy="-10"
            r="1.1"
          />
          <circle className={styles.heroBeacon} cx="-6" cy="-15.6" r="1.3" />
          <circle className={styles.heroStrobe} cx="-13.6" cy="-3.8" r="2.4" />
        </g>
      </svg>
    </div>
  );
}
