import type { Metadata } from "next";
import Script from 'next/script'
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'War Protest Map | Real-Time Intelligence',
    template: '%s | War Protest Map'
  },
  description: 'Mapping anti-war protests, peace demonstrations, and civilian opposition movements to armed conflicts worldwide',
  keywords: 'anti-war protests, peace demonstrations, war protest map, civilian opposition, protest tracker, peace movement',
  openGraph: {
    type: 'website',
    siteName: 'War Protest Map',
    title: 'War Protest Map | Real-Time Intelligence',
    description: 'Mapping anti-war protests, peace demonstrations, and civilian opposition movements to armed conflicts worldwide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'War Protest Map',
    description: 'Mapping anti-war protests, peace demonstrations, and civilian opposition movements to armed conflicts worldwide',
  },
  verification: {
    google: 'WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc',
  },
  other: {
    'google-adsense-account': 'ca-pub-7098271335538021',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "War Protest Map",
              "url": "https://war-protest-map.vercel.app",
              "description": "Mapping anti-war protests, peace demonstrations, and civilian opposition to armed conflicts worldwide",
              "publisher": { "@type": "Organization", "name": "War Protest Map", "url": "https://war-protest-map.vercel.app" }
            })
          }}
        />
      </head>
      <body>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
