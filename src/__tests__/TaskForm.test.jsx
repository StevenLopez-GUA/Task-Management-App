import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { TaskContext } from '../context/TaskContext'
import TaskForm from '../components/TaskForm'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

describe('TaskForm', () => {
    const dispatch = jest.fn()

    beforeEach(() => dispatch.mockClear())

    test('renderiza con campos vacíos en modo “new”', () => {
        render(
            <TaskContext.Provider value={{ state: { tasks: [] }, dispatch }}>
                <MemoryRouter initialEntries={['/tasks/new']}>
                    <Routes>
                        <Route path="/tasks/new" element={<TaskForm />} />
                    </Routes>
                </MemoryRouter>
            </TaskContext.Provider>
        )
        expect(screen.getByLabelText(/Título/i)).toHaveValue('')
        expect(screen.getByRole('button', { name: /Crear tarea/i })).toBeInTheDocument()
    })

    test('al enviar en “new” dispara ADD_TASK', async () => {
        render(
            <TaskContext.Provider value={{ state: { tasks: [] }, dispatch }}>
                <MemoryRouter initialEntries={['/tasks/new']}>
                    <Routes>
                        <Route path="/tasks/new" element={<TaskForm />} />
                    </Routes>
                </MemoryRouter>
            </TaskContext.Provider>
        )
        fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Prueba' } })
        fireEvent.change(screen.getByLabelText(/Fecha de vencimiento/i), { target: { value: '2025-05-07' } })
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: /Crear tarea/i }));
        });
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'ADD_TASK' }))
    })
})
