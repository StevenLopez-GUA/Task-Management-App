# React Task Management App

**Autor:** Steven Alejandro López del Cid
**Fecha de inicio:** Abril 24, 2025

---

## Descripción

Esta aplicación es un gestor de tareas personales desarrollado con React y Vite. Permite a los usuarios crear, editar, eliminar y filtrar sus tareas según su estado (“Por hacer”, “En progreso”, “Completadas”), y ofrece dos formas de visualización: lista y calendario.

---

## Tabla de Contenidos

- [Características](#características)  
- [Tecnologías](#tecnologías)  
- [Instalación](#instalación)  
- [Uso](#uso)  
- [Estructura del Proyecto](#estructura-del-proyecto)  
- [Gestión de Estado](#gestión-de-estado)  
- [Rutas y Navegación](#rutas-y-navegación)  
- [Pruebas Unitarias](#pruebas-unitarias)  
- [Contribuciones](#contribuciones)  

---

## Características

- **CRUD de Tareas**  
  - Crear nuevas tareas con título, descripción y fecha de vencimiento.  
  - Editar y eliminar tareas existentes.  
- **Filtros por Estado**  
  - Filtrar tareas por: Por hacer, En progreso, Completadas.  
- **Vistas**  
  - **Lista:** Vista tradicional de tarjetas o filas.  
  - **Calendario:** Vista mensual con las fechas de vencimiento de las tareas.  
- **Gestión de Estado Global**  
  - React Context + useReducer para mantener sincronizados los datos entre vistas.  
- **Navegación Dinámica**  
  - React Router para transicionar entre “Lista de tareas” y “Calendario”.  
- **UI Moderna**  
  - Estilos con TailwindCSS y componentes reutilizables.  
- **Pruebas Unitarias**  
  - Jest + React Testing Library para garantizar la funcionalidad de componentes clave.

---

## Tecnologías

- **Frontend:**  
  - [React](https://reactjs.org/) (con Vite)  
  - [React Router](https://reactrouter.com/)  
  - [React Context & useReducer](https://es.reactjs.org/docs/hooks-reference.html#usereducer)  
- **Estilos:**  
  - [TailwindCSS](https://tailwindcss.com/)  
- **Testing:**  
  - [Jest](https://jestjs.io/)  
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)  
- **Herramientas de Desarrollo:**  
  - [Vite](https://vitejs.dev/)  
  - ESLint + Prettier

---

## Instalación

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/StevenLopez-GUA/Task-Management-App.git
   cd Task-Management-App
   ```

2. **Instalar dependencias**  
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Iniciar el servidor de desarrollo**  
   ```bash
   npm run dev
   # o
   yarn dev
   ```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## Uso

- **Crear Tarea:** Navega al formulario “Nueva tarea”, completa los campos y haz clic en “Guardar”.  
- **Editar Tarea:** Haz clic en el icono de lápiz junto a la tarea en la lista.  
- **Eliminar Tarea:** Haz clic en el icono de basura y confirma la acción.  
- **Filtrar:** Usa el selector de estado para ver solo “Por hacer”, “En progreso” o “Completadas”.  
- **Cambiar Vista:** Usa la navegación superior para alternar entre “Lista” y “Calendario”.

---

## Estructura del Proyecto

```
task-manager-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskCard.jsx
│   │   └── CalendarView.jsx
│   ├── context/
│   │   └── TaskContext.jsx
│   ├── reducers/
│   │   └── taskReducer.js
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── styles/
│   │   └── tailwind.css
│   ├── tests/
│   │   └── TaskForm.test.jsx
│   ├── App.jsx
│   └── main.jsx
├── .eslintrc.js
├── package.json
└── README.md
```

---

## Gestión de Estado

- **TaskContext.jsx**: Provee el contexto global de tareas.  
- **taskReducer.js**: Define las acciones (`ADD_TASK`, `EDIT_TASK`, `DELETE_TASK`, `TOGGLE_STATUS`, `SET_FILTER`) y actualiza el estado según useReducer.

---

## Rutas y Navegación

- `/tasks` → Vista de lista de tareas  
- `/calendar` → Vista de calendario  
- `/tasks/new` → Formulario de creación  
- `/tasks/:id/edit` → Formulario de edición  

Configurado en `AppRoutes.jsx` usando React Router v6.

---

## Pruebas Unitarias

- **Ubicación:** `src/tests/`  
- **Comando:**  
  ```bash
  npm run test
  # o
  yarn test
  ```
- **Cobertura sugerida:**  
  - Renderizado de componentes clave (`TaskForm`, `TaskList`).  
  - Simulación de eventos (`añadir`, `editar`, `eliminar`).  
  - Validación de filtros y cambio de estado.
