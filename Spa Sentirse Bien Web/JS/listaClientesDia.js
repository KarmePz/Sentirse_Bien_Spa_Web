document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const dia = params.get('dia');
    const ordenarDescendiente = params.get('ordenarDescendiente');

    try {
        // Llamada al endpoint
        const response = await fetch(`http://localhost:5287/api/Listados/clientesPorDia?dia=${dia}&ordenarDescendiente=${ordenarDescendiente}`);
        if (!response.ok) {
            throw new Error('Error al obtener la lista de clientes');
        }

        const clientes = await response.json();
        const tablaBody = document.querySelector('#tablaClientesDia tbody');
        
        clientes.forEach(cliente => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${cliente.clienteId}</td>
                <td>${cliente.clienteUsername}</td>
                <td>${cliente.tituloServicioARealizar}</td>
                <td>${new Date(cliente.horario).toLocaleString()}</td>
            `;
            tablaBody.appendChild(fila);
        });

    } catch (error) {
        console.error('Error:', error);
        alert('No se pudo obtener la lista de clientes.');
    }

    // Función para generar PDF
    document.getElementById('btnGenerarPDF').addEventListener('click', function() {
        const element = document.querySelector('main');

        const botones = document.querySelector('.botonesAccion');
        botones.style.display = 'none';
        
        const opt = {
            margin:       0.5,         // Margen alrededor del contenido
            filename:     'ListaClientes.pdf',
            image:        { type: 'jpeg', quality: 0.98 },  // Calidad de las imágenes
            html2canvas:  { scale: 2 },  // Ajustar la escala para mejor calidad
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' } // Configuración de PDF
        };

        html2pdf().from(element).set(opt).save().then(function() {
            botones.style.display = 'block';
        });
    });
});
