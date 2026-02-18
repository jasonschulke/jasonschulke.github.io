export type Plan = {
  name: string
  tier: string
  service: 'Zapier' | 'Make'
  tasksPerMonth: number
  costPerMonth: number
  summary: string
}

export const zapierPlans: Plan[] = [
  { name: 'Free', tier: 'Free', service: 'Zapier', tasksPerMonth: 100, costPerMonth: 0, summary: 'Two-step Zaps only, basic features' },
  { name: 'Professional 750', tier: 'Professional', service: 'Zapier', tasksPerMonth: 750, costPerMonth: 29.99, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 1.5K', tier: 'Professional', service: 'Zapier', tasksPerMonth: 1500, costPerMonth: 58.5, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 2K', tier: 'Professional', service: 'Zapier', tasksPerMonth: 2000, costPerMonth: 73.5, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 5K', tier: 'Professional', service: 'Zapier', tasksPerMonth: 5000, costPerMonth: 133.5, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 10K', tier: 'Professional', service: 'Zapier', tasksPerMonth: 10000, costPerMonth: 193.5, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 20K', tier: 'Professional', service: 'Zapier', tasksPerMonth: 20000, costPerMonth: 283.5, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 50K', tier: 'Professional', service: 'Zapier', tasksPerMonth: 50000, costPerMonth: 433.5, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 100K', tier: 'Professional', service: 'Zapier', tasksPerMonth: 100000, costPerMonth: 733.5, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 200K', tier: 'Professional', service: 'Zapier', tasksPerMonth: 200000, costPerMonth: 1149, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 300K', tier: 'Professional', service: 'Zapier', tasksPerMonth: 300000, costPerMonth: 1599, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 400K', tier: 'Professional', service: 'Zapier', tasksPerMonth: 400000, costPerMonth: 1899, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 500K', tier: 'Professional', service: 'Zapier', tasksPerMonth: 500000, costPerMonth: 2199, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 750K', tier: 'Professional', service: 'Zapier', tasksPerMonth: 750000, costPerMonth: 2999, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 1M', tier: 'Professional', service: 'Zapier', tasksPerMonth: 1000000, costPerMonth: 3299, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 1.25M', tier: 'Professional', service: 'Zapier', tasksPerMonth: 1250000, costPerMonth: 3899, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 1.5M', tier: 'Professional', service: 'Zapier', tasksPerMonth: 1500000, costPerMonth: 4499, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 1.75M', tier: 'Professional', service: 'Zapier', tasksPerMonth: 1750000, costPerMonth: 4799, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Professional 2M', tier: 'Professional', service: 'Zapier', tasksPerMonth: 2000000, costPerMonth: 5099, summary: 'Multi-step Zaps, unlimited premium apps' },
  { name: 'Team 2K', tier: 'Team', service: 'Zapier', tasksPerMonth: 2000, costPerMonth: 103.5, summary: '25 users, shared Zaps, SAML SSO' },
  { name: 'Team 5K', tier: 'Team', service: 'Zapier', tasksPerMonth: 5000, costPerMonth: 178.5, summary: '25 users, shared Zaps, SAML SSO' },
  { name: 'Team 10K', tier: 'Team', service: 'Zapier', tasksPerMonth: 10000, costPerMonth: 353.5, summary: '25 users, shared Zaps, SAML SSO' },
  { name: 'Team 20K', tier: 'Team', service: 'Zapier', tasksPerMonth: 20000, costPerMonth: 373.5, summary: '25 users, shared Zaps, SAML SSO' },
  { name: 'Team 50K', tier: 'Team', service: 'Zapier', tasksPerMonth: 50000, costPerMonth: 598.5, summary: '25 users, shared Zaps, SAML SSO' },
  { name: 'Team 100K', tier: 'Team', service: 'Zapier', tasksPerMonth: 100000, costPerMonth: 898.5, summary: '25 users, shared Zaps, SAML SSO' },
  { name: 'Team 200K', tier: 'Team', service: 'Zapier', tasksPerMonth: 200000, costPerMonth: 1499, summary: '25 users, shared Zaps, SAML SSO' },
  { name: 'Team 300K', tier: 'Team', service: 'Zapier', tasksPerMonth: 300000, costPerMonth: 1799, summary: '25 users, shared Zaps, SAML SSO' },
  { name: 'Team 400K', tier: 'Team', service: 'Zapier', tasksPerMonth: 400000, costPerMonth: 2099, summary: '25 users, shared Zaps, SAML SSO' },
  { name: 'Team 500K', tier: 'Team', service: 'Zapier', tasksPerMonth: 500000, costPerMonth: 2699, summary: '25 users, shared Zaps, SAML SSO' },
  { name: 'Team 750K', tier: 'Team', service: 'Zapier', tasksPerMonth: 750000, costPerMonth: 3299, summary: '25 users, shared Zaps, SAML SSO' },
  { name: 'Team 1M', tier: 'Team', service: 'Zapier', tasksPerMonth: 1000000, costPerMonth: 3749, summary: '25 users, shared Zaps, SAML SSO' },
  { name: 'Team 1.25M', tier: 'Team', service: 'Zapier', tasksPerMonth: 1250000, costPerMonth: 4499, summary: '25 users, shared Zaps, SAML SSO' },
  { name: 'Team 1.5M', tier: 'Team', service: 'Zapier', tasksPerMonth: 1500000, costPerMonth: 5099, summary: '25 users, shared Zaps, SAML SSO' },
  { name: 'Team 1.75M', tier: 'Team', service: 'Zapier', tasksPerMonth: 1750000, costPerMonth: 5699, summary: '25 users, shared Zaps, SAML SSO' },
  { name: 'Team 2M', tier: 'Team', service: 'Zapier', tasksPerMonth: 2000000, costPerMonth: 5999, summary: '25 users, shared Zaps, SAML SSO' },
]

export const makePlans: Plan[] = [
  { name: 'Free', tier: 'Free', service: 'Make', tasksPerMonth: 1000, costPerMonth: 0, summary: '2 active scenarios, 5min execution time' },
  { name: 'Core 10K', tier: 'Core', service: 'Make', tasksPerMonth: 10000, costPerMonth: 9, summary: 'Unlimited scenarios, 40min execution' },
  { name: 'Core 20K', tier: 'Core', service: 'Make', tasksPerMonth: 20000, costPerMonth: 16, summary: 'Unlimited scenarios, 40min execution' },
  { name: 'Core 40K', tier: 'Core', service: 'Make', tasksPerMonth: 40000, costPerMonth: 29, summary: 'Unlimited scenarios, 40min execution' },
  { name: 'Core 80K', tier: 'Core', service: 'Make', tasksPerMonth: 80000, costPerMonth: 55, summary: 'Unlimited scenarios, 40min execution' },
  { name: 'Core 150K', tier: 'Core', service: 'Make', tasksPerMonth: 150000, costPerMonth: 99, summary: 'Unlimited scenarios, 40min execution' },
  { name: 'Core 300K', tier: 'Core', service: 'Make', tasksPerMonth: 300000, costPerMonth: 182.16, summary: 'Unlimited scenarios, 40min execution' },
  { name: 'Core 500K', tier: 'Core', service: 'Make', tasksPerMonth: 500000, costPerMonth: 287.41, summary: 'Unlimited scenarios, 40min execution' },
  { name: 'Core 750K', tier: 'Core', service: 'Make', tasksPerMonth: 750000, costPerMonth: 413.87, summary: 'Unlimited scenarios, 40min execution' },
  { name: 'Core 1M', tier: 'Core', service: 'Make', tasksPerMonth: 1000000, costPerMonth: 537.11, summary: 'Unlimited scenarios, 40min execution' },
  { name: 'Core 1.5M', tier: 'Core', service: 'Make', tasksPerMonth: 1500000, costPerMonth: 773.44, summary: 'Unlimited scenarios, 40min execution' },
  { name: 'Core 2M', tier: 'Core', service: 'Make', tasksPerMonth: 2000000, costPerMonth: 988.28, summary: 'Unlimited scenarios, 40min execution' },
  { name: 'Pro 10K', tier: 'Pro', service: 'Make', tasksPerMonth: 10000, costPerMonth: 16, summary: 'Full-text search, 250MB files, priority execution' },
  { name: 'Pro 20K', tier: 'Pro', service: 'Make', tasksPerMonth: 20000, costPerMonth: 29, summary: 'Full-text search, 250MB files, priority execution' },
  { name: 'Pro 40K', tier: 'Pro', service: 'Make', tasksPerMonth: 40000, costPerMonth: 53, summary: 'Full-text search, 250MB files, priority execution' },
  { name: 'Pro 80K', tier: 'Pro', service: 'Make', tasksPerMonth: 80000, costPerMonth: 91, summary: 'Full-text search, 250MB files, priority execution' },
  { name: 'Pro 150K', tier: 'Pro', service: 'Make', tasksPerMonth: 150000, costPerMonth: 153.45, summary: 'Full-text search, 250MB files, priority execution' },
  { name: 'Pro 300K', tier: 'Pro', service: 'Make', tasksPerMonth: 300000, costPerMonth: 268.54, summary: 'Full-text search, 250MB files, priority execution' },
  { name: 'Pro 500K', tier: 'Pro', service: 'Make', tasksPerMonth: 500000, costPerMonth: 410.27, summary: 'Full-text search, 250MB files, priority execution' },
  { name: 'Pro 750K', tier: 'Pro', service: 'Make', tasksPerMonth: 750000, costPerMonth: 576.94, summary: 'Full-text search, 250MB files, priority execution' },
  { name: 'Pro 1M', tier: 'Pro', service: 'Make', tasksPerMonth: 1000000, costPerMonth: 748.73, summary: 'Full-text search, 250MB files, priority execution' },
  { name: 'Pro 1.5M', tier: 'Pro', service: 'Make', tasksPerMonth: 1500000, costPerMonth: 1078.18, summary: 'Full-text search, 250MB files, priority execution' },
  { name: 'Pro 2M', tier: 'Pro', service: 'Make', tasksPerMonth: 2000000, costPerMonth: 1377.67, summary: 'Full-text search, 250MB files, priority execution' },
  { name: 'Teams 10K', tier: 'Teams', service: 'Make', tasksPerMonth: 10000, costPerMonth: 29, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 20K', tier: 'Teams', service: 'Make', tasksPerMonth: 20000, costPerMonth: 53, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 40K', tier: 'Teams', service: 'Make', tasksPerMonth: 40000, costPerMonth: 99, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 80K', tier: 'Teams', service: 'Make', tasksPerMonth: 80000, costPerMonth: 172.9, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 150K', tier: 'Teams', service: 'Make', tasksPerMonth: 150000, costPerMonth: 291.56, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 300K', tier: 'Teams', service: 'Make', tasksPerMonth: 300000, costPerMonth: 510.22, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 500K', tier: 'Teams', service: 'Make', tasksPerMonth: 500000, costPerMonth: 779.5, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 750K', tier: 'Teams', service: 'Make', tasksPerMonth: 750000, costPerMonth: 1096.18, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 1M', tier: 'Teams', service: 'Make', tasksPerMonth: 1000000, costPerMonth: 1400.67, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 1.5M', tier: 'Teams', service: 'Make', tasksPerMonth: 1500000, costPerMonth: 1969.7, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 2M', tier: 'Teams', service: 'Make', tasksPerMonth: 2000000, costPerMonth: 2451.18, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 2.5M', tier: 'Teams', service: 'Make', tasksPerMonth: 2500000, costPerMonth: 3009.26, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 3M', tier: 'Teams', service: 'Make', tasksPerMonth: 3000000, costPerMonth: 3446.97, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 4M', tier: 'Teams', service: 'Make', tasksPerMonth: 4000000, costPerMonth: 4404.46, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 5M', tier: 'Teams', service: 'Make', tasksPerMonth: 5000000, costPerMonth: 5333.52, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 6M', tier: 'Teams', service: 'Make', tasksPerMonth: 6000000, costPerMonth: 6342.42, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 7M', tier: 'Teams', service: 'Make', tasksPerMonth: 7000000, costPerMonth: 7227.99, summary: 'Team roles, templates, 500MB files' },
  { name: 'Teams 8M', tier: 'Teams', service: 'Make', tasksPerMonth: 8000000, costPerMonth: 8231.05, summary: 'Team roles, templates, 500MB files' },
]

// Find the cheapest plan that covers the required usage
export function findBestPlan(plans: Plan[], requiredTasks: number): Plan | null {
  const validPlans = plans.filter(p => p.tasksPerMonth >= requiredTasks)
  if (validPlans.length === 0) return null
  return validPlans.reduce((best, plan) =>
    plan.costPerMonth < best.costPerMonth ? plan : best
  )
}

// Convert Zapier tasks to Make operations
// Zapier: 1 task = 1 action (triggers don't count)
// Make: 1 operation = 1 step (triggers DO count)
// Formula: makeOps = tasks + MIN(tasks * 0.2, tasks / numZaps)
// The 20% cap prevents overestimation for typical Zap structures
export function convertTasksToOperations(
  zapierTasks: number,
  numZaps: number
): number {
  // Estimate trigger overhead, capped at 20% of tasks
  const triggers = numZaps > 0
    ? Math.min(zapierTasks * 0.2, zapierTasks / numZaps)
    : zapierTasks * 0.2
  return Math.ceil(zapierTasks + triggers)
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`
  return num.toString()
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}
