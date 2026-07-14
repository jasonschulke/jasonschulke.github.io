'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface WritingItem {
  title: string
  link: string
  description: string
  pubDate: string
  creator: string
  image?: string | null
}

function formatArticleDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

function WritingRow({ article }: { article: WritingItem }) {
  const isExternal = /^https?:\/\//.test(article.link)

  return (
    <li>
      <Link
        href={article.link}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        className="group flex items-center gap-4 border-b border-zinc-100 py-5 transition dark:border-zinc-800"
      >
        {article.image ? (
          <img
            src={article.image}
            alt=""
            className="h-14 w-14 flex-none rounded-lg object-cover"
          />
        ) : (
          <div className="h-14 w-14 flex-none rounded-lg bg-zinc-100 dark:bg-zinc-800" />
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-zinc-800 transition group-hover:text-indigo-500 dark:text-zinc-100 dark:group-hover:text-indigo-400">
            {article.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {article.description}
          </p>
        </div>
        <time
          dateTime={article.pubDate}
          className="hidden flex-none text-sm text-zinc-400 sm:block sm:w-36 sm:text-right dark:text-zinc-500"
        >
          {formatArticleDate(article.pubDate)}
        </time>
      </Link>
    </li>
  )
}

const INITIAL_COUNT = 5

export function WritingList({ articles }: { articles: WritingItem[] }) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? articles : articles.slice(0, INITIAL_COUNT)

  return (
    <>
      <ul className="mt-6">
        {visible.map((article) => (
          <WritingRow key={article.link} article={article} />
        ))}
      </ul>
      {!expanded && articles.length > INITIAL_COUNT && (
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            Show more
          </button>
        </div>
      )}
    </>
  )
}
