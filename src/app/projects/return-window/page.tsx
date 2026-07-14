import { type Metadata } from 'next'
import Image from 'next/image'
import { Container } from '@/components/Container'
import { ProjectDate } from '@/components/ProjectDate'

import heroImage from './return_window.png'

export const metadata: Metadata = {
  title: 'Return Window - Never Miss a Return Deadline',
  description:
    'An app that automatically tracks purchase return deadlines across retailers. Forward your order confirmations and get reminded before return windows close.',
}

export default function ReturnWindow() {
  return (
    <Container className="mt-9 sm:mt-16">
      <header className="max-w-2xl">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Return Window
          </h1>
          <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
            Coming Soon
          </span>
        </div>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          Never miss a return deadline again. Forward your order confirmations
          and get reminded before return windows close.
        </p>
        <ProjectDate slug="return-window" />
      </header>

      <div className="mt-12">
        <Image
          src={heroImage}
          alt="Return Window app"
          className="rounded-2xl"
          priority
        />
      </div>
    </Container>
  )
}
