import { type Metadata } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout'
import { Section } from '@/components/Section'
import { WorkHistory, type WorkRole } from '@/components/WorkHistory'
import prepWorkLogo from '@/images/prep_work_logo.png'
import commonRoomLogo from '@/images/Common Room_logo.png'
import airtableLogo from '@/images/airtable_logo.png'
import austinStoneLogo from '@/images/ascc.png'
import habitatLogo from '@/images/habitat.png'

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
      </div>
    </SimpleLayout>
  )
}
