let editandoId = null;
let tareas = [];

// =====================
// LOCALSTORAGE
// =====================

function guardarTareas() {
  localStorage.setItem("kanban-tareas", JSON.stringify(tareas));
}

function cargarTareas() {
  const datos = localStorage.getItem("kanban-tareas");

  tareas = datos ? JSON.parse(datos) : [];
}

// =====================
// INIT
// =====================

document.addEventListener("DOMContentLoaded", () => {
  cargarTareas();
  renderKanban();
});

// =====================
// RENDER KANBAN
// =====================

function renderKanban() {
  document.getElementById("list-perFer").innerHTML = "";
  document.getElementById("list-enCurs").innerHTML = "";
  document.getElementById("list-fet").innerHTML = "";

  tareas.forEach((tarea) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("task-card");

    tarjeta.innerHTML = `
      <h4>${tarea.titulo}</h4>
      <p>${tarea.descripcion || ""}</p>
      <small>Prioridad: ${tarea.prioridad}</small>

      <div class="actions">
        <button onclick="editarTarea(${tarea.id})">Editar</button>
        <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
      </div>
    `;

    if (tarea.estado === "perFer") {
      document.getElementById("list-perFer").appendChild(tarjeta);
    } else if (tarea.estado === "enCurs") {
      document.getElementById("list-enCurs").appendChild(tarjeta);
    } else if (tarea.estado === "fet") {
      document.getElementById("list-fet").appendChild(tarjeta);
    }
  });
}

// =====================
// CREATE / UPDATE (CRUD)
// =====================

document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;
  const prioridad = document.getElementById("prioridad").value;
  const fecha = document.getElementById("fecha").value;

  if (editandoId !== null) {
    const tarea = tareas.find((t) => t.id === editandoId);

    if (tarea) {
      tarea.titulo = titulo;
      tarea.descripcion = descripcion;
      tarea.prioridad = prioridad;
      tarea.fechaVencimiento = fecha;
    }

    editandoId = null;
  } else {
    const nuevaTarea = {
      id: Date.now(),
      titulo,
      descripcion,
      prioridad,
      fechaVencimiento: fecha,
      estado: "perFer",
    };

    tareas.push(nuevaTarea);
  }

  guardarTareas();
  renderKanban();
  this.reset();

  actualizarTextoBoton("Añadir tarea");
});

// =====================
// EDITAR
// =====================

function editarTarea(id) {
  const tarea = tareas.find((t) => t.id === id);

  if (!tarea) return;

  document.getElementById("titulo").value = tarea.titulo;
  document.getElementById("descripcion").value = tarea.descripcion;
  document.getElementById("prioridad").value = tarea.prioridad;
  document.getElementById("fecha").value = tarea.fechaVencimiento;

  editandoId = id;

  actualizarTextoBoton("Guardar cambios");
}

// =====================
// ELIMINAR
// =====================

function eliminarTarea(id) {
  if (confirm("¿Seguro que quieres eliminar esta tarea?")) {
    tareas = tareas.filter((t) => t.id !== id);

    guardarTareas();
    renderKanban();
  }
}

// =====================
// UX HELPERS
// =====================

function actualizarTextoBoton(texto) {
  const btn = document.querySelector("#task-form button[type='submit']");
  if (btn) btn.textContent = texto;
}
