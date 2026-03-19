import { type Metadata } from 'next'
import Link from 'next/link'

import { SimpleLayout } from '@/components/SimpleLayout'
import articles from '@/data/articles.json'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Thoughts on building simple, effective, and scalable product education strategies for SaaS companies.',
  openGraph: {
    title: 'Articles - Jason Schulke',
    description:
      'Thoughts on building simple, effective, and scalable product education strategies for SaaS companies.',
  },
}

interface FeedItem {
  title: string
  link: string
  description: string
  pubDate: string
  creator: string
  image?: string | null
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

function Article({ article }: { article: FeedItem }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 transition hover:border-zinc-300 dark:border-zinc-600 dark:hover:border-zinc-500">
      {article.image && (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900">
          <img
            src={article.image}
            alt=""
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col bg-zinc-50 p-6 dark:bg-zinc-900">
        <time
          dateTime={article.pubDate}
          className="mb-3 text-sm text-zinc-500 dark:text-zinc-400"
        >
          {formatDate(article.pubDate)}
        </time>
        <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          <Link href={article.link} target="_blank" rel="noopener noreferrer">
            <span className="absolute inset-0 z-10" />
            {article.title}
          </Link>
        </h2>
{/* <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
          {article.description}
        </p> */}
        <div className="mt-auto flex items-center pt-4 text-sm font-medium text-indigo-500">
          Read article
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="ml-1 h-4 w-4 stroke-current">
            <path d="M6.75 5.75 9.25 8l-2.5 2.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </article>
  )
}

export default function Articles() {
  return (
    <SimpleLayout
      title="Writing on product education, support operations, and building systems that scale."
      intro="My thoughts on building simple, effective, and scalable product education strategies for SaaS companies. All articles are published on my Substack newsletter, Product Education."
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {(articles as FeedItem[]).map((article) => (
          <Article key={article.link} article={article} />
        ))}
      </div>
      <div className="mt-16 flex justify-center">
        <Link
          href="https://producteducation.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          Subscribe on Substack
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-current"
            aria-hidden="true"
          >
            <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24l9.56-5.573 9.52 5.573V10.812H1.46zm0-7.971h21.08V0H1.46v2.841z" />
          </svg>
        </Link>
      </div>
    </SimpleLayout>
  )
}
