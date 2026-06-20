import { useState } from 'react'
import { PRIORITIES, isPastDate, priorityStyles, toInputDateValue } from '../utils/helpers'

const fieldBase =
  'w-full rounded-xl border bg-white/60 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 dark:bg-slate-800/50 dark:text-white '

const initialState = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'pending',
  dueDate: '',
}

export default function TaskForm({ initialValues, submitLabel = 'Save Task', onSubmit }) {
  const [values, setValues] = useState({
    ...initialState,
    ...initialValues,
    dueDate: toInputDateValue(initialValues?.dueDate),
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  function validate(fieldValues = values) {
    const next = {}
    if (!fieldValues.title.trim()) next.title = 'Title is required'
    if (!fieldValues.description.trim()) next.description = 'Description is required'
    if (!fieldValues.priority) next.priority = 'Priority is required'
    if (!fieldValues.dueDate) next.dueDate = 'Due date is required'
    else if (isPastDate(fieldValues.dueDate)) next.dueDate = 'Due date cannot be in the past'
    return next
  }

  function handleChange(e) {
    const { name, value } = e.target
    const updated = { ...values, [name]: value }
    setValues(updated)
    if (touched[name]) {
      setErrors(validate(updated))
    }
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors(validate(values))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formErrors = validate(values)
    setErrors(formErrors)
    setTouched({ title: true, description: true, priority: true, dueDate: true })
    if (Object.keys(formErrors).length > 0) return
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-5 p-6 sm:p-8">
      <Field label="Task Title" error={touched.title && errors.title} htmlFor="title">
        <input
          id="title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. Prepare quarterly report"
          className={`${fieldBase} ${
            touched.title && errors.title
              ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-500/20 dark:border-rose-500/50'
              : 'border-slate-200/70 focus:border-brand-400 focus:ring-brand-500/20 dark:border-white/10'
          }`}
        />
      </Field>

      <Field
        label="Description"
        error={touched.description && errors.description}
        htmlFor="description"
      >
        <textarea
          id="description"
          name="description"
          rows={4}
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Describe the task in detail..."
          className={`${fieldBase} resize-none ${
            touched.description && errors.description
              ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-500/20 dark:border-rose-500/50'
              : 'border-slate-200/70 focus:border-brand-400 focus:ring-brand-500/20 dark:border-white/10'
          }`}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Priority"
          error={touched.priority && errors.priority}
          htmlFor="priority"
        >
          <select
            id="priority"
            name="priority"
            value={values.priority}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${fieldBase} border-slate-200/70 focus:border-brand-400 focus:ring-brand-500/20 dark:border-white/10`}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {priorityStyles[p].label}
              </option>
            ))}
          </select>
          <div className="mt-2 flex gap-1.5">
            {PRIORITIES.map((p) => (
              <span
                key={p}
                className={`h-1 flex-1 rounded-full ${priorityStyles[p].dot} ${
                  values.priority === p ? 'opacity-100' : 'opacity-25'
                } transition-opacity`}
              />
            ))}
          </div>
        </Field>

        <Field
          label="Due Date"
          error={touched.dueDate && errors.dueDate}
          htmlFor="dueDate"
        >
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={values.dueDate}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${fieldBase} ${
              touched.dueDate && errors.dueDate
                ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-500/20 dark:border-rose-500/50'
                : 'border-slate-200/70 focus:border-brand-400 focus:ring-brand-500/20 dark:border-white/10'
            }`}
          />
        </Field>
      </div>

      {initialValues?.status && (
        <Field
          label="Status"
          error={null}
          htmlFor="status"
        >
          <select
            id="status"
            name="status"
            value={values.status}
            onChange={handleChange}
            className={`${fieldBase} border-slate-200/70 focus:border-brand-400 focus:ring-brand-500/20 dark:border-white/10`}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </Field>
      )}

      <div className="flex items-center justify-end gap-3 border-t border-slate-200/60 pt-5 dark:border-white/5">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

function Field({ label, error, htmlFor, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-500">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
