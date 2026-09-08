'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';
import {
  SiBun,
  SiDeno,
  SiGo,
  SiLaravel,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRuby,
  SiRubyonrails,
  SiRust,
  SiSvelte,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si';
import styles from './home.module.css';

const technologies = [
  { name: 'Go', icon: SiGo, color: '#00add8' },
  { name: 'TypeScript', icon: SiTypescript, color: '#5b9bd5' },
  { name: 'React', icon: SiReact, color: '#61dafb' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#f5f7f4', monochrome: true },
  { name: 'Node.js', icon: SiNodedotjs, color: '#6ba45e' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#6b8fc5' },
  { name: 'Python', icon: SiPython, color: '#4b8bbe' },
  { name: 'Rust', icon: SiRust, color: '#f5f7f4', monochrome: true },
  { name: 'PHP', icon: SiPhp, color: '#8993be' },
  { name: 'Laravel', icon: SiLaravel, color: '#ff2d20' },
  { name: 'Vue.js', icon: SiVuedotjs, color: '#42b883' },
  { name: 'Svelte', icon: SiSvelte, color: '#ff3e00' },
  { name: 'Java', icon: SiOpenjdk, color: '#f89820' },
  { name: 'Ruby', icon: SiRuby, color: '#cc342d' },
  { name: 'Ruby on Rails', icon: SiRubyonrails, color: '#d30001' },
  { name: 'Bun', icon: SiBun, color: '#f5f7f4', monochrome: true },
  { name: 'Deno', icon: SiDeno, color: '#f5f7f4', monochrome: true },
];

const orbitDuration = 24;

export function StackOrbit() {
  const reduced = useReducedMotion();

  return (
    <div className={styles.stackOrbit} role="img" aria-label={`Compatible technologies: ${technologies.map(({ name }) => name).join(', ')}`}>
      <div className={styles.stackOrbitGlow} aria-hidden="true" />
      <div className={styles.stackOrbitFrame} aria-hidden="true">
        <div className={styles.stackOrbitArc} />
        <motion.div
          className={styles.stackOrbitTrack}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: orbitDuration, repeat: Infinity, ease: 'linear' }}
        >
          {technologies.map(({ name, icon: Icon, color, monochrome }, index) => {
            const angle = (360 / technologies.length) * index;

            return (
              <div
                className={styles.stackOrbitAnchor}
                style={{ '--orbit-angle': `${angle}deg` } as CSSProperties}
                key={name}
              >
                <div className={styles.stackOrbitPosition}>
                  <motion.div
                    className={`${styles.stackOrbitBadge} ${monochrome ? styles.stackOrbitBadgeMono : ''}`}
                    style={{ color }}
                    animate={reduced ? { rotate: -angle } : { rotate: [-angle, -angle - 360] }}
                    transition={{ duration: orbitDuration, repeat: Infinity, ease: 'linear' }}
                    title={name}
                  >
                    <Icon />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
      <div className={styles.stackOrbitHub} aria-hidden="true"><i /><span>YOUR STACK</span><small>ANY RUNTIME</small></div>
    </div>
  );
}
