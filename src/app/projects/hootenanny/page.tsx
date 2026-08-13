import { type Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { ProjectDate } from '@/components/ProjectDate'

import eventPreviewImg from './hootenanny_event_preview.png'
import createImg from './hootenanny_create.png'
import rsvpsImg from './hootenanny_rsvps.png'
import signInImg from './hootenanny_card.png'

export const metadata: Metadata = {
  title: 'Hootenanny - Playful Event Invitations',
  description:
    'An event invitation web app inspired by Apple Invites. Make an invite, share the link, and track RSVPs without asking guests to create an account.',
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

function Screenshot({
  src,
  alt,
  caption,
}: {
  src: typeof eventPreviewImg
  alt: string
  caption: string
}) {
  return (
    <figure className="mt-8">
      <Image src={src} alt={alt} className="mx-auto w-full max-w-md rounded-2xl" />
      <figcaption className="mt-3 text-center text-sm text-zinc-500 dark:text-zinc-500">
        {caption}
      </figcaption>
    </figure>
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
          A small web app for sending event invitations, loosely inspired by
          Apple Invites. You make the invite, send the link, and see who&apos;s
          coming. Guests reply from whatever phone they happen to have.
        </p>
        <ProjectDate slug="hootenanny" />
      </header>

      <Screenshot
        src={eventPreviewImg}
        alt="A finished Hootenanny invite, ready to share"
        caption="A finished invite, ready to share."
      />

      <div className="mt-16">
        <section>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Why I Built This
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Apple Invites looks great, but everyone you invite needs an iPhone. I
            was putting together something for my daughter&apos;s dance recital
            and half the family is on Android, so that ruled it out immediately.
            The other options I tried were buried in ads, or wanted guests to
            make an account before they could say &ldquo;yes, I&apos;ll be
            there.&rdquo;
          </p>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            So I built the smaller, friendlier version I wanted. Open the link,
            tap a button, done.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            How It Works
          </h2>

          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Setting up an event takes about a minute. I sign in with a PIN, pick
            a cover photo, and fill in the date, venue, and a short description.
            The invite previews as I type, so I can see exactly what guests will
            see.
          </p>
          <Screenshot
            src={createImg}
            alt="Building and previewing an event in Hootenanny"
            caption="The editor, with a live preview of the invite."
          />

          <p className="mt-8 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Once it&apos;s ready I get two links. One collects RSVPs, for the
            people I actually need a headcount from. The other just shows the
            details, which is handy for the group chat where nobody needs to
            formally reply. Either link opens on any device, and guests respond
            with their name and how many people they&apos;re bringing.
          </p>

          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Responses land on a host dashboard. I can see who&apos;s in,
            who&apos;s still deciding, and who can&apos;t make it, plus party
            sizes and whatever notes people leave behind.
          </p>
          <Screenshot
            src={rsvpsImg}
            alt="The host dashboard showing live RSVPs and the guest list"
            caption="The host view, once responses start coming in."
          />
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
                  description="Guests tap the link and reply. There's nothing to sign up for or install."
                />
                <FeatureRow
                  feature="Two link types"
                  description="One link collects RSVPs. The other just shows the details, for when you don't need a headcount."
                />
                <FeatureRow
                  feature="Cover photo editor"
                  description="Upload any photo and drag or zoom it into place right in the browser. The overlay keeps the text readable no matter what's underneath."
                />
                <FeatureRow
                  feature="Live guest list"
                  description="Who's coming, how many they're bringing, and any notes they left. Edit or remove entries when plans change."
                />
                <FeatureRow
                  feature="Map embed"
                  description="Add a venue address and it pulls in a Google Map that opens with one tap."
                />
                <FeatureRow
                  feature="Installable PWA"
                  description="Add it to your home screen and it behaves like a regular app, offline included."
                />
                <FeatureRow
                  feature="Rich link previews"
                  description="Paste the link into iMessage or Slack and it unfurls with the cover photo and event title, handled by Netlify edge functions."
                />
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Design
          </h2>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            The name came first. A hootenanny is an old word for an informal
            get-together, and once I had it, the owl was pretty much
            unavoidable. Everything else followed from there. The palette is all
            browns, creams, and tans, which felt right for something closer to a
            handwritten note than a dashboard. The wordmark is set in Lily
            Script One and the body text is Nunito. There are owl puns hiding in
            the empty states if you go looking.
          </p>
          <Screenshot
            src={signInImg}
            alt="The Hootenanny sign-in screen with its owl mascot"
            caption="The owl says hello at sign-in."
          />
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
      </div>
    </Container>
  )
}
