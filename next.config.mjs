import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/waitlist', destination: '/early-access', permanent: true },
      // Docs are hidden until the product exists. Remove these to bring them back.
      ...['/docs', '/docs/:path*', '/docs.md', '/llms.txt', '/llms-full.txt', '/llms.mdx/:path*'].map(
        (source) => ({ source, destination: '/', permanent: false }),
      ),
    ];
  },
};

export default withMDX(config);
