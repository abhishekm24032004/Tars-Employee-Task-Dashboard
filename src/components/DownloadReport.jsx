import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { exportTasks } from '../utils/reports'

const formats = [
  { value: 'csv', label: 'CSV (.csv)', desc: 'Spreadsheet-friendly' },
  { value: 'json', label: 'JSON (.json)', desc: 'Structured data' },
  { value: 'txt', label: 'Text (.txt)', desc: 'Plain text report' },
]

export default function DownloadReport({ tasks, reportName = 'task-report', size = 'md' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const disabled = !tasks || tasks.length === 0

  function handleSelect(format) {
    if (disabled) {
      toast.info('No tasks available to download.')
      setOpen(false)
      return
    }
    try {
      exportTasks(tasks, format, reportName)
      toast.success(`${reportName} exported as ${format.toUpperCase()}`)
    } catch {
      toast.error('Failed to generate report.')
    }
    setOpen(false)
  }

  const sizeClasses =
    size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={disabled}
        className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-500 font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 ${sizeClasses}`}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="M7 10l5 5 5-5" />
          <path d="M12 15V3" />
        </svg>
        Download Report
        <svg className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-56 origin-top-right overflow-hidden rounded-xl border border-slate-200/70 bg-white shadow-xl shadow-slate-900/10 animate-fade-in dark:border-white/10 dark:bg-slate-900">
          <div className="border-b border-slate-100 px-4 py-2 dark:border-white/5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Export format
            </p>
          </div>
          <div className="p-1.5">
            {formats.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => handleSelect(f.value)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {f.label}
                  </p>
                  <p className="text-[11px] text-slate-400">{f.desc}</p>
                </div>
                {f.value === 'csv' && (
                  <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                    Recommended
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="border-t border-slate-100 px-4 py-2 dark:border-white/5">
            <p className="text-[11px] text-slate-400">
              {disabled ? 'No tasks to export' : `${tasks.length} task${tasks.length !== 1 ? 's' : ''} included`}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
