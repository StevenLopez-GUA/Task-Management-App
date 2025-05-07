// src/components/ProgressChart.jsx
import React, { useContext, useMemo } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import { TaskContext } from '../context/TaskContext'

const COLORS = ['#60A5FA', '#FBBF24', '#34D399'] // azul, amarillo, verde

export default function ProgressChart() {
    const { state } = useContext(TaskContext)
    const data = useMemo(() => {
        const counts = { todo: 0, 'in-progress': 0, completed: 0 }
        state.tasks.forEach(t => counts[t.status]++)
        return [
            { name: 'Por hacer', value: counts.todo },
            { name: 'En progreso', value: counts['in-progress'] },
            { name: 'Completadas', value: counts.completed },
        ]
    }, [state.tasks])

    return (
        <div className="w-full max-w-lg mx-auto">
            {/* <h2 className="text-lg font-semibold mb-2 text-center">Progreso</h2> */}
            {/* <ResponsiveContainer> */}

            
            <PieChart width={600} height={600}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%" cy="50%"
                    outerRadius={200}
                    label
                >
                    {data.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
            {/* </ResponsiveContainer> */}
        </div>
    )
}
