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


// Función para calcular el monto total de las reservas del usuario
function calcularMontoTotal() {
    let total = 0;
    reservas.filter(reserva => reserva.usuarioCliente === idUsuario).forEach(reserva => {
        turnos.filter(turno => turno.reservaID === reserva.ID).forEach(turno => {
            const servicio = servicios.find(serv => serv.ID === turno.servicioID);
            if (servicio) total += servicio.precio;
        });
    });
    return total;
}

// Mostrar el monto total al cargar la página
document.getElementById("monto").innerText = `$${calcularMontoTotal().toFixed(2)}`;

// Función para actualizar el cálculo de cuotas
function calcularCuotas() {
    const montoTotal = calcularMontoTotal();
    const cuotas = parseInt(document.getElementById("cuotas").value) || 1;
    const montoCuota = montoTotal / cuotas;
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
