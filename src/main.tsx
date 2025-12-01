import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ActivityProvicer } from './components/context/ActivityContext.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ActivityProvicer>
      <App />
    </ActivityProvicer>
  </StrictMode>,
)
