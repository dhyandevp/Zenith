import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EBFADB" },
    { media: "(prefers-color-scheme: dark)", color: "#293E33" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://zenith.app"),
  title: {
    default: "Zenith — Digital Museum",
    template: "%s | Zenith",
  },
  description:
    "Discover, explore, and share curated digital artifacts. Movies, games, books, software, music, and more — beautifully organized in one place.",
  applicationName: "Zenith",
  authors: [{ name: "Dhyandev P", url: "https://linktr.ee/DhyandevRTX" }],
  creator: "Dhyandev P",
  publisher: "Dhyandev P",
  keywords: [
    "digital museum",
    "artifacts",
    "movies",
    "games",
    "books",
    "software",
    "music",
    "curation",
  ],
  openGraph: {
    title: "Zenith — Digital Museum",
    description:
      "Discover, explore, and share curated digital artifacts. Movies, games, books, software, music, and more.",
    type: "website",
    locale: "en_US",
    siteName: "Zenith",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zenith — Digital Museum",
    description:
      "Discover, explore, and share curated digital artifacts. Movies, games, books, software, music, and more.",
    creator: "@DhyandevP",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
        suppressHydrationWarning
        data-scroll-behavior="smooth"
      >
        <body className="min-h-full flex flex-col" suppressHydrationWarning>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Zenith",
                url: process.env.NEXT_PUBLIC_APP_URL || "https://zenith.app",
                description: "Discover, explore, and share curated digital artifacts.",
              }),
            }}
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
