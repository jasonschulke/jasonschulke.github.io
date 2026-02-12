import { Container } from '@/components/Container'

export default function Buckets() {
  return (
    <Container className="mt-9 sm:mt-16">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Buckets
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          A simple prioritization tool with a retro twist. Built for my partner,
          who loves vintage computers and gaming, and wanted a no-fuss way to
          sort her work projects by urgency and importance. Drop tasks into
          buckets, drag to reorder, and focus on what matters most.
        </p>
      </header>
      <div className="mt-12">
        <iframe
          src="/tools/buckets/index.html"
          className="w-full border border-zinc-200 dark:border-zinc-700"
          style={{ height: '85vh', minHeight: '600px' }}
          title="Buckets"
        />
      </div>
    </Container>
  )
}
