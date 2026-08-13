import { type Metadata } from 'next'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { WritingList, type WritingItem } from '@/components/WritingList'
import { projectDates } from '@/data/projectDates'
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
import parsnipTeaser from './parsnip/parsnip_mock.png'
import tenderTeaser from './tender/tender_teaser.png'
import qqTeaser from './qq/qq_teaser.png'

export const metadata: Metadata = {
  title: 'Work',
  description:
    "Things I've built and written, from side projects and pilots to essays on product education and operations.",
}

type Project = {
  name: string
  slug: string
  description?: string
  href?: string
  image?: StaticImageData
  badge?: { label: string; variant: 'soon' | 'pilot' }
}

// Ordered latest first (dates live in @/data/projectDates).
const projects: Project[] = [
  {
    name: "Queen's Quest",
    slug: 'queens-quest',
    description:
      'A gamified RPG task planner. Real-life tasks become quests in a cozy top-down fantasy kingdom, with sub-tasks as chapters and rewards for finishing.',
    image: qqTeaser,
    badge: { label: 'Soon', variant: 'soon' },
  },
  {
    name: 'Tender',
    slug: 'tender',
    description:
      'A gamified conversation starter for couples.',
    image: tenderTeaser,
    badge: { label: 'Soon', variant: 'soon' },
  },
  {
    name: 'Parsnip',
    slug: 'parsnip',
    description:
      'Import recipes from any website, avoid paywalls, and manage recipes.',
    image: parsnipTeaser,
    badge: { label: 'Soon', variant: 'soon' },
  },
  {
    name: 'Return Window',
    slug: 'return-window',
    description:
      'Never miss a return deadline again. Forward your order confirmations and get reminded before return windows close.',
    href: '/projects/return-window',
    image: returnWindowHero,
    badge: { label: 'Soon', variant: 'soon' },
  },
  {
    name: 'Hootenanny',
    slug: 'hootenanny',
    description:
      'A small web app for sending event invitations. Make the invite, send the link, and see who is coming. Guests never have to make an account.',
    href: '/projects/hootenanny',
    image: hootenannyHero,
  },
  {
    name: 'Papaya',
    slug: 'papaya',
    description:
      'A unified house hunting tool that lets you save, rate, and organize homes from any listing site with just one click.',
    href: '/projects/papaya',
    image: papayaHero,
  },
  {
    name: 'Max',
    slug: 'max',
    description:
      'A lightweight macOS menu bar app that gives you full control over your Dock appearance with customizable visual effects, colors, and materials.',
    href: '/projects/max',
    image: maxHero,
  },
  {
    name: 'Cardboard Co',
    slug: 'cardboard-co',
    description:
      'An exercise in building an idea, brand, and testing product-market fit with a hyperlocal recycling service in Austin, TX.',
    href: '/projects/cardboard-co',
    image: cardboardHero,
    badge: { label: 'Pilot', variant: 'pilot' },
  },
  {
    name: 'Moove',
    slug: 'moove',
    description:
      'A minimalist, offline-first workout tracker with AI coaching built-in. Designed for people who want to stay consistent without the bloat.',
    href: '/projects/moove',
    image: mooveHero,
  },
  {
    name: 'Claude Code Skills',
    slug: 'claude-code-skills',
    description:
      'A suite of complementary Claude Code skills for managing project context, progress, and releases.',
    href: '/projects/claude-code-skills',
    image: claudeSkillsHero,
  },
  {
    name: 'Buckets',
    slug: 'buckets',
    description:
      'A simple prioritization tool with a retro twist. Drop tasks into buckets, drag to reorder, and focus on what matters most.',
    href: '/projects/buckets',
    image: bucketsHero,
  },
  {
    name: 'Zapier or Make',
    slug: 'zapier-or-make',
    description:
      'Zapier and Make use fundamentally different billing models. This tool estimates your Make operations from Zapier usage and finds the lowest-cost plan.',
    href: '/projects/zapier-or-make',
    image: zapMakeHero,
  },
]

function ProjectCardInner({ project }: { project: Project }) {
  const date = projectDates[project.slug]

  return (
    <>
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
        {date && (
          <p className="mt-1 text-xs font-medium text-zinc-400 dark:text-zinc-500">
            {date}
          </p>
        )}
        {project.description && (
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {project.description}
          </p>
        )}
      </div>
    </>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const baseClass =
    'group relative flex flex-col overflow-hidden rounded-2xl bg-zinc-100 transition dark:bg-zinc-800'

  if (project.href) {
    return (
      <Link
        href={project.href}
        className={`${baseClass} hover:bg-zinc-200 dark:hover:bg-zinc-700`}
      >
        <ProjectCardInner project={project} />
      </Link>
    )
  }

  return (
    <div className={baseClass}>
      <ProjectCardInner project={project} />
    </div>
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
          A mix of things I&apos;ve built and I&apos;ve written, including apps,
          automations, tools, and articles on building systems that scale.
        </p>
      </header>

      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
          Projects
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
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
        <WritingList articles={articles as WritingItem[]} />
      </section>
    </Container>
  )
}
