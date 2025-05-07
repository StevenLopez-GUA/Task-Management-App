# React Task Management App

**Autor:** Steven López  
**Fecha de inicio:** Abril 24, 2025  
**Última actualización:** Mayo 5, 2025

---

## Descripción

Aplicación de gestión de tareas personales construida con React y Vite. Permite crear, editar, eliminar y filtrar tareas por estado (“Por hacer”, “En progreso”, “Completadas”), visualizar las tareas en modo lista o calendario, y persiste los datos en localStorage para que sobrevivan a recargas de página. Incluye una suite de pruebas unitarias con Jest y React Testing Library.

---

## Tabla de contenidos

- [Características](#características)  
- [Tecnologías](#tecnologías)  
- [Instalación](#instalación)  
- [Uso](#uso)  
- [Modelo de datos](#modelo-de-datos)  
- [Estructura del proyecto](#estructura-del-proyecto)  
- [Rutas y navegación](#rutas-y-navegación)  
- [Gestión de estado](#gestión-de-estado)  
- [Persistencia](#persistencia)  
- [Pruebas unitarias](#pruebas-unitarias)  
- [Despliegue](#despliegue)  
- [Mejoras y funcionalidades futuras](#mejoras-y-funcionalidades-futuras)  

---

## Características

- **CRUD completo**: crear, editar, eliminar tareas.  
- **Filtros por estado**: todas, por hacer, en progreso, completadas.  
- **Vistas**:  
  - **Lista**: tarjetas con título, fecha y acciones.  
  - **Calendario**: marca en el mes los días con tareas y lista de tareas del día seleccionado.  
- **Persistencia**: guarda tareas en `localStorage` para sobrevivir recargas.  
- **Navegación SPA**: rutas cliente-side con React Router y un Navbar.  
- **Estado global**: React Context + useReducer.  
- **Estilo**: TailwindCSS v4 para diseño rápido y limpio.  
- **Pruebas unitarias**: Jest + React Testing Library cubriendo componentes clave.

---

## Tecnologías

- **Frontend**:  
  - React 19 + Vite  
  - React Router v7  
  - React Context & useReducer  
- **Estilos**: TailwindCSS v4  
- **Calendario**: react-calendar + date-fns  
- **Tests**: Jest, Babel-Jest, React Testing Library  
- **Otras**: uuid (o `crypto.randomUUID`), identity-obj-proxy (mock CSS en tests)

---

## Instalación

```bash
git clone https://github.com/StevenLopez-GUA/Task-Management-App.git
cd Task-Management-App
npm install
````

---

## Uso

```bash
npm run dev     # inicia servidor de desarrollo en http://localhost:5173
npm run build   # genera carpeta dist lista para producción
npm run test    # ejecuta suite de pruebas
```

---

## Modelo de datos

Cada tarea tiene la forma:

```ts
interface Task {
  id: string;           // UUID
  title: string;        // Título breve
  description: string;  // Detalle opcional
  dueDate: string;      // Fecha en formato YYYY-MM-DD
  status: 'todo' | 'in-progress' | 'completed';
}
```

---

## Estructura del proyecto

```
react-task-manager/
├── public/
│   └── index.html
├── src/
│   ├── __tests__/           # Tests unitarios (.test.jsx)
│   ├── assets/              # Imágenes o fuentes
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   └── CalendarView.jsx
│   ├── context/
│   │   └── TaskContext.jsx
│   ├── reducers/
│   │   └── taskReducer.js
│   ├── pages/
│   │   ├── TaskListPage.jsx
│   │   ├── CalendarPage.jsx
│   │   └── TaskFormPage.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── .babelrc
├── jest.config.cjs
├── jest.setup.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## Rutas y navegación

* `/tasks` → Lista de tareas
* `/tasks/new` → Crear nueva tarea
* `/tasks/:id/edit` → Editar tarea
* `/calendar` → Vista de calendario

Navega sin recargar gracias a `<NavLink>` de React Router.

---

## Gestión de estado

* **TaskContext.jsx**: proveedor que envuelve `<App>`.
* **taskReducer.js**: actions:

  * `ADD_TASK`, `EDIT_TASK`, `DELETE_TASK`
  * `TOGGLE_STATUS` (rota entre estados)
  * `SET_FILTER`

---

## Persistencia

Al iniciar, lee `localStorage.getItem('tasks')` y lo carga en el estado.
Cada cambio en `state.tasks` se guarda de nuevo en `localStorage`.

---

## Pruebas unitarias

* Ubicación: `src/__tests__/*.test.jsx`
* Comando: `npm run test`
* Usa Babel-Jest para JSX y mocks de CSS con `identity-obj-proxy`.
* Cubre TaskList, TaskForm, CalendarView y flujos CRUD básicos.

---

## Mejoras y funcionalidades futuras

1. **Drag & Drop** para reordenar tareas.
2. **Notificaciones** (Web Notifications o toasts) al vencer una tarea.
4. **Búsqueda** y paginación de tareas.
6. **Etiquetas/Categorías** personalizables.
7. **Subtareas** y dependencias entre tareas.
8. **Integración con API externa** (por ejemplo, Google Calendar).
9. **Reportes gráficos** de productividad (gráficos con Recharts).
10. **Autenticación** y multiusuario con Firebase o Auth0.

---

¡Listo para gestionar y evolucionar tu lista de tareas con React! 🚀
