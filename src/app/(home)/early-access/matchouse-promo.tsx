import { ArrowUpRight } from "lucide-react";
import { MatchouseLogo } from "../matchouse-logo";
import styles from "./waitlist.module.css";

const ref = "utm_source=runvey&utm_medium=referral&utm_campaign=early_access";
const REGISTER_URL = `https://matchouse.com/auth/register?${ref}`;
const EXPLORE_URL = `https://matchouse.com/search?${ref}`;

/**
 * Points people waiting for Runvey to Matchouse, the company building it.
 * `compact` sits under the form; the full version follows a successful sign-up.
 */
export function MatchousePromo({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className={`${styles.promo} ${compact ? styles.promoCompact : ""}`}
      aria-label="Try Matchouse"
    >
      <div className={styles.promoHead}>
        <small>{compact ? "Meanwhile" : "While you wait"}</small>
        <MatchouseLogo className={styles.promoLogo} />
      </div>
      <p>
        {compact
          ? "Runvey is built by Matchouse, a social network where people connect, share and turn attention into opportunity."
          : "Try Matchouse, the social network from the team building Runvey. Connect with people, share your work and find new opportunities."}
      </p>
      <div className={styles.promoLinks}>
        <a
          className={styles.promoPrimary}
          href={REGISTER_URL}
          target="_blank"
          rel="noreferrer"
        >
          Create your profile <ArrowUpRight />
        </a>
        <a
          className={styles.promoSecondary}
          href={EXPLORE_URL}
          target="_blank"
          rel="noreferrer"
        >
          Explore Matchouse <ArrowUpRight />
        </a>
      </div>
    </aside>
  );
}
