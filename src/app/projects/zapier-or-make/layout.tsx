import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zapier vs Make Pricing Calculator - Find the Cheapest Automation Plan',
  description:
    'Compare Zapier and Make pricing side-by-side. Enter your Zapier usage to estimate Make operations and find which automation platform costs less for your workflows.',
  keywords: [
    'Zapier pricing',
    'Make pricing',
    'Zapier vs Make',
    'automation pricing calculator',
    'Zapier alternative',
    'Make vs Zapier cost',
    'workflow automation pricing',
  ],
  openGraph: {
    title: 'Zapier vs Make Pricing Calculator',
    description:
      'Compare Zapier and Make pricing side-by-side. Find the cheapest automation plan for your workflows.',
    type: 'website',
    images: [
      {
        url: '/projects/zapier-or-make/zapier_vs_make_project_image.png',
        width: 1200,
        height: 630,
        alt: 'Zapier vs Make Pricing Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zapier vs Make Pricing Calculator',
    description:
      'Compare Zapier and Make pricing side-by-side. Find the cheapest automation plan for your workflows.',
    images: ['/projects/zapier-or-make/zapier_vs_make_project_image.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Zapier vs Make Pricing Calculator',
  description:
    'Compare Zapier and Make pricing to find the cheapest automation platform for your workflows.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Compare Zapier and Make pricing',
    'Convert Zapier tasks to Make operations',
    'Find the best value automation plan',
    'Side-by-side plan comparison',
  ],
}

export default function ZapierOrMakeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
