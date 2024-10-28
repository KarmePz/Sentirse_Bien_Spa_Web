// ID del usuario actual almacenado en el local storage
const usuarioId = sessionStorage.getItem("id");

// Elementos del DOM
const listaTurnos = document.getElementById("lista-turnos");
const botonPagar = document.getElementById("boton-pagar");
const checkboxSeleccionarTodos = document.getElementById("seleccionar-todos");
const textoSeleccionar = document.getElementById("texto-seleccionar");
let totalPrecio = 0;
let reservaIdGlobal = null; // Variable global para almacenar el ID de la reserva

// Función principal para cargar reservas y turnos no pagados
async function cargarReservasNoPagadas() {
    try {
        // Obtener reservas no pagadas
        const response = await fetch(`https://apispademo.somee.com/api/Reserva/reservUserAllNoPagados?clienteId=${usuarioId}&conTurnos=true&conPago=true`);
        if (!response.ok) {
            throw new Error('Error al obtener las reservas no pagadas');
        }
        const reservas = await response.json();

        // Si no hay reservas no pagadas, mostrar mensaje
        if (reservas.length === 0) {
            listaTurnos.innerHTML = '<p>No tienes reservas pendientes de pago.</p>';
            return;
        }

        // Obtener la primera reserva (como acordamos) y sus turnos
        const reserva = reservas[0];
        reservaIdGlobal = reserva.reservaId; // Asignar el idReserva a la variable global
        if (reserva.turnos.length === 0) {
            listaTurnos.innerHTML = '<p>No tienes turnos asociados a esta reserva.</p>';
            return;
        }

        // Mostrar los turnos
        mostrarTurnos(reserva.turnos);
    } catch (error) {
        console.error('Error al cargar las reservas:', error);
        listaTurnos.innerHTML = '<p>Ocurrió un error al cargar las reservas.</p>';
    }
}

function obtenerIdReserva() {
    return reservaIdGlobal; // Devolver el ID de la reserva almacenado en la variable global
}


botonPagar.addEventListener("click", async () => {
    const turnosSeleccionados = obtenerTurnosSeleccionados();

    if (turnosSeleccionados.length === 0) {
        alert("Selecciona al menos un turno para continuar.");
        return;
    }

    const idReserva = obtenerIdReserva();  // Asumimos que se obtiene del JSON de la reserva no pagada
    const turnosTotales = document.querySelectorAll(".checkbox-turno");

    // Si se seleccionaron todos los turnos, pasamos directamente al formulario con la reserva completa
    if (turnosSeleccionados.length === turnosTotales.length) {
        window.location.href = `formularioPagoMultiple.html?reservaId=${idReserva}&turnos=${turnosSeleccionados.join(",")}&pagoCompleto=true`;
    } else {
        // Si no se seleccionaron todos los turnos, pasamos al formulario para crear una nueva reserva con los turnos seleccionados
        window.location.href = `formularioPagoMultiple.html?reservaId=${idReserva}&turnos=${turnosSeleccionados.join(",")}&pagoCompleto=false`;
    }
});

// Mostrar los turnos del usuario
async function mostrarTurnos(turnos) {
    listaTurnos.innerHTML = ""; // Limpiar la lista de turnos

    for (let turno of turnos) {
        // Obtener los datos del servicio para cada turno
        const servicioResponse = await fetch(`https://apispademo.somee.com/api/Servicio/${turno.servicioId}?conTurnos=false&conHorarios=false`);
        if (!servicioResponse.ok) {
            console.error(`Error al obtener datos del servicio ID ${turno.servicioId}`);
            continue;
        }
        const servicio = await servicioResponse.json();

        // Crear elemento de lista para cada turno
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="checkbox-turno" data-id="${turno.turnoId}" data-precio="${servicio.precio}">
            <div>
                <p><strong>Servicio:</strong> ${servicio.titulo}</p>
                <p><strong>Fecha y Hora:</strong> ${new Date(turno.fechaInicio).toLocaleString()}</p>
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
    }

    actualizarTotal();
}

// Calcular el total de los turnos seleccionados
function actualizarTotal() {
    const checkboxes = document.querySelectorAll(".checkbox-turno:checked");
    totalPrecio = Array.from(checkboxes).reduce((total, checkbox) => 
        total + parseFloat(checkbox.getAttribute("data-precio")), 0);

    document.getElementById("total-precio").textContent = `$${totalPrecio}`;
}

// Evento para actualizar el total cuando se selecciona o deselecciona un turno
listaTurnos.addEventListener("change", event => {
    if (event.target.classList.contains("checkbox-turno")) {
        actualizarTotal();
        verificarSeleccionTotal();
    }
});

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

// Verificar si todos los turnos están seleccionados
function verificarSeleccionTotal() {
    const checkboxes = document.querySelectorAll(".checkbox-turno");
    const todosSeleccionados = Array.from(checkboxes).every(checkbox => checkbox.checked);

    // Si todos los checkboxes están seleccionados, marcar "Seleccionar Todos"
    checkboxSeleccionarTodos.checked = todosSeleccionados;

    // Cambiar el texto del label
    textoSeleccionar.textContent = todosSeleccionados ? "Deseleccionar Todos" : "Seleccionar Todos";
}

// Función para obtener los IDs de los turnos seleccionados
function obtenerTurnosSeleccionados() {
    const checkboxes = document.querySelectorAll(".checkbox-turno:checked");
    return Array.from(checkboxes).map(checkbox => checkbox.getAttribute("data-id"));
}

// Cargar las reservas no pagadas al cargar la página
cargarReservasNoPagadas();
