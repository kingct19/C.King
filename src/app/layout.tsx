import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Syne } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { JsonLd } from "@/components/site/json-ld";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SITE } from "@/config/site";

import "../styles/theme-transition.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Chandler King — Founder, Head of Technology & Agentic Engineer at Sozo Tech Enterprise. Building AnglerIQ and The Sozo CRM.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Chandler King – Founder & Agentic Engineer",
    template: "%s · Chandler King",
  },
  description,
  keywords: [
    "Chandler King",
    "agentic engineer",
    "Sozo Tech Enterprise",
    "AnglerIQ",
    "The Sozo CRM",
    "AI mobile app",
    "fish finder",
    "startup founder",
    "Head of Technology",
    "React Native",
    "Dallas",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    title: "Chandler King – Founder & Agentic Engineer",
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
        alt: `${SITE.name} — Founder & Agentic Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandler King – Founder & Agentic Engineer",
    description,
    images: [SITE.avatar],
  },
  alternates: {
    canonical: SITE.url,
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
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${syne.variable} ${geistMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider delayDuration={300}>
            <JsonLd />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
