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
    'Solutions Architect and Customer Education Leader designing operational and customer-facing systems for complex products.',
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
    <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-600">
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

export default function Home() {
  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container className="mt-9 sm:mt-16">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-12">
          {/* Left column */}
          <div className="flex flex-col lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                I&apos;m Jason Schulke. I live in Austin, TX, where I design
                systems that scale.
              </h1>
              <div className="mt-6 space-y-7 text-lg text-zinc-600 dark:text-zinc-400">
              <p>
                As a consultant, my focus is helping complex products reduce
                friction, improve clarity, and enable better decisions at scale.
                My work spans strategy, process, software development, and content.
              </p>
              <p>
                My{' '}
                <Link
                  href="/experience"
                  className="font-medium text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  career
                </Link>{' '}
                has been built around creating real value for the people I work with.
              </p>
              <h2 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                I care deeply about culture and how we work together.
              </h2>
              <p>
                Great products rise and fall on the people who build and support
                them. <em>How</em> we work together is just as important as{' '}
                <em>what</em> we work on. I bring that belief to every engagement.
              </p>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 flex flex-wrap gap-x-6 gap-y-3">
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
          {/* Right column */}
          <div className="lg:pl-12 flex flex-col">
            {/* Mobile carousel - testimonials only */}
            <div className="lg:hidden mb-8 px-8">
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
            <div className="lg:mt-12">
              <Resume />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
