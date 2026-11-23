import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import home from "../home.module.css";
import { Brand, GitHubIcon } from "../brand";
import { ThemeToggle } from "../theme-toggle";
import base from "../early-access/waitlist.module.css";
import styles from "./sponsor.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Sponsor",
  description:
    "Runvey is open source and free to self-host, forever. Sponsor the project on GitHub, or email us about company sponsorship.",
  path: "/sponsor",
});

const GITHUB_SPONSORS_URL = "https://github.com/sponsors/matchouse";
const SPONSOR_EMAIL = "sponsors@runvey.io";

const funds = [
  "Full-time work on Runvey, not a side project",
  "Security reviews of the agent and control plane",
  "Keeping self-hosting free, forever",
  "Docs, examples, and community support",
];

export default function SponsorPage() {
  return (
    <div className={`${home.page} ${base.page}`}>
      <header className={base.top}>
        <Brand />
        <div className={base.topActions}>
          <ThemeToggle />
          <Link className={base.back} href="/">
            <ArrowLeft /> Home
          </Link>
        </div>
      </header>

      <main className={base.main}>
        <section className={base.copy}>
          <p className={home.kicker}>
            <span>SPONSOR</span> OPEN SOURCE · AGPL-3.0
          </p>
          <h1>
            Help us build
            <br />
            <em>Runvey in the open.</em>
          </h1>
          <p className={base.lede}>
            Runvey is open source and free to self-host, forever. Sponsorship lets us spend our
            time building it, and keeps it independent.
          </p>
          <p className={styles.listTitle}>Your support goes to</p>
          <ul className={base.perks}>
            {funds.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className={`${base.formPanel} ${styles.options}`} aria-label="Ways to sponsor">
          <div className={styles.option}>
            <small>For individuals</small>
            <h2>GitHub Sponsors</h2>
            <p>Monthly or one-time support, billed through your GitHub account.</p>
            <a
              className={`${base.submit} ${styles.button}`}
              href={GITHUB_SPONSORS_URL}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon /> Sponsor on GitHub <ArrowRight />
            </a>
          </div>

          <div className={styles.option}>
            <small>For companies</small>
            <h2>Talk to us</h2>
            <p>Invoiced sponsorship for teams that want to back Runvey. Tell us what you need.</p>
            <a className={styles.mailLink} href={`mailto:${SPONSOR_EMAIL}`}>
              <Mail /> {SPONSOR_EMAIL}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
