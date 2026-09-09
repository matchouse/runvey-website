import { ImageResponse } from 'next/og';

export const alt = 'Runvey — Your code, cleared for launch. The open-source path from code to cloud.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: '#090a0a',
          color: '#f5f7f4',
          fontFamily: 'sans-serif',
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <radialGradient id="glow">
              <stop offset="0%" stopColor="#69a7ff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#69a7ff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="runway" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#69a7ff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#69a7ff" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <ellipse cx="1010" cy="310" rx="430" ry="440" fill="url(#glow)" />
          <path d="M48 0V630M1152 0V630M0 174H1200M0 534H1200" stroke="#ffffff" strokeOpacity="0.07" />
          <path d="M830 630 990 182H1028L1188 630" fill="#69a7ff" fillOpacity="0.035" stroke="url(#runway)" strokeWidth="2" />
          <path d="M1009 204V630" stroke="#69a7ff" strokeWidth="4" strokeDasharray="20 24" />
          <path d="M791 630 984 160M1227 630 1034 160" stroke="#69a7ff" strokeOpacity="0.12" />
          <circle cx="1009" cy="161" r="5" fill="#69a7ff" />
          <circle cx="1009" cy="161" r="15" fill="none" stroke="#69a7ff" strokeOpacity="0.25" />
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', padding: '57px 76px', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 17 }}>
            <svg width="54" height="54" viewBox="0 0 44 44">
              <rect x="1" y="1" width="42" height="42" rx="12" fill="#111311" stroke="#343834" strokeWidth="1.5" />
              <path d="M13.25 33.5 18.8 10.5M30.75 33.5 25.2 10.5" fill="none" stroke="#f3f5f3" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M22 32.5V11.5" stroke="#f3f5f3" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" />
            </svg>
            <span style={{ fontSize: 38, fontWeight: 700, letterSpacing: -1.5 }}>Runvey</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 78, fontSize: 72, fontWeight: 700, lineHeight: 1.08, letterSpacing: -3 }}>
            <span>Your code,</span>
            <span>cleared for launch.</span>
          </div>
          <div style={{ display: 'flex', marginTop: 26, color: '#a1a6a2', fontSize: 25 }}>
            The open-source path from code to cloud.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto', color: '#69a7ff', fontSize: 15, letterSpacing: 3 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#69a7ff' }} />
            OPEN SOURCE · SELF-HOSTED
          </div>
        </div>
      </div>
    ),
    size,
  );
}
