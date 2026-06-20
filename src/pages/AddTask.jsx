import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import TaskForm from '../components/TaskForm'
import { useTaskContext } from '../context/TaskContext'

export default function AddTask() {
  const navigate = useNavigate()
  const { addTask } = useTaskContext()

  const handleSubmit = (values) => {
    addTask(values)
    toast.success('Task added successfully!')
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
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add New Task</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Fill in the details below to create a new task.
        </p>
      </div>

      <TaskForm onSubmit={handleSubmit} submitLabel="Create Task" />
    </div>
  )
}
