import { formatDate, priorityStyles, statusStyles } from './helpers'

const CSV_COLUMNS = ['Title', 'Description', 'Priority', 'Status', 'Due Date', 'Source']

function escapeCsv(value) {
  const str = String(value ?? '')
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function buildCsv(tasks) {
  const rows = [
    CSV_COLUMNS.join(','),
    ...tasks.map((task) =>
      [
        task.title,
        task.description,
        (priorityStyles[task.priority] || priorityStyles.medium).label,
        (statusStyles[task.status] || statusStyles.pending).label,
        formatDate(task.dueDate),
        task.source === 'api' ? 'Sample (API)' : 'Local',
      ]
        .map(escapeCsv)
        .join(',')
    ),
  ]
  return rows.join('\n')
}

function buildJson(tasks, metadata = {}) {
  return JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      ...metadata,
      taskCount: tasks.length,
      tasks: tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: (priorityStyles[task.priority] || priorityStyles.medium).label,
        status: (statusStyles[task.status] || statusStyles.pending).label,
        dueDate: task.dueDate,
        source: task.source === 'api' ? 'Sample (API)' : 'Local',
        createdAt: task.createdAt,
      })),
    },
    null,
    2
  )
}

function buildText(tasks, title) {
  const lines = []
  lines.push('='.repeat(60))
  lines.push(title.toUpperCase())
  lines.push(`Generated: ${new Date().toLocaleString()}`)
  lines.push(`Total Tasks: ${tasks.length}`)
  lines.push('='.repeat(60))
  lines.push('')

  if (tasks.length === 0) {
    lines.push('No tasks to display.')
    return lines.join('\n')
  }

  tasks.forEach((task, i) => {
    const priority = priorityStyles[task.priority] || priorityStyles.medium
    const status = statusStyles[task.status] || statusStyles.pending
    lines.push(`${i + 1}. ${task.title}`)
    lines.push(`   Description : ${task.description || '-'}`)
    lines.push(`   Priority    : ${priority.label}`)
    lines.push(`   Status      : ${status.label}`)
    lines.push(`   Due Date    : ${formatDate(task.dueDate)}`)
    lines.push(`   Source      : ${task.source === 'api' ? 'Sample (API)' : 'Local'}`)
    lines.push('-'.repeat(60))
  })

  return lines.join('\n')
}

function download(content, filename, mimeType) {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function timestamp() {
  return new Date().toISOString().slice(0, 10)
}

export function exportTasks(tasks, format, reportName = 'tasks') {
  const safeName = reportName.toLowerCase().replace(/\s+/g, '-')
  if (format === 'csv') {
    download(buildCsv(tasks), `${safeName}-${timestamp()}.csv`, 'text/csv')
  } else if (format === 'json') {
    download(
      buildJson(tasks, { reportName }),
      `${safeName}-${timestamp()}.json`,
      'application/json'
    )
  } else if (format === 'txt') {
    download(buildText(tasks, reportName), `${safeName}-${timestamp()}.txt`, 'text/plain')
  }
}
