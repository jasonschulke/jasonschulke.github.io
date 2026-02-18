'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from '@/components/Container'
import {
  zapierPlans,
  makePlans,
  findBestPlan,
  convertTasksToOperations,
  formatNumber,
  formatCurrency,
  type Plan,
} from './pricing-data'

type Results = {
  zapierTasks: number
  makeOperations: number
  bestZapierPlan: Plan | null
  bestMakePlan: Plan | null
  savings: number
  winner: 'Zapier' | 'Make' | 'tie' | null
}

function generateRecommendation(results: Results): string {
  const { zapierTasks, makeOperations, bestZapierPlan, bestMakePlan, savings, winner } = results

  if (!bestZapierPlan && !bestMakePlan) {
    return `Your usage of ${formatNumber(zapierTasks)} tasks exceeds the highest tiers available on both platforms. Contact Zapier or Make directly for enterprise pricing.`
  }

  if (!bestZapierPlan && bestMakePlan) {
    return `Your Zapier usage exceeds their highest tier. Make can handle your estimated ${formatNumber(makeOperations)} operations on their ${bestMakePlan.name} plan for ${formatCurrency(bestMakePlan.costPerMonth)}/mo.`
  }

  if (bestZapierPlan && !bestMakePlan) {
    return `Your estimated Make operations exceed their highest tier. Stick with Zapier's ${bestZapierPlan.name} plan at ${formatCurrency(bestZapierPlan.costPerMonth)}/mo.`
  }

  if (!bestZapierPlan || !bestMakePlan) return ''

  const savingsPercent = Math.round((savings / Math.max(bestZapierPlan.costPerMonth, bestMakePlan.costPerMonth)) * 100)

  if (winner === 'tie') {
    return `Both platforms cost the same for your usage. Choose based on features: Zapier has more app integrations, Make offers more complex logic and visual workflow building.`
  }

  if (winner === 'Make') {
    if (savingsPercent >= 50) {
      return `Make is significantly cheaper—you'd save ${formatCurrency(savings)}/mo (${savingsPercent}%). At ${formatNumber(zapierTasks)} Zapier tasks, your workflows would use ~${formatNumber(makeOperations)} Make operations. The ${bestMakePlan.name} plan covers this at ${formatCurrency(bestMakePlan.costPerMonth)}/mo vs Zapier's ${formatCurrency(bestZapierPlan.costPerMonth)}/mo.`
    }
    if (savingsPercent >= 20) {
      return `Make offers solid savings of ${formatCurrency(savings)}/mo (${savingsPercent}%). Your ${formatNumber(zapierTasks)} Zapier tasks translate to ~${formatNumber(makeOperations)} Make operations. Consider Make's ${bestMakePlan.name} plan at ${formatCurrency(bestMakePlan.costPerMonth)}/mo.`
    }
    return `Make is slightly cheaper by ${formatCurrency(savings)}/mo. The difference is small, so factor in migration effort and feature needs before switching.`
  }

  if (winner === 'Zapier') {
    if (savingsPercent >= 20) {
      return `Staying on Zapier is actually cheaper by ${formatCurrency(savings)}/mo. Make's operation-based billing (which counts triggers) works against you here. The ${bestZapierPlan.name} plan at ${formatCurrency(bestZapierPlan.costPerMonth)}/mo is your best option.`
    }
    return `Zapier edges out Make by ${formatCurrency(savings)}/mo. Given similar costs, your decision should come down to feature needs and whether you want to invest time in migration.`
  }

  return ''
}

function Calculator() {
  const [activeZaps, setActiveZaps] = useState<string>('')
  const [monthlyTasks, setMonthlyTasks] = useState<string>('')
  const [results, setResults] = useState<Results | null>(null)

  const handleCalculate = () => {
    const tasks = parseInt(monthlyTasks) || 0
    const zaps = parseInt(activeZaps) || 0

    if (tasks <= 0) return

    const makeOps = convertTasksToOperations(tasks, zaps)
    const bestZapier = findBestPlan(zapierPlans, tasks)
    const bestMake = findBestPlan(makePlans, makeOps)

    let winner: Results['winner'] = null
    let savings = 0

    if (bestZapier && bestMake) {
      if (bestZapier.costPerMonth === bestMake.costPerMonth) {
        winner = 'tie'
      } else if (bestMake.costPerMonth < bestZapier.costPerMonth) {
        winner = 'Make'
        savings = bestZapier.costPerMonth - bestMake.costPerMonth
      } else {
        winner = 'Zapier'
        savings = bestMake.costPerMonth - bestZapier.costPerMonth
      }
    } else if (bestMake && !bestZapier) {
      winner = 'Make'
    } else if (bestZapier && !bestMake) {
      winner = 'Zapier'
    }

    setResults({
      zapierTasks: tasks,
      makeOperations: makeOps,
      bestZapierPlan: bestZapier,
      bestMakePlan: bestMake,
      savings,
      winner,
    })
  }

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="rounded-2xl bg-zinc-100 p-6 dark:bg-zinc-800">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="zaps"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Active Zaps
            </label>
            <input
              type="number"
              id="zaps"
              value={activeZaps}
              onChange={(e) => setActiveZaps(e.target.value)}
              placeholder="e.g. 15"
              className="mt-2 block w-full rounded-xl border-0 bg-white px-5 py-4 text-lg text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-zinc-900 dark:text-white dark:ring-zinc-700"
            />
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Improves accuracy of Make estimate
            </p>
          </div>

          <div>
            <label
              htmlFor="tasks"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Monthly Zapier Tasks
            </label>
            <input
              type="number"
              id="tasks"
              value={monthlyTasks}
              onChange={(e) => setMonthlyTasks(e.target.value)}
              placeholder="e.g. 5000"
              className="mt-2 block w-full rounded-xl border-0 bg-white px-5 py-4 text-lg text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-zinc-900 dark:text-white dark:ring-zinc-700"
            />
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Check your Zapier dashboard
            </p>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={!monthlyTasks}
          className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Compare Pricing
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Zapier Card */}
            <div
              className={`rounded-2xl p-6 ${
                results.winner === 'Zapier'
                  ? 'bg-indigo-50 ring-2 ring-indigo-500 dark:bg-indigo-950'
                  : 'bg-zinc-100 dark:bg-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <Link
                  href="https://zapier.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Zapier
                </Link>
                {results.winner === 'Zapier' && (
                  <span className="rounded-full bg-indigo-500 px-2 py-1 text-xs font-medium text-white">
                    Best Value
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {formatNumber(results.zapierTasks)} tasks/mo
              </p>
              {results.bestZapierPlan ? (
                <>
                  <p className="mt-4 text-3xl font-bold text-zinc-900 dark:text-white">
                    {formatCurrency(results.bestZapierPlan.costPerMonth)}
                    <span className="text-base font-normal text-zinc-500">
                      /mo
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    {results.bestZapierPlan.name} plan
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {results.bestZapierPlan.summary}
                  </p>
                </>
              ) : (
                <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                  Exceeds max tier capacity
                </p>
              )}
            </div>

            {/* Make Card */}
            <div
              className={`rounded-2xl p-6 ${
                results.winner === 'Make'
                  ? 'bg-indigo-50 ring-2 ring-indigo-500 dark:bg-indigo-950'
                  : 'bg-zinc-100 dark:bg-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <Link
                  href="https://www.make.com/en/register?pc=makereferral"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Make
                </Link>
                {results.winner === 'Make' && (
                  <span className="rounded-full bg-indigo-500 px-2 py-1 text-xs font-medium text-white">
                    Best Value
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                ~{formatNumber(results.makeOperations)} operations/mo
              </p>
              {results.bestMakePlan ? (
                <>
                  <p className="mt-4 text-3xl font-bold text-zinc-900 dark:text-white">
                    {formatCurrency(results.bestMakePlan.costPerMonth)}
                    <span className="text-base font-normal text-zinc-500">
                      /mo
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                    {results.bestMakePlan.name} plan
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {results.bestMakePlan.summary}
                  </p>
                </>
              ) : (
                <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                  Exceeds max tier capacity
                </p>
              )}
            </div>
          </div>

          {/* Recommendation */}
          <div className="rounded-2xl bg-emerald-50 p-6 ring-1 ring-emerald-200 dark:bg-emerald-950 dark:ring-emerald-800">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                Recommendation
              </h3>
            </div>
            <p className="mt-2 text-base leading-relaxed text-emerald-900 dark:text-emerald-100">
              {generateRecommendation(results)}
            </p>
          </div>

          {/* Conversion Note */}
          <div className="text-center">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Make counts triggers as operations; Zapier doesn&apos;t count them as tasks.
              Estimate assumes up to 20% trigger overhead.
            </p>
            <button
              onClick={() => {
                setActiveZaps('')
                setMonthlyTasks('')
                setResults(null)
              }}
              className="mt-3 text-sm text-zinc-500 underline hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ZapOrMake() {
  return (
    <Container className="mt-9 sm:mt-16">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Zapier or Make
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          <Link
            href="https://zapier.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Zapier
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.make.com/en/register?pc=makereferral"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Make
          </Link>{' '}
          use fundamentally different billing models, making direct price
          comparisons difficult. Zapier counts one task per action (triggers are
          free), while Make counts one operation per step, including triggers.
          The same workflow costs differently on each platform.
        </p>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          This tool estimates your Make operations based on your Zapier usage,
          then compares pricing tiers to find the lowest-cost plan that covers
          your current needs.{' '}
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
        <Calculator />
      </div>
      <p className="mt-16 text-center text-xs text-zinc-500 dark:text-zinc-500">
        Disclosure: The Make link is an affiliate link. I may earn a commission
        if you sign up, but this does not affect the calculator results.
      </p>
    </Container>
  )
}
