// Ejemplo de arreglo de reserva
const nroReserva = [
    {
        turnos: [
            { tipodeServicio: "Masaje", fecha: "2024-10-22", hora: "14:00", precioServicio: 1500, duracionServicio: "1 hora" },
            { tipodeServicio: "Facial", fecha: "2024-10-23", hora: "10:00", precioServicio: 1200, duracionServicio: "45 minutos" },
            { tipodeServicio: "Manicura", fecha: "2024-10-24", hora: "16:00", precioServicio: 800, duracionServicio: "30 minutos" }
        ]
    }
];
document.getElementById("agregarCarrito").addEventListener("click", function() {
    const fechaSeleccionada = document.getElementById("datepicker").value;
    const horaSeleccionada = document.getElementById("timepicker").value;

    
});


document.getElementById("boton-pagar").addEventListener("click", function() {
    const opcionesDiv = document.getElementById("opciones");
    opcionesDiv.style.display = "block"; // Mostrar el div de opciones
    
});
document.getElementById("confirmar").addEventListener("click", function() {
    const seleccion = document.querySelector('input[name="status"]:checked');
    const fechaSeleccionada = document.getElementById("datepicker").value;
    const horaSeleccionada = document.getElementById("timepicker").value;
    if (seleccion) {
        alert("Su pago fue realizado con exito");
    } else {
        alert("Por favor, selecciona una opción.");
    }
  });

// Función para mostrar los turnos en la lista
function mostrarTurnos() {
    const listaTurnos = document.getElementById("lista-turnos");
    listaTurnos.innerHTML = ""; // Limpiar la lista
    let totalPrecio = 0;

    nroReserva[0].turnos.forEach(turno => {
        // Crear elemento de lista para cada turno
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <p><strong>Servicio:</strong> ${turno.tipodeServicio}</p>
                <p><strong>Fecha y Hora:</strong> ${turno.fecha} - ${turno.hora}</p>
                <p><strong>Duración:</strong> ${turno.duracionServicio}</p>
            </div>
            <div>
                <p><strong>Precio:</strong> $${turno.precioServicio}</p>
            </div>
        `;
        listaTurnos.appendChild(li);

        // Sumar el precio del turno al total
        totalPrecio += turno.precioServicio;
    });

    // Actualizar el precio total en el HTML
    document.getElementById("total-precio").textContent = `$${totalPrecio}`;
}

// Mostrar los turnos al cargar la página
mostrarTurnos();
