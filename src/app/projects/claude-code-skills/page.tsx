import Link from 'next/link'
import { Container } from '@/components/Container'

const skills = [
  {
    name: '/start',
    command: '/start',
    repo: 'https://github.com/jasonschulke/claude-code-skill-start',
    description:
      'Initializes conversations by loading project context from key documentation files.',
    details: [
      'Reads .claude/CLAUDE.md for project context, conventions, and architecture',
      'Reads README.md for public documentation',
      'Reads CHANGELOG.md for version history',
      'Synthesizes and highlights relevant updates',
    ],
  },
  {
    name: '/checkpoint',
    command: '/checkpoint',
    repo: 'https://github.com/jasonschulke/claude-code-skill-checkpoint',
    description:
      'Enables mid-session progress documentation without git commits.',
    details: [
      'Updates .claude/CLAUDE.md with current session changes',
      'Synchronizes README.md with documentation changes',
      'Updates relevant changelog files',
      'Executes /compact to optimize memory usage',
    ],
  },
  {
    name: '/finish',
    command: '/finish',
    repo: 'https://github.com/jasonschulke/claude-code-skill-finish',
    description: 'Automates the complete release workflow.',
    details: [
      'Updates documentation with session changes',
      'Increments version and updates CHANGELOG.md',
      'Stages and commits all modifications',
      'Creates a semantic version git tag (vX.Y.Z)',
      'Pushes changes to GitHub',
      'Executes /compact to reduce memory footprint',
    ],
  },
]

export default function ClaudeCodeSkills() {
  return (
    <Container className="mt-9 sm:mt-16">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Claude Code Skills
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          A suite of complementary Claude Code skills for managing project
          context, progress, and releases. These skills work together to
          streamline documentation and version control workflows.
        </p>
      </header>

      <div className="mt-12 space-y-12">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {skill.name}
                </h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {skill.description}
                </p>
              </div>
              <Link
                href={skill.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                GitHub
              </Link>
            </div>
            <ul className="mt-4 space-y-2">
              {skill.details.map((detail, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-zinc-100 p-6 dark:bg-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Recommended Workflow
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <code className="rounded bg-zinc-200 px-2 py-1 font-mono dark:bg-zinc-700">
            /start
          </code>
          <span className="text-zinc-400">→</span>
          <span className="text-zinc-600 dark:text-zinc-400">work</span>
          <span className="text-zinc-400">→</span>
          <code className="rounded bg-zinc-200 px-2 py-1 font-mono dark:bg-zinc-700">
            /checkpoint
          </code>
          <span className="text-zinc-400">→</span>
          <span className="text-zinc-600 dark:text-zinc-400">work</span>
          <span className="text-zinc-400">→</span>
          <code className="rounded bg-zinc-200 px-2 py-1 font-mono dark:bg-zinc-700">
            /finish
          </code>
        </div>
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          Start each session by loading context, checkpoint progress mid-session
          without committing, and finish with a complete release workflow.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Installation
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Install skills at the project level or globally in your home
          directory:
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Project-level
            </p>
            <code className="mt-1 block rounded bg-zinc-200 px-3 py-2 font-mono text-sm dark:bg-zinc-700">
              .claude/skills/[skill-name]/
            </code>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Global
            </p>
            <code className="mt-1 block rounded bg-zinc-200 px-3 py-2 font-mono text-sm dark:bg-zinc-700">
              ~/.claude/skills/[skill-name]/
            </code>
          </div>
        </div>
      </div>
    </Container>
  )
}
