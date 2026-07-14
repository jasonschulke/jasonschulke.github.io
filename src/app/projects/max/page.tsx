import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { ProjectDate } from '@/components/ProjectDate'

import heroImage from './max_hero.png'
import settingsImage from './max_settings.png'

export const metadata: Metadata = {
  title: 'Max - macOS Dock Customization Utility',
  description:
    'A lightweight menu bar app that gives you full control over your macOS Dock appearance with customizable visual effects, colors, and materials.',
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

export default function Max() {
  return (
    <Container className="mt-9 sm:mt-16">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Max
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          A lightweight menu bar application for macOS that overlays customizable
          visual effects on the Dock region, providing full control over colors,
          materials, and visual effects.
        </p>
        <p className="mt-4 text-base">
          <Link
            href="https://github.com/jasonschulke/max"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            View on GitHub →
          </Link>
        </p>
        <ProjectDate slug="max" />
      </header>

      <div className="mt-12">
        <Image
          src={heroImage}
          alt="Max app showing Dock customization"
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
            macOS gives you limited control over your Dock&apos;s appearance. While you can
            change its size and position, customizing the background, materials, or visual
            effects requires hacks or workarounds. I wanted a simple full-width effect with
            minimal implementation—a clean, native way to personalize my Dock without
            sacrificing system stability or performance.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            The Solution
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            <strong className="text-zinc-900 dark:text-zinc-100">Max</strong> sits in your
            menu bar and overlays a customizable visual layer on top of your Dock. It uses
            native macOS visual effect materials and blending modes to create seamless,
            performant customizations. Configure it once, and it adapts automatically to
            screen changes, spaces, and multi-display setups.
          </p>
        </section>

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
                  feature="Visual Customization"
                  description="Adjustable overlay height (20-300px), custom colors, vertical gradients, and 10 macOS visual effect materials to choose from."
                />
                <FeatureRow
                  feature="Blending Modes"
                  description="Choose between Behind Window or Within Window blending with separate opacity controls for effect and background layers."
                />
                <FeatureRow
                  feature="Menu Bar Integration"
                  description="Quick toggle and settings access right from your menu bar. Launch at Login support for macOS 13+."
                />
                <FeatureRow
                  feature="Multi-Display Support"
                  description="Automatically adapts to screen changes and works seamlessly across multiple displays and Universal Spaces."
                />
                <FeatureRow
                  feature="Live Preview"
                  description="See changes in real-time as you adjust settings. Smooth animated transitions between configurations."
                />
                <FeatureRow
                  feature="Non-Intrusive Design"
                  description="Overlay ignores mouse events so you can interact with your Dock normally."
                />
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-12">
          <Image
            src={settingsImage}
            alt="Max settings window showing customization options"
            className="rounded-2xl"
          />
          <p className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-400">
            @max_settings
          </p>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Architecture
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Max uses a modern reactive architecture built with Swift and Combine, following a
            clear separation of concerns:
          </p>
          <div className="mt-6 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700">
            <code className="block text-sm text-zinc-600 dark:text-zinc-400">
              Services (state management) → Windows (UI rendering) →<br />
              Managers (system integration) → Models (data structures)
            </code>
          </div>
          <ul className="mt-6 space-y-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            <li className="flex gap-3">
              <span className="text-indigo-500">•</span>
              <span>Reactive state management through ConfigurationService</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-500">•</span>
              <span>Memory-safe Combine subscriptions with weak references</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-500">•</span>
              <span>Debounced auto-save (100ms) to prevent excessive disk writes</span>
            </li>
            <li className="flex gap-3">
              <span className="text-indigo-500">•</span>
              <span>NSScreen.main.visibleFrame calculations for precise Dock positioning</span>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Tech Stack
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <TechTag>Swift</TechTag>
            <TechTag>Combine</TechTag>
            <TechTag>AppKit</TechTag>
            <TechTag>NSKeyedArchiver</TechTag>
            <TechTag>UserDefaults</TechTag>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Recommended Settings
          </h2>
          <div className="mt-6 rounded-2xl bg-zinc-100 p-6 dark:bg-zinc-800">
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex justify-between">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">Material:</span>
                <span>Under Window Background</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">Background Opacity:</span>
                <span>85-95%</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">Effect Opacity:</span>
                <span>90-100%</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">Height:</span>
                <span>Adjust to match Dock size</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Links
          </h2>
          <div className="mt-6 flex gap-4">
            <Link
              href="https://github.com/jasonschulke/max"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              View on GitHub
            </Link>
          </div>
        </section>
      </div>
    </Container>
  )
}
