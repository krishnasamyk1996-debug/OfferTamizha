import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://offertamizha.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'OfferTamizha - Best Online Deals in Tamil', template: '%s | OfferTamizha' },
  description: 'Smart shopping deals from leading Indian marketplaces, curated for Tamil shoppers.',
  applicationName: 'OfferTamizha',
  alternates: { canonical: '/' },
  manifest: '/manifest.webmanifest',
  icons: { icon: '/assets/favicon.webp', apple: '/assets/favicon.webp' },
  openGraph: { type: 'website', siteName: 'OfferTamizha', url: siteUrl, title: 'OfferTamizha - Best Online Deals in Tamil', description: 'Deals in Tamil • Save More • Live Better', images: ['/assets/logo.webp'] },
  twitter: { card: 'summary_large_image', title: 'OfferTamizha', description: 'Deals in Tamil • Save More • Live Better', images: ['/assets/logo.webp'] },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f97316', colorScheme: 'light dark' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = { '@context':'https://schema.org', '@type':'WebSite', name:'OfferTamizha', url:siteUrl, potentialAction:{ '@type':'SearchAction', target:`${siteUrl}/?q={search_term_string}`, 'query-input':'required name=search_term_string' } }
  return <html lang="en-IN" suppressHydrationWarning><body className="min-h-screen bg-slate-50 text-slate-950 antialiased dark:bg-slate-950 dark:text-slate-100">{children}<Script id="website-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} /></body></html>
}
