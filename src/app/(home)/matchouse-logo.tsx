import { Space_Grotesk } from "next/font/google";

// Matchouse's display face; only used for this wordmark.
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: "700" });

/*
 * Matchouse logo: the Fourfold symbol plus wordmark, matching
 * next-matchouse-website (public/icon.svg + the footer lockup).
 * The wordmark takes currentColor so it works in both themes.
 */
export function MatchouseLogo({ className }: { className?: string }) {
  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: 2 }}
      role="img"
      aria-label="Matchouse"
    >
      <svg width="1.35em" height="1.35em" viewBox="0 0 32 32" aria-hidden="true">
        <g fill="#4F44E0">
          <rect x="10.6" y="4.7" width="10.8" height="6.3" rx="2.35" />
          <rect x="21" y="10.6" width="6.3" height="10.8" rx="2.35" />
          <rect x="10.6" y="21" width="10.8" height="6.3" rx="2.35" />
          <rect x="4.7" y="10.6" width="6.3" height="10.8" rx="2.35" />
        </g>
      </svg>
      <span
        className={spaceGrotesk.className}
        style={{ fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1 }}
        aria-hidden="true"
      >
        Matchouse
      </span>
    </span>
  );
}
