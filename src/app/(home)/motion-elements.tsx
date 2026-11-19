'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';

type MotionBlockProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  ariaHidden?: boolean;
};

const spring = { type: 'spring' as const, stiffness: 90, damping: 20, mass: 0.8 };

/*
 * The server can't know the visitor's reduced-motion setting, so every
 * component always starts from the same `initial` state (keeping server and
 * client HTML identical) and reduced motion only makes the transition instant.
 */
const enter = (reduced: boolean | null, delay = 0) =>
  reduced ? { duration: 0 } : { ...spring, delay };

export function StickyHero({ children, className }: MotionBlockProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateHeight = () => {
      element.style.setProperty('--hero-height', `${element.getBoundingClientRect().height}px`);
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return <section className={className} ref={ref}>{children}</section>;
}

export function MotionNav({ children, className }: MotionBlockProps) {
  const reduced = useReducedMotion();

  return (
    <motion.nav
      className={className}
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={enter(reduced, 0.05)}
      aria-label="Main navigation"
    >
      {children}
    </motion.nav>
  );
}

export function Entrance({ children, className, delay = 0 }: MotionBlockProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={enter(reduced, delay)}
    >
      {children}
    </motion.div>
  );
}

export function SceneEntrance({ children, className, delay = 0, ariaHidden }: MotionBlockProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 32, scale: 0.975 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={enter(reduced, delay)}
      aria-hidden={ariaHidden}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({ children, className, delay = 0, ariaHidden }: MotionBlockProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={enter(reduced, delay)}
      aria-hidden={ariaHidden}
    >
      {children}
    </motion.div>
  );
}

export function RevealCard({ children, className, delay = 0 }: MotionBlockProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      className={className}
      initial={{ opacity: 0, y: 30, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={enter(reduced, delay)}
    >
      {children}
    </motion.article>
  );
}

export function GlowPulse({ className }: Pick<MotionBlockProps, 'className'>) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      aria-hidden="true"
      initial={{ opacity: 0.65, scale: 0.96 }}
      animate={reduced ? undefined : { opacity: [0.65, 1, 0.65], scale: [0.96, 1.04, 0.96] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}
