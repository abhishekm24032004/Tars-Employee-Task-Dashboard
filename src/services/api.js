const API_URL = 'https://jsonplaceholder.typicode.com/todos'

function normalizeTodo(todo) {
  return {
    id: `api-${todo.id}`,
    title: todo.title || 'Untitled task',
    description: 'Imported sample task from JSONPlaceholder API.',
    priority: 'medium',
    status: todo.completed ? 'completed' : 'pending',
    dueDate: new Date(Date.now() + (todo.id % 14) * 86400000)
      .toISOString()
      .slice(0, 10),
    source: 'api',
    createdAt: new Date().toISOString(),
  }
}

export async function fetchSampleTasks(limit = 12) {
  const res = await fetch(`${API_URL}?_limit=${limit}`)
  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`)
  }
  const data = await res.json()
  return data.map(normalizeTodo)
}
