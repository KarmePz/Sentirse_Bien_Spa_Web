function agregarPregunta() {
    const preguntaInput = document.getElementById('nueva-pregunta');
    const preguntaTexto = preguntaInput.value;
    if (preguntaTexto) {
        const listaPreguntas = document.getElementById('preguntas-lista');
        const nuevaPregunta = document.createElement('div');
        nuevaPregunta.className = 'pregunta';
        nuevaPregunta.innerHTML = `<p>${preguntaTexto}</p><p class="respuesta">Aún no hay respuesta <span class="fecha">${nuevaFecha()}</span></p>`;
        listaPreguntas.appendChild(nuevaPregunta);
        preguntaInput.value = '';  // Limpiar el input
    }
}

function agregarReseña() {
    const reseñaInput = document.getElementById('nueva-reseña');
    const calificacionSelect = document.getElementById('nueva-calificacion');
    const reseñaTexto = reseñaInput.value;
    var calificacionTexto;
    switch (calificacionSelect.value){
        case '1':
            calificacionTexto = "★☆☆☆☆";
            break
        case '2':
            calificacionTexto = "★★☆☆☆";
            break
        case '3':
            calificacionTexto = "★★★☆☆";
            break
        case '4':
            calificacionTexto = "★★★★☆";
            break
        case '5':
            calificacionTexto = "★★★★★";
            break
    }
    // const calificacionTexto = calificacionSelect.value;
    if (reseñaTexto) {
        const listaReseñas = document.getElementById('reseñas-lista');
        const nuevaReseña = document.createElement('div');
        nuevaReseña.className = 'reseña';
        nuevaReseña.innerHTML = `<div class="calificacion">${calificacionTexto}</div><p>${reseñaTexto} <span class="fecha">${nuevaFecha()}</span></p>`;
        listaReseñas.appendChild(nuevaReseña);
        reseñaInput.value = '';  // Limpiar el input
    }
}

function nuevaFecha() {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Meses empiezan en 0
    const año = hoy.getFullYear();
    return `${dia}/${mes}/${año}`;
}
