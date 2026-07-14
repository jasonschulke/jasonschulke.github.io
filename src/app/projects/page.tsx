import { type Metadata } from 'next'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import articles from '@/data/articles.json'

import bucketsHero from './buckets/buckets.png'
import mooveHero from './moove/moove_hero.png'
import returnWindowHero from './return-window/return_window.png'
import cardboardHero from './cardboard-co/urban-billboard-mockup.png'
import zapMakeHero from './zapier-or-make/zapier_vs_make_project_image.png'
import claudeSkillsHero from './claude-code-skills/hero.png'
import maxHero from './max/max_hero.png'
import papayaHero from './papaya/papaya_hero.jpg'
import hootenannyHero from './hootenanny/hootenanny_hero.png'

export const metadata: Metadata = {
  title: 'Work',
  description:
    "Things I've built and written, from side projects and pilots to essays on product education and operations.",
}

type Project = {
  name: string
  description: string
  href: string
  image?: StaticImageData
  badge?: { label: string; variant: 'soon' | 'pilot' }
}

const projects: Project[] = [
  {
    name: 'Hootenanny',
    description:
      'A playful event invitation web app inspired by Apple Invites. Create beautiful invites, share a link, and track RSVPs — no accounts required.',
    href: '/projects/hootenanny',
    image: hootenannyHero,
  },
  {
    name: 'Papaya',
    description:
      'A unified house hunting tool that lets you save, rate, and organize homes from any listing site with just one click.',
    href: '/projects/papaya',
    image: papayaHero,
  },
  {
    name: 'Max',
    description:
      'A lightweight macOS menu bar app that gives you full control over your Dock appearance with customizable visual effects, colors, and materials.',
    href: '/projects/max',
    image: maxHero,
  },
  {
    name: 'Return Window',
    description:
      'Never miss a return deadline again. Forward your order confirmations and get reminded before return windows close.',
    href: '/projects/return-window',
    image: returnWindowHero,
    badge: { label: 'Soon', variant: 'soon' },
  },
  {
    name: 'Cardboard Co',
    description:
      'An exercise in building an idea, brand, and testing product-market fit with a hyperlocal recycling service in Austin, TX.',
    href: '/projects/cardboard-co',
    image: cardboardHero,
    badge: { label: 'Pilot', variant: 'pilot' },
  },
  {
    name: 'Claude Code Skills',
    description:
      'A suite of complementary Claude Code skills for managing project context, progress, and releases.',
    href: '/projects/claude-code-skills',
    image: claudeSkillsHero,
  },
  {
    name: 'Buckets',
    description:
      'A simple prioritization tool with a retro twist. Drop tasks into buckets, drag to reorder, and focus on what matters most.',
    href: '/projects/buckets',
    image: bucketsHero,
  },
  {
    name: 'Moove',
    description:
      'A minimalist, offline-first workout tracker with AI coaching built-in. Designed for people who want to stay consistent without the bloat.',
    href: '/projects/moove',
    image: mooveHero,
  },
  {
    name: 'Zapier or Make',
    description:
      'Zapier and Make use fundamentally different billing models. This tool estimates your Make operations from Zapier usage and finds the lowest-cost plan.',
    href: '/projects/zapier-or-make',
    image: zapMakeHero,
  },
]

interface WritingItem {
  title: string
  link: string
  description: string
  pubDate: string
  creator: string
  image?: string | null
}

function formatArticleDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-zinc-100 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
    >
      {project.image ? (
        <div className="aspect-[16/9] overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-zinc-200 dark:bg-zinc-700">
          <span className="text-4xl font-bold text-zinc-400 dark:text-zinc-500">
            {project.name[0]}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {project.name}
          </h3>
          {project.badge && (
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                project.badge.variant === 'pilot'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
              }`}
            >
              {project.badge.label}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>
      </div>
    </Link>
  )
}

function WritingRow({ article }: { article: WritingItem }) {
  const isExternal = /^https?:\/\//.test(article.link)

  return (
    <li>
      <Link
        href={article.link}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        className="group flex flex-col gap-1 border-b border-zinc-100 py-5 transition sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 dark:border-zinc-800"
      >
        <div className="sm:flex-1">
          <h3 className="text-base font-semibold text-zinc-800 transition group-hover:text-indigo-500 dark:text-zinc-100 dark:group-hover:text-indigo-400">
            {article.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {article.description}
          </p>
        </div>
        <time
          dateTime={article.pubDate}
          className="mt-1 shrink-0 text-sm text-zinc-400 sm:mt-0 sm:w-36 sm:text-right dark:text-zinc-500"
        >
          {formatArticleDate(article.pubDate)}
        </time>
      </Link>
    </li>
  )
}

export default function Work() {
  return (
    <Container className="mt-9 sm:mt-16">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Work
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          A mix of things I&apos;ve built and things I&apos;ve written. Side
          projects, pilots, and tools, alongside essays on product education,
          operations, and building systems that scale.
        </p>
      </header>

      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          Projects
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.href} project={project} />
          ))}
        </div>
      </section>

      <section id="writing" className="mt-20 scroll-mt-24">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          Writing
        </h2>
        <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          Essays on product education, support operations, and building systems
          that scale, published on my Substack newsletter, Product Education.
        </p>
        <ul className="mt-6">
          {(articles as WritingItem[]).map((article) => (
            <WritingRow key={article.link} article={article} />
          ))}
        </ul>
        <div className="mt-10">
          <Link
            href="https://producteducation.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            Browse the full archive on Substack
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24l9.56-5.573 9.52 5.573V10.812H1.46zm0-7.971h21.08V0H1.46v2.841z" />
            </svg>
          </Link>
        </div>
      </section>
    </Container>
  )
}
