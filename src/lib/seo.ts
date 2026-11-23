import type { Metadata } from 'next';
import { appName } from '@/lib/shared';

export const siteUrl = 'https://runvey.io';
export const siteTagline = 'Your code, cleared for launch.';
export const siteDescription =
  'Runvey is the open-source platform for shipping applications on your own infrastructure.';

// Rendered by src/app/opengraph-image.tsx.
const ogImage = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: 'Runvey: Push code. Watch it take off. Open-source deployments from Git push to production.',
};

/**
 * Per-page metadata with canonical URL plus matching Open Graph / Twitter
 * fields. Next.js replaces (not merges) `openGraph`/`twitter` objects from
 * parent layouts, so every page sets them in full.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Page title without the brand suffix; the root layout template adds it. */
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${appName}` : `${appName} | ${siteTagline}`;

  return {
    title: title ?? { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: appName,
      locale: 'en_US',
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
