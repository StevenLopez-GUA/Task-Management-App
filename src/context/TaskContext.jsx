import React, { createContext, useReducer, useEffect } from 'react'
import { taskReducer, initialState } from '../reducers/taskReducer'

export const TaskContext = createContext()

export function TaskProvider({ children }) {
    const [state, dispatch] = useReducer(
        taskReducer,
        initialState,
        init => ({
            tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
            filter: init.filter,
            searchText: init.searchText,
            sortOrder: init.sortOrder,
            filterCategory: init.filterCategory,   
            filterPriority: init.filterPriority    
        })
    )


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }, [state.tasks])

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    )
}
