import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Viewport } from 'next';
import './global.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
});

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8faf9' },
    { media: '(prefers-color-scheme: dark)', color: '#090a0a' },
  ],
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ defaultTheme: 'system', enableSystem: true }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
