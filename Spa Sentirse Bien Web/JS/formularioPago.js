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
    // Aquí agregamos el cálculo para el total de las reservas
    // Ejemplo:
    let total = 5000;  // Suponiendo que el total de la reserva es $5000
    return total;
}

// Mostrar el monto total al cargar la página
document.getElementById("monto").innerText = `$${calcularMontoTotal().toFixed(2)}`;

// Función para actualizar el cálculo de cuotas
function calcularCuotas() {
    const montoTotal = calcularMontoTotal();
    const cuotas = parseInt(document.querySelector('input[name="cuotas"]:checked').value) || 1;
    const montoCuota = montoTotal / cuotas;
    document.getElementById("monto-total").innerText = `$${montoCuota.toFixed(2)} en ${cuotas} cuota(s)`;
}

// Función para mostrar/ocultar opciones de cuotas
function alternarCuotas() {
    const tipoTarjeta = document.querySelector('input[name="tipo-tarjeta"]:checked').value;
    const grupoCuotas = document.getElementById("grupo-cuotas");
    
    // Mostrar u ocultar opciones de cuotas según el tipo de tarjeta
    if (tipoTarjeta === "credito") {
        grupoCuotas.style.display = "block";
        document.getElementById("monto-total").innerText = "$0.00";
    } else if (tipoTarjeta === "debito") {
        grupoCuotas.style.display = "none";
        document.getElementById("monto-total").innerText = `$${calcularMontoTotal().toFixed(2)}`;
    }
}
