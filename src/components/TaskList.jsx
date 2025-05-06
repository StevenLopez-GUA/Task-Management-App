import React, { useContext, useMemo } from 'react'
import { TaskContext } from '../context/TaskContext'
import TaskCard from './TaskCard'

export default function TaskList() {
    const { state } = useContext(TaskContext)
    const { tasks, filter } = state
    console.log('🏷️ TaskContext dentro de TaskList:', state)


    // Filtrar tareas según estado
    const filtered = useMemo(() => {
        if (filter === 'all') return tasks
        return tasks.filter(t => t.status === filter)
    }, [tasks, filter])

    if (filtered.length === 0) {
        return <p className="p-4 text-gray-500">No hay tareas para mostrar.</p>
    }

    return (
        <div className="space-y-4">
            {filtered.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    )
}
