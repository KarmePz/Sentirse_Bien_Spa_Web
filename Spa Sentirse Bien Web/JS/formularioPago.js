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


// Función para mostrar el monto total basado en el precio del servicio
async function mostrarMontoTotal() {
    const params = new URLSearchParams(window.location.search);
    const idServicio = params.get('id'); // Obtener el ID del servicio de la URL

    if (!idServicio) {
        alert("ID de servicio no encontrado");
        return;
    }

    // Obtener el precio del servicio desde la API
    const servicio = await obtenerDatosServicio(idServicio);
    if (servicio) {
        const precioServicio = servicio.precio; // Obtener el precio del servicio

        // Mostrar el monto en el HTML
        document.getElementById("monto").innerText = `$${precioServicio.toFixed(2)}`;
        document.getElementById("monto-total").innerText = `$${precioServicio.toFixed(2)}`; // Mostrar como monto total al principio
    }
}

// Mostrar el monto total al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    mostrarMontoTotal();
});

// Función para obtener los datos del servicio desde la API
async function obtenerDatosServicio(idServicio) {
    try {
        const response = await fetch(`https://apispademo.somee.com/api/Servicio/${idServicio}?conTurnos=false&conHorarios=false`);
        if (!response.ok) {
            throw new Error("Error al obtener los datos del servicio");
        }
        const servicio = await response.json();
        return servicio;
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


document.querySelector('.boton-enviar').addEventListener('click', async function() {
    let tipoTarjeta = document.getElementById('tipo-tarjeta').value.toLowerCase();
    tipoTarjeta = tipoTarjeta.charAt(0).toUpperCase() + tipoTarjeta.slice(1);
    const username = sessionStorage.getItem('username'); // Obtener el nombre del usuario autenticado
    const idUsuario = sessionStorage.getItem('id'); // Obtener el ID del usuario del localStorage
    const idServicio = new URLSearchParams(window.location.search).get('id'); // Obtener el ID del servicio
    const fechaSeleccionada = new URLSearchParams(window.location.search).get('fecha');
    const horaSeleccionada = new URLSearchParams(window.location.search).get('hora');

    if (!fechaSeleccionada || !horaSeleccionada || !username || !idUsuario) {
        alert("Faltan datos para completar la reserva.");
        return;
    }

    // Obtener la fecha y hora actuales para añadir al nombreIdentificador
    const fechaHoraActual = new Date();
    const fechaHoraFormateada = `${fechaHoraActual.toISOString().split('T')[0]}_${fechaHoraActual.toLocaleTimeString('es-ES', { hour12: false }).replace(/:/g, '')}`;

    // Formato para el nombreIdentificador (usuario + fecha + hora)
    const nombreIdentificador = `${username}_${fechaHoraFormateada}`;
    
    try {
        // Paso 1: Crear la Reserva
        const reservaResponse = await fetch(`https://apispademo.somee.com/api/Reserva?monto=0&userId=${idUsuario}&formatoPago=${tipoTarjeta}`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombreIdentificador })
        });
        if (!reservaResponse.ok) throw new Error('Error al crear la reserva.');
        
        const reservaData = await reservaResponse.json();
        const reservaId = reservaData.reservaId;

        // Continuar con la creación del turno
        crearTurno(idServicio, reservaId, fechaSeleccionada, horaSeleccionada);

    } catch (error) {
        console.error('Error al crear la reserva:', error);
        alert("Ocurrió un error al procesar la reserva. Inténtalo nuevamente.");
    }
});


async function crearTurno(idServicio, reservaId, fecha, hora) {
    try {
        const descripcion = prompt("Escribe una descripción (ej. alergias o consideraciones):") || "Sin descripción";

        // Combinar la fecha y la hora
        const fechaInicio = `${fecha}T${hora}:00`;

        // Paso 2: Crear el Turno
        const turnoResponse = await fetch('https://apispademo.somee.com/api/Turno', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ servicioId: parseInt(idServicio), reservaId: parseInt(reservaId), fechaInicio, descripcion })
        });
        if (!turnoResponse.ok) throw new Error('Error al crear el turno.');

        const turnoData = await turnoResponse.json();
        const turnoId = turnoData.turnoId;

        // Asociar turno con la reserva
        asociarTurnoConReserva(reservaId, turnoId);

    } catch (error) {
        console.error('Error al crear el turno:', error);
        alert("Ocurrió un error al procesar el turno. Inténtalo nuevamente.");
    }
}

async function asociarTurnoConReserva(reservaId, turnoId) {
    try {
        // Paso 3: Asociar el turno con la reserva
        const asociarResponse = await fetch(`https://apispademo.somee.com/api/Reserva/agregarTurnoAReserva_actualizarPago/${reservaId}?idTurno=${turnoId}`, {
            method: 'PUT'
        });
        if (!asociarResponse.ok) throw new Error('Error al asociar el turno con la reserva.');

        // Marcar el pago como completado
        marcarPagoComoCompletado(reservaId);

    } catch (error) {
        console.error('Error al asociar el turno con la reserva:', error);
        alert("Ocurrió un error al asociar el turno. Inténtalo nuevamente.");
    }
}

async function marcarPagoComoCompletado(reservaId) {
    try {
        // Paso 4: Obtener la reserva para obtener el ID del pago
        const reservaResponse = await fetch(`https://apispademo.somee.com/api/Reserva/${reservaId}`);
        if (!reservaResponse.ok) throw new Error('Error al obtener los datos de la reserva.');

        const reservaData = await reservaResponse.json();
        const pagoId = reservaData.pago.pagoId;

        // Paso 4b: Marcar el pago como completado
        const pagoResponse = await fetch(`https://apispademo.somee.com/api/Pago/establecerPagado/${pagoId}`, {
            method: 'PATCH'
        });
        if (!pagoResponse.ok) throw new Error('Error al marcar el pago como pagado.');
        
        alert("Reserva y pago completados con éxito.");
        // Redirigir a la página para generar la factura después de crear la reserva y el turno
        window.location.href = `factura.html?reservaId=${reservaId}&pagoId=${reservaData.pago.pagoId}`;

        //window.location.href = 'indexCliente.html'; // Redirigir al usuario

    } catch (error) {
        console.error('Error al marcar el pago como completado:', error);
        alert("Ocurrió un error al completar el pago. Inténtalo nuevamente.");
    }
}
