import { projectDates } from '@/data/projectDates'

export function ProjectDate({ slug }: { slug: string }) {
  const date = projectDates[slug]
  if (!date) return null

  return (
    <p className="mt-3 text-sm font-medium text-zinc-400 dark:text-zinc-500">
      {date}
    </p>
  )
}
