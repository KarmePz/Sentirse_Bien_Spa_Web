document.getElementById('formClientesPorDia').addEventListener('submit', function(e) {
    e.preventDefault();
    const dia = document.getElementById('dia').value;
    const ordenarDesc = document.getElementById('ordenarDesc').checked;

    // Redirigir al HTML que mostrará la lista con los parámetros de búsqueda en la URL
    window.location.href = `listaClientesDia.html?dia=${dia}&ordenarDescendiente=${ordenarDesc}`;
});
