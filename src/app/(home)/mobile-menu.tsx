'use client';

import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { GitHubIcon } from './brand';
import { ThemeToggle } from './theme-toggle';
import styles from './home.module.css';

type MobileMenuProps = {
  githubUrl: string;
  earlyAccessUrl: string;
};

export function MobileMenu({ githubUrl, earlyAccessUrl }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia('(min-width: 761px)').matches) setOpen(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className={styles.mobileMenu} ref={rootRef}>
      <button
        className={styles.menuButton}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </button>

      <div className={styles.menuPanel} id={panelId} hidden={!open}>
        <a href="#product" onClick={close}>
          Product
        </a>
        <Link href="/roadmap" onClick={close}>
          Roadmap
        </Link>
        <Link href="/sponsor" onClick={close}>
          Sponsor
        </Link>
        <a href={githubUrl} target="_blank" rel="noreferrer" onClick={close}>
          <GitHubIcon /> GitHub
        </a>
        <div className={styles.menuTheme}>
          <span>Theme</span>
          <ThemeToggle />
        </div>
        <Link className={styles.menuCta} href={earlyAccessUrl} onClick={close}>
          Get started <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
