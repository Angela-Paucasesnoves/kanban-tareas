let filtroEstado = "todos";
let textoBusqueda = "";
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

  activarDragDrop();
});

// =====================
// RENDER KANBAN
// =====================

function renderKanban() {
  document.getElementById("list-perFer").innerHTML = "";
  document.getElementById("list-enCurs").innerHTML = "";
  document.getElementById("list-fet").innerHTML = "";

  const tareasFiltradas = tareas.filter((tarea) => {
    const coincideEstado =
      filtroEstado === "todos" || tarea.estado === filtroEstado;

    const coincideBusqueda = tarea.titulo.toLowerCase().includes(textoBusqueda);

    return coincideEstado && coincideBusqueda;
  });

  tareasFiltradas.forEach((tarea) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("task-card");

    tarjeta.setAttribute("data-priority", tarea.prioridad);

    tarjeta.setAttribute("draggable", "true");

    tarjeta.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", tarea.id);
    });

    tarjeta.style.userSelect = "none";

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

  actualizarEstadisticas();
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

// =====================
// FILTRAR
// =====================

document.getElementById("filtro-estado").addEventListener("change", (e) => {
  filtroEstado = e.target.value;
  renderKanban();
});

document.getElementById("busqueda").addEventListener("input", (e) => {
  textoBusqueda = e.target.value.toLowerCase();
  renderKanban();
});

// =====================
// ESTADISTICAS
// =====================

function actualizarEstadisticas() {
  const total = tareas.length;

  const perFer = tareas.filter((t) => t.estado === "perFer").length;
  const enCurs = tareas.filter((t) => t.estado === "enCurs").length;
  const fet = tareas.filter((t) => t.estado === "fet").length;

  document.getElementById("total").textContent = total;

  const calcularPorcentaje = (valor) =>
    total === 0 ? 0 : ((valor / total) * 100).toFixed(1);

  document.getElementById("stat-perFer").textContent =
    `${perFer} (${calcularPorcentaje(perFer)}%)`;

  document.getElementById("stat-enCurs").textContent =
    `${enCurs} (${calcularPorcentaje(enCurs)}%)`;

  document.getElementById("stat-fet").textContent =
    `${fet} (${calcularPorcentaje(fet)}%)`;
}

// =====================
// MOVER TARJETAS
// =====================

function activarDragDrop() {
  const columnas = document.querySelectorAll(".column");

  columnas.forEach((col) => {
    const zona = col.querySelector(".task-list");

    col.addEventListener("dragover", (e) => {
      e.preventDefault();
      col.classList.add("drag-over");
    });

    col.addEventListener("dragleave", () => {
      col.classList.remove("drag-over");
    });

    col.addEventListener("drop", (e) => {
      e.preventDefault();
      col.classList.remove("drag-over");

      console.log("DROP OK");

      const id = e.dataTransfer.getData("text/plain");
      const tarea = tareas.find((t) => String(t.id) === String(id));

      if (!tarea) return;

      const destino = zona.id;

      if (destino === "list-perFer") tarea.estado = "perFer";
      if (destino === "list-enCurs") tarea.estado = "enCurs";
      if (destino === "list-fet") tarea.estado = "fet";

      guardarTareas();
      renderKanban();
    });
  });
}
