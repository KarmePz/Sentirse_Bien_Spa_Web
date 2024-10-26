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

document.getElementById("agregarCarrito").addEventListener("click", function() {
  const fechaSeleccionada = document.getElementById("datepicker").value;
  const horaSeleccionada = document.getElementById("timepicker").value;
  const tituloServicio = localStorage.getItem('tituloFicha');

  if (!fechaSeleccionada) {
    alert("Por favor, selecciona una fecha");
    return;
  }else if (!horaSeleccionada) {
    alert("Por favor, selecciona una hora disponible");
    return;
  }else{
    const idUsuario = sessionStorage.getItem('id');
    const reservaUsuario = sessionStorage.setItem('reserva');
    if(idUsuario){
      if(reserva){
        //cargar a reserva
        alert("turno fue agregado a reserva 👌😊")

      }else{
        //crear reserva
        alert("turno fue agregado a reserva 👌😊")
      }

    }else{
      alert("Por favor, registrate");
    }


  }
});

document.getElementById("confirmar").addEventListener("click", function() {
  const seleccion = document.querySelector('input[name="status"]:checked');
  const fechaSeleccionada = document.getElementById("datepicker").value;
  const horaSeleccionada = document.getElementById("timepicker").value;
  if (seleccion) {
      //alert("Has seleccionado: " + seleccion.id);
      const fechaHora = `${fechaSeleccionada} ${horaSeleccionada}`;

  
      if (!horariosOcupados.includes(fechaHora)) {
        horariosOcupados.push(fechaHora);
        console.log("Horario confirmado:", fechaHora);
    
        inicializarCalendario();
        actualizarSelectorDeHoras(fechaSeleccionada);
        //aca estaria el de pagar ahora
        //generar reserva 
        alert("tu pago fue realizado exitosamente 👌😊")
        //completar datos del pago

      } else {
        alert("Este horario ya está ocupado. Elige otro.");
      }
  } else {
      alert("Por favor, selecciona una opción.");
  }
});


document.getElementById("datepicker").addEventListener("change", function() {
  const fechaSeleccionada = this.value;
  actualizarSelectorDeHoras(fechaSeleccionada);
});


inicializarCalendario();
