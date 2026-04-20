# Kanban de Tareas - Aplicación Web

Aplicación web tipo Kanban desarrollada con HTML, CSS y JavaScript puro, que permite gestionar tareas de forma visual mediante columnas, incluyendo funcionalidades de creación, edición, eliminación, filtros, búsqueda, estadísticas y drag & drop.

---

## Funcionalidades principales

### Gestión de tareas (CRUD)

- Crear nuevas tareas mediante formulario
- Editar tareas existentes
- Eliminar tareas
- Persistencia de datos en localStorage

---

### Tablero Kanban

- Organización de tareas en tres estados:
  - Por hacer
  - En curso
  - Hecho
- Renderizado dinámico del contenido mediante JavaScript

---

### Filtros y búsqueda

- Filtrado de tareas por estado
- Búsqueda en tiempo real por título
- Combinación de filtros de forma simultánea

---

### Estadísticas

- Total de tareas
- Tareas por estado
- Visualización de porcentajes respecto al total

---

### Drag & Drop

- Movimiento de tareas entre columnas
- Cambio automático de estado
- Actualización en tiempo real
- Persistencia de los cambios en localStorage

---

## Persistencia de datos

La aplicación utiliza localStorage para almacenar las tareas, lo que permite mantener la información incluso después de recargar la página o cerrar el navegador.

---

## Tecnologías utilizadas

- HTML5
- CSS
- JavaScript
- LocalStorage API

---

## Diseño responsive

El diseño se adapta a distintos dispositivos mediante media queries. En dispositivos móviles, el tablero Kanban se reorganiza en una estructura vertical para mejorar la usabilidad.

---

## Limitaciones conocidas

La funcionalidad drag & drop presenta limitaciones en dispositivos móviles debido a la naturaleza de la API nativa de HTML5, por lo que su uso está optimizado para entornos de escritorio.

---

## Estructura del proyecto

/kanban-tareas
│── index.html
│── css/
│ └── estils.css
│── js/
│ └── script.js
│── img/
│── README.md

---

## Autor

Proyecto desarrollado por Ángela Ramírez como práctica de desarrollo web en el módulo de Desarrollo de Aplicaciones Web.

---

## Estado del proyecto

Finalizado funcionalmente, incluyendo:

- CRUD completo
- Persistencia de datos
- Filtros y búsqueda
- Estadísticas dinámicas
- Drag & drop funcional
- Interfaz responsive
