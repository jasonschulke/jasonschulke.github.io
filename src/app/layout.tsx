import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

const siteUrl = 'https://jasonschulke.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s - Jason Schulke',
    default: 'Jason Schulke - Operations & CX Leader',
  },
  description:
    'I design operational and customer-facing systems for complex products, focusing on reducing friction, improving clarity, and enabling better decisions at scale.',
  keywords: [
    'Solutions Architect',
    'Customer Education',
    'SaaS Consulting',
    'Product Education',
    'Operations',
    'Austin',
    'Texas',
  ],
  authors: [{ name: 'Jason Schulke', url: siteUrl }],
  creator: 'Jason Schulke',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Jason Schulke',
    title: 'Jason Schulke - Operations & CX Leader',
    description:
      'I design operational and customer-facing systems for complex products, focusing on reducing friction, improving clarity, and enabling better decisions at scale.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jason Schulke',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jason Schulke - Operations & CX Leader',
    description:
      'I design operational and customer-facing systems for complex products, focusing on reducing friction, improving clarity, and enabling better decisions at scale.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
