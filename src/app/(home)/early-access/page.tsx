import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import home from "../home.module.css";
import { Brand } from "../brand";
import { ThemeToggle } from "../theme-toggle";
import { WaitlistForm } from "./waitlist-form";
import styles from "./waitlist.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Get early access",
  description:
    "Request early access to Runvey. Private early access opens in early 2027, and invites go out by email.",
  path: "/early-access",
});

const perks = [
  "First access when private early access opens",
  "A say in what we build next",
  "An early access discount",
  "Priority support",
];

export default function WaitlistPage() {
  return (
    <div className={`${home.page} ${styles.page}`}>
      <header className={styles.top}>
        <Brand />
        <div className={styles.topActions}>
          <ThemeToggle />
          <Link className={styles.back} href="/">
            <ArrowLeft /> Home
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.copy}>
          <p className={home.kicker}>
            <span>EARLY ACCESS</span> LAUNCHING EARLY 2027
          </p>
          <h1>
            Be first on
            <br />
            <em>the Runvey.</em>
          </h1>
          <p className={styles.lede}>
            Runvey is still being built. Leave your name and email, and we'll send you an invite
            when private early access opens.
          </p>
          <ul className={styles.perks}>
            {perks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
        </section>

        <section className={styles.formPanel} aria-label="Request early access">
          <WaitlistForm />
        </section>
      </main>
    </div>
  );
}
