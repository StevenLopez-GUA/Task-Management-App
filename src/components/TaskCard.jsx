// src/components/TaskCard.jsx
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { TaskContext } from '../context/TaskContext'
import { parseISO, differenceInCalendarDays } from 'date-fns'
import { Pencil, Trash2, RefreshCw } from 'lucide-react'
import Swal from 'sweetalert2'

export default function TaskCard({ task }) {
    const { dispatch } = useContext(TaskContext)
    const nav = useNavigate()

    // Cálculo cuenta atrás
    const daysLeft = differenceInCalendarDays(parseISO(task.dueDate), new Date())
    let countdownText
    if (daysLeft > 0) countdownText = `${daysLeft}d restante`
    else if (daysLeft === 0) countdownText = 'Hoy'
    else countdownText = 'Vencida'

    // Estilos dinámicos según estado
    const statusStyles = {
        todo: 'bg-yellow-100 text-yellow-800',
        'in-progress': 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800'
    }
    const statusLabels = {
        todo: 'Por hacer',
        'in-progress': 'En progreso',
        completed: 'Completadas'
    }

    return (
        <div className="p-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg shadow flex justify-between items-start">
            <div>
                <h3 className="font-semibold text-lg mb-1">{task.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Fecha: {task.dueDate}</p>
                <span
                    className={`inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full ${daysLeft < 0
                        ? 'bg-red-200 text-red-800'
                        : daysLeft === 0
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-green-200 text-green-800'
                        }`}
                >
                    {countdownText}
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {task.category}
                    </span>
                    <span
                        className={`text-xs px-2 py-1 rounded-full ${task.priority === 'high'
                            ? 'bg-red-200 text-red-800'
                            : task.priority === 'medium'
                                ? 'bg-yellow-200 text-yellow-800'
                                : 'bg-green-200 text-green-800'
                            }`}
                    >
                        {task.priority === 'high'
                            ? 'Alta'
                            : task.priority === 'medium'
                                ? 'Media'
                                : 'Baja'}
                    </span>
                </div>
            </div>

            <div className="flex flex-col space-y-2">
                {/* Toggle estado */}
                <button
                    onClick={() => dispatch({ type: 'TOGGLE_STATUS', payload: task.id })}
                    className={`flex items-center space-x-1 px-3 py-1 text-sm font-medium rounded ${statusStyles[task.status]} hover:opacity-90`}
                >
                    <RefreshCw size={16} />
                    <span>{statusLabels[task.status]}</span>
                </button>

                {/* Editar */}
                <button
                    onClick={() => nav(`/tasks/${task.id}/edit`)}
                    className="flex items-center space-x-1 px-3 py-1 text-sm font-medium bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                >
                    <Pencil size={16} />
                    <span>Editar</span>
                </button>

                {/* Eliminar con SweetAlert (tema oscuro) */}
                <button
                    onClick={async () => {
                        const result = await Swal.fire({
                            title: '¿Eliminar tarea?',
                            text: 'Esta acción no se puede deshacer.',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Sí, eliminar',
                            cancelButtonText: 'Cancelar',
                            background: '#2d3748',      // bg-gray-800
                            color: '#f7fafc',           // text-gray-50
                            confirmButtonColor: '#e53e3e', // red-600
                            cancelButtonColor: '#4a5568'   // gray-600
                        })
                        if (result.isConfirmed) {
                            dispatch({ type: 'DELETE_TASK', payload: task.id })
                            await Swal.fire({
                                title: 'Eliminada',
                                text: 'La tarea ha sido eliminada.',
                                icon: 'success',
                                timer: 1500,
                                showConfirmButton: false,
                                background: '#2d3748',
                                color: '#f7fafc'
                            })
                        }
                    }}
                    className="flex items-center space-x-1 px-3 py-1 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded"
                >
                    <Trash2 size={16} />
                    <span>Eliminar</span>
                </button>
            </div>
        </div>
    )
}
