let tareas = [];

function guardarTareas() {
  localStorage.setItem("kanban-tareas", JSON.stringify(tareas));
}

function cargarTareas() {
  const datos = localStorage.getItem("kanban-tareas");

  if (datos) {
    tareas = JSON.parse(datos);
  } else {
    tareas = [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarTareas();
  console.log("Tareas cargadas:", tareas);
});
