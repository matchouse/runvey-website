'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';

type MotionBlockProps = {
  children: ReactNode;
  className?: string;
};

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
