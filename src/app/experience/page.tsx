import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { Section } from '@/components/Section'
import { WorkHistory, type WorkRole } from '@/components/WorkHistory'
import Image from 'next/image'
import Link from 'next/link'
import prepWorkLogo from '@/images/prep_work_logo.png'
import commonRoomLogo from '@/images/Common Room_logo.png'
import airtableLogo from '@/images/airtable_logo.png'
import austinStoneLogo from '@/images/ascc.png'
import habitatLogo from '@/images/habitat.png'
import makeAiAgentBadge from '@/images/make-ai-agent-builder.png'

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'My professional journey through support operations, customer education, and scalable systems design.',
  openGraph: {
    title: 'Experience - Jason Schulke',
    description:
      'My professional journey through support operations, customer education, and scalable systems design.',
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
      'Led operations programs across a multi-site organization, managing logistics, budgets, and cross-team coordination.',
    ],
  },
  {
    title: 'Director of Operations',
    company: 'Habitat for Humanity Bryan College Station',
    location: 'Bryan, TX',
    period: '2011 - 2013',
    logo: habitatLogo,
    highlights: [
      'Directed operations for the local affiliate, overseeing construction schedules, volunteer coordination, and community partnerships.',
    ],
  },
]

export default function Experience() {
  return (
    <SimpleLayout
      title="Experience"
      intro="My professional journey through support operations, customer education, and scalable systems design."
    >
      <div className="space-y-20">
        <Section title="Work history">
          <WorkHistory roles={workHistory} />
        </Section>
        <Section title="Certifications">
          <div className="flex flex-wrap gap-8">
            <Link
              href="https://www.credly.com/badges/18277559-0cb9-4565-9dd3-35a3f1697282/public_url"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <Image
                src={makeAiAgentBadge}
                alt="Make AI Agent Builder Certification"
                className="h-24 w-24 transition group-hover:scale-105"
              />
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  AI Agent Builder
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Make Academy · 2026
                </p>
              </div>
            </Link>
            <Link
              href="https://verify.skilljar.com/c/bo2pzkz6zu2q"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white transition group-hover:scale-105 dark:bg-zinc-800">
                <Image
                  src={airtableLogo}
                  alt="Airtable Builder Certification"
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Certified Builder
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Airtable Academy · 2024
                </p>
              </div>
            </Link>
            <Link
              href="https://coursera.org/verify/XIAIVIXBGEZ8"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white transition group-hover:scale-105 dark:bg-zinc-800">
                <svg viewBox="0 0 24 24" className="h-14 w-14" aria-hidden="true">
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
              <div className="text-center">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  AI Fundamentals
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Google · 2026
                </p>
              </div>
            </Link>
          </div>
        </Section>
      </div>
    </SimpleLayout>
  )
}
