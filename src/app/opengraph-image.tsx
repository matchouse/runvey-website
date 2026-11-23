import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import {
  LABEL_X,
  VIEW_H,
  VIEW_W,
  aimingPoint,
  centerLights,
  centerline,
  edgeLights,
  endLights,
  pianoKeys,
  sideStripes,
  stageGeometry,
  surface,
  thresholdLights,
  touchdownZone,
} from "./(home)/runway-geometry";

export const alt =
  "Runvey: Push code. Watch it take off. Open-source deployments from Git push to production.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const C = {
  canvas: "#090a0a",
  ink: "#f5f7f4",
  muted: "#a1a6a2",
  faint: "#5e655f",
  signal: "#69a7ff",
  asphalt: "#1b1e20",
  paint: "rgba(236, 240, 238, 0.34)",
  paintBold: "rgba(236, 240, 238, 0.5)",
  edgeLight: "#f4e3c1",
  stageLine: "rgba(255, 255, 255, 0.22)",
};

// The runway sits bottom-right, drawn from the same geometry as the homepage hero.
const RUNWAY_W = 600;
const SCALE = RUNWAY_W / VIEW_W;
const RUNWAY_H = VIEW_H * SCALE;
const RUNWAY_LEFT = 576;
const RUNWAY_TOP = 630 - RUNWAY_H;

const font = (file: string) => readFile(join(process.cwd(), "src/assets/fonts", file));

export default async function OpenGraphImage() {
  const [manropeMedium, manropeSemi, figtree, mono] = await Promise.all([
    font("Manrope-Medium.ttf"),
    font("Manrope-SemiBold.ttf"),
    font("Figtree-650.ttf"),
    font("GeistMono-Medium.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          background: C.canvas,
          color: C.ink,
          fontFamily: "Manrope",
        }}
      >
        {/* Background: faint grid fading down, soft glow behind the runway */}
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#2a4a7a" stopOpacity="0.45" />
              <stop offset="1" stopColor="#2a4a7a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="1" />
              <stop offset="0.8" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
              <path d="M72 0H0V72" fill="none" stroke="#ffffff" strokeOpacity="0.035" />
            </pattern>
            <mask id="gridMask">
              <rect width="1200" height="630" fill="url(#gridFade)" />
            </mask>
          </defs>
          <rect width="1200" height="630" fill="url(#grid)" mask="url(#gridMask)" />
          <ellipse cx="840" cy="250" rx="420" ry="300" fill="url(#glow)" />
        </svg>

        {/* Runway */}
        <svg
          width={RUNWAY_W}
          height={RUNWAY_H}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          style={{ position: "absolute", left: RUNWAY_LEFT, top: RUNWAY_TOP }}
        >
          <defs>
            <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.12" stopColor="#fff" stopOpacity="0.35" />
              <stop offset="0.55" stopColor="#fff" stopOpacity="1" />
            </linearGradient>
            <mask id="runwayMask" maskUnits="userSpaceOnUse">
              <rect width={VIEW_W} height={VIEW_H} fill="url(#fade)" />
            </mask>
          </defs>
          <g mask="url(#runwayMask)">
            <path d={surface} fill={C.asphalt} />
            <path d={sideStripes + centerline + touchdownZone} fill={C.paint} />
            <path d={pianoKeys + aimingPoint} fill={C.paintBold} />
            {edgeLights.map((l) => (
              <circle key={`e${l.cx}-${l.cy}`} cx={l.cx} cy={l.cy} r={l.r} fill={C.edgeLight} />
            ))}
            {endLights.map((l) => (
              <circle key={`x${l.cx}`} cx={l.cx} cy={l.cy} r={l.r} fill="#f87171" />
            ))}
            {centerLights.map((l) => (
              <circle
                key={`c${l.cy}`}
                cx={l.cx}
                cy={l.cy}
                r={l.r}
                fill={l.pulsed ? C.signal : C.paint}
                fillOpacity={l.pulsed ? 0.9 : 1}
              />
            ))}
          </g>
          {thresholdLights.map((l) => (
            <circle key={`t${l.cx}`} cx={l.cx} cy={l.cy} r={l.r} fill="#4ade80" />
          ))}
          {stageGeometry.map((s) => {
            const live = "live" in s;
            const stroke = live ? C.signal : C.stageLine;
            return (
              <g key={s.name}>
                <path d={s.mark} stroke={stroke} strokeWidth={live ? 1.5 : 1} />
                <path d={s.leader} stroke={stroke} strokeWidth={1} strokeDasharray="2 3" />
              </g>
            );
          })}
        </svg>

        {/* Stage labels */}
        {stageGeometry.map((s, i) => {
          const live = "live" in s;
          return (
            <div
              key={s.name}
              style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                left: RUNWAY_LEFT + LABEL_X * SCALE,
                top: RUNWAY_TOP + s.y * SCALE - 13,
                gap: 5,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "Geist Mono", fontSize: 12, color: C.faint }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: live ? C.signal : "#d9ddd9",
                  }}
                >
                  {s.name}
                </span>
              </div>
              <span style={{ marginLeft: 23, fontFamily: "Geist Mono", fontSize: 13, color: C.faint }}>
                {s.detail}
              </span>
            </div>
          );
        })}

        {/* Copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: "100%",
            padding: "64px 72px 60px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="48" height="48" viewBox="0 0 44 44">
              <rect x="1" y="1" width="42" height="42" rx="12" fill="#111311" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              <path d="M13.25 33.5 18.8 10.5M30.75 33.5 25.2 10.5" fill="none" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round" />
              <path d="M22 32.5V11.5" stroke={C.ink} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="3 4" />
            </svg>
            <span style={{ fontFamily: "Figtree", fontSize: 34, fontWeight: 600, letterSpacing: -1.53 }}>
              Runvey
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 96,
              fontSize: 76,
              fontWeight: 500,
              letterSpacing: -4.6,
              lineHeight: 1,
            }}
          >
            <span>Push code.</span>
            <span
              style={{
                marginTop: 4,
                color: "transparent",
                backgroundImage: "linear-gradient(108deg, #f4f7f2 10%, #aab1aa 48%, #5f655f 105%)",
                backgroundClip: "text",
              }}
            >
              Watch it take off.
            </span>
          </div>

          <span
            style={{
              marginTop: 30,
              width: 470,
              color: C.muted,
              fontSize: 24,
              lineHeight: 1.45,
              letterSpacing: -0.4,
            }}
          >
            Open-source deployments, from Git push to production.
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: "auto",
              fontFamily: "Geist Mono",
              fontSize: 14,
              letterSpacing: 2,
              color: C.muted,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: 4, background: C.signal }} />
            <span style={{ color: C.signal }}>EARLY ACCESS 2027</span>
            <span style={{ color: C.faint }}>·</span>
            <span>RUNVEY.IO</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: manropeMedium, weight: 500, style: "normal" },
        { name: "Manrope", data: manropeSemi, weight: 600, style: "normal" },
        // Static Figtree instance at weight 650, matching .brandName on the site.
        { name: "Figtree", data: figtree, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
