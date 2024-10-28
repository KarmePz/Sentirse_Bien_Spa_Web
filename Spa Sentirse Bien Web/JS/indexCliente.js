// Lista de empleados (por ahora se trabaja con un arreglo, luego puede reemplazarse por datos de una base de datos)
const empleados = [
    { idEmpleado: 1, nombre: "Empleado 1" },
    { idEmpleado: 2, nombre: "Empleado 2" },
];

// Función para cargar dinámicamente las opciones de empleados en el filtro
function cargarEmpleados() {
    const opcionesEmpleados = document.getElementById("opcionesEmpleados");
    opcionesEmpleados.innerHTML = ''; // Limpiar las opciones anteriores

    empleados.forEach(empleado => {
        const option = document.createElement("option");
        option.value = `empleado_${empleado.idEmpleado}`;
        option.textContent = empleado.nombre;
        opcionesEmpleados.appendChild(option);
    });
}

// Llamar a la función para cargar los empleados al inicio
cargarEmpleados();
const services = [
    {
    idServicio:1,
    idEmpleado:1,
    tipoServicio: "Masajes",
    rutaImagen: "/sources/Servicios/Servicios/masajesAntiStress.jpg",
    titulo: "Anti-stress",
    descripcion: "Sumérgete en un oasis de calma con nuestro masaje anti-estrés, diseñado para deshacerte de las tensiones diarias. Disfruta de movimientos suaves y envolventes que revitalizan tu cuerpo y mente, dejándote en un estado de total relajación.",
    duracionMin:60,
    precio:7500,
    },
    {
    idServicio:2,
    idEmpleado:1,
    tipoServicio: "Masajes",
    rutaImagen: "/sources/Servicios/Servicios/masajesDecontracturantes.jpg",
    titulo: "Descontracturantes",
    descripcion: "Libérate de las contracturas y el malestar muscular con nuestro masaje descontracturante. Con técnicas específicas para aliviar tensiones, sentirás cómo el dolor se disuelve y tu cuerpo recupera su movilidad y confort.",
    duracionMin:60,
    precio:7500,
    },{
    idServicio:3,
    idEmpleado:1,
    tipoServicio: "Masajes",
    rutaImagen: "/sources/Servicios/Servicios/masajesConPiedrasCalientes.jpg",
    titulo: "Masajes con piedras calientes",
    descripcion: "Experimenta el lujo de un masaje con piedras calientes, donde el calor terapéutico de las piedras volcánicas se combina con movimientos experta para aliviar el estrés y mejorar tu circulación. Perfecto para una sensación de bienestar profundo.",
    duracionMin:60,
    precio:7500,
    },{
    idServicio:4,
    idEmpleado:1,
    tipoServicio: "Masajes",
    rutaImagen: "/sources/Servicios/Servicios/masajesCirculatorios.jpg",
    titulo: "Circulatorios",
    descripcion: "Dale a tu cuerpo el impulso que necesita con nuestro masaje circulatorio. Diseñado para mejorar la circulación sanguínea y linfática, este masaje alivia la pesadez en las piernas y rejuvenece todo tu ser.",
    duracionMin:60,
    precio:7500,
    },{
    idServicio:5,
    idEmpleado:2,
    tipoServicio: "Belleza",
    rutaImagen: "/sources/Servicios/Servicios/liftingDePestanias.jpeg",
    titulo: "Lifting de pestaña",
    descripcion: "Realza tu mirada con nuestro lifting de pestañas. Obtén unas pestañas naturalmente curvadas y voluminosas que destacan tus ojos sin necesidad de extensiones. Ideal para un look fresco y radiante todos los días.",
    duracionMin:60,
    precio:7500,
    },{
    idServicio:6,
    idEmpleado:2,
    tipoServicio: "Belleza",
    rutaImagen: "/sources/Servicios/Servicios/depilacionFacial.jpg",
    titulo: "Depilación facial",
    descripcion: "Disfruta de una piel suave y libre de vello con nuestra depilación facial. Utilizamos técnicas precisas para eliminar el vello de manera eficiente, dejándote con una piel perfectamente limpia y suave.",
    duracionMin:60,
    precio:7500,
    },{
    idServicio:7,
    idEmpleado:2,
    tipoServicio: "Belleza",
    rutaImagen: "/sources/Servicios/Servicios/bellezaDeManosYPies.jpg",
    titulo: "Belleza de manos y pies",
    descripcion: "Mimamos tus manos y pies con nuestro tratamiento completo de manicura y pedicura. Desde el limado hasta el esmaltado, te garantizamos una experiencia rejuvenecedora que deja tus extremidades radiantes y perfectamente cuidadas.",
    duracionMin:60,
    precio:7500,
    },{
    idServicio:8,
    idEmpleado:2,
    tipoServicio: "Tratamientos Faciales",
    rutaImagen: "/sources/Servicios/Servicios/Punta-de-diamante.jpg",
    titulo: "Punta de Diamante (Microexfoliación)",
    descripcion: "Rejuvenece tu piel con nuestra microexfoliación de punta de diamante. Este tratamiento elimina las células muertas y promueve una piel fresca y luminosa, dejando tu rostro con un aspecto renovado y radiante.",
    duracionMin:60,
    precio:7500,
    },{
    idServicio:9,
    idEmpleado:2,
    tipoServicio: "Tratamientos Faciales",
    rutaImagen: "/sources/Servicios/Servicios/hidratacionFacial.jpg",
    titulo: "Limpieza profunda + Hidratación",
    descripcion: "Revitaliza tu rostro con nuestra limpieza profunda combinada con una hidratación intensiva. Elimina impurezas y proporciona una hidratación profunda, devolviendo a tu piel su vitalidad y frescura.",
    duracionMin:60,
    precio:7500,
    },{
    idServicio:10,
    idEmpleado:2,
    tipoServicio: "Tratamientos Faciales",
    rutaImagen: "/sources/Servicios/Servicios/criofrecuenciaFacial.jpg",
    titulo: "Criofrecuencia facial",
    descripcion: "Experimenta un lifting facial instantáneo con nuestra criofrecuencia. Esta innovadora tecnología de frío crea un efecto térmico que reafirma y tonifica tu piel, brindando resultados visibles y rejuvenecedores al instante.",
    duracionMin:60,
    precio:7500,
    },{
    idServicio:11,
    idEmpleado:1,
    tipoServicio: "Tratamientos Corporales",
    rutaImagen: "/sources/Servicios/Servicios/velaslim.jpg",
    titulo: "VelaSlim",
    descripcion: "Redefine tu figura con nuestro tratamiento VelaSlim, que combina radiofrecuencia, infrarrojos y succión mecánica para reducir la celulitis y la circunferencia corporal. Ideal para lograr una piel más firme y esbelta.",
    duracionMin:60,
    precio:7500,
    },{
    idServicio:12,
    idEmpleado:1,
    tipoServicio: "Tratamientos Corporales",
    rutaImagen: "/sources/Servicios/Servicios/dermohealth.jpg",
    titulo: "DermoHealth",
    descripcion: "Despierta la vitalidad de tu piel con nuestro tratamiento DermoHealth. Este innovador tratamiento estimula la microcirculación y realiza un drenaje linfático, ayudando a movilizar los tejidos y mejorar la apariencia general de la piel.",
    duracionMin:60,
    precio:7500,
    },{
    idServicio:13,
    idEmpleado:1,
    tipoServicio: "Tratamientos Corporales",
    rutaImagen: "/sources/Servicios/Servicios/criofrecuenciaCorporal.jpg",
    titulo: "Criofrecuencia corporal",
    descripcion: "Disfruta de un lifting corporal con nuestra criofrecuencia, que utiliza calor y frío para reafirmar tu piel y reducir la flacidez. Obtén resultados visibles con un tratamiento que rejuvenece tu cuerpo al instante.",
    duracionMin:60,
    precio:7500,
    },{
    idServicio:14,
    idEmpleado:1,
    tipoServicio: "Tratamientos Corporales",
    rutaImagen: "/sources/Servicios/Servicios/ultracavitacion.jpg",
    titulo: "Ultracavitación",
    descripcion: "Logra una figura esculpida con nuestra técnica de ultracavitación. Utilizamos ultrasonido para desintegrar las células de grasa y reducir medidas, ofreciendo una solución efectiva para la reducción corporal y la celulitis.",
    duracionMin:60,
    precio:7500,
    },
];

function pedirTurno(serviceId) {
    window.location.href = `turno.html?id=${serviceId}`;
}

function displayServices(filteredServices) {
    const servicesContainer = document.getElementById("services");
    servicesContainer.innerHTML = '';

    filteredServices.forEach(service => {
        const serviceCard = `
            <div class="service-card">
                <img src="${service.rutaImagen}" alt="${service.titulo}">
                <div class="service-info">
                    <h3>${service.titulo}</h3>
                    <p>${service.descripcion}</p>
                    <span>Duración: ${service.duracionMin} min</span>
                    <span>Precio: $${service.precio}</span>
                </div>
                <button class="reserva_button" onclick="pedirTurno(${service.idServicio})">Pedir turno</button>
            </div>
        `;
        servicesContainer.innerHTML += serviceCard;
    });
}

// Función para filtrar servicios según el filtro combinado y la búsqueda por título
function filtrarServicios() {
    const filtroSeleccionado = document.getElementById("filtroUnico").value;
    const textoBusqueda = document.getElementById("busquedaTitulo").value.toLowerCase();

    let serviciosFiltrados = services;

    // Filtrar por tipo de servicio o empleado
    if (filtroSeleccionado.startsWith('empleado_')) {
        // Filtrar por empleado
        const idEmpleado = parseInt(filtroSeleccionado.split('_')[1]);
        serviciosFiltrados = serviciosFiltrados.filter(service => service.idEmpleado === idEmpleado);
    } else if (filtroSeleccionado) {
        // Filtrar por tipo de servicio
        serviciosFiltrados = serviciosFiltrados.filter(service => service.tipoServicio === filtroSeleccionado);
    }

    // Filtrar por título del servicio
    if (textoBusqueda) {
        serviciosFiltrados = serviciosFiltrados.filter(service => service.titulo.toLowerCase().includes(textoBusqueda));
    }

    // Mostrar los servicios filtrados
    displayServices(serviciosFiltrados);
}

// Event listeners para el filtro combinado y el campo de búsqueda
document.getElementById("filtroUnico").addEventListener("change", filtrarServicios);
document.getElementById("busquedaTitulo").addEventListener("input", filtrarServicios);

// Inicializa la visualización con todos los servicios 
displayServices(services);


