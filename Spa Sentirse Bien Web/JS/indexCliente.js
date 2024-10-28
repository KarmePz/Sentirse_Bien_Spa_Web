// Función para cargar los servicios desde la API
async function cargarServiciosDesdeAPI() {
    try {
        const response = await fetch('https://apispademo.somee.com/api/Servicio?conTurnos=false&conHorarios=false');
        if (!response.ok) {
            throw new Error('Error al obtener los servicios');
        }

        const servicios = await response.json(); // Servicios traídos desde la API
        displayServices(servicios); // Mostrar los servicios
        inicializarFiltros(servicios); // Inicializar los filtros con los servicios cargados
    } catch (error) {
        console.error('Error al cargar los servicios:', error);
    }
}

// Función para redirigir al usuario a la página de pedido de turno
function pedirTurno(serviceId) {
    window.location.href = `turno.html?id=${serviceId}`;
}

// Función para mostrar los servicios
function displayServices(filteredServices) {
    const servicesContainer = document.getElementById("services");
    servicesContainer.innerHTML = ''; // Limpiar el contenedor de servicios

    // Mostrar cada servicio en formato de tarjeta
    filteredServices.forEach(service => {
        const serviceCard = `
            <div class="service-card">
                <img src="${service.rutaImagen}" alt="${service.titulo}">
                <div class="service-info">
                    <h3>${service.titulo}</h3>
                    <p>${service.descripcion}</p>
                    <span>Duración: ${service.duracionMinut} min</span>
                    <span>Precio: $${service.precio}</span>
                </div>
                <button class="reserva_button" onclick="pedirTurno(${service.servicioId})">Pedir turno</button>
            </div>
        `;
        servicesContainer.innerHTML += serviceCard;
    });
}

// Función para inicializar la búsqueda y filtros con los servicios obtenidos
function inicializarFiltros(servicios) {
    // Filtrar por título
    document.getElementById("searchTitle").addEventListener("input", function() {
        const searchTerm = this.value.toLowerCase();
        const filteredServices = servicios.filter(service => service.titulo.toLowerCase().includes(searchTerm));
        displayServices(filteredServices);
    });

    // Filtrar por tipo de servicio
    document.getElementById("filterType").addEventListener("change", function() {
        const filterType = this.value;
        const filteredServices = filterType ? servicios.filter(service => service.tipoServicio === filterType) : servicios;
        displayServices(filteredServices);
    });

    // Filtrar por empleado
    document.getElementById("filterEmployee").addEventListener("change", function() {
        const filterEmployee = this.value;
        const filteredServices = filterEmployee ? servicios.filter(service => service.usuarioId === filterEmployee) : servicios;
        displayServices(filteredServices);
    });
}

// Inicializa la carga de servicios desde la API al cargar la página
cargarServiciosDesdeAPI();
