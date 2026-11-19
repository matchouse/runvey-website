"use client";

import { useAnimationFrame, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import styles from "./home.module.css";
import {
  HORIZON_Y,
  NEAR_HALF_WIDTH,
  NEAR_Z,
  VANISH_X,
} from "./runway-geometry";

/*
 * An airliner taking off down the hero runway, seen from behind.
 *
 * It uses the runway's own camera: world units (1 = half the runway width,
 * ~22.5 m), projected with k = NEAR_Z / z. The camera sits CAM_H units above
 * the ground, so a climbing aircraft first closes on the horizon and then rises
 * above it as it gets higher than the viewer, as it would in reality.
 *
 * Sequence: line up → takeoff roll (constant acceleration) → rotation and
 * liftoff at the "Live" mark → gear up → climb-out → fade into the distance.
 */

const CAM_H = (420 - HORIZON_Y) / NEAR_HALF_WIDTH; // ≈ 2.37 units ≈ 53 m

const Z_LINEUP = 6;
const Z_LIFTOFF = 30; // the "Live" stage
const T_FADE_IN = 0.6;
const T_HOLD = 1.1;
const T_ROLL = 3.4;
const T_CLIMB = 5.4;
const T_PAUSE = 1.6;
const CYCLE = T_FADE_IN + T_HOLD + T_ROLL + T_CLIMB + T_PAUSE;

const ACCEL = (2 * (Z_LIFTOFF - Z_LINEUP)) / (T_ROLL * T_ROLL);
const V_LIFTOFF = ACCEL * T_ROLL;

const smooth = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};

type State = {
  z: number;
  h: number;
  gear: number;
  opacity: number;
  strobeOn: boolean;
};

function stateAt(time: number): State {
  let t = time % CYCLE;
  const strobePhase = (time % 1.5) / 1.5;
  const strobeOn =
    strobePhase < 0.04 || (strobePhase > 0.09 && strobePhase < 0.13);

  if (t < T_FADE_IN)
    return { z: Z_LINEUP, h: 0, gear: 1, opacity: t / T_FADE_IN, strobeOn };
  t -= T_FADE_IN;
  if (t < T_HOLD) return { z: Z_LINEUP, h: 0, gear: 1, opacity: 1, strobeOn };
  t -= T_HOLD;
  if (t < T_ROLL) {
    return {
      z: Z_LINEUP + 0.5 * ACCEL * t * t,
      h: 0,
      gear: 1,
      opacity: 1,
      strobeOn,
    };
  }
  t -= T_ROLL;
  if (t < T_CLIMB) {
    const z = Z_LIFTOFF + V_LIFTOFF * t + 0.5 * 1.6 * t * t;
    // Climb rate builds up after rotation instead of jumping off the runway.
    const h = 1.85 * (t - 0.8 * (1 - Math.exp(-t / 0.8)));
    const gear = 1 - smooth((t - 1) / 0.6);
    const opacity = 1 - smooth((t - (T_CLIMB - 1.2)) / 1.2);
    return { z, h, gear, opacity, strobeOn };
  }
  return { z: Z_LINEUP, h: 0, gear: 1, opacity: 0, strobeOn };
}

const RESTING: State = {
  z: Z_LINEUP,
  h: 0,
  gear: 1,
  opacity: 1,
  strobeOn: false,
};

export function TakeoffPlane() {
  const reduced = useReducedMotion();
  const root = useRef<SVGGElement>(null);
  const body = useRef<SVGGElement>(null);
  const gear = useRef<SVGGElement>(null);
  const shadow = useRef<SVGEllipseElement>(null);
  const pool = useRef<SVGEllipseElement>(null);
  const navL = useRef<SVGCircleElement>(null);
  const navR = useRef<SVGCircleElement>(null);
  const strobeL = useRef<SVGCircleElement>(null);
  const strobeR = useRef<SVGCircleElement>(null);
  const beacon = useRef<SVGCircleElement>(null);
  const tail = useRef<SVGCircleElement>(null);

  const apply = (s: State, time: number) => {
    const k = NEAR_Z / s.z;
    const unit = NEAR_HALF_WIDTH * k; // px per world unit at this distance
    const groundY = HORIZON_Y + unit * CAM_H;
    const y = groundY - s.h * unit;
    const x = VANISH_X;

    root.current?.setAttribute("opacity", s.opacity.toFixed(3));
    body.current?.setAttribute(
      "transform",
      `translate(${x} ${y.toFixed(2)}) scale(${unit.toFixed(3)})`,
    );
    gear.current?.setAttribute(
      "transform",
      `translate(0 ${GEAR_TOP}) scale(1 ${s.gear.toFixed(3)}) translate(0 ${-GEAR_TOP})`,
    );

    // Shadow stays on the runway and fades as the aircraft climbs.
    if (shadow.current) {
      shadow.current.setAttribute("cx", String(x));
      shadow.current.setAttribute("cy", groundY.toFixed(2));
      shadow.current.setAttribute("rx", (0.78 * unit).toFixed(2));
      shadow.current.setAttribute("ry", (0.05 * unit).toFixed(2));
      shadow.current.setAttribute(
        "opacity",
        (0.4 * (1 - smooth(s.h / 1.4))).toFixed(3),
      );
    }

    // Landing lights pool on the runway ahead while on or near the ground.
    if (pool.current) {
      const kAhead = NEAR_Z / (s.z + 6);
      const uAhead = NEAR_HALF_WIDTH * kAhead;
      pool.current.setAttribute("cx", String(x));
      pool.current.setAttribute("cy", (HORIZON_Y + uAhead * CAM_H).toFixed(2));
      pool.current.setAttribute("rx", (0.55 * uAhead).toFixed(2));
      pool.current.setAttribute("ry", (0.16 * uAhead).toFixed(2));
      pool.current.setAttribute(
        "opacity",
        (0.55 * (1 - smooth(s.h / 1))).toFixed(3),
      );
    }

    // Lights are drawn in screen space so they stay visible as the aircraft shrinks.
    const lr = Math.max(0.8, 0.012 * unit);
    const place = (
      el: SVGCircleElement | null,
      wx: number,
      wy: number,
      r: number,
    ) => {
      if (!el) return;
      el.setAttribute("cx", (x + wx * unit).toFixed(2));
      el.setAttribute("cy", (y - wy * unit).toFixed(2));
      el.setAttribute("r", r.toFixed(2));
    };
    place(navL.current, -0.797, 0.17, lr);
    place(navR.current, 0.797, 0.17, lr);
    place(strobeL.current, -0.797, 0.17, lr * 1.9);
    place(strobeR.current, 0.797, 0.17, lr * 1.9);
    place(beacon.current, 0, 0.258, lr);
    place(tail.current, 0, 0.19, lr * 0.75);
    const strobe = s.strobeOn ? "1" : "0";
    strobeL.current?.setAttribute("opacity", strobe);
    strobeR.current?.setAttribute("opacity", strobe);
    beacon.current?.setAttribute("opacity", time % 1.2 < 0.6 ? "1" : "0.2");
  };

  useAnimationFrame((ms) => {
    const time = ms / 1000;
    apply(reduced ? RESTING : stateAt(time), reduced ? 0 : time);
  });

  return (
    <g ref={root} className={styles.takeoff} opacity="0">
      <defs>
        <linearGradient id="takeoff-fuselage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#f3f5f6" />
          <stop offset="1" stopColor="#b9c0c4" />
        </linearGradient>
        <linearGradient id="takeoff-nacelle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c3c9cd" />
        </linearGradient>
        <linearGradient id="takeoff-fin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e4e8ea" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d3d8db" />
        </linearGradient>
        <radialGradient id="takeoff-pool">
          <stop offset="0" stopColor="#fff2cf" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff2cf" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse ref={pool} fill="url(#takeoff-pool)" />
      <ellipse ref={shadow} className={styles.takeoffShadow} />

      {/* Rear view in world units, y up (drawn with negative y). */}
      <g ref={body}>
        <Airliner gearRef={gear} />
      </g>

      <circle ref={tail} className={styles.takeoffTailLight} />
      <circle ref={navL} className={styles.takeoffNavRed} />
      <circle ref={navR} className={styles.takeoffNavGreen} />
      <circle ref={beacon} className={styles.takeoffBeacon} />
      <circle ref={strobeL} className={styles.takeoffStrobe} opacity="0" />
      <circle ref={strobeR} className={styles.takeoffStrobe} opacity="0" />
    </g>
  );
}

/** Gear pivots about the wheel-well line, so it folds up into the aircraft. */
const GEAR_TOP = -0.1;

/*
 * Airbus A320-family proportions, seen from directly behind, in world units
 * (1 unit ≈ 22.5 m). Span 35.8 m, fuselage Ø 4 m, tail height 11.8 m,
 * engine nacelle Ø 2.4 m, main gear track 7.6 m.
 */
function Airliner({ gearRef }: { gearRef: React.Ref<SVGGElement> }) {
  const sides = [-1, 1] as const;
  return (
    <>
      {/* Landing gear: twin-wheel mains under the wing roots, nose gear further forward */}
      <g ref={gearRef}>
        {sides.map((s) => (
          <g key={s} transform={`scale(${s} 1)`}>
            <rect
              className={styles.takeoffStrut}
              x="-0.174"
              y="-0.105"
              width="0.01"
              height="0.075"
            />
            <rect
              className={styles.takeoffStrut}
              x="-0.15"
              y="-0.105"
              width="0.006"
              height="0.05"
            />
            <rect
              className={styles.takeoffTyre}
              x="-0.198"
              y="-0.052"
              width="0.022"
              height="0.052"
              rx="0.008"
            />
            <rect
              className={styles.takeoffTyre}
              x="-0.162"
              y="-0.052"
              width="0.022"
              height="0.052"
              rx="0.008"
            />
          </g>
        ))}
        <rect
          className={styles.takeoffStrut}
          x="-0.004"
          y="-0.075"
          width="0.008"
          height="0.045"
        />
        <rect
          className={styles.takeoffTyre}
          x="-0.022"
          y="-0.034"
          width="0.016"
          height="0.034"
          rx="0.006"
        />
        <rect
          className={styles.takeoffTyre}
          x="0.006"
          y="-0.034"
          width="0.016"
          height="0.034"
          rx="0.006"
        />
      </g>

      {/* Engines sit forward of and below the wing, so the wing overlaps them from behind */}
      {sides.map((s) => (
        <g key={s} transform={`scale(${s} 1)`}>
          <circle
            cx="-0.255"
            cy="-0.078"
            r="0.054"
            fill="url(#takeoff-nacelle)"
            className={styles.takeoffOutline}
          />
          <circle
            className={styles.takeoffFanExhaust}
            cx="-0.255"
            cy="-0.078"
            r="0.041"
          />
          <circle
            className={styles.takeoffCore}
            cx="-0.255"
            cy="-0.078"
            r="0.024"
          />
          <circle
            className={styles.takeoffPlug}
            cx="-0.255"
            cy="-0.078"
            r="0.011"
          />
        </g>
      ))}

      {/* Fuselage cross-section */}
      <ellipse
        cx="0"
        cy="-0.162"
        rx="0.088"
        ry="0.092"
        fill="url(#takeoff-fuselage)"
        className={styles.takeoffOutline}
      />
      {/* Wing-to-body fairing */}
      <ellipse
        className={styles.takeoffFairing}
        cx="0"
        cy="-0.098"
        rx="0.098"
        ry="0.03"
      />

      {/* Wings: thick at the root, thin at the tip, 5° dihedral, flap line, sharklets */}
      {sides.map((s) => (
        <g key={s} transform={`scale(${s} 1)`}>
          <path
            className={styles.takeoffWingTop}
            d="M-0.07 -0.124L-0.792 -0.174L-0.792 -0.166L-0.07 -0.098Z"
          />
          <path
            className={styles.takeoffFlap}
            d="M-0.075 -0.101L-0.79 -0.167L-0.79 -0.164L-0.075 -0.094Z"
          />
          <path
            className={styles.takeoffWingTop}
            d="M-0.787 -0.168L-0.801 -0.246L-0.809 -0.245L-0.797 -0.166Z"
          />
        </g>
      ))}

      {/* Horizontal stabiliser on the tail cone, with dihedral */}
      {sides.map((s) => (
        <path
          key={s}
          transform={`scale(${s} 1)`}
          className={styles.takeoffWingTop}
          d="M-0.02 -0.204L-0.277 -0.232L-0.277 -0.226L-0.02 -0.19Z"
        />
      ))}

      {/* Fin, tapering towards the top */}
      <path
        d="M-0.017 -0.238L-0.006 -0.522H0.006L0.017 -0.238Z"
        fill="url(#takeoff-fin)"
        className={styles.takeoffOutline}
      />

      {/* Tail cone with APU exhaust */}
      <ellipse
        className={styles.takeoffTailCone}
        cx="0"
        cy="-0.19"
        rx="0.03"
        ry="0.027"
      />
      <circle className={styles.takeoffCore} cx="0" cy="-0.19" r="0.011" />
    </>
  );
}
