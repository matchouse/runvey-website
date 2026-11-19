import styles from "./home.module.css";

const BRANCH = "M210 104C244 104 244 46 278 46H368C402 46 402 104 436 104";

export function DeployVisual() {
  return (
    <div className={styles.deployVisual} aria-hidden="true">
      <svg className={styles.deployGraph} viewBox="0 0 520 132">
        <path className={styles.graphMain} d="M0 104H436" />
        <path className={styles.graphFuture} d="M436 104H520" />
        <path className={styles.graphBranch} d={BRANCH} />
        <path className={styles.graphTravel} d={BRANCH} pathLength={100} />

        {[40, 125, 210].map((x) => (
          <circle key={x} className={styles.graphCommit} cx={x} cy={104} r={4.5} />
        ))}
        {[300, 346].map((x) => (
          <circle key={x} className={styles.graphCommit} cx={x} cy={46} r={4.5} />
        ))}

        <circle className={styles.graphPulse} cx={436} cy={104} r={6} />
        <circle className={styles.graphHead} cx={436} cy={104} r={6} />

        <text className={styles.graphLabel} x={0} y={126}>
          main
        </text>
        <text className={styles.graphLabel} x={278} y={28}>
          feat/invoices
        </text>
      </svg>

      <div className={styles.commitVisual}>
        <span className={styles.commitStatus} />
        <span className={styles.commitBody}>
          <strong>Add usage-based invoices</strong>
          <small>7c41e0a · main · pushed 18s ago</small>
        </span>
        <span className={styles.commitState}>
          <em>Building</em>
          <em>Ready</em>
        </span>
      </div>
    </div>
  );
}
