// ID del usuario actual
const usuarioId = "a168b97f-1129-4e04-bd20-69f56d95424a";

// Ejemplo de arreglo de reservas
const reservas = [
    { ID: "reserva1", usuarioCliente: "a168b97f-1129-4e04-bd20-69f56d95424a", nombreIdentificador: "Reserva 1" },
    { ID: "reserva2", usuarioCliente: "b278c97f-2129-4e04-bd20-69f56d95424b", nombreIdentificador: "Reserva 2" },
    { ID: "reserva3", usuarioCliente: "a168b97f-1129-4e04-bd20-69f56d95424a", nombreIdentificador: "Reserva 3" }
];

// Ejemplo de arreglo de turnos
const turnos = [
    { ID: "turno1", servicioID: "serv1", reservaID: "reserva1", fechaInicio: "2024-10-22 14:00", descripcion: "Turno de masaje" },
    { ID: "turno2", servicioID: "serv2", reservaID: "reserva2", fechaInicio: "2024-10-23 10:00", descripcion: "Turno facial" },
    { ID: "turno3", servicioID: "serv3", reservaID: "reserva3", fechaInicio: "2024-10-24 16:00", descripcion: "Turno de manicura" }
];

// Ejemplo de arreglo de servicios
const servicios = [
    { ID: "serv1", titulo: "Masaje", tipoServicio: "Relajación", descripcion: "Masaje completo", rutaImagen: "masaje.jpg", duracionMinut: 60, precio: 1500, empleadoId: "emp1" },
    { ID: "serv2", titulo: "Facial", tipoServicio: "Cuidado facial", descripcion: "Tratamiento facial", rutaImagen: "facial.jpg", duracionMinut: 45, precio: 1200, empleadoId: "emp2" },
    { ID: "serv3", titulo: "Manicura", tipoServicio: "Estética", descripcion: "Manicura completa", rutaImagen: "manicura.jpg", duracionMinut: 30, precio: 800, empleadoId: "emp3" }
];

// Filtrar las reservas del usuario
const reservasUsuario = reservas.filter(reserva => reserva.usuarioCliente === usuarioId);

// Obtener los turnos que corresponden a las reservas del usuario
const turnosUsuario = turnos.filter(turno => 
    reservasUsuario.some(reserva => reserva.ID === turno.reservaID)
);

// Obtener elementos del DOM
const listaTurnos = document.getElementById("lista-turnos");
const botonPagar = document.getElementById("boton-pagar");
const checkboxSeleccionarTodos = document.getElementById("seleccionar-todos");
const textoSeleccionar = document.getElementById("texto-seleccionar");
let totalPrecio = 0;

// Crear el listado de turnos con checkboxes
function mostrarTurnos() {
    listaTurnos.innerHTML = ""; // Limpiar la lista

    turnosUsuario.forEach(turno => {
        const servicio = servicios.find(serv => serv.ID === turno.servicioID);
        if (!servicio) return;

        // Crear elemento de lista para cada turno
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="checkbox-turno" data-id="${turno.ID}" data-precio="${servicio.precio}">
            <div>
                <p><strong>Servicio:</strong> ${servicio.titulo}</p>
                <p><strong>Fecha y Hora:</strong> ${turno.fechaInicio}</p>
                <p><strong>Duración:</strong> ${servicio.duracionMinut} minutos</p>
                <p><strong>Descripción:</strong> ${turno.descripcion}</p>
            </div>
            <div>
                <p><strong>Precio:</strong> $${servicio.precio}</p>
            </div>
        `;

        // Evento para marcar el checkbox y aplicar el estilo al hacer clic en el 'li'
        li.addEventListener("click", (event) => {
            const checkbox = li.querySelector(".checkbox-turno");

            // Cambiar el estado del checkbox y el estilo del 'li' según el estado
            checkbox.checked = !checkbox.checked;
            aplicarEstilosSeleccionado(li, checkbox.checked);
            actualizarTotal();
        });

        listaTurnos.appendChild(li);
    });
    actualizarTotal();
}

// Al cargar la página, mostrar los turnos
mostrarTurnos();

// Función para calcular el total de los turnos seleccionados
function actualizarTotal() {
    const checkboxes = document.querySelectorAll(".checkbox-turno:checked");
    totalPrecio = Array.from(checkboxes).reduce((total, checkbox) => 
        total + parseFloat(checkbox.getAttribute("data-precio")), 0);

    document.getElementById("total-precio").textContent = `$${totalPrecio}`;
}

// Función para aplicar estilo a los 'li' seleccionados
function aplicarEstilosSeleccionado(li, isChecked) {
    if (isChecked) {
        li.classList.add("seleccionado");
    } else {
        li.classList.remove("seleccionado");
    }
}

// Evento para seleccionar o desmarcar todos los turnos
checkboxSeleccionarTodos.addEventListener("change", () => {
    const seleccionarTodos = checkboxSeleccionarTodos.checked;
    const checkboxes = document.querySelectorAll(".checkbox-turno");
    const itemsLista = document.querySelectorAll("#lista-turnos li");

    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = seleccionarTodos;
        aplicarEstilosSeleccionado(itemsLista[index], seleccionarTodos); // Aplicar estilos en el li correspondiente
    });

    // Cambiar el texto del label
    textoSeleccionar.textContent = seleccionarTodos ? "Deseleccionar Todos" : "Seleccionar Todos";

    // Actualizar el total según la selección
    actualizarTotal();
});

// Redirigir a formulario de pago con las IDs de los turnos seleccionados
botonPagar.addEventListener("click", () => {
    const turnosSeleccionados = obtenerTurnosSeleccionados();
    if (turnosSeleccionados.length > 0) {
        window.location.href = `formularioPago.html?turnos=${turnosSeleccionados.join(",")}`;
    } else {
        alert("Selecciona al menos un turno para continuar.");
    }
});

// Función para obtener IDs de los turnos seleccionados
function obtenerTurnosSeleccionados() {
    const checkboxes = document.querySelectorAll(".checkbox-turno:checked");
    return Array.from(checkboxes).map(checkbox => checkbox.getAttribute("data-id"));
}
