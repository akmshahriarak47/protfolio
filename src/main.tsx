import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initLenis } from './lib/lenis'
import './index.css'

// Initialize smooth scrolling with Lenis
initLenis()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
