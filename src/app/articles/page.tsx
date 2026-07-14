'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Container } from '@/components/Container'

export default function ArticlesRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/projects#writing')
  }, [router])

  return (
    <Container className="mt-16 sm:mt-32">
      <p className="text-base text-zinc-600 dark:text-zinc-400">
        My writing now lives on the{' '}
        <Link
          href="/projects#writing"
          className="font-medium text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Work
        </Link>{' '}
        page. Redirecting you there now.
      </p>
    </Container>
  )
}
