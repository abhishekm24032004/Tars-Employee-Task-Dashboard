import { useNavigate } from 'react-router-dom'
import { useTaskContext } from '../context/TaskContext'
import StatsCard from '../components/StatsCard'
import DownloadReport from '../components/DownloadReport'
import { formatDate, priorityStyles, statusStyles, isPastDate } from '../utils/helpers'

export default function Dashboard() {
  const navigate = useNavigate()
  const { tasks, apiTasks, stats, recentTasks, pendingTasks } = useTaskContext()

  const goTo = (filter) => () => navigate(`/tasks?filter=${filter}`)
  const goToTask = (id) => () => navigate(`/edit/${id}`)

  const mergedTasks = [...tasks, ...apiTasks]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="glass-card relative mb-8 overflow-hidden p-6 sm:p-8 animate-fade-in">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-500/20 to-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-10 left-1/3 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400/10 to-brand-500/10 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-500">
            Welcome back
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Employee Task Dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">
            Track, manage, and complete your tasks efficiently. Here is a snapshot
            of your productivity today.
          </p>
        </div>
        <div className="relative mt-4 sm:mt-0">
          <DownloadReport tasks={mergedTasks} reportName="dashboard-all-tasks" />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard type="total" value={stats.total} onClick={goTo('all')} />
        <StatsCard type="completed" value={stats.completed} onClick={goTo('completed')} />
        <StatsCard type="pending" value={stats.pending} onClick={goTo('pending')} />
        <StatsCard type="high" value={stats.highPriority} onClick={goTo('high')} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Left: Progress + Quick Stats */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <ProgressOverview stats={stats} />
          <QuickStatistics stats={stats} totalTasks={mergedTasks.length} />
        </div>

        {/* Right: Recent + Pending */}
        <div className="flex flex-col gap-6">
          <SectionList
            title="Recent Tasks"
            emptyText="No tasks yet. Add your first task!"
            items={recentTasks}
            onItemClick={goToTask}
            reportName="recent-tasks"
          />
          <SectionList
            title="Pending Tasks"
            emptyText="No pending tasks. You are all caught up!"
            items={pendingTasks}
            onItemClick={goToTask}
            reportName="pending-tasks"
          />
        </div>
      </div>
    </div>
  )
}

function ProgressOverview({ stats }) {
  const { completionRate, completed, pending, total } = stats
  const circumference = 2 * Math.PI * 52
  const dash = (completionRate / 100) * circumference

  return (
    <div className="glass-card p-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Progress Overview</h2>
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
          {completionRate}% complete
        </span>
      </div>
      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <div className="relative h-32 w-32 flex-shrink-0">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              strokeWidth="10"
              className="stroke-slate-200 dark:stroke-slate-800"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              stroke="url(#grad)"
              strokeDasharray={`${dash} ${circumference}`}
              className="transition-all duration-700 ease-out"
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">{completionRate}%</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Done</span>
          </div>
        </div>

        <div className="grid w-full grid-cols-3 gap-3">
          <StatTile label="Total" value={total} tone="brand" />
          <StatTile label="Completed" value={completed} tone="emerald" />
          <StatTile label="Pending" value={pending} tone="amber" />
        </div>
      </div>
    </div>
  )
}

function StatTile({ label, value, tone }) {
  const tones = {
    brand: 'text-brand-600 dark:text-brand-300',
    emerald: 'text-emerald-600 dark:text-emerald-300',
    amber: 'text-amber-600 dark:text-amber-300',
  }
  return (
    <div className="rounded-xl bg-white/50 p-3 text-center dark:bg-slate-800/40">
      <p className={`text-2xl font-bold ${tones[tone]}`}>{value}</p>
      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  )
}

function QuickStatistics({ stats, totalTasks }) {
  const items = [
    { label: 'Completion Rate', value: `${stats.completionRate}%`, tone: 'emerald' },
    { label: 'High Priority', value: stats.highPriority, tone: 'rose' },
    { label: 'In Progress', value: stats.pending, tone: 'amber' },
    { label: 'Total Tasks', value: totalTasks, tone: 'brand' },
  ]
  return (
    <div className="glass-card p-6 animate-fade-in">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Quick Statistics</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200/60 bg-white/40 p-4 text-center dark:border-white/5 dark:bg-slate-800/40">
            <p className="text-xl font-bold text-slate-900 dark:text-white">{item.value}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionList({ title, items, onItemClick, emptyText, reportName }) {
  return (
    <div className="glass-card p-5 animate-fade-in">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h2>
        {reportName && (
          <DownloadReport tasks={items} reportName={reportName} size="sm" />
        )}
      </div>
      {items.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-400">{emptyText}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((task) => {
            const priority = priorityStyles[task.priority] || priorityStyles.medium
            const status = statusStyles[task.status] || statusStyles.pending
            const overdue = task.status !== 'completed' && isPastDate(task.dueDate)
            return (
              <li key={task.id}>
                <button
                  type="button"
                  onClick={onItemClick(task.id)}
                  className="group flex w-full items-center gap-3 rounded-xl border border-slate-200/60 bg-white/40 p-3 text-left transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:border-white/5 dark:bg-slate-800/40 dark:hover:border-brand-500/30"
                >
                  <span className={`h-2 w-2 flex-shrink-0 rounded-full ${priority.dot}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-400">{formatDate(task.dueDate)}</p>
                  </div>
                  <span className={`hidden flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold sm:inline ${status.badge}`}>
                    {status.label}
                  </span>
                  {overdue && (
                    <span className="hidden flex-shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700 dark:bg-red-500/15 dark:text-red-300 sm:inline">
                      Overdue
                    </span>
                  )}
                  <svg className="h-4 w-4 flex-shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-brand-500 dark:text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
