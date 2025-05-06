import React from 'react'
import CalendarView from '../components/CalendarView'

export default function CalendarPage() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Calendario de Tareas</h1>
            <CalendarView />
        </div>
    )
}
