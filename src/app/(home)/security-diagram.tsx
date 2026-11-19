import { GitBranch, KeyRound, Lock, Server } from "lucide-react";
import styles from "./home.module.css";

/*
 * Runvey's trust model: agents on your servers dial out to the control plane.
 * Nothing dials in. Arrows point the way connections are opened.
 */

const AGENT_LINKS = [
  "M135 330V262Q135 250 147 250H218Q230 250 230 238V216",
  "M385 330V262Q385 250 373 250H302Q290 250 290 238V216",
];

const servers = [
  { x: 30, name: "prod-1", services: "web · api · worker" },
  { x: 280, name: "prod-2", services: "postgres · redis" },
];

export function SecurityDiagram() {
  return (
    <svg
      className={styles.securityDiagram}
      viewBox="0 0 520 480"
      role="img"
      aria-label="Runvey agents on your servers open outbound connections to the control plane. Your network accepts no inbound connections, and new deployments require a passkey."
    >
      <defs>
        <marker
          id="sd-arrow"
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0L8 4L0 8Z" className={styles.sdArrow} />
        </marker>
      </defs>

      {/* Inputs */}
      <g>
        <rect className={styles.sdNode} x="20" y="20" width="210" height="60" rx="8" />
        <GitBranch className={styles.sdIcon} x={36} y={34} size={16} />
        <text className={styles.sdTitle} x="62" y="46">
          Git provider
        </text>
        <text className={styles.sdSub} x="62" y="64">
          acme/web · main
        </text>
      </g>
      <g>
        <rect className={styles.sdNode} x="290" y="20" width="210" height="60" rx="8" />
        <KeyRound className={styles.sdIcon} x={306} y={34} size={16} />
        <text className={styles.sdTitle} x="332" y="46">
          Your device
        </text>
        <text className={styles.sdSub} x="332" y="64">
          passkey
        </text>
      </g>

      <path
        className={styles.sdEdge}
        d="M125 80V118Q125 130 137 130H228Q240 130 240 142V148"
        markerEnd="url(#sd-arrow)"
      />
      <text className={styles.sdLabel} x="133" y="108">
        on push
      </text>
      <path
        className={styles.sdEdge}
        d="M395 80V118Q395 130 383 130H292Q280 130 280 142V148"
        markerEnd="url(#sd-arrow)"
      />
      <text className={styles.sdLabel} x="403" y="108">
        approve deploy
      </text>

      {/* Control plane */}
      <rect className={`${styles.sdNode} ${styles.sdNodeCore}`} x="140" y="150" width="240" height="64" rx="8" />
      <text className={styles.sdTitle} x="260" y="178" textAnchor="middle">
        Runvey control plane
      </text>
      <text className={styles.sdSub} x="260" y="197" textAnchor="middle">
        builds · releases · state
      </text>

      {/* Agent connections: always opened from the server side */}
      {AGENT_LINKS.map((d) => (
        <g key={d}>
          <path className={styles.sdEdge} d={d} markerEnd="url(#sd-arrow)" />
          <path className={styles.sdFlow} d={d} />
        </g>
      ))}
      <text className={styles.sdLabel} x="147" y="242">
        outbound · 443
      </text>
      <text className={styles.sdLabel} x="373" y="242" textAnchor="end">
        outbound · 443
      </text>

      {/* Your network */}
      <rect className={styles.sdBoundary} x="10" y="270" width="500" height="196" rx="12" />
      {servers.map((s) => (
        <g key={s.name}>
          <rect className={styles.sdNode} x={s.x} y="330" width="210" height="100" rx="8" />
          <Server className={styles.sdIcon} x={s.x + 16} y={346} size={16} />
          <text className={styles.sdTitle} x={s.x + 42} y="359">
            {s.name}
          </text>
          <circle className={styles.sdDot} cx={s.x + 192} cy="355" r="3.5" />
          <text className={styles.sdSub} x={s.x + 16} y="390">
            Runvey agent
          </text>
          <text className={styles.sdSubFaint} x={s.x + 16} y="410">
            {s.services}
          </text>
        </g>
      ))}
      <text className={styles.sdLabel} x="26" y="454">
        Your network
      </text>
      <Lock className={styles.sdIcon} x={374} y={444} size={12} />
      <text className={styles.sdLabel} x="494" y="454" textAnchor="end">
        no inbound ports
      </text>
    </svg>
  );
}
