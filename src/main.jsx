import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TaskProvider } from './context/TaskContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TaskProvider>
        <App />
      </TaskProvider>
    </BrowserRouter>
  </React.StrictMode>
)
