'use client'

import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import clsx from 'clsx'

function ChevronIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M9 18l6-6-6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ExternalLinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export interface WorkRole {
  title: string
  company: string
  companyUrl?: string
  location: string
  period: string
  highlights: string[]
  logo?: StaticImageData
}

interface WorkHistoryItemProps {
  role: WorkRole
  defaultExpanded?: boolean
}

function RoleHeader({ role }: { role: WorkRole }) {
  return (
    <div className="flex items-start gap-4 flex-1">
      {role.logo && (
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white dark:bg-zinc-800">
          <Image
            src={role.logo}
            alt={role.company}
            className="h-7 w-7 object-contain"
            unoptimized
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {role.title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 mt-0.5">
          {role.companyUrl ? (
            <a
              href={role.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-sm font-medium text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              {role.company}
              <ExternalLinkIcon className="h-3 w-3 flex-shrink-0" />
            </a>
          ) : (
            <span className="text-sm font-medium text-indigo-500 dark:text-indigo-400">
              {role.company}
            </span>
          )}
          <span className="text-sm text-zinc-400 dark:text-zinc-500 flex-shrink-0">&middot;</span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400 flex-shrink-0">
            {role.location}
          </span>
          <span className="text-sm text-zinc-400 dark:text-zinc-500 flex-shrink-0">&middot;</span>
          <span className="text-sm text-zinc-500 dark:text-zinc-400 flex-shrink-0">
            {role.period}
          </span>
        </div>
      </div>
    </div>
  )
}

function WorkHistoryItem({ role, defaultExpanded = false }: WorkHistoryItemProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const hasHighlights = role.highlights.length > 0

  if (!hasHighlights) {
    return (
      <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-600">
        <RoleHeader role={role} />
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-600">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <RoleHeader role={role} />
        <ChevronIcon
          className={clsx(
            'h-5 w-5 flex-none text-zinc-400 transition-transform duration-200 dark:text-zinc-500',
            isExpanded && 'rotate-90'
          )}
        />
      </button>
      {isExpanded && (
        <div className="border-t border-zinc-100 px-6 pb-6 pt-4 dark:border-zinc-700/40">
          {role.highlights.length === 1 ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {role.highlights[0]}
            </p>
          ) : (
            <ul className="space-y-3">
              {role.highlights.map((highlight, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <span className="mt-2 h-1 w-1 flex-none rounded-full bg-zinc-400 dark:bg-zinc-500" />
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

interface WorkHistoryProps {
  roles: WorkRole[]
}

export function WorkHistory({ roles }: WorkHistoryProps) {
  return (
    <div className="space-y-4">
      {roles.map((role, index) => (
        <WorkHistoryItem key={index} role={role} defaultExpanded={index === 0} />
      ))}
    </div>
  )
}
