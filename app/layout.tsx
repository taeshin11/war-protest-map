import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import VisitorCounter from "@/components/VisitorCounter";
import AdHeader from "@/components/ads/AdHeader";
import AdMobileSticky from "@/components/ads/AdMobileSticky";
import { FeedbackButton } from "@/components/FeedbackButton";

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
    google: 'add-your-google-site-verification-here',
  },
  other: {
    'google-adsense-account': 'ca-pub-add-your-publisher-id-here',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50">
        <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inset-0 rounded-full bg-pink-500 opacity-75"></span>
                <span className="relative rounded-full h-2.5 w-2.5 bg-pink-500"></span>
              </span>
              <Link href="/" className="text-lg font-bold tracking-tight">War Protest Map</Link>
            </div>
            <nav className="flex gap-6 text-sm">
              <Link href="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
              <Link href="/heatmap" className="text-slate-300 hover:text-white transition-colors">Heatmap</Link>
              <Link href="/about" className="text-slate-300 hover:text-white transition-colors">About</Link>
            </nav>
          </div>
          <AdHeader />
        </header>
        <main className="flex-1 w-full">
          {children}
        </main>
        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-slate-700 pt-6 mb-4 mt-4">
              <a href="/about" className="hover:text-white transition-colors">About Us</a>
              <a href="/faq" className="hover:text-white transition-colors">How to Use &amp; FAQ</a>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm">© 2025 War Protest Map. All rights reserved.</p>
              <VisitorCounter />
            </div>
          </div>
        </footer>
        <AdMobileSticky />
        <FeedbackButton siteName="War Protest Map" siteUrl="https://war-protest-map.vercel.app" />
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
      </body>
    </html>
  );
}
