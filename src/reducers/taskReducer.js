export const initialState = {
    tasks: [],
    filter: "all",
    searchText: "",
    sortOrder: "manual",
    filterCategory: "all",    // ← nueva propiedad
    filterPriority: "all"
}

export function taskReducer(state, action) {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }

        case "EDIT_TASK":
            return {
                ...state,
                tasks: state.tasks.map(t =>
                    t.id === action.payload.id ? action.payload : t
                )
            }

        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(t => t.id !== action.payload)
            }

        case "TOGGLE_STATUS":
            return {
                ...state,
                tasks: state.tasks.map(t =>
                    t.id === action.payload
                        ? { ...t, status: nextStatus(t.status) }
                        : t
                )
            }

        case "SET_FILTER":
            return {
                ...state,
                filter: action.payload
            }

        case "SET_SEARCH":
            return {
                ...state,
                searchText: action.payload
            }

        case "SET_SORT":
            return {
                ...state,
                sortOrder: action.payload
            }

        case 'REORDER_TASKS':
            {
                const { sourceIndex, destIndex } = action.payload
                const tasks = Array.from(state.tasks)
                const [moved] = tasks.splice(sourceIndex, 1)
                tasks.splice(destIndex, 0, moved)
                return { ...state, tasks }
            }

        case "SET_CATEGORY_FILTER":
            return { ...state, filterCategory: action.payload }

        case "SET_PRIORITY_FILTER":
            return { ...state, filterPriority: action.payload }

        default:
            return state
    }
}

// Helper para rotar estados: todo → in-progress → completed → todo
function nextStatus(status) {
    if (status === "todo") return "in-progress"
    if (status === "in-progress") return "completed"
    return "todo"
}


