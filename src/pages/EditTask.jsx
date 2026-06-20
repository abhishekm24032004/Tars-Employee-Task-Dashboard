import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import TaskForm from '../components/TaskForm'
import { useTaskContext } from '../context/TaskContext'

export default function EditTask() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getTaskById, updateTask, completeTask } = useTaskContext()

  const task = getTaskById(id)

  useEffect(() => {
    if (!task) {
      toast.error('Task not found.')
      navigate('/tasks', { replace: true })
    }
  }, [task, navigate])

  if (!task) return null

  const handleSubmit = (values) => {
    updateTask(id, values)
    toast.success('Task updated successfully!')
    navigate('/tasks')
  }

  const handleComplete = () => {
    completeTask(id)
    toast.success('Task marked as completed!')
    navigate('/tasks')
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 animate-fade-in">
        <button
          type="button"
          onClick={() => navigate('/tasks')}
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-brand-500 dark:text-slate-400 dark:hover:text-brand-300"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Tasks
        </button>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Task</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Update the details of your task below.
        </p>
      </div>

      {task.status !== 'completed' && (
        <div className="mb-6 flex items-center justify-between rounded-xl border border-emerald-200/60 bg-emerald-50/60 px-4 py-3 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Mark this task as done?
          </div>
          <button
            type="button"
            onClick={handleComplete}
            className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            Mark Complete
          </button>
        </div>
      )}

      <TaskForm initialValues={task} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  )
}
