import { type Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/Container'

import heroImage from './papaya_hero.png'
import appImage from './papaya_app.jpg'

export const metadata: Metadata = {
  title: 'Papaya - House Search Companion',
  description:
    'A personal house hunting tool I built to save, rate, and organize homes from any listing site.',
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

export default function Papaya() {
  return (
    <Container className="mt-9 sm:mt-16">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Papaya
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          A personal tool I built to manage my house search. It lets me save
          listings from any site with one click and keeps everything organized
          in one place.
        </p>
      </header>

      <div className="mt-12">
        <Image
          src={heroImage}
          alt="Papaya app showing saved home listings"
          className="rounded-2xl"
          priority
        />
      </div>

      <div className="mt-16">
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Why I Built This
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            House hunting is fragmented. I was browsing Zillow on my phone, Redfin
            on my laptop, and my realtor preferred using their custom MLS
            portal. Each platform has their own benefits, but using them separately wasn't going to work since none of them
            talk to each other. I found myself losing track of which homes
            I&apos;d already seen, forgetting my impressions, and constantly
            switching between tabs to compare listings.
          </p>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            I wanted one place to collect everything—regardless of where I found
            it—with my own ratings and notes attached.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            How It Works
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            I added a JavaScript bookmarklet to my browser. When I&apos;m on any
            listing page (Zillow, Redfin, MLS, or anywhere else ) I click it and the home
            gets saved to Papaya with the relevant details. From there I can add
            ratings, write notes, and see all my saved homes in one unified view.
          </p>
        </section>

        <div className="mt-12">
          <Image
            src={appImage}
            alt="Papaya app interface"
            className="rounded-2xl"
          />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Features
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                    Feature
                  </th>
                  <th className="py-3 text-left text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <FeatureRow
                  feature="Bookmarklet Save"
                  description="One click from any listing page saves it to my collection. No copy-pasting URLs."
                />
                <FeatureRow
                  feature="Route Planning"
                  description="I can select multiple listings and generate an optimized Google Maps route to tour them efficiently."
                />
                <FeatureRow
                  feature="Ratings & Notes"
                  description="Each listing has my personal rating and notes so I remember what I liked or didn't."
                />
                <FeatureRow
                  feature="Source Agnostic"
                  description="Works with Zillow, Redfin, Realtor.com, MLS portals—any site with a listing page."
                />
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Container>
  )
}
