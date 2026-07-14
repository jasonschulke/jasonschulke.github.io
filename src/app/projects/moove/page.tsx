import { type Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { ProjectDate } from '@/components/ProjectDate'

import heroImage from './moove_hero.png'
import highlightsImage from './moove_highlights.png'

export const metadata: Metadata = {
  title: 'Moove - Personal Workout Tracking PWA',
  description:
    'A minimalist, offline-first workout tracker with AI coaching built-in. Designed for people who want to stay consistent without the bloat.',
}

function FeatureRow({ feature, description }: { feature: string; description: string }) {
  return (
    <tr className="border-b border-zinc-200 dark:border-zinc-700">
      <td className="whitespace-nowrap py-3 pr-4 font-medium text-zinc-900 dark:text-zinc-100">
        {feature}
      </td>
      <td className="py-3 text-zinc-600 dark:text-zinc-400">{description}</td>
    </tr>
  )
}

function TechTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-lg bg-indigo-500/10 px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400">
      {children}
    </span>
  )
}

function LearningItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative border-b border-zinc-100 py-3 pl-6 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
      <span className="absolute left-0 text-indigo-500">&#10003;</span>
      {children}
    </li>
  )
}

export default function Moove() {
  return (
    <Container className="mt-9 sm:mt-16">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Moove
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          A minimalist, offline-first workout tracker with AI coaching built-in.
          Designed for people who want to stay consistent without the bloat.
        </p>
        <ProjectDate slug="moove" />
      </header>

      <div className="mt-12">
        <Image
          src={heroImage}
          alt="Moove app hero"
          className="rounded-2xl"
          priority
        />
      </div>

      <div className="mt-16">
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            The Problem
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Most fitness apps are bloated with social features, paywalls, and subscription tiers.
            I wanted a workout tracker that was fast, worked offline, and didn&apos;t try to upsell me
            every time I logged a set.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            The Solution
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            <strong className="text-zinc-900 dark:text-zinc-100">Moove</strong> is a personal
            workout tracking PWA built with React, TypeScript, and Tailwind. It&apos;s offline-first,
            installable on any device, and includes an AI coach powered by Claude.
          </p>
        </section>

        <div className="mt-12">
          <Image
            src={highlightsImage}
            alt="Moove app feature highlights"
            className="rounded-2xl"
          />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Key Features
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                    Feature
                  </th>
                  <th className="py-3 text-left text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <FeatureRow
                  feature="Offline-first"
                  description="Works without internet. Data syncs when you're back online via Netlify Blobs."
                />
                <FeatureRow
                  feature="GitHub-style calendar"
                  description="Visual contribution grid showing workout consistency over the year."
                />
                <FeatureRow
                  feature="AI Coach"
                  description="Claude-powered assistant that answers fitness questions and can add custom exercises via natural language."
                />
                <FeatureRow
                  feature="Apple Health Import"
                  description="Parses Health export XML files (streaming for 100MB+ files) to import historical workouts."
                />
                <FeatureRow
                  feature="Customizable personality"
                  description="AI coach can be neutral, sarcastic, encouraging, zen, or flirty."
                />
                <FeatureRow
                  feature="TV Mode"
                  description="Landscape view for propping up your phone during workouts."
                />
                <FeatureRow
                  feature="50+ exercises"
                  description="Organized by movement pattern (squat, hinge, push, pull, etc.)."
                />
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Tech Stack
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <TechTag>React 19</TechTag>
            <TechTag>TypeScript</TechTag>
            <TechTag>Tailwind CSS v4</TechTag>
            <TechTag>Vite 7</TechTag>
            <TechTag>Netlify Functions</TechTag>
            <TechTag>Netlify Blobs</TechTag>
            <TechTag>Anthropic Claude API</TechTag>
            <TechTag>Supabase</TechTag>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            What I Learned
          </h2>
          <ul className="mt-6">
            <LearningItem>PWAs can deliver near-native experiences without App Store overhead</LearningItem>
            <LearningItem>Streaming XML parsing is essential for large Apple Health exports</LearningItem>
            <LearningItem>AI integration adds genuine utility when scoped tightly (exercise creation, Q&amp;A)</LearningItem>
            <LearningItem>Offline-first architecture requires careful thought about sync conflicts</LearningItem>
            <LearningItem>A GitHub-style contribution calendar is surprisingly motivating for habit tracking</LearningItem>
          </ul>
        </section>
      </div>
    </Container>
  )
}
