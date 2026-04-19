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
  renderKanban();
});

function renderKanban() {
  // limpiar columnas
  document.getElementById("list-perFer").innerHTML = "";
  document.getElementById("list-enCurs").innerHTML = "";
  document.getElementById("list-fet").innerHTML = "";

  // recorrer tareas
  tareas.forEach((tarea) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("task-card");

    tarjeta.innerHTML = `
        <h4>${tarea.titulo}</h4>
        <p>${tarea.descripcion || ""}</p>
        <small>Prioridad: ${tarea.prioridad}</small>
    `;

    // colocar según estado
    if (tarea.estado === "perFer") {
      document.getElementById("list-perFer").appendChild(tarjeta);
    }

    if (tarea.estado === "enCurs") {
      document.getElementById("list-enCurs").appendChild(tarjeta);
    }

    if (tarea.estado === "fet") {
      document.getElementById("list-fet").appendChild(tarjeta);
    }
  });
}
