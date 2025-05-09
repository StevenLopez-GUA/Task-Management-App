import React, { useContext, useMemo } from 'react'
import { TaskContext } from '../context/TaskContext'
import TaskCard from './TaskCard'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'


export default function TaskList() {
    const { state, dispatch } = useContext(TaskContext)
    const { tasks, filter, searchText = '', sortOrder, filterCategory, filterPriority } = state

    // Filtrar tareas según estado
    const filtered = useMemo(() => {
        return tasks
            // 1) Filtrar por estado
            .filter(t => filter === 'all' || t.status === filter)

            // 2) Filtrar por texto libre
            .filter(t => {
                if (searchText.trim() === '') return true
                const term = searchText.trim().toLowerCase()
                return (
                    t.title.toLowerCase().includes(term) ||
                    t.description.toLowerCase().includes(term)
                )
            })

            // 3) Filtrar por categoría
            .filter(t => filterCategory === 'all' || t.category === filterCategory)

            // 4) Filtrar por prioridad
            .filter(t => filterPriority === 'all' || t.priority === filterPriority)

            // 5) Ordenar si es asc o desc (manual deja el orden actual)
            .sort((a, b) => {
                if (sortOrder === 'asc' || sortOrder === 'desc') {
                    const da = new Date(a.dueDate), db = new Date(b.dueDate)
                    return sortOrder === 'asc' ? da - db : db - da
                }
                return 0
            })
    }, [
        tasks,
        filter,
        searchText,
        filterCategory,
        filterPriority,
        sortOrder
    ])

    function onDragEnd(result) {
        const { source, destination } = result
        if (!destination || source.index === destination.index) return

        dispatch({
            type: 'REORDER_TASKS',
            payload: { sourceIndex: source.index, destIndex: destination.index }
        })
    }

    if (filtered.length === 0) {
        return <p className="p-4 text-gray-500">No hay tareas para mostrar.</p>
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-4"
                    >
                        {filtered.map((task, idx) => (
                            <Draggable key={task.id} draggableId={task.id} index={idx}>
                                {(p) => (
                                    <div
                                        ref={p.innerRef}
                                        {...p.draggableProps}
                                        {...p.dragHandleProps}
                                    >
                                        <TaskCard task={task} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
