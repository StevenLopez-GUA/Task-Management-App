import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TaskContext } from '../context/TaskContext'
import { v4 as uuid } from 'uuid'

export default function TaskForm() {
  const { state, dispatch } = useContext(TaskContext)
  const { id } = useParams()
  const nav = useNavigate()

  const isEdit = Boolean(id)
  const existing = state.tasks.find(t => t.id === id)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('todo')

  useEffect(() => {
    if (isEdit && existing) {
      setTitle(existing.title)
      setDescription(existing.description)
      setDueDate(existing.dueDate)
      setStatus(existing.status)
    }
  }, [isEdit, existing])

  function handleSubmit(e) {
    e.preventDefault()
    const payload = { id: isEdit ? id : uuid(), title, description, dueDate, status }
    dispatch({ type: isEdit ? 'EDIT_TASK' : 'ADD_TASK', payload })
    nav('/tasks')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
      <label htmlFor="title" className="block mb-1">Título</label>
        <input
        id='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
      <label htmlFor="description" className="block mb-1">Descripción</label>
        <textarea
        id='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
      <label htmlFor="dueDate" className="block mb-1">Fecha de vencimiento</label>
        <input
        id='dueDate'
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
      <label htmlFor="status" className="block mb-1">Estado</label>
        <select
        id='status'
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="todo">Por hacer</option>
          <option value="in-progress">En progreso</option>
          <option value="completed">Completadas</option>
        </select>
      </div>
      <button type="submit" className="px-4 py-2 bg-green-600 rounded">
        {isEdit ? 'Actualizar' : 'Crear'} tarea
      </button>
    </form>
  )
}
