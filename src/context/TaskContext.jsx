import { createContext, useContext, useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { fetchSampleTasks } from '../services/api'
import { generateId, priorityRank } from '../utils/helpers'

const TaskContext = createContext(null)

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tars_tasks', [])
  const [apiTasks, setApiTasks] = useState([])
  const [apiStatus, setApiStatus] = useState('idle') // idle | loading | success | error
  const [apiError, setApiError] = useState(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all') // all | completed | pending | high

  const addTask = (task) => {
    const newTask = {
      id: generateId(),
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status || 'pending',
      dueDate: task.dueDate,
      source: 'local',
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [newTask, ...prev])
    return newTask
  }

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
    setApiTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const completeTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: 'completed' } : task
      )
    )
    setApiTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: 'completed' } : task
      )
    )
  }

  const getTaskById = (id) =>
    [...tasks, ...apiTasks].find((task) => task.id === id)

  const loadSampleTasks = async () => {
    if (apiStatus === 'loading' || apiStatus === 'success') return
    setApiStatus('loading')
    setApiError(null)
    try {
      const fetched = await fetchSampleTasks(12)
      setApiTasks(fetched)
      setApiStatus('success')
    } catch (err) {
      setApiError(err.message || 'Failed to fetch sample tasks')
      setApiStatus('error')
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setFilter('all')
  }

  const allTasks = useMemo(() => {
    const merged = [...tasks, ...apiTasks]
    let result = merged

    if (filter === 'completed') {
      result = result.filter((task) => task.status === 'completed')
    } else if (filter === 'pending') {
      result = result.filter((task) => task.status === 'pending')
    } else if (filter === 'high') {
      result = result.filter((task) => task.priority === 'high')
    }

    const query = searchQuery.trim().toLowerCase()
    if (query) {
      result = result.filter((task) =>
        task.title.toLowerCase().includes(query)
      )
    }

    return [...result].sort((a, b) => {
      if (a.status !== b.status) {
        return a.status === 'pending' ? -1 : 1
      }
      const rank = priorityRank(a.priority) - priorityRank(b.priority)
      if (rank !== 0) return rank
      return new Date(a.dueDate || 0) - new Date(b.dueDate || 0)
    })
  }, [tasks, apiTasks, filter, searchQuery])

  const stats = useMemo(() => {
    const merged = [...tasks, ...apiTasks]
    const total = merged.length
    const completed = merged.filter((task) => task.status === 'completed').length
    const pending = total - completed
    const highPriority = merged.filter((task) => task.priority === 'high').length
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100)
    return { total, completed, pending, highPriority, completionRate }
  }, [tasks, apiTasks])

  const recentTasks = useMemo(() => {
    const merged = [...tasks, ...apiTasks]
    return [...merged]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 5)
  }, [tasks, apiTasks])

  const pendingTasks = useMemo(() => {
    const merged = [...tasks, ...apiTasks]
    return merged
      .filter((task) => task.status === 'pending')
      .sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority))
      .slice(0, 5)
  }, [tasks, apiTasks])

  const value = {
    tasks,
    apiTasks,
    allTasks,
    stats,
    recentTasks,
    pendingTasks,
    searchQuery,
    filter,
    apiStatus,
    apiError,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    getTaskById,
    loadSampleTasks,
    setSearchQuery,
    setFilter,
    clearFilters,
  }

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTaskContext() {
  const ctx = useContext(TaskContext)
  if (!ctx) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return ctx
}
