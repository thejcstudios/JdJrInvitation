import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.tsx'
import "./assets/styles/Navbar.css";
import './assets/styles/Countdown.css'
import './assets/styles/Intro.css'
import './assets/styles/About.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
