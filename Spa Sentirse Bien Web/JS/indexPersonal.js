// Obtener elementos
const checkbox = document.getElementById('checkbox');
const body = document.body;
const links = document.querySelectorAll('.barraOpciones a');
const mainDiv = document.getElementById('div_Main');

// Manejo del toggle de la barra lateral
checkbox.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('menu-abierto');
    } else {
        body.classList.remove('menu-abierto');
    }
});

// Contenido dinámico para las diferentes secciones
const secciones = {
    'Clientes': `
        <style>
        :root {
            --verdeColor: #5fa510;
            --verdeOscuroColor: #315012;
            --rosaColor: #dc1659;
            --rosaOscuro: #a11245;
            --amarilloColor: #e1bc00;
            --amarilloOscuro: #d29500;
            --rosaClaro: rgb(248, 213, 219);
            --grisOscuro: #3c3c3c;
        }

        main {
            background-color: var(--rosaClaro);
            padding: 20px;
            border-radius: 10px;
        }

        section {
            background-color: var(--rosaOscuro);
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }

        .barraSuperior {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }

        h1 {
            color: var(--amarilloColor);
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }

        .barraSuperior input,
        .barraSuperior input[type="date"] {
            margin-right: 10px;
            background-color: var(--rosaClaro);
            padding: 8px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }

        .barraSuperior input[type="date"] {
            flex: none;
        }

        button {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            padding: 8px 15px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-family: "Comic Sans MS", cursive;
            font-weight: bold;
            font-size: 16px;
            margin-right: 10px;
        }

        .ordenarSelect {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            border: none;
            border-radius: 5px;
            padding: 8px 15px;
            font-family: "Comic Sans MS", cursive;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
        }

        .lineaSeparacion {
            border-top: 2px solid var(--amarilloColor);
            margin: 10px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th,
        td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid var(--rosaClaro);
            cursor: pointer;
        }

        th {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            font-size: 16px;
        }

        tbody tr:nth-child(even) {
            background-color: var(--rosaClaro);
        }

        tbody tr:hover {
            background-color: var(--amarilloColor);
        }

        i {
            font-size: 24px;
            margin-left: auto;
            color: var(--verdeOscuroColor);
        }

        .botonesAccion {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
    </style>

        <section class="opcionMenuSelecionada">
            <div class="barraSuperior">
                <h1>Clientes</h1>
                <input type="text" id="inputBuscar" placeholder="Buscar" oninput="buscarClientes()">

                <input type="date" id="fechaInicio" onchange="validarFechas()">
                <input type="date" id="fechaFin" onchange="validarFechas()">

                <button onclick="filtrarPorFecha()">Filtrar</button>

                <select id="opcionesOrdenar" class="ordenarSelect" onchange="ordenarYFiltrarClientes()">
                    <option value="" disabled selected>Ordenar</option>
                    <option value="nombreAZ">Nombre A-Z</option>
                    <option value="nombreZA">Nombre Z-A</option>
                    <option value="fechaMenorMayor">Fecha de menor a mayor</option>
                    <option value="fechaMayorMenor">Fecha de mayor a menor</option>
                </select>
            </div>

            <div class="lineaSeparacion"></div>

            <div class="tabla">
                <table>
                    <thead>
                        <tr>
                            <th onclick="cambiarCriterioBusqueda('ID')">ID</th>
                            <th onclick="cambiarCriterioBusqueda('Nombre')">Nombre</th>
                            <th onclick="cambiarCriterioBusqueda('Email')">Email</th>
                            <th onclick="cambiarCriterioBusqueda('Teléfono')">Teléfono</th>
                            <th onclick="cambiarCriterioBusqueda('Última Interacción')">Última Interacción</th>
                        </tr>
                    </thead>
                    <tbody id="tablaClientes">
                        <!-- Aquí se generarán las filas con JS -->
                    </tbody>
                </table>
            </div>

            <div class="lineaSeparacion"></div>

            <div class="botonesAccion">
                <button onclick="agregarUsuario()">Agregar</button>
                <button onclick="modificarUsuario()">Modificar</button>
                <button onclick="eliminarUsuario()">Eliminar</button>
            </div>
        </section>
    `,
    'Reservas': `
        <style>
        :root {
            --verdeColor: #5fa510;
            --verdeOscuroColor: #315012;
            --rosaColor: #dc1659;
            --rosaOscuro: #a11245;
            --amarilloColor: #e1bc00;
            --amarilloOscuro: #d29500;
            --rosaClaro: rgb(248, 213, 219);
            --grisOscuro: #3c3c3c;
        }

        main {
            background-color: var(--rosaClaro);
            padding: 20px;
            border-radius: 10px;
        }

        section {
            background-color: var(--rosaOscuro);
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }

        .barraSuperior {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }

        h1 {
            color: var(--amarilloColor);
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }

        .barraSuperior input,
        .barraSuperior input[type="date"] {
            margin-right: 10px;
            background-color: var(--rosaClaro);
            padding: 8px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }

        .barraSuperior input[type="date"] {
            flex: none;
        }

        button {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            padding: 8px 15px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-family: "Comic Sans MS", cursive;
            font-weight: bold;
            font-size: 16px;
            margin-right: 10px;
        }

        .ordenarSelect {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            border: none;
            border-radius: 5px;
            padding: 8px 15px;
            font-family: "Comic Sans MS", cursive;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
        }

        .lineaSeparacion {
            border-top: 2px solid var(--amarilloColor);
            margin: 10px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th,
        td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid var(--rosaClaro);
            cursor: pointer;
        }

        th {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            font-size: 16px;
        }

        tbody tr:nth-child(even) {
            background-color: var(--rosaClaro);
        }

        tbody tr:hover {
            background-color: var(--amarilloColor);
        }

        i {
            font-size: 24px;
            margin-left: auto;
            color: var(--verdeOscuroColor);
        }

        .botonesAccion {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
    </style>

        <section class="opcionMenuSelecionada">
            <div class="barraSuperior">
                <h1>Reservas</h1>
                <input type="text" id="inputBuscar" placeholder="Buscar" oninput="buscarClientes()">

                <input type="date" id="fechaInicio" onchange="validarFechas()">
                <input type="date" id="fechaFin" onchange="validarFechas()">

                <button onclick="filtrarPorFecha()">Filtrar</button>

                <select id="opcionesOrdenar" class="ordenarSelect" onchange="ordenarYFiltrarClientes()">
                    <option value="" disabled selected>Ordenar</option>
                    <option value="nombreAZ">Nombre A-Z</option>
                    <option value="nombreZA">Nombre Z-A</option>
                    <option value="fechaMenorMayor">Fecha de menor a mayor</option>
                    <option value="fechaMayorMenor">Fecha de mayor a menor</option>
                </select>
            </div>

            <div class="lineaSeparacion"></div>

            <div class="tabla">
                <table>
                    <thead>
                        <tr>
                            <th onclick="cambiarCriterioBusqueda('ID')">ID</th>
                            <th onclick="cambiarCriterioBusqueda('usuarioCliente')">usuarioCliente</th>
                            <th onclick="cambiarCriterioBusqueda('servicio')">servicio</th>
                            <th onclick="cambiarCriterioBusqueda('hora')">hora</th>
                            <th onclick="cambiarCriterioBusqueda('descripcion')">descripcion</th>
                        </tr>
                    </thead>
                    <tbody id="tablaClientes">
                        <!-- Aquí se generarán las filas con JS -->
                    </tbody>
                </table>
            </div>

            <div class="lineaSeparacion"></div>

            <div class="botonesAccion">
                <button onclick="agregarUsuario()">Agregar</button>
                <button onclick="modificarUsuario()">Modificar</button>
                <button onclick="eliminarUsuario()">Eliminar</button>
            </div>
        </section>
    `,
    'Informes de Pagos': `
            <style>
        :root {
            --verdeColor: #5fa510;
            --verdeOscuroColor: #315012;
            --rosaColor: #dc1659;
            --rosaOscuro: #a11245;
            --amarilloColor: #e1bc00;
            --amarilloOscuro: #d29500;
            --rosaClaro: rgb(248, 213, 219);
            --grisOscuro: #3c3c3c;
        }

        main {
            background-color: var(--rosaClaro);
            padding: 20px;
            border-radius: 10px;
        }

        section {
            background-color: var(--rosaOscuro);
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }

        .barraSuperior {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }

        h1 {
            color: var(--amarilloColor);
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }

        .barraSuperior input,
        .barraSuperior input[type="date"] {
            margin-right: 10px;
            background-color: var(--rosaClaro);
            padding: 8px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }

        .barraSuperior input[type="date"] {
            flex: none;
        }

        button {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            padding: 8px 15px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-family: "Comic Sans MS", cursive;
            font-weight: bold;
            font-size: 16px;
            margin-right: 10px;
        }

        .ordenarSelect {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            border: none;
            border-radius: 5px;
            padding: 8px 15px;
            font-family: "Comic Sans MS", cursive;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
        }

        .lineaSeparacion {
            border-top: 2px solid var(--amarilloColor);
            margin: 10px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th,
        td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid var(--rosaClaro);
            cursor: pointer;
        }

        th {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            font-size: 16px;
        }

        tbody tr:nth-child(even) {
            background-color: var(--rosaClaro);
        }

        tbody tr:hover {
            background-color: var(--amarilloColor);
        }

        i {
            font-size: 24px;
            margin-left: auto;
            color: var(--verdeOscuroColor);
        }

        .botonesAccion {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
    </style>

        <section class="opcionMenuSelecionada">
            <div class="barraSuperior">
                <h1>Pagos</h1>
                <input type="text" id="inputBuscar" placeholder="Buscar" oninput="buscarClientes()">

                <input type="date" id="fechaInicio" onchange="validarFechas()">
                <input type="date" id="fechaFin" onchange="validarFechas()">

                <button onclick="filtrarPorFecha()">Filtrar</button>

                <select id="opcionesOrdenar" class="ordenarSelect" onchange="ordenarYFiltrarClientes()">
                    <option value="" disabled selected>Ordenar</option>
                    <option value="nombreAZ">Nombre A-Z</option>
                    <option value="nombreZA">Nombre Z-A</option>
                    <option value="fechaMenorMayor">Fecha de menor a mayor</option>
                    <option value="fechaMayorMenor">Fecha de mayor a menor</option>
                </select>
            </div>

            <div class="lineaSeparacion"></div>

            <div class="tabla">
                <table>
                    <thead>
                        <tr>
                            <th onclick="cambiarCriterioBusqueda('ID')">ID</th>
                            <th onclick="cambiarCriterioBusqueda('Nombre')">Nombre</th>
                            <th onclick="cambiarCriterioBusqueda('Email')">Email</th>
                            <th onclick="cambiarCriterioBusqueda('Teléfono')">Teléfono</th>
                            <th onclick="cambiarCriterioBusqueda('Última Interacción')">Última Interacción</th>
                        </tr>
                    </thead>
                    <tbody id="tablaClientes">
                        <!-- Aquí se generarán las filas con JS -->
                    </tbody>
                </table>
            </div>

            <div class="lineaSeparacion"></div>

            <div class="botonesAccion">
                <button onclick="agregarUsuario()">Agregar</button>
                <button onclick="modificarUsuario()">Modificar</button>
                <button onclick="eliminarUsuario()">Eliminar</button>
            </div>
        </section>
    `,
    'Servicios': `
            <style>
        :root {
            --verdeColor: #5fa510;
            --verdeOscuroColor: #315012;
            --rosaColor: #dc1659;
            --rosaOscuro: #a11245;
            --amarilloColor: #e1bc00;
            --amarilloOscuro: #d29500;
            --rosaClaro: rgb(248, 213, 219);
            --grisOscuro: #3c3c3c;
        }

        main {
            background-color: var(--rosaClaro);
            padding: 20px;
            border-radius: 10px;
        }

        section {
            background-color: var(--rosaOscuro);
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }

        .barraSuperior {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }

        h1 {
            color: var(--amarilloColor);
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }

        .barraSuperior input,
        .barraSuperior input[type="date"] {
            margin-right: 10px;
            background-color: var(--rosaClaro);
            padding: 8px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }

        .barraSuperior input[type="date"] {
            flex: none;
        }

        button {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            padding: 8px 15px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-family: "Comic Sans MS", cursive;
            font-weight: bold;
            font-size: 16px;
            margin-right: 10px;
        }

        .ordenarSelect {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            border: none;
            border-radius: 5px;
            padding: 8px 15px;
            font-family: "Comic Sans MS", cursive;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
        }

        .lineaSeparacion {
            border-top: 2px solid var(--amarilloColor);
            margin: 10px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th,
        td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid var(--rosaClaro);
            cursor: pointer;
        }

        th {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            font-size: 16px;
        }

        tbody tr:nth-child(even) {
            background-color: var(--rosaClaro);
        }

        tbody tr:hover {
            background-color: var(--amarilloColor);
        }

        i {
            font-size: 24px;
            margin-left: auto;
            color: var(--verdeOscuroColor);
        }

        .botonesAccion {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
    </style>

        <section class="opcionMenuSelecionada">
            <div class="barraSuperior">
                <h1>Servicios</h1>
                <input type="text" id="inputBuscar" placeholder="Buscar" oninput="buscarClientes()">

                <input type="date" id="fechaInicio" onchange="validarFechas()">
                <input type="date" id="fechaFin" onchange="validarFechas()">

                <button onclick="filtrarPorFecha()">Filtrar</button>

                <select id="opcionesOrdenar" class="ordenarSelect" onchange="ordenarYFiltrarClientes()">
                    <option value="" disabled selected>Ordenar</option>
                    <option value="nombreAZ">Nombre A-Z</option>
                    <option value="nombreZA">Nombre Z-A</option>
                    <option value="fechaMenorMayor">Fecha de menor a mayor</option>
                    <option value="fechaMayorMenor">Fecha de mayor a menor</option>
                </select>
            </div>

            <div class="lineaSeparacion"></div>

            <div class="tabla">
                <table>
                    <thead>
                        <tr>
                            <th onclick="cambiarCriterioBusqueda('ID')">ID</th>
                            <th onclick="cambiarCriterioBusqueda('titulo')">titulo</th>
                            <th onclick="cambiarCriterioBusqueda('Tipo de Servicio')">Tipo de Servicio</th>
                            <th onclick="cambiarCriterioBusqueda('Descripcion')">Descripcion</th>
                            <th onclick="cambiarCriterioBusqueda('rutaImagen')">rutaImagen</th>
                            <th onclick="cambiarCriterioBusqueda('duracion')">duracion</th>
                            <th onclick="cambiarCriterioBusqueda('precio')">precio</th>
                            <th onclick="cambiarCriterioBusqueda('empleado')">empleado</th>
                        </tr>
                    </thead>
                    <tbody id="tablaClientes">
                        <!-- Aquí se generarán las filas con JS -->
                    </tbody>
                </table>
            </div>

            <div class="lineaSeparacion"></div>

            <div class="botonesAccion">
                <button onclick="agregarUsuario()">Agregar</button>
                <button onclick="modificarUsuario()">Modificar</button>
                <button onclick="eliminarUsuario()">Eliminar</button>
            </div>
        </section>
    `,
    'Administrador de Empleados': `
            <style>
        :root {
            --verdeColor: #5fa510;
            --verdeOscuroColor: #315012;
            --rosaColor: #dc1659;
            --rosaOscuro: #a11245;
            --amarilloColor: #e1bc00;
            --amarilloOscuro: #d29500;
            --rosaClaro: rgb(248, 213, 219);
            --grisOscuro: #3c3c3c;
        }

        main {
            background-color: var(--rosaClaro);
            padding: 20px;
            border-radius: 10px;
        }

        section {
            background-color: var(--rosaOscuro);
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }

        .barraSuperior {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }

        h1 {
            color: var(--amarilloColor);
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }

        .barraSuperior input,
        .barraSuperior input[type="date"] {
            margin-right: 10px;
            background-color: var(--rosaClaro);
            padding: 8px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }

        .barraSuperior input[type="date"] {
            flex: none;
        }

        button {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            padding: 8px 15px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-family: "Comic Sans MS", cursive;
            font-weight: bold;
            font-size: 16px;
            margin-right: 10px;
        }

        .ordenarSelect {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            border: none;
            border-radius: 5px;
            padding: 8px 15px;
            font-family: "Comic Sans MS", cursive;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
        }

        .lineaSeparacion {
            border-top: 2px solid var(--amarilloColor);
            margin: 10px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th,
        td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid var(--rosaClaro);
            cursor: pointer;
        }

        th {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            font-size: 16px;
        }

        tbody tr:nth-child(even) {
            background-color: var(--rosaClaro);
        }

        tbody tr:hover {
            background-color: var(--amarilloColor);
        }

        i {
            font-size: 24px;
            margin-left: auto;
            color: var(--verdeOscuroColor);
        }

        .botonesAccion {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
    </style>

        <section class="opcionMenuSelecionada">
            <div class="barraSuperior">
                <h1>Empleados</h1>
                <input type="text" id="inputBuscar" placeholder="Buscar" oninput="buscarClientes()">

                <input type="date" id="fechaInicio" onchange="validarFechas()">
                <input type="date" id="fechaFin" onchange="validarFechas()">

                <button onclick="filtrarPorFecha()">Filtrar</button>

                <select id="opcionesOrdenar" class="ordenarSelect" onchange="ordenarYFiltrarClientes()">
                    <option value="" disabled selected>Ordenar</option>
                    <option value="nombreAZ">Nombre A-Z</option>
                    <option value="nombreZA">Nombre Z-A</option>
                    <option value="fechaMenorMayor">Fecha de menor a mayor</option>
                    <option value="fechaMayorMenor">Fecha de mayor a menor</option>
                </select>
            </div>

            <div class="lineaSeparacion"></div>

            <div class="tabla">
                <table>
                    <thead>
                        <tr>
                            <th onclick="cambiarCriterioBusqueda('ID')">ID</th>
                            <th onclick="cambiarCriterioBusqueda('Nombre')">Nombre</th>
                            <th onclick="cambiarCriterioBusqueda('Email')">Email</th>
                            <th onclick="cambiarCriterioBusqueda('Teléfono')">Teléfono</th>
                            <th onclick="cambiarCriterioBusqueda('Contraseña')">Contraseña</th>
                        </tr>
                    </thead>
                    <tbody id="tablaClientes">
                        <!-- Aquí se generarán las filas con JS -->
                    </tbody>
                </table>
            </div>

            <div class="lineaSeparacion"></div>

            <div class="botonesAccion">
                <button onclick="agregarUsuario()">Agregar</button>
                <button onclick="modificarUsuario()">Modificar</button>
                <button onclick="eliminarUsuario()">Eliminar</button>
            </div>
        </section>
    `,
    'Noticias': `
            <style>
        :root {
            --verdeColor: #5fa510;
            --verdeOscuroColor: #315012;
            --rosaColor: #dc1659;
            --rosaOscuro: #a11245;
            --amarilloColor: #e1bc00;
            --amarilloOscuro: #d29500;
            --rosaClaro: rgb(248, 213, 219);
            --grisOscuro: #3c3c3c;
        }

        main {
            background-color: var(--rosaClaro);
            padding: 20px;
            border-radius: 10px;
        }

        section {
            background-color: var(--rosaOscuro);
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
        }

        .barraSuperior {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }

        h1 {
            color: var(--amarilloColor);
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }

        .barraSuperior input,
        .barraSuperior input[type="date"] {
            margin-right: 10px;
            background-color: var(--rosaClaro);
            padding: 8px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }

        .barraSuperior input[type="date"] {
            flex: none;
        }

        button {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            padding: 8px 15px;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-family: "Comic Sans MS", cursive;
            font-weight: bold;
            font-size: 16px;
            margin-right: 10px;
        }

        .ordenarSelect {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            border: none;
            border-radius: 5px;
            padding: 8px 15px;
            font-family: "Comic Sans MS", cursive;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
        }

        .lineaSeparacion {
            border-top: 2px solid var(--amarilloColor);
            margin: 10px 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th,
        td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid var(--rosaClaro);
            cursor: pointer;
        }

        th {
            background-color: var(--verdeOscuroColor);
            color: var(--verdeColor);
            font-size: 16px;
        }

        tbody tr:nth-child(even) {
            background-color: var(--rosaClaro);
        }

        tbody tr:hover {
            background-color: var(--amarilloColor);
        }

        i {
            font-size: 24px;
            margin-left: auto;
            color: var(--verdeOscuroColor);
        }

        .botonesAccion {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
    </style>

        <section class="opcionMenuSelecionada">
            <div class="barraSuperior">
                <h1>Noticias</h1>
                <input type="text" id="inputBuscar" placeholder="Buscar" oninput="buscarClientes()">

                <input type="date" id="fechaInicio" onchange="validarFechas()">
                <input type="date" id="fechaFin" onchange="validarFechas()">

                <button onclick="filtrarPorFecha()">Filtrar</button>

                <select id="opcionesOrdenar" class="ordenarSelect" onchange="ordenarYFiltrarClientes()">
                    <option value="" disabled selected>Ordenar</option>
                    <option value="nombreAZ">Nombre A-Z</option>
                    <option value="nombreZA">Nombre Z-A</option>
                    <option value="fechaMenorMayor">Fecha de menor a mayor</option>
                    <option value="fechaMayorMenor">Fecha de mayor a menor</option>
                </select>
            </div>

            <div class="lineaSeparacion"></div>

            <div class="tabla">
                <table>
                    <thead>
                        <tr>
                            <th onclick="cambiarCriterioBusqueda('ID')">ID</th>
                            <th onclick="cambiarCriterioBusqueda('Titulo')">Titulo</th>
                            <th onclick="cambiarCriterioBusqueda('Tipo')">Tipo</th>
                            <th onclick="cambiarCriterioBusqueda('rutaImagen')">rutaImagen</th>
                            <th onclick="cambiarCriterioBusqueda('rutaPDF')">rutaPDF</th>
                            <th onclick="cambiarCriterioBusqueda('Fecha')">Fecha</th>
                        </tr>
                    </thead>
                    <tbody id="tablaClientes">
                        <!-- Aquí se generarán las filas con JS -->
                    </tbody>
                </table>
            </div>

            <div class="lineaSeparacion"></div>

            <div class="botonesAccion">
                <button onclick="agregarUsuario()">Agregar</button>
                <button onclick="modificarUsuario()">Modificar</button>
                <button onclick="eliminarUsuario()">Eliminar</button>
            </div>
        </section>
    `
};

// Añadir el evento 'click' a cada enlace de la barra lateral
links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Evitar el comportamiento predeterminado de los enlaces
        const opcionSeleccionada = this.textContent.trim(); // Obtener el texto del enlace
        if (secciones[opcionSeleccionada]) {
            mainDiv.innerHTML = `<main>${secciones[opcionSeleccionada]}</main>`;

            if (opcionSeleccionada === 'Clientes') {
                cargarFiltros(); // Cargar los filtros si es la sección de clientes
            }
        }
    });
});

//peijdaso
////
//
///

const usuarios = [
    { id: 1222, nombre: 'Juan Perez Josue', email: 'JuanPers45@gmail.com', telefono: '3624995432', ultimaInteraccion: '2024/10/22' },
    { id: 1245, nombre: 'Maria Garcia Lopez', email: 'MariaGL12@hotmail.com', telefono: '3624886790', ultimaInteraccion: '2024/09/15' },
    { id: 1287, nombre: 'Carlos Ramirez Diaz', email: 'CarlosRD33@yahoo.com', telefono: '3624123456', ultimaInteraccion: '2024/08/10' },
    { id: 1350, nombre: 'Lucia Fernandez Ruiz', email: 'LuciaFR22@gmail.com', telefono: '3624667890', ultimaInteraccion: '2024/07/05' },
    { id: 1400, nombre: 'Pablo Mendoza Gomez', email: 'PabloMG44@gmail.com', telefono: '3624554321', ultimaInteraccion: '2024/06/30' }
];

let criterioBusqueda = 'Nombre';


function cambiarCriterioBusqueda(nuevoCriterio) {
    criterioBusqueda = nuevoCriterio;
    document.getElementById('inputBuscar').placeholder = `Buscar por ${nuevoCriterio}`;
}
// Variables globales para almacenar los filtros
let filtroFechaInicio = '';
let filtroFechaFin = '';
let filtroOrden = '';

// Función para guardar filtros en el localStorage
function guardarFiltros() {
    localStorage.setItem('filtroFechaInicio', filtroFechaInicio);
    localStorage.setItem('filtroFechaFin', filtroFechaFin);
    localStorage.setItem('filtroOrden', filtroOrden);
}

// Función para cargar los filtros del localStorage
function cargarFiltros() {
    filtroFechaInicio = localStorage.getItem('filtroFechaInicio') || '';
    filtroFechaFin = localStorage.getItem('filtroFechaFin') || '';
    filtroOrden = localStorage.getItem('filtroOrden') || '';
    
    // Asignar los filtros a los inputs
    document.getElementById('fechaInicio').value = filtroFechaInicio;
    document.getElementById('fechaFin').value = filtroFechaFin;
    document.getElementById('opcionesOrdenar').value = filtroOrden;
    
    // Aplicar los filtros
    ordenarYFiltrarClientes();
}

function validarFechas() {
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;

    if (fechaInicio) {
        document.getElementById('fechaFin').min = fechaInicio; // Fecha mínima para 'fechaFin'
    }

    if (fechaFin) {
        document.getElementById('fechaInicio').max = fechaFin; // Fecha máxima para 'fechaInicio'
    }
}

function filtrarPorFecha() {
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;

    if (!fechaInicio || !fechaFin) {
        alert("Por favor selecciona ambas fechas.");
        return;
    }

    // Guardar los filtros seleccionados
    filtroFechaInicio = fechaInicio;
    filtroFechaFin = fechaFin;
    guardarFiltros();

    const filtrados = usuarios.filter(usuario => {
        return usuario.ultimaInteraccion >= fechaInicio && usuario.ultimaInteraccion <= fechaFin;
    });
    cargarUsuarios(filtrados);
}

function ordenarYFiltrarClientes() {
    const criterio = document.getElementById('opcionesOrdenar').value;

    // Guardar el filtro de orden seleccionado
    filtroOrden = criterio;
    guardarFiltros();

    let usuariosOrdenados = [...usuarios];
    switch (criterio) {
        case 'nombreAZ':
            usuariosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'nombreZA':
            usuariosOrdenados.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        case 'fechaMenorMayor':
            usuariosOrdenados.sort((a, b) => new Date(a.ultimaInteraccion) - new Date(b.ultimaInteraccion));
            break;
        case 'fechaMayorMenor':
            usuariosOrdenados.sort((a, b) => new Date(b.ultimaInteraccion) - new Date(a.ultimaInteraccion));
            break;
        default:
            break;
    }
    cargarUsuarios(usuariosOrdenados);
}




function cargarUsuarios(filtrados = usuarios) {
    const tablaClientes = document.getElementById('tablaClientes');
    tablaClientes.innerHTML = '';

    filtrados.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.ultimaInteraccion}</td>
        `;
        tablaClientes.appendChild(fila);
    });
}

function buscarClientes() {
    const texto = document.getElementById('inputBuscar').value.toLowerCase();
    const filtrados = usuarios.filter(usuario => {
        switch (criterioBusqueda) {
            case 'ID':
                return usuario.id.toString().startsWith(texto);
            case 'Nombre':
                return usuario.nombre.toLowerCase().includes(texto);
            case 'Email':
                return usuario.email.toLowerCase().includes(texto);
            case 'Teléfono':
                return usuario.telefono.includes(texto);
            case 'Última Interacción':
                return usuario.ultimaInteraccion.includes(texto);
            default:
                return false;
        }
    });
    cargarUsuarios(filtrados);
}

function agregarUsuario() {
    const nuevoUsuario = {
        id: prompt("Ingrese el ID del nuevo usuario:"),
        nombre: prompt("Ingrese el nombre del nuevo usuario:"),
        email: prompt("Ingrese el email del nuevo usuario:"),
        telefono: prompt("Ingrese el teléfono del nuevo usuario:"),
        ultimaInteraccion: prompt("Ingrese la última interacción (YYYY/MM/DD):")
    };

    if (nuevoUsuario.id && nuevoUsuario.nombre && nuevoUsuario.email && nuevoUsuario.telefono && nuevoUsuario.ultimaInteraccion) {
        usuarios.push(nuevoUsuario);
        cargarUsuarios();
    } else {
        alert("Por favor, complete todos los campos.");
    }
}

function modificarUsuario() {
    const id = prompt("Ingrese el ID del usuario que desea modificar:");
    const usuario = usuarios.find(u => u.id.toString() === id);

    if (usuario) {
        usuario.nombre = prompt("Ingrese el nuevo nombre:", usuario.nombre);
        usuario.email = prompt("Ingrese el nuevo email:", usuario.email);
        usuario.telefono = prompt("Ingrese el nuevo teléfono:", usuario.telefono);
        usuario.ultimaInteraccion = prompt("Ingrese la nueva última interacción (YYYY/MM/DD):", usuario.ultimaInteraccion);

        cargarUsuarios();
    } else {
        alert("Usuario no encontrado.");
    }
}

function eliminarUsuario() {
    const id = prompt("Ingrese el ID del usuario que desea eliminar:");
    const indice = usuarios.findIndex(u => u.id.toString() === id);

    if (indice !== -1) {
        usuarios.splice(indice, 1);
        cargarUsuarios();
    } else {
        alert("Usuario no encontrado.");
    }
}

// Cargar la tabla inicialmente
cargarUsuarios();