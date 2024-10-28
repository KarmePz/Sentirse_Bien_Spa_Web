// Funciones para actualizar los datos en la tarjeta
function actualizarNumeroTarjeta() {
    let numero = document.getElementById("numero").value;
    document.getElementById("numero-tarjeta").innerText = numero.replace(/(.{4})/g, "$1 ");
}

function actualizarNombreTarjeta() {
    let nombre = document.getElementById("nombre").value.toUpperCase();
    document.getElementById("nombre-tarjeta").innerText = nombre || "NOMBRE DEL TITULAR";
}

function actualizarExpiracionTarjeta() {
    let expiracion = document.getElementById("expiracion").value;
    document.getElementById("expiracion-tarjeta").innerText = expiracion || "MM/AA";
}

function actualizarCvcTarjeta() {
    let cvc = document.getElementById("cvc").value;
    document.getElementById("cvc-tarjeta").innerText = cvc || "###";
}

function voltearTarjeta(mostrarReverso) {
    let tarjeta = document.getElementById("tarjeta");
    if (mostrarReverso) {
        tarjeta.classList.add("volteada");
    } else {
        tarjeta.classList.remove("volteada");
    }
}

// Función para obtener los turnos de una reserva
async function obtenerTurnosDeReserva(idReserva) {
    try {
        const response = await fetch(`https://apispademo.somee.com/api/Reserva/${idReserva}`);
        if (!response.ok) {
            throw new Error('Error al obtener los datos de la reserva');
        }
        const reserva = await response.json();
        return reserva.turnos; // Retornamos los turnos de la reserva
    } catch (error) {
        console.error('Error al obtener los turnos de la reserva:', error);
        return [];
    }
}

// Función para calcular el monto total de todos los turnos seleccionados
async function calcularMontoTotal() {
    const params = new URLSearchParams(window.location.search);
    const turnosSeleccionados = params.get('turnos').split(',');
    const idReserva = params.get('reservaId');
    
    let totalPrecio = 0;
    
    // Obtener todos los turnos de la reserva
    const turnosReserva = await obtenerTurnosDeReserva(idReserva);

    // Filtrar los turnos seleccionados
    for (const idTurno of turnosSeleccionados) {
        const turno = turnosReserva.find(t => t.turnoId === parseInt(idTurno));
        if (turno) {
            const servicio = await obtenerDatosServicio(turno.servicioId);
            if (servicio) {
                totalPrecio += servicio.precio;
            }
        }
    }

    // Mostrar el monto total en el HTML
    document.getElementById("monto").innerText = `$${totalPrecio.toFixed(2)}`;
    document.getElementById("monto-total").innerText = `$${totalPrecio.toFixed(2)}`;
}

// Mostrar el monto total al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    calcularMontoTotal();
});

// Función para obtener los datos del servicio desde la API usando el servicioId
async function obtenerDatosServicio(idServicio) {
    try {
        const servicioResponse = await fetch(`https://apispademo.somee.com/api/Servicio/${idServicio}?conTurnos=false&conHorarios=false`);
        if (!servicioResponse.ok) throw new Error("Error al obtener el servicio");

        return await servicioResponse.json();
    } catch (error) {
        console.error("Error al obtener el servicio:", error);
        alert("Ocurrió un error al cargar los datos del servicio.");
    }
}

// Función para actualizar el cálculo de cuotas
function calcularCuotas() {
    // Recuperar el monto total original desde el HTML
    const montoOriginal = parseFloat(document.getElementById("monto").textContent.replace('$', ''));
    
    const cuotas = parseInt(document.getElementById("cuotas").value) || 1;
    const montoCuota = montoOriginal / cuotas;
    
    document.getElementById("monto-total").innerText = `$${montoCuota.toFixed(2)} en ${cuotas} cuota(s)`;
}


// Función para mostrar/ocultar opciones de cuotas
function alternarCuotas() {
    const tipoTarjeta = document.getElementById("tipo-tarjeta").value;
    const grupoCuotas = document.getElementById("grupo-cuotas");
    grupoCuotas.style.display = tipoTarjeta === "credito" ? "block" : "none";

    // Si se selecciona "Débito", mostrar el monto sin cuotas
    if (tipoTarjeta === "debito") {
        document.getElementById("monto-total").innerText = `$${calcularMontoTotal().toFixed(2)}`;
    }
}

// Función para regresar a la página anterior
document.getElementById('btnVolver').addEventListener('click', function() {
    window.history.back();
});

// Función para procesar el pago y manejar múltiples turnos
document.querySelector('.boton-enviar').addEventListener('click', async function() {
    let tipoTarjeta = document.getElementById('tipo-tarjeta').value.toLowerCase();
    tipoTarjeta = tipoTarjeta.charAt(0).toUpperCase() + tipoTarjeta.slice(1);
    const username = sessionStorage.getItem('username');
    const idUsuario = sessionStorage.getItem('id');
    const turnos = new URLSearchParams(window.location.search).get('turnos').split(',');
    const idReserva = new URLSearchParams(window.location.search).get('reservaId');
    const pagoCompleto = new URLSearchParams(window.location.search).get('pagoCompleto') === "true";

    if (!username || !idUsuario || turnos.length === 0) {
        alert("Faltan datos para completar la reserva.");
        return;
    }

    try {
        // Si no es un pago completo, debemos eliminar los turnos de la reserva actual y crear una nueva
        if (!pagoCompleto) {
            const nuevaReserva = await crearNuevaReserva(idUsuario, tipoTarjeta);
            for (const idTurno of turnos) {
                await eliminarTurnoDeReserva(idReserva, idTurno); // Eliminar de la reserva original
                await agregarTurnoAReserva(nuevaReserva.reservaId, idTurno); // Agregar a la nueva reserva
            }
            marcarPagoComoCompletado(nuevaReserva.reservaId);
        } else {
            // Si es un pago completo, solo marcamos la reserva existente como pagada
            marcarPagoComoCompletado(idReserva);
        }
    } catch (error) {
        console.error('Error al procesar el pago:', error);
        alert("Ocurrió un error al procesar el pago. Inténtalo nuevamente.");
    }
});

// Función para crear una nueva reserva
async function crearNuevaReserva(idUsuario, tipoTarjeta) {
    const username = sessionStorage.getItem('username');
    // Obtener la fecha y hora actuales para añadir al nombreIdentificador
    const fechaHoraActual = new Date();
    const fechaHoraFormateada = `${fechaHoraActual.toISOString().split('T')[0]}_${fechaHoraActual.toLocaleTimeString('es-ES', { hour12: false }).replace(/:/g, '')}`;

    // Formato para el nombreIdentificador (usuario + fecha + hora)
    const nombreIdentificador = `${username}_${fechaHoraFormateada}`;
    const reservaResponse = await fetch(`https://apispademo.somee.com/api/Reserva?monto=0&userId=${idUsuario}&formatoPago=${tipoTarjeta}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreIdentificador })
    });
    if (!reservaResponse.ok) throw new Error('Error al crear la reserva.');
    return await reservaResponse.json();
}

// Función para eliminar un turno de una reserva
async function eliminarTurnoDeReserva(idReserva, idTurno) {
    const eliminarResponse = await fetch(`https://apispademo.somee.com/api/Reserva/eliminarTurnoAReserva_actualizarPago/${idReserva}?idTurno=${idTurno}`, {
        method: 'PUT'
    });
    if (!eliminarResponse.ok) throw new Error('Error al eliminar el turno de la reserva.');
}

// Función para agregar un turno a una reserva
async function agregarTurnoAReserva(idReserva, idTurno) {
    const agregarResponse = await fetch(`https://apispademo.somee.com/api/Reserva/agregarTurnoAReserva_actualizarPago/${idReserva}?idTurno=${idTurno}`, {
        method: 'PUT'
    });
    if (!agregarResponse.ok) throw new Error('Error al asociar el turno a la reserva.');
}

// Función para marcar el pago como completado
async function marcarPagoComoCompletado(reservaId) {
    try {
        const reservaResponse = await fetch(`https://apispademo.somee.com/api/Reserva/${reservaId}`);
        if (!reservaResponse.ok) throw new Error('Error al obtener los datos de la reserva.');

        const reservaData = await reservaResponse.json();
        const pagoId = reservaData.pago.pagoId;

        const pagoResponse = await fetch(`https://apispademo.somee.com/api/Pago/establecerPagado/${pagoId}`, {
            method: 'PATCH'
        });
        if (!pagoResponse.ok) throw new Error('Error al marcar el pago como pagado.');

        alert("Reserva y pago completados con éxito.");
        // Redirigir a la página para generar la factura después de crear la reserva y el turno
        window.location.href = `factura.html?reservaId=${reservaId}&pagoId=${reservaData.pago.pagoId}`;
    } catch (error) {
        console.error('Error al marcar el pago como completado:', error);
        alert("Ocurrió un error al completar el pago. Inténtalo nuevamente.");
    }
}
