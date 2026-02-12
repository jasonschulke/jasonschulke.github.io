import { type Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/Container'

import billboardImage from './urban-billboard-mockup.png'
import devicesImage from './minimalistic-tablet-and-phone-mockup.png'
import phoneImage from './womens-hands-holding-phone.png'

export const metadata: Metadata = {
  title: 'Cardboard Co - Building & Testing a Local Service Business',
  description:
    'A case study in building a brand from scratch and testing product-market fit for a hyperlocal cardboard recycling service in Austin, TX.',
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

export default function CardboardCo() {
  return (
    <Container className="mt-9 sm:mt-16">
      <header className="max-w-2xl">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Cardboard Co
          </h1>
          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-600 dark:text-amber-400">
            Pilot
          </span>
        </div>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          An exercise in building an idea, a brand, and testing product-market
          fit. Cardboard Co is a hyperlocal recycling pickup service in Austin,
          TX, currently running as a pilot in three neighborhoods.
        </p>
      </header>

      <div className="mt-12">
        <Image
          src={billboardImage}
          alt="Cardboard Co billboard mockup"
          className="rounded-2xl"
          priority
        />
      </div>

      <div className="mt-16">
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            The Hypothesis
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Austin&apos;s curbside recycling is inconsistent. Pickup days are
            limited, bins overflow, and large boxes don&apos;t fit. Meanwhile,
            online shopping keeps growing. More deliveries, more cardboard,
            more frustration.
          </p>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            The hypothesis: people would pay a small fee for scheduled,
            hassle-free cardboard pickup that actually gets recycled. Not a
            full-service junk removal company. Just cardboard, done right.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Building the Brand
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            The goal was to create something that felt trustworthy and
            approachable. A neighborhood service, not a faceless company.
            The name needed to be simple and memorable. &ldquo;Cardboard
            Co&rdquo; says exactly what it is.
          </p>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            The visual identity leans into warmth and locality: friendly copy,
            clear pricing, and an emphasis on &ldquo;100% goes to local
            recycling facilities.&rdquo; No greenwashing, no corporate jargon.
            Just a straightforward service.
          </p>
        </section>

        <div className="mt-12">
          <Image
            src={devicesImage}
            alt="Cardboard Co website on tablet and phone"
            className="rounded-2xl"
          />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            The MVP
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            The pilot launched with the minimum needed to test demand:
          </p>
          <ul className="mt-4 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">
                A landing page
              </strong>{' '}
              built with Next.js, explaining the service and pricing
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">
                Stripe subscriptions
              </strong>{' '}
              for recurring billing (weekly, biweekly, monthly tiers)
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">
                Text reminders
              </strong>{' '}
              so customers get a heads-up before each pickup
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-100">
                A truck
              </strong>{' '}
              (the unglamorous but essential part)
            </li>
          </ul>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            No app, no complex logistics software. Text messages and a
            spreadsheet. The goal is learning, not scaling.
          </p>
        </section>

        <div className="mt-12">
          <Image
            src={phoneImage}
            alt="Customer using Cardboard Co on phone"
            className="rounded-2xl"
          />
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Testing Product-Market Fit
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            The pilot is intentionally constrained to three neighborhoods:
            Mueller, Windsor Park, and Cherrywood. This keeps routes efficient
            and creates density, which is essential for a pickup service to be
            viable.
          </p>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Pricing tiers test willingness to pay at different frequencies.
            One-time pickups ($50) attract the curious; subscriptions ($25-40)
            reveal who finds ongoing value. The &ldquo;breakdown service&rdquo;
            add-on tests whether convenience commands a premium.
          </p>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Key questions the pilot aims to answer:
          </p>
          <ul className="mt-4 space-y-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            <li>&bull; Do people actually have this problem?</li>
            <li>&bull; Will they pay to solve it?</li>
            <li>&bull; What frequency makes sense for most households?</li>
            <li>&bull; Can the unit economics work at neighborhood scale?</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Tech Stack
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <TechTag>Next.js</TechTag>
            <TechTag>Tailwind CSS</TechTag>
            <TechTag>Stripe</TechTag>
            <TechTag>Netlify</TechTag>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            What I&apos;m Learning
          </h2>
          <ul className="mt-6">
            <LearningItem>
              Hyperlocal services need density to work, and three neighborhoods
              is the right starting constraint
            </LearningItem>
            <LearningItem>
              Simple beats sophisticated when validating an idea; a spreadsheet
              can run operations longer than you&apos;d think
            </LearningItem>
            <LearningItem>
              Brand trust matters more for services that come to your
              home. Friendly copy and clear pricing go a long way
            </LearningItem>
            <LearningItem>
              The best way to test product-market fit is to charge money from
              day one
            </LearningItem>
          </ul>
        </section>
      </div>
    </Container>
  )
}
