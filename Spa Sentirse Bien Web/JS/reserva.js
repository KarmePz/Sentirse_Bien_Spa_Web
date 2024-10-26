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
    { ID: "turno3", servicioID: "serv3", reservaID: "reserva3", fechaInicio: "2024-10-24 16:00", descripcion: "Turno de manicura" },
    { ID: "turno3", servicioID: "serv3", reservaID: "reserva3", fechaInicio: "2024-10-24 16:00", descripcion: "Turno de manicura" },
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

// Mostrar los turnos en la lista
function mostrarTurnos() {
    const listaTurnos = document.getElementById("lista-turnos");
    listaTurnos.innerHTML = ""; // Limpiar la lista
    let totalPrecio = 0;

    turnosUsuario.forEach(turno => {
        // Buscar el servicio asociado al turno
        const servicio = servicios.find(serv => serv.ID === turno.servicioID);
        if (!servicio) return; // Si no se encuentra el servicio, omitir

        // Crear elemento de lista para cada turno
        const li = document.createElement("li");
        li.innerHTML = `
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
        listaTurnos.appendChild(li);

        // Sumar el precio del turno al total
        totalPrecio += servicio.precio;
    });

    // Actualizar el precio total en el HTML
    document.getElementById("total-precio").textContent = `$${totalPrecio}`;
}

// Evento para el botón de pagar
document.getElementById("boton-pagar").addEventListener("click", () => {
    const opcionesDiv = document.getElementById("opciones");
    opcionesDiv.style.display = "block"; // Mostrar el div de opciones
});
document.getElementById("confirmar").addEventListener("click", function() {
    const seleccion = document.querySelector('input[name="status"]:checked');

    if (seleccion) {
        //aca va la parte si se pago que haga los cambios en informe de pago a pagado 
        alert("Su pago fue realizado con exito✌️😊.");
    } else {
        alert("Por favor, selecciona una opción.");
    }
});
// Mostrar los turnos al cargar la página
mostrarTurnos();
