import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata, Viewport } from "next";
import "./global.css";
import { Geist_Mono, Inter, Manrope } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
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
  metadataBase: new URL("https://runvey.io"),
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
      className={`${inter.className} ${manrope.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider theme={{ defaultTheme: "system", enableSystem: true }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
