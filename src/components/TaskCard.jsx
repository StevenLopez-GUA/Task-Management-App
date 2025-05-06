import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { TaskContext } from '../context/TaskContext'

export default function TaskCard({ task }) {
    const { dispatch } = useContext(TaskContext)
    const nav = useNavigate()

    return (
        <div className="p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.dueDate}</p>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={() => dispatch({ type: 'TOGGLE_STATUS', payload: task.id })}
                    className="px-2 py-1 border rounded"
                >
                    {task.status}
                </button>
                <button
                    onClick={() => nav(`/tasks/${task.id}/edit`)}
                    className="px-2 py-1 border rounded"
                >
                    Edit
                </button>
                <button
                    onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
                    className="px-2 py-1 border rounded text-red-500"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
