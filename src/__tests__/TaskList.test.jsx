import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TaskContext } from '../context/TaskContext'
import TaskList from '../components/TaskList'

const mockTasks = [
    { id: '1', title: 'Tarea A', description: '', dueDate: '2025-05-05', status: 'todo' },
    { id: '2', title: 'Tarea B', description: '', dueDate: '2025-05-06', status: 'completed' }
]

describe('TaskList', () => {
    test('muestra mensaje cuando no hay tareas', () => {
        render(
            <MemoryRouter>
                <TaskContext.Provider value={{ state: { tasks: [], filter: 'all' } }}>
                    <TaskList />
                </TaskContext.Provider>
            </MemoryRouter>
        )
        expect(screen.getByText(/No hay tareas para mostrar/i)).toBeInTheDocument()
    })

    test('filtra y muestra solo las tareas completadas', () => {
        render(
            <MemoryRouter>
                <TaskContext.Provider value={{ state: { tasks: mockTasks, filter: 'completed' } }}>
                    <TaskList />
                </TaskContext.Provider>
            </MemoryRouter>
        )
        expect(screen.getByText('Tarea B')).toBeInTheDocument()
        expect(screen.queryByText('Tarea A')).toBeNull()
    })
})
