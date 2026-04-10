import { type Metadata } from 'next'
import { Container } from '@/components/Container'

export const metadata: Metadata = {
  title: 'Hootenanny - Playful Event Invitations',
  description:
    'A simple, playful event invitation web app inspired by Apple Invites. Create beautiful invites, share a link, and track RSVPs, with no accounts required for guests.',
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
    <span className="rounded-lg bg-amber-700/10 px-3 py-1.5 text-sm font-medium text-amber-700 dark:text-amber-400">
      {children}
    </span>
  )
}

export default function Hootenanny() {
  return (
    <Container className="mt-9 sm:mt-16">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Hootenanny
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          A playful event invitation web app inspired by Apple Invites. Spin up
          a beautiful invite in under a minute, share a link, and watch RSVPs
          roll in, with no accounts, no app store, and no fuss.
        </p>
      </header>

      <div className="mt-16">
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Why I Built This
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Apple Invites is beautiful, but it only works if every guest has an
            iPhone, and I wanted to send an invite to my daughter&apos;s dance
            recital without worrying about who was on which platform. Most
            alternatives are bloated with ads, upsells, or require guests to
            create an account just to say &ldquo;yes, I&apos;ll be there.&rdquo;
          </p>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            I wanted something tiny, warm, and personal. One link, one tap, done.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            How It Works
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            I sign in with a PIN, pick a cover photo, fill out the basics
            (date, venue, a short description), and get two shareable links: one
            for guests to RSVP and one that&apos;s details-only. Guests open
            the link on any device, see the invite, and respond with their name
            and party size. Everything lands on a dashboard where I can see who
            is going, who is on the fence, and who can&apos;t make it.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Features
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                    Feature
                  </th>
                  <th className="py-3 text-left text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <FeatureRow
                  feature="No-account RSVPs"
                  description="Guests just tap the link and respond. No signups, no downloads, no friction."
                />
                <FeatureRow
                  feature="Two link types"
                  description="Share an RSVP link for guests you want to hear back from, or a details-only link for casual announcements."
                />
                <FeatureRow
                  feature="Cover photo editor"
                  description="Upload any image and reposition or zoom it directly in the browser. Text always stays legible over the photo."
                />
                <FeatureRow
                  feature="Live guest list"
                  description="See who&apos;s going, with party sizes, notes, and contact info. Edit or remove RSVPs as needed."
                />
                <FeatureRow
                  feature="Map embed"
                  description="Venue addresses automatically embed a Google Map with a tap-to-open link."
                />
                <FeatureRow
                  feature="Installable PWA"
                  description="Add it to your home screen for a native-app feel, complete with offline support."
                />
                <FeatureRow
                  feature="Rich link previews"
                  description="Pasting the link in iMessage, Slack, or social media shows the cover photo and event title via Netlify edge functions."
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
            <TechTag>React</TechTag>
            <TechTag>Vite</TechTag>
            <TechTag>Supabase</TechTag>
            <TechTag>Netlify</TechTag>
            <TechTag>Netlify Edge Functions</TechTag>
            <TechTag>PWA / Service Worker</TechTag>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Design
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            The name came first. &ldquo;Hootenanny&rdquo; is an old-fashioned
            word for an informal gathering, and it begged for an owl mascot. I
            built the whole UI around a warm brown, cream, and tan palette that
            feels more like a handwritten note than a SaaS dashboard. The
            wordmark is set in Lily Script One, the body is Nunito, and little
            owl puns show up in empty states and confirmation screens.
          </p>
        </section>
      </div>
    </Container>
  )
}
