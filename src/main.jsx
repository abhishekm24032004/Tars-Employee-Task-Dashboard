import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const storedTheme = localStorage.getItem('tars_theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
if (storedTheme ? JSON.parse(storedTheme) === 'dark' : prefersDark) {
  document.documentElement.classList.add('dark')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
