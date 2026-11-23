import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

// Docs are redirected to "/" until the product exists, so they're left out.
const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/early-access', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/roadmap', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/sponsor', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency,
    priority,
  }));
}
