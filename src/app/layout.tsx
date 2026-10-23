import type { Metadata, Viewport } from "next";
import { DM_Sans, Geist_Mono, Instrument_Serif } from "next/font/google";

import { BottomNav } from "@/components/landing/bottom-nav";
import { BackToTop } from "@/components/shared/back-to-top";
import { FrameGutters } from "@/components/shared/frame-gutters";
import { SiteHeader } from "@/components/shared/site-header";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { JsonLd } from "@/components/site/json-ld";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig, SITE } from "@/config/site";
import { cn } from "@/lib/utils";

import "../styles/theme-transition.css";
import "./globals.css";

const DmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description = siteConfig.meta.description;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: siteConfig.meta.title,
    template: siteConfig.meta.titleTemplate,
  },
  description,
  keywords: siteConfig.meta.keywords,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    title: siteConfig.meta.title,
    description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: SITE.avatar,
        width: 800,
        height: 800,
        alt: `${SITE.name} — Software Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.meta.title,
    description,
    images: [SITE.avatar],
  },
  alternates: {
    canonical: SITE.url,
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-icon",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-background font-sans",
        DmSans.variable,
        instrumentSerif.variable,
      )}
      suppressHydrationWarning
    >
      <body className={`${geistMono.variable} antialiased`}>
        <noscript>
          <style>{`.no-js-visible { opacity: 1 !important; transform: none !important; stroke-dashoffset: 0 !important; stroke-dasharray: none !important; }`}</style>
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <TooltipProvider delayDuration={150}>
            <JsonLd />
            <SiteHeader />
            <FrameGutters />
            <div className="relative mx-auto w-full max-w-[var(--frame-max-w)]">
              <div
                id="main-content"
                className="relative w-full border-x border-dashed bg-muted/20"
              >
                {children}
              </div>
              <BottomNav />
              <BackToTop />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
