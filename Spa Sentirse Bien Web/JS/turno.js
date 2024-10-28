const horariosOcupados = [
  "2024-09-10 09:00", "2024-09-10 10:00", "2024-09-10 11:00", 
  "2024-09-25 10:00", "2024-09-27 09:00", "2024-09-25 11:00"
];

document.addEventListener('DOMContentLoaded', function() {
  const tituloFicha = localStorage.getItem('tituloFicha'); // Recupera el título de la ficha del localStorage
  if (tituloFicha) {
      const servicioSeleccionado = document.getElementById("servicioSeleccionado");
      servicioSeleccionado.textContent = `Turno para: ${tituloFicha}`;
  }

  inicializarCalendario(); // Inicia el calendario
});



function inicializarCalendario() {
  flatpickr("#datepicker", {
    locale: "es",
    dateFormat: "Y-m-d",
    minDate: "today",
    disable: [
      function(date) {
        return (date.getDay() === 6 || date.getDay() === 0);
      }
    ],
    onDayCreate: function(dObj, dStr, fp, dayElem) {
      const dateStr = dayElem.dateObj.toISOString().split('T')[0];
      const horariosDelDia = horariosOcupados.filter(h => h.startsWith(dateStr));

      
      if (horariosDelDia.length === 3) {
        dayElem.style.backgroundColor = "#dc3545"; 
        dayElem.style.color = "white";
        dayElem.classList.add('disabled'); 
      } else if (horariosDelDia.length === 2) {
        dayElem.style.backgroundColor = "#ff5733";
        dayElem.style.color = "white";
      } else if (horariosDelDia.length === 1) {
        dayElem.style.backgroundColor = "#ffc107";
        dayElem.style.color = "white";
      }
    }
  });
}

// Actualiza el selector de horas basado en la fecha seleccionada
function actualizarSelectorDeHoras(fechaSeleccionada) {
  const timepicker = document.getElementById("timepicker");
  
  // Limpiar opciones del selector
  timepicker.innerHTML = '';

  
  const horariosPosibles = ["09:00", "10:00", "11:00"];
  
  
  const horariosDelDia = horariosOcupados
  .filter(horario => horario.startsWith(fechaSeleccionada))
  .map(horario => {
    const [, hora] = horario.split(' ');
    return hora;
  });


  
  horariosPosibles.forEach(horario => {
    if (!horariosDelDia.includes(horario)) {
      const option = document.createElement("option");
      option.value = horario;
      option.textContent = horario;
      timepicker.appendChild(option);
    }
  });

  
  if (timepicker.options.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No hay horarios disponibles";
    timepicker.appendChild(option);
  }
}


document.getElementById("reservarAhora").addEventListener("click", function() {
  const fechaSeleccionada = document.getElementById("datepicker").value;
  const horaSeleccionada = document.getElementById("timepicker").value;

  if (!fechaSeleccionada) {
    alert("Por favor, selecciona una fecha");
    return;
  }else if (!horaSeleccionada) {
    alert("Por favor, selecciona una hora disponible");
    return;
  }else{
    const opcionesDiv = document.getElementById("opciones");
    opcionesDiv.style.display = "block"; // Mostrar el div de opciones
  }
});

// Función para manejar el botón "Agregar al carrito"
document.getElementById("agregarCarrito").addEventListener("click", async function() {
    const fechaSeleccionada = document.getElementById("datepicker").value;
    const horaSeleccionada = document.getElementById("timepicker").value;
    const idUsuario = sessionStorage.getItem('id'); // ID del usuario desde el sessionStorage
    const params = new URLSearchParams(window.location.search);
    const idServicio = params.get('id');

    if (!fechaSeleccionada || !horaSeleccionada) {
        alert("Por favor, selecciona fecha y hora");
        return;
    }

    if (!idUsuario) {
        alert("Por favor, regístrate antes de agregar al carrito.");
        return;
    }

    try {
        // Paso 1: Obtener las reservas no pagadas del usuario
        const reservaResponse = await fetch(`https://apispademo.somee.com/api/Reserva/reservUserAllNoPagados?clienteId=${idUsuario}&conTurnos=true&conPago=true`);
        
        if (!reservaResponse.ok) {
            throw new Error('Error al obtener las reservas no pagadas del usuario');
        }

        const reservasNoPagadas = await reservaResponse.json();
        let reservaId;

        // Si existe alguna reserva no pagada, usar la primera
        if (reservasNoPagadas.length > 0) {
            reservaId = reservasNoPagadas[0].reservaId;
            await crearTurnoYAsociar(reservaId, idServicio, fechaSeleccionada, horaSeleccionada);
        } else {
            // Paso 2: Crear una nueva reserva si no hay ninguna sin pagar
            const nombreIdentificador = `${localStorage.getItem('username')}_${new Date().toISOString().split('T')[0]}_${horaSeleccionada.replace(':', '')}`;
            const nuevaReservaResponse = await fetch(`https://apispademo.somee.com/api/Reserva?monto=0&userId=${idUsuario}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombreIdentificador })
            });

            if (!nuevaReservaResponse.ok) {
                throw new Error('Error al crear una nueva reserva');
            }

            const nuevaReservaData = await nuevaReservaResponse.json();
            reservaId = nuevaReservaData.reservaId;
            await crearTurnoYAsociar(reservaId, idServicio, fechaSeleccionada, horaSeleccionada);
        }

        // Paso 3: Indicar al usuario que se ha agregado el turno y recargar la página
        alert(`Turno para el servicio ${idServicio} el ${fechaSeleccionada} a las ${horaSeleccionada} agregado al carrito.`);
        location.reload(); // Recargar la página para reflejar los cambios y evitar duplicados

    } catch (error) {
        console.error('Error al agregar el turno al carrito:', error);
        alert("Ocurrió un error al agregar el turno. Inténtalo nuevamente.");
    }
});

// Función auxiliar para crear un turno y asociarlo a una reserva
async function crearTurnoYAsociar(reservaId, idServicio, fecha, hora) {
    try {
        const descripcion = prompt("Escribe una descripción (ej. alergias o consideraciones):") || "Sin descripción";
        const fechaInicio = `${fecha}T${hora}:00`;

        // Crear el turno
        const turnoResponse = await fetch('https://apispademo.somee.com/api/Turno', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ servicioId: parseInt(idServicio), reservaId: parseInt(reservaId), fechaInicio, descripcion })
        });

        if (!turnoResponse.ok) {
            throw new Error('Error al crear el turno');
        }

        const turnoData = await turnoResponse.json();
        const turnoId = turnoData.turnoId;

        // Asociar el turno a la reserva (sin actualizar el pago a pagado)
        const asociarResponse = await fetch(`https://apispademo.somee.com/api/Reserva/agregarTurnoAReserva_actualizarPago/${reservaId}?idTurno=${turnoId}`, {
            method: 'PUT'
        });

        if (!asociarResponse.ok) {
            throw new Error('Error al asociar el turno con la reserva');
        }

    } catch (error) {
        console.error('Error al crear el turno y asociarlo:', error);
        throw new Error('Ocurrió un error al crear el turno. Inténtalo nuevamente.');
    }
}
