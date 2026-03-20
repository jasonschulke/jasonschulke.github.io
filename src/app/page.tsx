import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon } from '@/components/SocialIcons'
import { HeroCarousel, type CarouselSlide } from '@/components/HeroCarousel'
import austinImage from '@/images/austin.jpg'
import prepWorkLogo from '@/images/prep_work_logo.png'
import commonRoomLogo from '@/images/Common Room_logo.png'
import airtableLogo from '@/images/airtable_logo.png'
import craigStossImage from '@/images/craig_stoss.jpg'
import joshGroseImage from '@/images/josh_grose.jpg'
import makeAiAgentBadge from '@/images/make-ai-agent-builder.png'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jason Schulke',
  url: 'https://jasonschulke.com',
  jobTitle: 'Principal Solutions Architect',
  worksFor: {
    '@type': 'Organization',
    name: 'Prep Work',
    url: 'https://prepwork.co',
  },
  sameAs: [
    'https://github.com/jasonschulke',
    'https://linkedin.com/in/jasonschulke',
    'https://producteducation.substack.com',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Austin',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  description:
    'Operations and CX Leader designing operational and customer-facing systems for complex products.',
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

function SubstackIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24l9.56-5.573 9.52 5.573V10.812H1.46zm0-7.971h21.08V0H1.46v2.841z" />
    </svg>
  )
}

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface Role {
  company: string
  title: string
  logo: typeof prepWorkLogo
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
  url?: string
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  const logoImage = (
    <Image
      src={role.logo}
      alt={role.company}
      className="h-7 w-7 object-contain"
      unoptimized
    />
  )

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white dark:bg-zinc-800">
        {role.url ? (
          <Link href={role.url} target="_blank" rel="noopener noreferrer">
            {logoImage}
          </Link>
        ) : (
          logoImage
        )}
      </div>
      <dl className="flex flex-auto flex-col">
        <div className="flex items-center justify-between">
          <dt className="sr-only">Company</dt>
          <dd className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            {role.url ? (
              <Link
                href={role.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-500 dark:hover:text-indigo-400"
              >
                {role.company}
              </Link>
            ) : (
              role.company
            )}
          </dd>
          <dt className="sr-only">Date</dt>
          <dd
            className="text-xs text-zinc-400 dark:text-zinc-500"
            aria-label={`${startLabel} until ${endLabel}`}
          >
            <time dateTime={startDate}>{startLabel}</time>{' '}
            <span aria-hidden="true">—</span>{' '}
            <time dateTime={endDate}>{endLabel}</time>
          </dd>
        </div>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: 'Prep Work',
      title: 'Principal Solutions Architect',
      logo: prepWorkLogo,
      start: '2024',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
      url: 'https://prepwork.co',
    },
    {
      company: 'Common Room',
      title: 'Senior Manager, Customer Education',
      logo: commonRoomLogo,
      start: '2023',
      end: '2024',
      url: 'https://commonroom.io',
    },
    {
      company: 'Airtable',
      title: 'Manager, Support Operations',
      logo: airtableLogo,
      start: '2018',
      end: '2023',
      url: 'https://airtable.com',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-700/40 dark:bg-zinc-800/50">
      <h2 className="flex items-center gap-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white dark:bg-zinc-800">
          <BriefcaseIcon className="h-6 w-6" />
        </div>
        <span>Recent Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button
        href="/experience"
        variant="primary"
        className="group mt-6 w-full bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500"
      >
        View All Experience
        <ArrowDownIcon className="h-4 w-4 rotate-[-90deg] stroke-white transition" />
      </Button>
    </div>
  )
}

function Certifications() {
  return (
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
      <ol className="mt-6 space-y-4">
        <li className="flex gap-4">
          <Image
            src={makeAiAgentBadge}
            alt="Make"
            className="mt-1 h-10 w-10 flex-none"
          />
          <dl className="flex flex-auto flex-wrap gap-x-2">
            <dt className="sr-only">Certification</dt>
            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
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
        </li>
        <li className="flex gap-4">
          <svg viewBox="0 0 24 24" className="mt-1 h-10 w-10 flex-none" aria-hidden="true">
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
          <dl className="flex flex-auto flex-wrap gap-x-2">
            <dt className="sr-only">Certification</dt>
            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
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
        </li>
        <li className="flex gap-4">
          <svg viewBox="0 0 24 24" className="mt-1 h-10 w-10 flex-none" aria-hidden="true">
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
          <dl className="flex flex-auto flex-wrap gap-x-2">
            <dt className="sr-only">Certification</dt>
            <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
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
        </li>
      </ol>
      <Button
        href="/experience"
        variant="primary"
        className="group mt-6 w-full bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500"
      >
        View All Certifications
        <ArrowDownIcon className="h-4 w-4 rotate-[-90deg] stroke-white transition" />
      </Button>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="mt-9 sm:mt-16">
        {/* Hero section - two columns */}
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-12">
          {/* Left column - intro */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              I&apos;m Jason Schulke. I live in Austin, TX, where I design
              systems that scale.
            </h1>
            <div className="mt-6 space-y-7 text-lg text-zinc-600 dark:text-zinc-400">
              <p>
                My{' '}
                <Link
                  href="/experience"
                  className="font-medium text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  career
                </Link>{' '}
                has been built around designing and scaling the operational systems behind great customer experiences.
              </p>
              <p>
                As a consultant, I help companies design the systems that connect
                support, education, and product operations: reducing friction,
                improving clarity, and enabling better decisions at scale.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href="https://github.com/jasonschulke"
                className="group flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                <GitHubIcon className="h-5 w-5 flex-none fill-zinc-800 dark:fill-zinc-300" />
                GitHub
              </Link>
              <Link
                href="https://linkedin.com/in/jasonschulke"
                className="group flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-[#0A66C2] dark:text-zinc-400 dark:hover:text-[#0A66C2]"
              >
                <LinkedInIcon className="h-5 w-5 flex-none fill-[#0A66C2]" />
                LinkedIn
              </Link>
              <Link
                href="https://producteducation.substack.com"
                className="group flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-[#FF6719] dark:text-zinc-400 dark:hover:text-[#FF6719]"
              >
                <SubstackIcon className="h-5 w-5 flex-none fill-[#FF6719]" />
                Substack
              </Link>
              <Link
                href="mailto:jasonschulke@gmail.com"
                className="group flex items-center gap-2 text-sm font-medium text-zinc-600 transition hover:text-indigo-500 dark:text-zinc-400 dark:hover:text-indigo-400"
              >
                <MailIcon className="h-5 w-5 flex-none fill-indigo-500" />
                Email
              </Link>
            </div>
          </div>
          {/* Right column - carousel */}
          <div className="lg:pl-12">
            {/* Mobile carousel - testimonials only */}
            <div className="lg:hidden px-8">
              <HeroCarousel
                slides={[
                  {
                    type: 'testimonial',
                    quote: "Despite our evolving product and often hectic schedules, Jason was flexible, proactive, and collaborative every step of the way. He delivered everything on time, within budget, and with a level of professionalism that made the entire process smooth and productive.",
                    author: "Craig Stoss",
                    authorTitle: "VP of Solutions @ Kodif",
                    authorUrl: "https://www.linkedin.com/in/craigstoss/",
                    authorImage: craigStossImage,
                    bgClass: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50",
                  },
                  {
                    type: 'testimonial',
                    quote: "Jason is a true owner and creative. Everything he delivers is polished and thorough. He works quickly and is resourceful, two valuable characteristics at a startup.",
                    author: "Josh Grose",
                    authorTitle: "Head of Growth @ Common Room",
                    authorUrl: "https://www.linkedin.com/in/joshgrose/",
                    authorImage: joshGroseImage,
                    bgClass: "bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/50 dark:to-orange-950/50",
                  },
                ] as CarouselSlide[]}
                interval={7000}
              />
            </div>
            {/* Desktop carousel - with Austin image */}
            <div className="hidden lg:block">
              <HeroCarousel
                slides={[
                  {
                    type: 'image',
                    src: austinImage,
                    alt: 'Austin, TX skyline',
                  },
                  {
                    type: 'testimonial',
                    quote: "Despite our evolving product and often hectic schedules, Jason was flexible, proactive, and collaborative every step of the way. He delivered everything on time, within budget, and with a level of professionalism that made the entire process smooth and productive.",
                    author: "Craig Stoss",
                    authorTitle: "VP of Solutions @ Kodif",
                    authorUrl: "https://www.linkedin.com/in/craigstoss/",
                    authorImage: craigStossImage,
                    bgClass: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50",
                  },
                  {
                    type: 'testimonial',
                    quote: "Jason is a true owner and creative. Everything he delivers is polished and thorough. He works quickly and is resourceful, two valuable characteristics at a startup.",
                    author: "Josh Grose",
                    authorTitle: "Head of Growth @ Common Room",
                    authorUrl: "https://www.linkedin.com/in/joshgrose/",
                    authorImage: joshGroseImage,
                    bgClass: "bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-950/50 dark:to-orange-950/50",
                  },
                ] as CarouselSlide[]}
                interval={7000}
              />
            </div>
          </div>
        </div>

        {/* Full-width sections */}
        <div className="mt-16 space-y-16 lg:mt-24">
          {/* Culture section */}
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              Culture and collaboration come first.
            </h2>
            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
              Great products rise and fall on the people who build and support
              them. I care deeply about <em>how</em> we work together. It&apos;s just
              as important as <em>what</em> we work on. I bring that belief to
              every engagement.
            </p>
          </div>

          {/* Let's build section */}
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              Let&apos;s build something together.
            </h2>
            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
              Through{' '}
              <Link
                href="https://prepwork.co"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Prep Work
              </Link>
              , I help companies design scalable support operations, customer education programs, and internal tooling.
            </p>
          </div>
        </div>

        {/* Bottom cards - 50/50 layout */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:mt-24 lg:grid-cols-2">
          <Resume />
          <Certifications />
        </div>
      </Container>
    </>
  )
}
