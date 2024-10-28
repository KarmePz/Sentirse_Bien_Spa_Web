document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const idServicio = params.get('id');

  if (idServicio) {
      obtenerDetallesServicio(idServicio);
  }

  inicializarCalendario(); // Iniciar calendario sin cambios aún
});

async function obtenerDetallesServicio(idServicio) {
  try {
      // Solicitud para obtener el servicio con sus turnos y horarios
      const response = await fetch(`https://apispademo.somee.com/api/Servicio/${idServicio}?conTurnos=true&conHorarios=true`);
      if (!response.ok) {
          throw new Error('Error al obtener los detalles del servicio');
      }

      const servicio = await response.json();
      const tituloServicio = servicio.titulo;
      const duracionMinut = servicio.duracionMinut;
      const horariosServicio = servicio.horarios;
      const turnosTomados = servicio.turnos;

      // Actualizar la UI con el título del servicio
      document.getElementById("servicioSeleccionado").textContent = `Turno para el servicio: ${tituloServicio}`;

      // Guardar los datos del servicio en variables globales
      window.duracionMinut = duracionMinut;
      window.horariosServicio = horariosServicio;
      window.turnosTomados = turnosTomados.map(turno => turno.fechaInicio);

      // Inicializar el calendario con estos datos
      inicializarCalendario();

  } catch (error) {
      console.error('Error al obtener el servicio:', error);
  }
}

function inicializarCalendario() {
  flatpickr("#datepicker", {
      locale: "es",
      dateFormat: "Y-m-d",
      minDate: "today",
      disable: [
          function(date) {
              return (date.getDay() === 6 || date.getDay() === 0); // Deshabilitar fines de semana
          }
      ],
      onDayCreate: function(dObj, dStr, fp, dayElem) {
          const dateStr = dayElem.dateObj.toISOString().split('T')[0];
          const horariosTomadosDelDia = window.turnosTomados.filter(h => h.startsWith(dateStr));

          // Deshabilitar el día si todos los horarios están ocupados
          const horariosPosiblesDelDia = generarHorariosDia(window.horariosServicio, window.duracionMinut);
          if (horariosTomadosDelDia.length === horariosPosiblesDelDia.length) {
              dayElem.style.backgroundColor = "#dc3545"; 
              dayElem.style.color = "white";
              dayElem.classList.add('disabled');
          } else if (horariosTomadosDelDia.length > 0) {
              dayElem.style.backgroundColor = "#ff5733";
              dayElem.style.color = "white";
          }
      },
      onChange: function(selectedDates, dateStr, instance) {
          actualizarSelectorDeHoras(dateStr);
      }
  });
}

// Función para generar los horarios disponibles en un día dado
function generarHorariosDia(horariosServicio, duracionMinut) {
  const horariosDisponibles = [];
  
  horariosServicio.forEach(horario => {
      let horaInicio = horario.horaInicio.slice(0, 5); // Quitar los segundos
      let horaFinal = horario.horaFinal.slice(0, 5); // Quitar los segundos

      // Crear horarios según la duración del servicio, pero sin incluir la hora final
      while (horaInicio < horaFinal) {
          horariosDisponibles.push(horaInicio);
          horaInicio = sumarMinutos(horaInicio, duracionMinut); // Avanzar el horario en base a la duración del servicio
          
          // Si la próxima hora es igual a la horaFinal, no la añadimos
          if (horaInicio === horaFinal) {
              break;
          }
      }
  });

  return horariosDisponibles;
}


// Función para actualizar el selector de horas según la fecha seleccionada
function actualizarSelectorDeHoras(fechaSeleccionada) {
  const timepicker = document.getElementById("timepicker");
  timepicker.innerHTML = ''; // Limpiar opciones del selector

  const horariosPosibles = generarHorariosDia(window.horariosServicio, window.duracionMinut);

  // Filtrar los horarios ya ocupados para la fecha seleccionada
  const horariosTomadosDelDia = window.turnosTomados
      .filter(horario => horario.startsWith(fechaSeleccionada))
      .map(horario => horario.split('T')[1].slice(0, 5)); // Obtener solo la hora

  horariosPosibles.forEach(horario => {
      if (!horariosTomadosDelDia.includes(horario)) {
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

// Función para sumar minutos a una hora (en formato HH:MM)
function sumarMinutos(hora, minutos) {
  const [h, m] = hora.split(':').map(Number);
  const nuevaHora = new Date();
  nuevaHora.setHours(h);
  nuevaHora.setMinutes(m + minutos);
  
  const horas = nuevaHora.getHours().toString().padStart(2, '0');
  const minutosActualizados = nuevaHora.getMinutes().toString().padStart(2, '0');
  return `${horas}:${minutosActualizados}`; // Solo devolver formato HH:MM
}


// Redirigir al formulario de pago al presionar "Reservar ahora"
document.getElementById("reservarAhora").addEventListener("click", function() {
  const fechaSeleccionada = document.getElementById("datepicker").value;
  const horaSeleccionada = document.getElementById("timepicker").value;
  const params = new URLSearchParams(window.location.search);
  const idServicio = params.get('id');
  
  if (!fechaSeleccionada) {
      alert("Por favor, selecciona una fecha");
      return;
  } else if (!horaSeleccionada) {
      alert("Por favor, selecciona una hora disponible");
      return;
  } else {
      const url = `formularioPago.html?id=${idServicio}&fecha=${encodeURIComponent(fechaSeleccionada)}&hora=${encodeURIComponent(horaSeleccionada)}`;
      window.location.href = url;
  }
});

// Lógica para agregar al carrito (a desarrollar)
document.getElementById("agregarCarrito").addEventListener("click", function() {
  const fechaSeleccionada = document.getElementById("datepicker").value;
  const horaSeleccionada = document.getElementById("timepicker").value;
  const idUsuario = sessionStorage.getItem('id');
  const params = new URLSearchParams(window.location.search);
  const idServicio = params.get('id');

  if (!fechaSeleccionada || !horaSeleccionada) {
      alert("Por favor, selecciona fecha y hora");
      return;
  }

  if (idUsuario) {
      alert(`Turno para el servicio ${idServicio} el ${fechaSeleccionada} a las ${horaSeleccionada} agregado al carrito.`);
  } else {
      alert("Por favor, regístrate antes de agregar al carrito.");
  }
});