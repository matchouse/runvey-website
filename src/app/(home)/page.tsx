import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Box,
  ChartNoAxesCombined,
  GitGraph,
  Globe2,
  Server,
  Terminal,
} from "lucide-react";
import styles from "./home.module.css";
import {
  Entrance,
  GlowPulse,
  MotionNav,
  Reveal,
  RevealCard,
  SceneEntrance,
  StickyHero,
} from "./motion-elements";
import { StackOrbit } from "./stack-orbit";
import { ThemeToggle } from "./theme-toggle";

export const metadata: Metadata = {
  title: "Runvey | Your code, cleared for launch.",
  description:
    "Runvey is the open-source platform for shipping applications on your own infrastructure.",
  openGraph: {
    type: "website",
    siteName: "Runvey",
    title: "Runvey | Your code, cleared for launch.",
    description:
      "Runvey is the open-source platform for shipping applications on your own infrastructure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Runvey | Your code, cleared for launch.",
    description:
      "Runvey is the open-source platform for shipping applications on your own infrastructure.",
  },
};

const GITHUB_URL = "https://github.com/matchouse/runvey";

function GitHubIcon() {
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

function Brand({ lowercase = false }: { lowercase?: boolean }) {
  return (
    <Link className={styles.brand} href="/" aria-label="Runvey home">
      <Logo />
      <span className={styles.brandName}>{lowercase ? "runvey" : "Runvey"}</span>
    </Link>
  );
}

function Kicker({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className={styles.kicker}>
      <span>{index}</span> {children}
    </p>
  );
}

function IconBox({ children, amber = false }: { children: React.ReactNode; amber?: boolean }) {
  return (
    <span className={`${styles.iconBox} ${amber ? styles.iconBoxAmber : ""}`}>{children}</span>
  );
}

export default function HomePage() {
  return (
    <div className={styles.page}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>

      <main id="main-content">
        <header className={styles.header}>
          <MotionNav className={styles.nav}>
            <Brand />
            <div className={styles.navLinks}>
              <a href="#product">Product</a>
              <Link href="/docs">Docs</Link>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
            <div className={styles.navActions}>
              <ThemeToggle />
              <a className={styles.navCta} href="#get-started">
                Get started <ArrowRight />
              </a>
            </div>
          </MotionNav>
        </header>

        <StickyHero className={styles.hero}>
          <GlowPulse className={styles.heroGlow} />
          <div className={styles.heroGrid} aria-hidden="true" />

          <div className={styles.heroContent}>
            <Entrance className={styles.heroCopy} delay={0.16}>
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
                <a className={`${styles.button} ${styles.primaryButton}`} href="#get-started">
                  Start deploying <ArrowRight />
                </a>
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
            </Entrance>

            <SceneEntrance className={styles.runwayScene} delay={0.27} ariaHidden>
              <div className={styles.sceneTopline}>
                <span>DEPLOYMENT / 84f2c1</span>
                <span className={styles.sceneStatus}>
                  <i /> DEPLOYMENT PREVIEW
                </span>
              </div>
              <div className={`${styles.telemetry} ${styles.telemetryCommit}`}>
                <span className={styles.telemetryStep}>01</span>
                <span className={styles.telemetryIcon}>
                  <GitGraph />
                </span>
                <span className={styles.telemetryCopy}>
                  <small>GIT RECEIVED</small>
                  <strong>
                    main <em>· 84f2c1</em>
                  </strong>
                </span>
              </div>
              <div className={`${styles.telemetry} ${styles.telemetryBuild}`}>
                <span className={styles.telemetryStep}>02</span>
                <span className={`${styles.telemetryIcon} ${styles.telemetryIconBuild}`}>
                  <Box />
                </span>
                <span className={styles.telemetryCopy}>
                  <small>IMAGE BUILT</small>
                  <strong>
                    container <em>· ready</em>
                  </strong>
                </span>
                <span className={styles.telemetryTime}>built</span>
              </div>
              <div className={styles.runway}>
                <span className={styles.runwayHorizon} />
                <svg
                  className={styles.runwayEdges}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path className={styles.runwayEdgeBase} d="M43 0 0 100M57 0 100 100" />
                  <path className={styles.runwayEdgeLights} d="M43 0 0 100M57 0 100 100" />
                </svg>
                <span className={styles.runwayCenter} />
                <span className={styles.runwayPacket}>
                  <i />
                </span>
                <span className={`${styles.runwayThreshold} ${styles.runwayThresholdNear}`} />
                <span className={`${styles.runwayThreshold} ${styles.runwayThresholdFar}`} />
                <span className={`${styles.runwayLabel} ${styles.runwayLabelBuild}`}>BUILD</span>
                <span className={`${styles.runwayLabel} ${styles.runwayLabelShip}`}>SHIP</span>
              </div>
              <div className={`${styles.telemetry} ${styles.telemetryLive}`}>
                <span className={styles.telemetryStep}>03</span>
                <span className={`${styles.telemetryIcon} ${styles.telemetryIconLive}`}>
                  <Globe2 />
                </span>
                <span className={styles.telemetryCopy}>
                  <small>DEPLOYMENT LIVE</small>
                  <strong>app.example.com</strong>
                </span>
                <span className={styles.telemetryTime}>live</span>
              </div>
              <div className={styles.sceneCaption}>
                <span>YOUR REPOSITORY</span>
                <span>YOUR INFRASTRUCTURE</span>
              </div>
            </SceneEntrance>
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
            <Reveal className={styles.sectionHeading}>
              <Kicker index="01">THE PLATFORM</Kicker>
              <h2>
                Everything between
                <br />
                <em>commit and production.</em>
              </h2>
              <p>
                Runvey handles the repetitive infrastructure work, so your team can stay focused on
                the product.
              </p>
            </Reveal>
            <div className={styles.bento}>
              <RevealCard className={`${styles.featureCard} ${styles.featureDeploy}`}>
                <div className={styles.featureHeader}>
                  <IconBox>
                    <GitGraph />
                  </IconBox>
                  <span className={styles.featureIndex}>01 / SOURCE</span>
                </div>
                <h3>Deploy from Git</h3>
                <p>Connect a repository and turn every push into a traceable release.</p>
                <div className={styles.commitVisual} aria-hidden="true">
                  <div>
                    <span className={styles.commitAvatar}>R</span>
                    <strong>feat: ship billing api</strong>
                    <small>84f2c1 · just now</small>
                  </div>
                  <span className={styles.commitBranch}>main</span>
                </div>
              </RevealCard>
              <RevealCard className={`${styles.featureCard} ${styles.featureBuild}`} delay={0.08}>
                <div className={styles.featureHeader}>
                  <IconBox amber>
                    <Box />
                  </IconBox>
                  <span className={styles.featureIndex}>02 / BUILD</span>
                </div>
                <h3>Bring your stack</h3>
                <p>Ship the services your application needs without reshaping how they work.</p>
                <StackOrbit />
              </RevealCard>
              <RevealCard className={styles.featureCard} delay={0.12}>
                <div className={styles.featureHeader}>
                  <IconBox>
                    <ChartNoAxesCombined />
                  </IconBox>
                  <span className={styles.featureIndex}>03 / OBSERVE</span>
                </div>
                <h3>See what is happening</h3>
                <p>Follow builds, releases, and runtime events from one clear control plane.</p>
                <div className={styles.metricsVisual} aria-hidden="true">
                  {[38, 54, 46, 72, 59, 84, 68, 92, 76].map((height) => (
                    <span key={height} style={{ height: `${height}%` }} />
                  ))}
                </div>
              </RevealCard>
              <RevealCard className={styles.featureCard} delay={0.16}>
                <div className={styles.featureHeader}>
                  <IconBox>
                    <Server />
                  </IconBox>
                  <span className={styles.featureIndex}>04 / CONTROL</span>
                </div>
                <h3>Your cloud stays yours</h3>
                <p>
                  Keep applications and data on infrastructure you control, with Runvey as the
                  flight deck.
                </p>
                <div className={styles.serverVisual} aria-hidden="true">
                  <span>
                    <i /> edge-01 <em>healthy</em>
                  </span>
                  <span>
                    <i /> worker-02 <em>healthy</em>
                  </span>
                </div>
              </RevealCard>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.journey}`} id="workflow">
          <div className={styles.inner}>
            <Reveal className={`${styles.sectionHeading} ${styles.headingSplit}`}>
              <div>
                <Kicker index="02">THE FLIGHT PLAN</Kicker>
                <h2>
                  Three steps.
                  <br />
                  <em>One clean handoff.</em>
                </h2>
              </div>
              <p>
                From repository to a live service, every stage is visible and under your control.
              </p>
            </Reveal>
            <Reveal className={styles.journeyTrack} delay={0.08}>
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
                  <h3>Choose a repository</h3>
                  <p>
                    Point Runvey at the code you already have. Your Git workflow stays exactly where
                    it is.
                  </p>
                </li>
                <li>
                  <small>CONFIGURE</small>
                  <h3>Set the destination</h3>
                  <p>
                    Add environment values, domains, and the infrastructure that should run the
                    service.
                  </p>
                </li>
                <li>
                  <small>LAUNCH</small>
                  <h3>Push and go live</h3>
                  <p>
                    Runvey builds, releases, and gives you one place to watch the deployment land.
                  </p>
                </li>
              </ol>
            </Reveal>
          </div>
        </section>

        <section className={`${styles.section} ${styles.ownership}`}>
          <div className={`${styles.inner} ${styles.ownershipGrid}`}>
            <Reveal className={styles.ownershipCopy}>
              <Kicker index="03">YOUR INFRASTRUCTURE</Kicker>
              <h2>
                Own the ground
                <br />
                <em>beneath your apps.</em>
              </h2>
              <p className={styles.ownershipLede}>
                The convenience of a modern PaaS without handing over the keys. Runvey is designed
                to keep your infrastructure understandable and portable.
              </p>
              <div className={styles.principles}>
                <div>
                  <span>01</span>
                  <p>
                    <strong>Transparent by design</strong>See what the platform is doing and why.
                  </p>
                </div>
                <div>
                  <span>02</span>
                  <p>
                    <strong>Portable by default</strong>Your services are not trapped behind a
                    proprietary runtime.
                  </p>
                </div>
                <div>
                  <span>03</span>
                  <p>
                    <strong>Operated your way</strong>Choose how and where the control plane runs.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal className={styles.infraMap} delay={0.1} ariaHidden>
              <div className={styles.infraGrid} />
              <div className={`${styles.infraNode} ${styles.infraSource}`}>
                <small>SOURCE</small>
                <strong>repository</strong>
                <span>main / 84f2c1</span>
              </div>
              <div className={`${styles.infraNode} ${styles.infraRunvey}`}>
                <Logo />
                <strong>runvey</strong>
                <span>control plane</span>
              </div>
              <div className={`${styles.infraNode} ${styles.infraApp}`}>
                <small>SERVICE</small>
                <strong>api</strong>
                <span>
                  <i /> healthy
                </span>
              </div>
              <div className={`${styles.infraNode} ${styles.infraWorker}`}>
                <small>SERVICE</small>
                <strong>worker</strong>
                <span>
                  <i /> healthy
                </span>
              </div>
              <svg className={styles.infraRoutes} viewBox="0 0 600 480" preserveAspectRatio="none">
                <path d="M115 240H260M340 240H420Q455 240 455 205V150M340 240H420Q455 240 455 275V330" />
                <circle cx="210" cy="240" r="4" />
                <circle cx="405" cy="240" r="4" />
              </svg>
              <span className={styles.infraLegend}>
                <i /> PRIVATE NETWORK
              </span>
            </Reveal>
          </div>
        </section>

        <section className={`${styles.section} ${styles.developer}`} id="developer">
          <div className={`${styles.inner} ${styles.developerGrid}`}>
            <Reveal className={styles.terminalWindow}>
              <div className={styles.terminalBar}>
                <span>
                  <i />
                  <i />
                  <i />
                </span>
                <small>runvey — deployment</small>
                <em>CLI</em>
              </div>
              <pre>
                <code>
                  <span className={styles.terminalMuted}>~</span>{" "}
                  <span className={styles.terminalCommand}>git push origin main</span>
                  {"\n\n"}
                  <span className={styles.terminalBlue}>✓</span> Source received{" "}
                  <span className={styles.terminalMuted}>84f2c1</span>
                  {"\n"}
                  <span className={styles.terminalBlue}>✓</span> Service detected{" "}
                  <span className={styles.terminalMuted}>api</span>
                  {"\n"}
                  <span className={styles.terminalBlue}>✓</span> Environment ready{" "}
                  <span className={styles.terminalMuted}>production</span>
                  {"\n\n"}
                  <span className={styles.terminalLog}> 01</span> Building image{" "}
                  <span className={styles.terminalBlue}>done</span>
                  {"\n"}
                  <span className={styles.terminalLog}> 02</span> Starting service{" "}
                  <span className={styles.terminalBlue}>done</span>
                  {"\n"}
                  <span className={styles.terminalLog}> 03</span> Checking health{" "}
                  <span className={styles.terminalBlue}>done</span>
                  {"\n\n"}
                  <span className={styles.terminalLive}>● LIVE</span> https://app.example.com
                </code>
              </pre>
            </Reveal>
            <Reveal className={styles.developerCopy} delay={0.08}>
              <Kicker index="04">DEVELOPER FIRST</Kicker>
              <h2>
                A platform that
                <br />
                <em>speaks your language.</em>
              </h2>
              <p>
                Use the dashboard when you want the big picture and the command line when you
                already know where you are going.
              </p>
              <div className={styles.developerLinks}>
                <Link href="/docs">
                  <IconBox>
                    <Terminal />
                  </IconBox>
                  <span>
                    <strong>Documentation</strong>
                    <small>Explore the deployment workflow</small>
                  </span>
                  <ArrowRight />
                </Link>
                <Link href="/docs/concepts">
                  <IconBox>
                    <BookOpen />
                  </IconBox>
                  <span>
                    <strong>Platform concepts</strong>
                    <small>Understand services and deployments</small>
                  </span>
                  <ArrowRight />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={`${styles.section} ${styles.openSource}`}>
          <Reveal className={`${styles.inner} ${styles.openSourcePanel}`}>
            <div className={styles.openSourceRings} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className={styles.openSourceMark} aria-hidden="true">
              <GitHubIcon />
            </div>
            <Kicker index="05">BUILT IN THE OPEN</Kicker>
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
          </Reveal>
        </section>

        <section className={styles.finalCta} id="get-started">
          <div className={styles.finalGrid} aria-hidden="true" />
          <div className={styles.finalRunway} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <Reveal className={`${styles.inner} ${styles.finalInner}`}>
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
              <Link className={`${styles.button} ${styles.secondaryButton}`} href="/docs">
                Read the docs
              </Link>
            </div>
          </Reveal>
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
              <a href="#developer">Developer experience</a>
            </div>
            <div>
              <strong>Project</strong>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <Link href="/docs">Documentation</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>
        </div>
        <div className={`${styles.inner} ${styles.footerBottom}`}>
          <span>© Runvey. Open source.</span>
          <span className={styles.footerStatus}>
            <i /> OPEN SOURCE · SELF-HOSTED
          </span>
        </div>
      </footer>
    </div>
  );
}
