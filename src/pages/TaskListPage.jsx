import React, { useContext } from 'react'
import { TaskContext } from '../context/TaskContext'
import { Link } from 'react-router-dom'
import TaskList from '../components/TaskList'

export default function TaskListPage() {
    const { state, dispatch } = useContext(TaskContext)
    

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl text-black font-bold">Lista de Tareas</h1>
                <Link to="/tasks/new" className="px-4 py-2 bg-blue-600 rounded">
                    + Nueva
                </Link>
            </div>

            {/* Filtro */}
            <select
                value={state.filter}
                onChange={e => dispatch({ type: 'SET_FILTER', payload: e.target.value })}
                className="mb-4 p-2 border rounded"
            >
                <option value="all">Todas</option>
                <option value="todo">Por hacer</option>
                <option value="in-progress">En progreso</option>
                <option value="completed">Completadas</option>
            </select>

            <TaskList />
        </div>
    )
}
