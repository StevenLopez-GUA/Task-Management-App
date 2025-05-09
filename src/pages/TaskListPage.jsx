import React, { useContext } from 'react'
import { TaskContext } from '../context/TaskContext'
import { Link } from 'react-router-dom'
import TaskList from '../components/TaskList'
import ProgressChart from '../components/ProgressChart'

export default function TaskListPage() {
    const { state, dispatch } = useContext(TaskContext)

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Lista de Tareas</h1>
                <Link to="/tasks/new" className="px-4 py-2 bg-blue-600 rounded text-white">
                    + Nueva
                </Link>
            </div>

            {/* Filtros con labels */}
            <div className="mb-6 flex flex-col md:flex-row md:items-end gap-6">
                {/* Buscar */}
                <div className="flex flex-col flex-1">
                    <label htmlFor="search" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Buscar
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Título o descripción…"
                        value={state.searchText}
                        onChange={e => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                        className="p-2 border rounded"
                    />
                </div>

                {/* Estado */}
                <div className="flex flex-col">
                    <label htmlFor="filter-status" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Estado
                    </label>
                    <select
                        id="filter-status"
                        value={state.filter}
                        onChange={e => dispatch({ type: 'SET_FILTER', payload: e.target.value })}
                        className="p-2 border rounded w-48"
                    >
                        <option value="all">Todas</option>
                        <option value="todo">Por hacer</option>
                        <option value="in-progress">En progreso</option>
                        <option value="completed">Completadas</option>
                    </select>
                </div>

                {/* Orden */}
                <div className="flex flex-col">
                    <label htmlFor="sort-order" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Orden
                    </label>
                    <select
                        id="sort-order"
                        value={state.sortOrder}
                        onChange={e => dispatch({ type: 'SET_SORT', payload: e.target.value })}
                        className="p-2 border rounded w-48"
                    >
                        <option value="manual">Manual</option>
                        <option value="asc">Fecha ↑</option>
                        <option value="desc">Fecha ↓</option>
                    </select>
                </div>

                {/* Categoría */}
                <div className="flex flex-col">
                    <label htmlFor="filter-category" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Categoría
                    </label>
                    <select
                        id="filter-category"
                        value={state.filterCategory}
                        onChange={e => dispatch({ type: 'SET_CATEGORY_FILTER', payload: e.target.value })}
                        className="p-2 border rounded w-48"
                    >
                        <option value="all">Todas las categorías</option>
                        <option value="Personal">Personal</option>
                        <option value="Trabajo">Trabajo</option>
                        <option value="Estudio">Estudio</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                {/* Prioridad */}
                <div className="flex flex-col">
                    <label htmlFor="filter-priority" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Prioridad
                    </label>
                    <select
                        id="filter-priority"
                        value={state.filterPriority}
                        onChange={e => dispatch({ type: 'SET_PRIORITY_FILTER', payload: e.target.value })}
                        className="p-2 border rounded w-48"
                    >
                        <option value="all">Todas las prioridades</option>
                        <option value="low">Baja</option>
                        <option value="medium">Media</option>
                        <option value="high">Alta</option>
                    </select>
                </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
                <div>
                    <TaskList />
                </div>

                <div className="flex justify-center items-start">
                    <ProgressChart />
                </div>
            </div>
        </div>
    )
}
