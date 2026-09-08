import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code2, FileText, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import styles from './legal.module.css';
import { ThemeToggle } from './theme-toggle';

export type LegalSection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type LegalDocumentProps = {
  kind: 'terms' | 'privacy';
  title: string;
  eyebrow: string;
  description: string;
  sections: LegalSection[];
};

export const EFFECTIVE_DATE = '8 September 2026';
export const RUNVEY_REPOSITORY = 'https://github.com/matchouse/runvey';
export const LEGAL_EMAIL = 'legal@matchouse.com';

export function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className={styles.paragraph}>{children}</p>;
}

export function Subheading({ children }: { children: React.ReactNode }) {
  return <h3 className={styles.subheading}>{children}</h3>;
}

export function BulletList({ children }: { children: React.ReactNode }) {
  return <ul className={styles.bulletList}>{children}</ul>;
}

export function Note({ children }: { children: React.ReactNode }) {
  return <div className={styles.note}>{children}</div>;
}

export function LegalDocument({ kind, title, eyebrow, description, sections }: LegalDocumentProps) {
  const otherHref = kind === 'terms' ? '/privacy' : '/terms';
  const otherLabel = kind === 'terms' ? 'Privacy Policy' : 'Terms of Service';

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Legal page navigation">
          <Link className={styles.brand} href="/" aria-label="Runvey home">
            <svg viewBox="0 0 44 44" aria-hidden="true">
              <rect x="1" y="1" width="42" height="42" rx="12" />
              <path d="M13.25 33.5 18.8 10.5M30.75 33.5 25.2 10.5M22 32.5V11.5" />
            </svg>
            <span>Runvey</span>
          </Link>
          <div className={styles.navLinks}>
            <Link href="/docs">Docs</Link>
            <a href={RUNVEY_REPOSITORY} target="_blank" rel="noreferrer"><Code2 /> GitHub</a>
            <ThemeToggle />
          </div>
        </nav>

        <div className={styles.hero}>
          <Link className={styles.backLink} href="/"><ArrowLeft /> Back to Runvey</Link>
          <div className={styles.eyebrow}>{kind === 'terms' ? <FileText /> : <LockKeyhole />} {eyebrow}</div>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className={styles.meta}>
            <span><small>Effective date</small>{EFFECTIVE_DATE}</span>
            <span><small>Last updated</small>{EFFECTIVE_DATE}</span>
            <span><small>Sections</small>{sections.length}</span>
          </div>
        </div>
      </header>

      <div className={styles.legalTabs}>
        <div>
          <Link className={kind === 'terms' ? styles.activeTab : ''} href="/terms">Terms</Link>
          <Link className={kind === 'privacy' ? styles.activeTab : ''} href="/privacy">Privacy</Link>
        </div>
      </div>

      <main className={styles.layout}>
        <aside className={styles.sidebar}>
          <p>Contents</p>
          <ol>
            {sections.map((section, index) => (
              <li key={section.id}><a href={`#${section.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</a></li>
            ))}
          </ol>
        </aside>

        <article className={styles.document}>
          <div className={styles.summary}>
            <ShieldCheck />
            <p>This document is written for Runvey’s website, documentation, open-source project, and related services. It does not replace rights or obligations that cannot legally be excluded.</p>
          </div>

          {sections.map((section, index) => (
            <section id={section.id} className={styles.section} key={section.id}>
              <div className={styles.sectionNumber}>{String(index + 1).padStart(2, '0')}</div>
              <div><h2>{section.title}</h2>{section.content}</div>
            </section>
          ))}

          <div className={styles.contactCard}>
            <div><small>Questions about this document?</small><strong>Contact the Runvey legal team</strong></div>
            <a href={`mailto:${LEGAL_EMAIL}`}><Mail /> {LEGAL_EMAIL}</a>
          </div>
        </article>
      </main>

      <footer className={styles.footer}>
        <span>© 2026 Runvey. Open source.</span>
        <div><Link href={otherHref}>{otherLabel} <ArrowRight /></Link><a href={RUNVEY_REPOSITORY} target="_blank" rel="noreferrer">Source code <ArrowRight /></a></div>
      </footer>
    </div>
  );
}
