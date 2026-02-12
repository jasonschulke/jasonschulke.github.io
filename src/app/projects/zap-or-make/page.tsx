'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Container } from '@/components/Container'

export default function ZapOrMake() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://server.fillout.com/embed/v1/'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <Container className="mt-9 sm:mt-16">
      <div className="mb-6 rounded-lg bg-amber-50 border border-amber-200 p-4 dark:bg-amber-900/20 dark:border-amber-800">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong>Heads up:</strong> This tool has a bug I&apos;m actively working to fix. Results may be inaccurate in the meantime.
        </p>
      </div>
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Zap or Make
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          Zapier and Make use fundamentally different billing models—tasks vs
          operations—making direct cost comparisons tricky. This tool estimates
          your Make operations based on your current Zapier usage, then compares
          pricing tiers side-by-side to find the best value.{' '}
          <Link
            href="https://producteducation.substack.com/p/zapier-vs-make-finding-the-true-cost"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Read the full breakdown
          </Link>
          .
        </p>
      </header>
      <div className="mt-12">
        <div
          data-fillout-id="cCt3xvAeAmus"
          data-fillout-embed-type="standard"
          data-fillout-inherit-parameters
          data-fillout-dynamic-resize
          style={{ width: '100%', height: 500 }}
        />
      </div>
    </Container>
  )
}
