import Link from "next/link";
import styles from "./home.module.css";

export function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        stroke="none"
        d="M12 2.5a9.7 9.7 0 0 0-3.07 18.9c.48.09.66-.2.66-.46v-1.7c-2.69.58-3.26-1.14-3.26-1.14-.44-1.12-1.07-1.42-1.07-1.42-.88-.6.06-.59.06-.59.97.07 1.48 1 1.48 1 .86 1.48 2.26 1.05 2.81.8.09-.63.34-1.05.61-1.3-2.14-.24-4.4-1.07-4.4-4.79 0-1.06.38-1.92 1-2.6-.1-.25-.43-1.23.1-2.56 0 0 .81-.26 2.67 1a9.27 9.27 0 0 1 4.86 0c1.85-1.26 2.67-1 2.67-1 .53 1.33.2 2.31.1 2.56.62.68 1 1.54 1 2.6 0 3.72-2.27 4.54-4.42 4.78.35.3.65.88.65 1.78v2.58c0 .26.18.55.67.46A9.7 9.7 0 0 0 12 2.5Z"
      />
    </svg>
  );
}

function Logo() {
  return (
    <svg className={styles.logoMark} viewBox="0 0 44 44" aria-hidden="true">
      <rect className={styles.logoFrame} x="1" y="1" width="42" height="42" rx="12" />
      <path className={styles.logoEdge} d="M13.25 33.5 18.8 10.5M30.75 33.5 25.2 10.5" />
      <path className={styles.logoRunway} pathLength="24" d="M22 32.5V11.5" />
    </svg>
  );
}

export function Brand({ lowercase = false }: { lowercase?: boolean }) {
  return (
    <Link className={styles.brand} href="/" aria-label="Runvey home">
      <Logo />
      <span className={styles.brandName}>{lowercase ? "runvey" : "Runvey"}</span>
    </Link>
  );
}
