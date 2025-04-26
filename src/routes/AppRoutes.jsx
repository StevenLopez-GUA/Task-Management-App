import { Navigate, Route, Routes } from "react-router-dom";
import TaskListPage from "../pages/TaskListPage";
import TaskFormPage from "../pages/TaskFormPage";
import CalendarPage from "../pages/CalendarPage";


/* AUN FALTA CREAR EL ARCHIVO NOTFOUND 404 */


export default function AppRouters() {
    return(
        <Routes>
            <Route path="/" element={<Navigate to="/tasks" replace />} />
            <Route path="/tasks" element={<TaskListPage />} />
            <Route path="/tasks/new" element={<TaskFormPage />} />
            <Route path="/tasks/:id/edit" element={<TaskFormPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="*" element={<NotFound />} />

        </Routes>
    )
}