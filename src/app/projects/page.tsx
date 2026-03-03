import { type Metadata } from 'next'
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'

import bucketsHero from './buckets/buckets.png'
import mooveHero from './moove/moove_hero.png'
import returnWindowHero from './return-window/return_window.png'
import cardboardHero from './cardboard-co/urban-billboard-mockup.png'
import zapMakeHero from './zapier-or-make/zapier_vs_make_project_image.png'
import claudeSkillsHero from './claude-code-skills/hero.png'
import maxHero from './max/max_hero.png'

export const metadata: Metadata = {
  title: 'Projects',
  description: "Things I've built, from side projects to pilots to tools.",
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
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {project.name}
          </h2>
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

export default function Projects() {
  return (
    <Container className="mt-9 sm:mt-16">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Projects
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          Things I&apos;ve built, from side projects to pilots to tools.
        </p>
      </header>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.href} project={project} />
        ))}
      </div>
    </Container>
  )
}
