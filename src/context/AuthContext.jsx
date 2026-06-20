import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const AuthContext = createContext(null)

const VALID_USERNAME = 'taskmanager'
const VALID_PASSWORD = 'manager'
const STORAGE_KEY = 'tars_auth_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(STORAGE_KEY, null)

  const login = (username, password) => {
    if (username.trim() !== VALID_USERNAME || password !== VALID_PASSWORD) {
      throw new Error('Invalid username or password')
    }
    const session = {
      username: VALID_USERNAME,
      loginAt: new Date().toISOString(),
    }
    setUser(session)
    return session
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    loading: false,
    isAuthenticated: Boolean(user),
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
