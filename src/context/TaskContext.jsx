// src/context/TaskContext.jsx
import React, { createContext, useReducer } from 'react'
import { taskReducer, initialState } from '../reducers/taskReducer'

export const TaskContext = createContext()

export function TaskProvider({ children }) {
    const [state, dispatch] = useReducer(taskReducer, initialState)

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    )
}
