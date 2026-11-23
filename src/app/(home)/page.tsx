import type { Metadata } from "next";
import { pageMetadata, siteDescription, siteUrl } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Plus, Terminal } from "lucide-react";
import styles from "./home.module.css";
import { GlowPulse, StickyHero } from "./motion-elements";
import { Brand, GitHubIcon } from "./brand";
import { DeployVisual } from "./deploy-visual";
import { MatchouseLogo } from "./matchouse-logo";
import { RunwayScene } from "./runway-scene";
import { SecurityDiagram } from "./security-diagram";
import { StackOrbit } from "./stack-orbit";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

export const metadata: Metadata = pageMetadata({
  description:
    "Runvey is the open-source platform for shipping applications on your own infrastructure.",
  path: "/",
});

const GITHUB_URL = "https://github.com/matchouse/runvey";
// Runvey is pre-launch: every "get started" style CTA leads to the early access page.
const EARLY_ACCESS_URL = "/early-access";

const faqs = [
  {
    q: "When does Runvey launch?",
    a: "Early 2027. We'll start with a private early access, and invites go out by email to people who have applied.",
  },
  {
    q: "Is Runvey free?",
    a: "Self-hosting Runvey is free, forever. A managed cloud will follow once v1 is stable, for teams that would rather not run it themselves.",
  },
  {
    q: "Is it open source?",
    a: "Yes. Runvey is licensed under AGPL-3.0, and the code is developed in the open on GitHub.",
  },
  {
    q: "How is Runvey different from Coolify, Dokku, or Kamal?",
    a: "Security comes first: your servers only make outbound connections, and new deployments need a passkey. It's also built to be approachable for less technical users. Set up each app once, and Runvey takes care of deployments and scaling from there.",
  },
  {
    q: "What do early access users get?",
    a: "First access to Runvey, a say in the roadmap, an early access discount, and priority support.",
  },
];

function Kicker({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className={styles.kicker}>
      <span>{index}</span> {children}
    </p>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Runvey",
      url: siteUrl,
      logo: `${siteUrl}/brand/runvey-icon.png`,
      sameAs: [GITHUB_URL],
      parentOrganization: { "@type": "Organization", name: "Matchouse", url: "https://matchouse.com" },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Runvey",
      url: siteUrl,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>

      <main id="main-content">
        <header className={styles.header}>
          <nav className={styles.nav} aria-label="Main navigation">
            <Brand />
            <div className={styles.navLinks}>
              <a href="#product">Product</a>
              <Link href="/roadmap">Roadmap</Link>
              <Link href="/sponsor">Sponsor</Link>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                <GitHubIcon /> GitHub
              </a>
            </div>
            <div className={styles.navActions}>
              <span className={styles.desktopOnly}>
                <ThemeToggle />
              </span>
              <Link className={styles.navCta} href={EARLY_ACCESS_URL}>
                Get started <ArrowRight />
              </Link>
              <MobileMenu githubUrl={GITHUB_URL} earlyAccessUrl={EARLY_ACCESS_URL} />
            </div>
          </nav>
        </header>

        <StickyHero className={styles.hero}>
          <GlowPulse className={styles.heroGlow} />
          <div className={styles.heroGrid} aria-hidden="true" />

          <div className={styles.heroContent}>
            <div className={styles.heroCopy}>
              <a className={styles.eyebrow} href={GITHUB_URL} target="_blank" rel="noreferrer">
                <span className={styles.eyebrowDot}>
                  <i />
                </span>
                Open source · Self-hosted
                <ArrowRight />
              </a>
              <h1>
                Push code.
                <br />
                <span>Watch it take off.</span>
              </h1>
              <p className={styles.heroLede}>
                Runvey turns every Git push into a production release on infrastructure you control.
                No platform lock-in. No black boxes.
              </p>
              <p className={styles.srOnly}>
                Runvey receives your Git push, builds a deployable container image, and takes the
                application live in seconds.
              </p>
              <div className={styles.actions}>
                <Link className={`${styles.button} ${styles.primaryButton}`} href={EARLY_ACCESS_URL}>
                  Get early access <ArrowRight />
                </Link>
                <a
                  className={`${styles.button} ${styles.secondaryButton}`}
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon /> GitHub
                </a>
              </div>
              <div
                className={styles.commandStrip}
                role="img"
                aria-label="A Git push is ready for deployment"
              >
                <Terminal />
                <code>git push origin main</code>
                <span className={styles.commandResult}>
                  <i /> READY TO DEPLOY
                </span>
              </div>
            </div>

            <div className={styles.runwayScene} aria-hidden="true">
              <RunwayScene />
            </div>
          </div>
        </StickyHero>

        <section className={styles.signalStrip} aria-label="Runvey platform principles">
          <div className={styles.signalInner}>
            <span>GIT-NATIVE</span>
            <i />
            <span>OPEN SOURCE</span>
            <i />
            <span>SELF-HOSTED</span>
            <i />
            <span>NO LOCK-IN</span>
            <i />
            <span>YOUR INFRASTRUCTURE</span>
          </div>
        </section>

        <section className={`${styles.section} ${styles.product}`} id="product">
          <div className={styles.inner}>
            <div className={styles.sectionHeading}>
              <Kicker index="01">THE PLATFORM</Kicker>
              <h2>
                Focus on the product.
                <br />
                <em>Not the pipeline.</em>
              </h2>
              <p>
                Runvey handles the repetitive infrastructure work, so your team can stay focused on
                the product.
              </p>
            </div>
            <div className={styles.bento}>
              <article className={`${styles.featureCard} ${styles.featureDeploy}`}>
                <h3>Deploy from Git</h3>
                <p>Connect a repository and turn every push into a traceable release.</p>
                <DeployVisual />
              </article>
              <article className={`${styles.featureCard} ${styles.featureBuild}`}>
                <h3>Bring your stack</h3>
                <p>Ship the services your application needs without reshaping how they work.</p>
                <StackOrbit />
              </article>
              <article className={styles.featureCard}>
                <h3>See what is happening</h3>
                <p>Follow builds, releases, and runtime events from one clear control plane.</p>
                <div className={styles.metricsVisual} aria-hidden="true">
                  {[38, 54, 46, 72, 59, 84, 68, 92, 76].map((height) => (
                    <span key={height} style={{ height: `${height}%` }} />
                  ))}
                </div>
              </article>
              <article className={styles.featureCard}>
                <h3>Your cloud stays yours</h3>
                <p>
                  Keep applications and data on infrastructure you control, with Runvey as the
                  flight deck.
                </p>
                <div className={styles.serverVisual} aria-hidden="true">
                  <span>
                    <i /> <strong>Hetzner</strong> fsn1 <em>2 services</em>
                  </span>
                  <span>
                    <i /> <strong>AWS</strong> eu-west-1 <em>3 services</em>
                  </span>
                  <span>
                    <i /> <strong>Your server</strong> 10.0.4.12 <em>1 service</em>
                  </span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.journey}`} id="workflow">
          <div className={styles.inner}>
            <div className={`${styles.sectionHeading} ${styles.headingSplit}`}>
              <div>
                <Kicker index="02">HOW IT WORKS</Kicker>
                <h2>
                  Set up once.
                  <br />
                  <em>Then just push.</em>
                </h2>
              </div>
              <p>
                Connect a repository, choose where it runs, and every push after that becomes a
                release.
              </p>
            </div>
            <div className={styles.journeyTrack}>
              <div className={styles.journeyRail} aria-hidden="true">
                <span>
                  <small>01</small>
                  <i />
                </span>
                <span>
                  <small>02</small>
                  <i />
                </span>
                <span className={styles.journeyRailLive}>
                  <small>03 · LIVE</small>
                  <i />
                </span>
              </div>
              <ol className={styles.journeySteps}>
                <li>
                  <small>CONNECT</small>
                  <h3>Connect your repository</h3>
                  <p>Point Runvey at the code you already have. Your Git workflow stays the same.</p>
                </li>
                <li>
                  <small>CONFIGURE</small>
                  <h3>Choose where it runs</h3>
                  <p>
                    Add environment variables and domains, and pick the server or cloud that runs
                    the service.
                  </p>
                </li>
                <li>
                  <small>DEPLOY</small>
                  <h3>Push to deploy</h3>
                  <p>Runvey builds and releases each push, and shows every step as it happens.</p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.ownership}`}>
          <div className={`${styles.inner} ${styles.ownershipGrid}`}>
            <div className={styles.ownershipCopy}>
              <Kicker index="03">SECURITY BY DESIGN</Kicker>
              <h2>
                Your servers stay closed.
                <br />
                <em>Even to the control plane.</em>
              </h2>
              <p className={styles.ownershipLede}>
                The Runvey agent on each server connects out to the control plane. Nothing connects
                in: no SSH keys and no open ports, so a compromised control plane has no direct path
                to your machines.
              </p>
              <div className={styles.principles}>
                <div>
                  <span>01</span>
                  <p>
                    <strong>Outbound-only agent</strong>Servers open no inbound ports. The agent
                    calls the control plane, never the other way round.
                  </p>
                </div>
                <div>
                  <span>02</span>
                  <p>
                    <strong>Passkey-protected deploys</strong>Running a new container requires a
                    passkey, so a stolen session or a breached control plane can&apos;t start one.
                  </p>
                </div>
                <div>
                  <span>03</span>
                  <p>
                    <strong>Automation that keeps working</strong>Pushes to a connected branch
                    deploy without extra prompts, so CI keeps flowing. Your Git provider stays the
                    source of truth.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.securityVisual}>
              <SecurityDiagram />
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.openSource}`}>
          <div className={`${styles.inner} ${styles.openSourcePanel}`}>
            <Kicker index="04">BUILT IN THE OPEN</Kicker>
            <h2>
              Infrastructure should not
              <br />
              <em>require blind trust.</em>
            </h2>
            <p>
              Read the code. Run it yourself. Shape what comes next. Runvey is an open platform
              built with its users, not behind closed doors.
            </p>
            <a
              className={`${styles.button} ${styles.primaryButton}`}
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon /> Explore on GitHub
            </a>
          </div>
        </section>

        <section className={`${styles.section} ${styles.faq}`} id="faq">
          <div className={`${styles.inner} ${styles.faqGrid}`}>
            <div className={styles.faqIntro}>
              <Kicker index="05">FAQ</Kicker>
              <h2>
                Good questions.
                <br />
                <em>Straight answers.</em>
              </h2>
            </div>
            <div className={styles.faqList}>
              {faqs.map((item) => (
                <details key={item.q}>
                  <summary>
                    {item.q}
                    <Plus aria-hidden="true" />
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta} id="get-started">
          <div className={styles.finalGrid} aria-hidden="true" />
          <div className={styles.finalRunway} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className={`${styles.inner} ${styles.finalInner}`}>
            <span className={styles.finalStatus}>
              <i /> RUNWAY CLEAR
            </span>
            <h2>
              Ready when
              <br />
              <em>your code is.</em>
            </h2>
            <p>
              Bring the repository. Keep the infrastructure. Let Runvey handle the path between
              them.
            </p>
            <div className={styles.actions}>
              <a
                className={`${styles.button} ${styles.primaryButton}`}
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
              >
                Get started on GitHub <ArrowRight />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.inner} ${styles.footerInner}`}>
          <div className={styles.footerBrand}>
            <Brand />
            <p>
              The open-source path
              <br />
              from code to cloud.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <div>
              <strong>Platform</strong>
              <a href="#product">Product</a>
              <a href="#workflow">Workflow</a>
            </div>
            <div>
              <strong>Project</strong>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <Link href="/roadmap">Roadmap</Link>
              <Link href="/sponsor">Sponsor</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>
        </div>
        <div className={`${styles.inner} ${styles.footerBottom}`}>
          <span>© Runvey. Open source.</span>
          <a
            className={styles.footerMaker}
            href="https://matchouse.com"
            target="_blank"
            rel="noreferrer"
          >
            A project by <MatchouseLogo className={styles.matchouseLogo} />
          </a>
          <span className={styles.footerStatus}>
            <i /> OPEN SOURCE · EARLY ACCESS 2027
          </span>
        </div>
      </footer>
    </div>
  );
}
