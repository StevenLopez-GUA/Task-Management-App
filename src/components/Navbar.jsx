import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="px-4 py-2 bg-white shadow flex gap-4">
            <NavLink
                to="/tasks"
                className={({ isActive }) =>
                    isActive
                        ? 'font-semibold border-b-2 border-blue-600 pb-1'
                        : 'text-gray-600 hover:text-gray-800'
                }
            >
                Lista
            </NavLink>
            <NavLink
                to="/calendar"
                className={({ isActive }) =>
                    isActive
                        ? 'font-semibold border-b-2 border-blue-600 pb-1'
                        : 'text-gray-600 hover:text-gray-800'
                }
            >
                Calendario
            </NavLink>
        </nav>
    )
}
