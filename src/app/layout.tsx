import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./global.css";
import { appName } from "@/lib/shared";
import { siteDescription, siteTagline, siteUrl } from "@/lib/seo";
import { Figtree, Geist_Mono, Inter, Manrope } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geistmono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${appName} | ${siteTagline}`,
    template: `%s | ${appName}`,
  },
  description: siteDescription,
  applicationName: appName,
  keywords: [
    "open source deployment platform",
    "self-hosted PaaS",
    "git push deploy",
    "deploy on your own infrastructure",
  ],
  authors: [{ name: "Matchouse", url: "https://github.com/matchouse" }],
  creator: "Matchouse",
  publisher: "Matchouse",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: appName,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8faf9" },
    { media: "(prefers-color-scheme: dark)", color: "#090a0a" },
  ],
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${manrope.variable} ${geistMono.variable} ${figtree.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ defaultTheme: "system", enableSystem: true }}>
          {children}
        </RootProvider>
        {process.env.NODE_ENV === "production" && (
          <>
            {/* Privacy-friendly analytics by Plausible: no cookies or device storage, so no consent banner needed. */}
            <Script
              src="https://analytics.matchouse.com/js/pa-CfvB3TGvIEt6QOjjoOqfZ.js"
              strategy="afterInteractive"
            />
            <Script id="plausible-init" strategy="afterInteractive">
              {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
