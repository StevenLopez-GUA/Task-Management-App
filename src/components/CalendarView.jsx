import React, { useContext, useState, useMemo } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { format, parseISO, isSameDay } from 'date-fns'
import { TaskContext } from '../context/TaskContext'

export default function CalendarView() {
    const { state } = useContext(TaskContext)
    const { tasks } = state

    // Estado local: fecha seleccionada
    const [selectedDate, setSelectedDate] = useState(new Date())

    // Filtrar tareas cuyo dueDate coincida con selectedDate
    const tasksOnDate = useMemo(() => {
        return tasks.filter(t => {
            // parseamos task.dueDate (YYYY-MM-DD) a Date
            const taskDate = parseISO(t.dueDate)
            return isSameDay(taskDate, selectedDate)
        })
    }, [tasks, selectedDate])

    // Marca en el calendario días con tareas
    function tileContent({ date, view }) {
        if (view === 'month') {
            const has = tasks.some(t => isSameDay(parseISO(t.dueDate), date))
            return has ? <div className="bg-blue-400 rounded-full w-2 h-2 mx-auto mt-1" /> : null
        }
        return null
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <div>
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileContent={tileContent}
                />
            </div>

            <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4">
                    Tareas para {format(selectedDate, 'PPP')}
                </h2>

                {tasksOnDate.length === 0 ? (
                    <p className="text-gray-500">No hay tareas para este día.</p>
                ) : (
                    <ul className="space-y-2">
                        {tasksOnDate.map(t => (
                            <li key={t.id} className="p-3 bg-white rounded shadow">
                                <h3 className="font-medium">{t.title}</h3>
                                <p className="text-sm text-gray-600">{t.description}</p>
                                <span className="text-xs uppercase text-blue-700">{t.status}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
