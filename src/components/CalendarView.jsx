// src/components/CalendarView.jsx
import React, { useContext, useState, useMemo } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import '../assets/style/calendar-overrides.css'
import { format, parseISO, isSameDay, differenceInCalendarDays } from 'date-fns'
import { TaskContext } from '../context/TaskContext'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function CalendarView() {
    const { state } = useContext(TaskContext)
    const { tasks } = state
    const [selectedDate, setSelectedDate] = useState(new Date())

    // Filtrar tareas del día seleccionado
    const tasksOnDate = useMemo(
        () => tasks.filter(t => isSameDay(parseISO(t.dueDate), selectedDate)),
        [tasks, selectedDate]
    )

    // Puntos en días con tareas
    const tileContent = ({ date, view }) =>
        view === 'month' &&
            tasks.some(t => isSameDay(parseISO(t.dueDate), date)) ? (
            <span className="block bg-blue-400 dark:bg-blue-600 rounded-full w-2 h-2 mx-auto mt-1" />
        ) : null

    // Clases para cada tile según estado
    const tileClassName = ({ date, view }) => {
        if (view !== 'month') return ''
        const classes = ['transition-colors']
        if (isSameDay(date, selectedDate)) {
            classes.push('bg-blue-100 dark:bg-blue-800', 'text-blue-800 dark:text-blue-200')
        } else {
            classes.push('hover:bg-gray-200 dark:hover:bg-gray-700')
        }
        return classes.join(' ')
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Calendario */}
            <div className="flex justify-center">
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileContent={tileContent}
                    tileClassName={tileClassName}
                    prevLabel={<ChevronLeft className="text-gray-900 dark:text-gray-100" />}
                    nextLabel={<ChevronRight className="text-gray-900 dark:text-gray-100" />}
                    navigationLabel={({ date }) => (
                        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {format(date, 'MMMM yyyy')}
                        </div>
                    )}
                    className="react-calendar p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg"
                />
            </div>

            {/* Lista de tareas del día */}
            <div className="flex-1">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Tareas para {format(selectedDate, 'PPP')}
                </h2>
                {tasksOnDate.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">No hay tareas para este día.</p>
                ) : (
                    <ul className="space-y-4">
                        {tasksOnDate.map(t => {
                            const daysLeft = differenceInCalendarDays(parseISO(t.dueDate), new Date())
                            const countdownText =
                                daysLeft > 0
                                    ? `${daysLeft}d restante`
                                    : daysLeft === 0
                                        ? 'Hoy'
                                        : 'Vencida'
                            return (
                                <li
                                    key={t.id}
                                    className="p-4 bg-white dark:bg-gray-700 rounded shadow"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                                {t.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {t.description}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                Fecha: {t.dueDate}
                                            </p>
                                        </div>
                                        <span
                                            className={`inline-block px-2 py-0.5 text-xs rounded $
                        daysLeft < 0
                          ? 'bg-red-200 text-red-800'
                          : daysLeft === 0
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-green-200 text-green-800'
                      }`}
                                        >
                                            {countdownText}
                                        </span>
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        <span className="text-xs bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded">
                                            {t.category}
                                        </span>
                                        <span
                                            className={`text-xs px-2 py-0.5 rounded $
                        t.priority === 'high'
                          ? 'bg-red-200 text-red-800'
                          : t.priority === 'medium'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-green-200 text-green-800'
                      }`}
                                        >
                                            {t.priority === 'high'
                                                ? 'Alta'
                                                : t.priority === 'medium'
                                                    ? 'Media'
                                                    : 'Baja'}
                                        </span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}
