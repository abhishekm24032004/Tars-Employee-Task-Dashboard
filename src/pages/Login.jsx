import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})

  const from = location.state?.from?.pathname || '/'

  function validate() {
    const next = {}
    if (!email.trim()) next.email = 'Username is required'
    if (!password) next.password = 'Password is required'
    return next
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formErrors = validate()
    setErrors(formErrors)
    if (Object.keys(formErrors).length > 0) return

    try {
      login(email.trim(), password)
      toast.success('Welcome back, taskmanager!')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error('Invalid credentials. Please try again.')
      setErrors({ form: err.message || 'Login failed' })
    }
  }

  function fillDemo() {
    setEmail('taskmanager')
    setPassword('manager')
    setErrors({})
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorative blobs */}
      <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="glass-card relative w-full max-w-md p-8 animate-fade-in">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-500 text-white shadow-lg shadow-brand-500/30">
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">TARS Task Hub</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Sign in to access your task dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Username
            </label>
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="taskmanager"
              className={`w-full rounded-xl border bg-white/60 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 dark:bg-slate-800/50 dark:text-white ${
                errors.email
                  ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-500/20 dark:border-rose-500/50'
                  : 'border-slate-200/70 focus:border-brand-400 focus:ring-brand-500/20 dark:border-white/10'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs font-medium text-rose-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full rounded-xl border bg-white/60 px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 dark:bg-slate-800/50 dark:text-white ${
                  errors.password
                    ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-500/20 dark:border-rose-500/50'
                    : 'border-slate-200/70 focus:border-brand-400 focus:ring-brand-500/20 dark:border-white/10'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <path d="M2 2l20 20" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs font-medium text-rose-500">{errors.password}</p>
            )}
          </div>

          {errors.form && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
              {errors.form}
            </div>
          )}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.01] hover:shadow-xl active:scale-95"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <path d="m10 17 5-5-5-5" />
              <path d="M15 12H3" />
            </svg>
            Sign In
          </button>
        </form>

        <button
          type="button"
          onClick={fillDemo}
          className="mt-4 w-full rounded-xl border border-dashed border-slate-300 px-4 py-2 text-xs font-medium text-slate-500 transition-colors hover:border-brand-400 hover:text-brand-500 dark:border-white/15 dark:text-slate-400 dark:hover:text-brand-300"
        >
          Use demo credentials (taskmanager / manager)
        </button>
      </div>
    </div>
  )
}
