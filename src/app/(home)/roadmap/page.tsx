import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import home from "../home.module.css";
import { Brand } from "../brand";
import { ThemeToggle } from "../theme-toggle";
import base from "../early-access/waitlist.module.css";
import { FlightHero } from "./flight-hero";
import styles from "./roadmap.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Roadmap",
  description:
    "What we're building for Runvey, what comes next, and what's planned after v1.",
  path: "/roadmap",
});

type Status = "done" | "now" | "next" | "later";

const STATUS_LABEL: Record<Status, string> = {
  done: "Done",
  now: "In progress",
  next: "Up next",
  later: "Later",
};

// Placeholder roadmap content. Replace with the real plan.
const phases: {
  status: Status;
  period: string;
  title: string;
  summary: string;
  items: string[];
}[] = [
  {
    status: "done",
    period: "2026",
    title: "Foundations",
    summary: "Design the architecture and open the project up.",
    items: [
      "Security model: outbound-only agent, passkey-approved deploys",
      "Public repository under AGPL-3.0",
      "Website and early access sign-up",
    ],
  },
  {
    status: "now",
    period: "Q4 2026",
    title: "Core platform",
    summary: "The pieces every deployment depends on.",
    items: [
      "Control plane: apps, releases and state",
      "Runvey agent for Linux servers",
      "Container builds from a Git repository",
    ],
  },
  {
    status: "next",
    period: "Early 2027",
    title: "Private early access",
    summary: "First invites go out to people on the early access list.",
    items: [
      "Push-to-deploy from GitHub",
      "Passkey approval for new deployments",
      "Logs, health checks and rollbacks",
    ],
  },
  {
    status: "later",
    period: "2027",
    title: "v1 and beyond",
    summary: "A stable release, then a managed option.",
    items: [
      "Stable v1 for self-hosting",
      "More Git providers",
      "Managed Runvey cloud",
    ],
  },
];

const nowIndex = Math.max(
  0,
  phases.findIndex((p) => p.status === "now"),
);

/** Top-down airliner parked on the current stage's runway, nose down the route. */
function ParkedPlane() {
  return (
    <span className={styles.parked}>
      <svg viewBox="0 0 32 32">
        <path d="M16 30.5c-1.1 0-1.9-1.3-1.9-3.2v-7.1L3 13.6V11l11.1 3.3V7.9L10.8 5.4V3.3L16 4.6l5.2-1.3v2.1l-3.3 2.5v6.4L29 11v2.6l-11.1 6.6v7.1c0 1.9-.8 3.2-1.9 3.2Z" />
        {/* Heading down the screen, the aircraft's left (red) wing is on screen right. */}
        <circle className={styles.navRed} cx="28" cy="12.3" r="1.9" />
        <circle className={styles.navGreen} cx="4" cy="12.3" r="1.9" />
        <circle className={styles.beacon} cx="16" cy="17" r="1.5" />
      </svg>
    </span>
  );
}

export default function RoadmapPage() {
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

      <main className={styles.main}>
        <section className={styles.intro}>
          <p className={home.kicker}>
            <span>ROADMAP</span> BUILT IN THE OPEN
          </p>
          <h1>
            Where Runvey
            <br />
            <em>is headed.</em>
          </h1>
          <p className={base.lede}>
            What we've done, what we're building now, and what comes after.
            Plans can change as we learn from early access users.
          </p>
        </section>

        <FlightHero
          stages={phases.map(({ period, title, status }) => ({
            period,
            title,
            status,
          }))}
        />

        <ol className={styles.timeline}>
          {phases.map((phase, i) => (
            <li
              key={phase.title}
              className={styles.phase}
              data-status={phase.status}
              data-leg={i < nowIndex ? "flown" : "ahead"}
            >
              <span className={styles.runway} aria-hidden="true">
                <i />
                {phase.status === "now" && <ParkedPlane />}
              </span>
              <div className={styles.meta}>
                <span className={styles.status}>
                  {STATUS_LABEL[phase.status]}
                </span>
                <span className={styles.period}>{phase.period}</span>
              </div>
              <div className={styles.body}>
                <h2>{phase.title}</h2>
                <p>{phase.summary}</p>
                <ul>
                  {phase.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <section className={styles.cta}>
          <p>
            Want a say in what we build next? Early access users help shape the
            roadmap.
          </p>
          <Link
            className={`${base.submit} ${styles.ctaButton}`}
            href="/early-access"
          >
            Get early access <ArrowRight />
          </Link>
        </section>
      </main>
    </div>
  );
}
