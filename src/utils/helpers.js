export const PRIORITIES = ['high', 'medium', 'low']

export const STATUS = {
  completed: 'completed',
  pending: 'pending',
}

export function formatDate(dateString) {
  if (!dateString) return 'No due date'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return 'Invalid date'
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function isPastDate(dateString) {
  if (!dateString) return false
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)
  return date < today
}

export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const priorityStyles = {
  high: {
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300 ring-1 ring-rose-200 dark:ring-rose-500/30',
    dot: 'bg-rose-500',
    label: 'High',
  },
  medium: {
    badge:
      'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 ring-1 ring-amber-200 dark:ring-amber-500/30',
    dot: 'bg-amber-500',
    label: 'Medium',
  },
  low: {
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 ring-1 ring-emerald-200 dark:ring-emerald-500/30',
    dot: 'bg-emerald-500',
    label: 'Low',
  },
}

export const statusStyles = {
  completed: {
    badge:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 ring-1 ring-emerald-200 dark:ring-emerald-500/30',
    label: 'Completed',
  },
  pending: {
    badge:
      'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300 ring-1 ring-sky-200 dark:ring-sky-500/30',
    label: 'Pending',
  },
}

export function priorityRank(priority) {
  const order = { high: 0, medium: 1, low: 2 }
  return order[priority] ?? 3
}

export function toInputDateValue(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return ''
  const tzOffset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - tzOffset).toISOString().slice(0, 10)
}
