import { useNavigate } from 'react-router-dom'
import { useTaskContext } from '../context/TaskContext'
import { formatDate, isPastDate, priorityStyles, statusStyles } from '../utils/helpers'

export default function TaskCard({ task, onComplete, onDelete, index = 0 }) {
  const navigate = useNavigate()
  const { completeTask, deleteTask } = useTaskContext()

  const isCompleted = task.status === 'completed'
  const overdue = !isCompleted && isPastDate(task.dueDate)

  const handleComplete = (e) => {
    e.stopPropagation()
    completeTask(task.id)
    onComplete?.(task)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    deleteTask(task.id)
    onDelete?.(task)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    navigate(`/edit/${task.id}`)
  }

  const priority = priorityStyles[task.priority] || priorityStyles.medium
  const status = statusStyles[task.status] || statusStyles.pending

  return (
    <div
      className="glass-card group relative flex flex-col gap-3 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 40}ms` }}
      onClick={handleEdit}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleEdit(e)
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${priority.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${priority.dot}`} />
            {priority.label}
          </span>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${status.badge}`}>
            {status.label}
          </span>
          {overdue && (
            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-[11px] font-semibold text-red-700 ring-1 ring-red-200 dark:bg-red-500/15 dark:text-red-300 dark:ring-red-500/30">
              Overdue
            </span>
          )}
        </div>

        {task.source === 'api' && (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
            Sample
          </span>
        )}
      </div>

      <div>
        <h3 className="text-base font-semibold leading-snug text-slate-900 dark:text-white line-clamp-1">
          {task.title}
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
          {task.description || 'No description provided.'}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-200/60 pt-3 dark:border-white/5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {formatDate(task.dueDate)}
        </div>

        <div className="flex items-center gap-1.5">
          {!isCompleted && (
            <button
              type="button"
              onClick={handleComplete}
              title="Mark complete"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-emerald-100 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-emerald-500/15 dark:hover:text-emerald-300"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </button>
          )}
          <button
            type="button"
            onClick={handleEdit}
            title="Edit"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-brand-100 hover:text-brand-600 dark:text-slate-400 dark:hover:bg-brand-500/15 dark:hover:text-brand-300"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            title="Delete"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-rose-100 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-500/15 dark:hover:text-rose-300"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
