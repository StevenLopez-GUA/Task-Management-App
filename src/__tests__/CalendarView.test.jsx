import React from 'react'
import { render, screen } from '@testing-library/react'
import CalendarView from '../components/CalendarView'
import { TaskContext } from '../context/TaskContext'
import { format } from 'date-fns'

describe('CalendarView', () => {
  test('muestra mensaje si no hay tareas en la fecha seleccionada', () => {
    render(
      <TaskContext.Provider value={{ state: { tasks: [] } }}>
        <CalendarView />
      </TaskContext.Provider>
    )
    const todayText = format(new Date(), 'PPP')  // Formato p. ej. "May 5th, 2025"
    expect(screen.getByText(new RegExp(`Tareas para ${todayText}`))).toBeInTheDocument()
    expect(screen.getByText(/No hay tareas para este día/i)).toBeInTheDocument()
  })
})
