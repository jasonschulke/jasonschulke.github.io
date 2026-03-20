import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { WorkHistory, type WorkRole } from '@/components/WorkHistory'
import Image from 'next/image'
import Link from 'next/link'
import prepWorkLogo from '@/images/prep_work_logo.png'
import commonRoomLogo from '@/images/Common Room_logo.png'
import airtableLogo from '@/images/airtable_logo.png'
import austinStoneLogo from '@/images/ascc.png'
import habitatLogo from '@/images/habitat.png'
import makeLogo from '@/images/make_logo.png'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'My professional journey through operations, customer support and education, scalable systems design, and software development.',
  openGraph: {
    title: 'Experience - Jason Schulke',
    description:
      'My professional journey through operations, customer support and education, scalable systems design, and software development.',
  },
}

const workHistory: WorkRole[] = [
  {
    title: 'Principal Solutions Architect',
    company: 'Prep Work',
    companyUrl: 'https://prepwork.co',
    location: 'Austin, TX',
    period: '2024 - Present',
    logo: prepWorkLogo,
    highlights: [
      'Built a custom full-stack React application to replace tedious manual processes for an event company. Developed interactive 2D/3D stage configurator with real-time rendering (Konva.js, PixiJS), role-based permissions, and serverless API (Netlify Functions, Supabase). Enabled staff to generate accurate quotes with automated material calculations in minutes instead of hours.',
      'Designed and shipped a full customer education ecosystem (LMS, documentation, certification) for a complex SaaS product, enabling self-service that reduced support volume and increased customer retention.',
      'Developed a custom web app for a modular flooring manufacturer, integrating design, quoting, and production data to automate workflows, reduce manual input, and improve order accuracy.',
      'Built a global campaign management platform for Levi to unify 100K+ products and creative assets, streamlining marketing operations across teams and regions.',
      'Engineered an automated inventory system with custom APIs for barcode generation, live tracking, and real-time leadership dashboards.',
      "Delivered an internal coordination platform for AARP's Public Policy Institute to manage campaigns, events, and publications, improving visibility and cross-team collaboration.",
    ],
  },
  {
    title: 'Senior Manager, Customer Education',
    company: 'Common Room',
    companyUrl: 'https://commonroom.io',
    location: 'Seattle, WA',
    period: '2023 - 2024',
    logo: commonRoomLogo,
    highlights: [
      "Hired to build Common Room's customer education function from the ground up during a period of rapid product evolution.",
      'Created a scalable education and enablement strategy aligned with a company-wide shift toward self-service, cutting onboarding time by 50% and technical integration time by 60%.',
      'Worked directly with customers and support teams to investigate complex integration and feature-related issues, translating those findings into documentation, tooling, and internal process changes.',
      'Partnered closely with Product, Engineering, Sales, and Success to support feature launches, identify emerging support risks, and improve customer understanding during periods of rapid change.',
    ],
  },
  {
    title: 'Manager, Support Operations',
    company: 'Airtable',
    companyUrl: 'https://airtable.com',
    location: 'San Francisco, CA',
    period: '2018 - 2023',
    logo: airtableLogo,
    highlights: [
      "Built and scaled Airtable's Support organization and operational backbone from launch through global scale, spanning internal teams and external partners.",
      "Designed and owned Airtable's first self-service, knowledge, and Content Operations systems, achieving a 35:1 self-service rate, 52% instant resolution, and a 30% reduction in ticket volume.",
      'Designed specialization frameworks and escalation paths that reduced handoffs, improved resolution of complex issues, and strengthened collaboration across Support, Product, and Engineering.',
      'Led end-to-end evaluation and implementation of core support tooling (Zendesk, Salesforce), owning workflows, routing, automation, dashboards, and long-term system strategy while remaining hands-on in case review and escalations.',
      'Built support analytics and reporting used in executive reviews and cross-functional planning to inform prioritization, staffing, and product decisions, and implemented Knowledge-Centered Service (KCS) to increase content accuracy, velocity, and trust.',
    ],
  },
  {
    title: 'Operations Program Manager',
    company: 'The Austin Stone',
    location: 'Austin, TX',
    period: '2013 - 2018',
    logo: austinStoneLogo,
    highlights: [
      'Lead marketing and member education for new initiatives, ran implementation and enablement for new technology infrastructure impacting thousands of internal users, built financial modeling and forecasting systems, assisted with facility acquisitions, coordinated and hosted large events, and more.',
    ],
  },
  {
    title: 'Director of Operations',
    company: 'B/CS Habitat for Humanity',
    location: 'Bryan, TX',
    period: '2011 - 2013',
    logo: habitatLogo,
    highlights: [
      'Grew revenue by 150% over a two-year period through improved internal processes and procedures, new donor recruitment and procurement strategies, marketing initiatives, and management of full-time staff and volunteers.',
    ],
  },
]

export default function Experience() {
  return (
    <SimpleLayout
      title="Experience"
      intro="My professional journey through operations, customer support and education, scalable systems design, and software development."
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
        {/* Work History - Left Column */}
        <div>
          <WorkHistory roles={workHistory} />
        </div>

        {/* Certifications - Right Sidebar */}
        <div className="lg:self-start">
          <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-700/40 dark:bg-zinc-800/50">
            <h2 className="flex items-center gap-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white dark:bg-zinc-800">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-6 w-6"
                >
                  <path
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
                  />
                </svg>
              </div>
              <span>Certifications</span>
            </h2>
            <div className="mt-4 border-t border-zinc-200 dark:border-zinc-700" />
            <ol className="mt-4 space-y-4">
              <li>
                <Link
                  href="https://www.credly.com/badges/18277559-0cb9-4565-9dd3-35a3f1697282/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4"
                >
                  <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center">
                    <Image
                      src={makeLogo}
                      alt="Make"
                      className="h-7 w-7 object-contain transition group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <dl className="flex flex-auto flex-wrap gap-x-2">
                    <dt className="sr-only">Certification</dt>
                    <dd className="w-full flex-none text-sm font-medium text-zinc-900 group-hover:text-indigo-500 dark:text-zinc-100 dark:group-hover:text-indigo-400">
                      AI Agent Builder
                    </dd>
                    <dt className="sr-only">Issuer</dt>
                    <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                      Make Academy
                    </dd>
                    <dt className="sr-only">Year</dt>
                    <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
                      2026
                    </dd>
                  </dl>
                </Link>
              </li>
              <li>
                <Link
                  href="https://coursera.org/verify/XIAIVIXBGEZ8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4"
                >
                  <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-7 w-7 transition group-hover:scale-105" aria-hidden="true">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </div>
                  <dl className="flex flex-auto flex-wrap gap-x-2">
                    <dt className="sr-only">Certification</dt>
                    <dd className="w-full flex-none text-sm font-medium text-zinc-900 group-hover:text-indigo-500 dark:text-zinc-100 dark:group-hover:text-indigo-400">
                      AI Fundamentals
                    </dd>
                    <dt className="sr-only">Issuer</dt>
                    <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                      Google
                    </dd>
                    <dt className="sr-only">Year</dt>
                    <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
                      2026
                    </dd>
                  </dl>
                </Link>
              </li>
              <li>
                <Link
                  href="https://coursera.org/share/9653a059323d2a5ad53a86007e403094"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4"
                >
                  <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-7 w-7 transition group-hover:scale-105" aria-hidden="true">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </div>
                  <dl className="flex flex-auto flex-wrap gap-x-2">
                    <dt className="sr-only">Certification</dt>
                    <dd className="w-full flex-none text-sm font-medium text-zinc-900 group-hover:text-indigo-500 dark:text-zinc-100 dark:group-hover:text-indigo-400">
                      AI for Planning
                    </dd>
                    <dt className="sr-only">Issuer</dt>
                    <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                      Google
                    </dd>
                    <dt className="sr-only">Year</dt>
                    <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
                      2026
                    </dd>
                  </dl>
                </Link>
              </li>
              <li>
                <Link
                  href="https://verify.skilljar.com/c/bo2pzkz6zu2q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4"
                >
                  <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center">
                    <Image
                      src={airtableLogo}
                      alt="Airtable"
                      className="h-7 w-7 object-contain transition group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <dl className="flex flex-auto flex-wrap gap-x-2">
                    <dt className="sr-only">Certification</dt>
                    <dd className="w-full flex-none text-sm font-medium text-zinc-900 group-hover:text-indigo-500 dark:text-zinc-100 dark:group-hover:text-indigo-400">
                      Certified Builder
                    </dd>
                    <dt className="sr-only">Issuer</dt>
                    <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                      Airtable
                    </dd>
                    <dt className="sr-only">Year</dt>
                    <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
                      2024
                    </dd>
                  </dl>
                </Link>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </SimpleLayout>
  )
}
