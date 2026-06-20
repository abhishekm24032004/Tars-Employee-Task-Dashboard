import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useTaskContext } from '../context/TaskContext'
import TaskCard from '../components/TaskCard'
import FilterBar from '../components/FilterBar'
import DownloadReport from '../components/DownloadReport'

export default function Tasks() {
  const { allTasks, filter, setFilter, loadSampleTasks, apiStatus, apiError } =
    useTaskContext()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const queryFilter = searchParams.get('filter')
    if (queryFilter && ['all', 'completed', 'pending', 'high'].includes(queryFilter)) {
      setFilter(queryFilter)
    }
  }, [searchParams, setFilter])

  const handleComplete = (task) => toast.success(`"${task.title}" marked as completed`)
  const handleDelete = (task) => toast.info(`"${task.title}" deleted`)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Tasks</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {allTasks.length} task{allTasks.length !== 1 ? 's' : ''} shown
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DownloadReport tasks={allTasks} reportName="tasks-list" size="sm" />
          <button
            type="button"
            onClick={loadSampleTasks}
            disabled={apiStatus === 'loading' || apiStatus === 'success'}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-white/60 px-4 py-2 text-sm font-medium text-slate-600 transition-all hover:border-brand-300 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:text-brand-300"
          >
            {apiStatus === 'loading' ? (
              <>
                <Spinner /> Loading...
              </>
            ) : apiStatus === 'success' ? (
              <>
                <CheckIcon /> Sample tasks loaded
              </>
            ) : (
              <>
                <DownloadIcon /> Fetch Sample Tasks
              </>
            )}
          </button>
        </div>
      </div>

      {apiStatus === 'error' && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
          <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {apiError || 'Failed to fetch sample tasks'}
        </div>
      )}

      <div className="mb-6">
        <FilterBar />
      </div>

      {allTasks.length === 0 ? (
        <EmptyState filter={filter} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allTasks.map((task, idx) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', task.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const draggedId = e.dataTransfer.getData('text/plain')
                if (draggedId && draggedId !== task.id) {
                  const el = e.currentTarget
                  el.classList.add('ring-2', 'ring-brand-400')
                  setTimeout(() => el.classList.remove('ring-2', 'ring-brand-400'), 400)
                }
              }}
            >
              <TaskCard
                task={task}
                index={idx}
                onComplete={handleComplete}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function EmptyState({ filter }) {
  const messages = {
    all: 'No tasks yet. Create your first task to get started.',
    completed: 'No completed tasks yet.',
    pending: 'No pending tasks. You\'re all caught up!',
    high: 'No high-priority tasks right now.',
  }
  return (
    <div className="glass-card flex flex-col items-center justify-center px-6 py-16 text-center animate-fade-in">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/10 to-indigo-500/10">
        <svg className="h-8 w-8 text-brand-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 8h10M7 12h10M7 16h6" />
        </svg>
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-700 dark:text-slate-200">
        Nothing here yet
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {messages[filter] || messages.all}
      </p>
    </div>
  )
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
function DownloadIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  )
}
