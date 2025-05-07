// src/components/TaskForm.jsx
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TaskContext } from '../context/TaskContext'
import { v4 as uuidv4 } from 'uuid'
import Swal from 'sweetalert2'

export default function TaskForm() {
  const { state, dispatch } = useContext(TaskContext)
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  const existing = state.tasks.find(t => t.id === id)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('todo')
  const [category, setCategory] = useState('Personal')
  const [priority, setPriority] = useState('medium')

  useEffect(() => {
    if (isEdit && existing) {
      setTitle(existing.title)
      setDescription(existing.description)
      setDueDate(existing.dueDate)
      setStatus(existing.status)
      setCategory(existing.category)
      setPriority(existing.priority)
    }
  }, [isEdit, existing])

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = {
      id: isEdit ? id : uuidv4(),
      title,
      description,
      dueDate,
      status,
      category,
      priority
    }
    const action = isEdit ? 'actualizar' : 'crear'
    const result = await Swal.fire({
      title: `${isEdit ? 'Actualizar' : 'Crear'} tarea`,
      text: `¿Deseas ${action} esta tarea?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Sí, ${action}`,
      cancelButtonText: 'Cancelar',
      background: '#2d3748',
      color: '#f7fafc',
      confirmButtonColor: '#e53e3e',
      cancelButtonColor: '#4a5568'
    })
    if (result.isConfirmed) {
      dispatch({ type: isEdit ? 'EDIT_TASK' : 'ADD_TASK', payload })
      await Swal.fire({
        title: isEdit ? 'Actualizada' : 'Creada',
        text: `La tarea ha sido ${isEdit ? 'actualizada' : 'creada'}.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#2d3748',
        color: '#f7fafc'
      })
      navigate('/tasks')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white dark:bg-gray-800 rounded shadow">
      <div>
        <label htmlFor="title" className="block mb-1 text-gray-900 dark:text-gray-100">Título</label>
        <input
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1 text-gray-900 dark:text-gray-100">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>
      <div>
        <label htmlFor="dueDate" className="block mb-1 text-gray-900 dark:text-gray-100">Fecha de vencimiento</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          required
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>
      <div>
        <label htmlFor="status" className="block mb-1 text-gray-900 dark:text-gray-100">Estado</label>
        <select
          id="status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="todo">Por hacer</option>
          <option value="in-progress">En progreso</option>
          <option value="completed">Completadas</option>
        </select>
      </div>
      <div>
        <label htmlFor="category" className="block mb-1 text-gray-900 dark:text-gray-100">Categoría</label>
        <select
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option>Personal</option>
          <option>Trabajo</option>
          <option>Estudio</option>
          <option>Otro</option>
        </select>
      </div>
      <div>
        <label htmlFor="priority" className="block mb-1 text-gray-900 dark:text-gray-100">Prioridad</label>
        <select
          id="priority"
          value={priority}
          onChange={e => setPriority(e.target.value)}
          className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {isEdit ? 'Actualizar' : 'Crear'} tarea
        </button>
      </div>
    </form>
  )
}
