//pestaña main


// Código para el botón que abre la pestaña de login
const botonAcceder = document.getElementById('boton_acceder');
botonAcceder.addEventListener('click', function() {
    window.location.href = "./signIn.html"; // Redirigir a la página de login
});



// Verificar si el usuario ya está logueado
document.addEventListener('DOMContentLoaded', function() {
    const userName = sessionStorage.getItem('username');
    const email = sessionStorage.getItem('email');
    // Supongamos que el nombre del usuario logueado se guarda en localStorage
    const botonesHeader = document.getElementById('botones_header');


    
    // Si el usuario está logueado, mostrar su nombre o redirigir a la página de inicio
    if (userName && email) {
        botonAcceder.style.display = 'none';//se oculta boton acceder

            // Crear un elemento de saludo
        const saludoUsuario = document.createElement('span');
        saludoUsuario.textContent = `Hola, ${userName}`;

                // Crear un botón de 'Cerrar sesión'
        const botonLogout = document.createElement('button');
        botonLogout.textContent = 'Cerrar sesión';
        botonLogout.classList.add('boton_logout'); // Puedes agregar estilos adicionales


        //FUNCION DE CLICK BOTON LOGOUT
        botonLogout.addEventListener('click', async function() {
            // Eliminar el nombre del usuario de localStorage y session storage
            localStorage.clear();
            sessionStorage.clear();


            // Redireccionar a la página de inicio
            window.location.reload(); // O redirige a una página específica
        });

        // Muestra la sección de usuario logueado
        loggedInUserSection.style.display = "block";
        guestUserSection.style.display = "none"; // Oculta la sección de nombre, apellido y email
        // Rellena el nombre de usuario y email
        usernameDisplay.textContent = userName;
        emailDisplay.textContent = email;

 
            // Añadir el saludo y el botón de logout al header
        botonesHeader.appendChild(saludoUsuario);
        botonesHeader.appendChild(botonLogout);

        console.log(`Usuario logueado: ${userName}`);
        // Aquí puedes redirigir a otra página si ya está logueado
        // window.location.href = './index.html'; // Redirigir a la página de inicio

        //Actualizar 




    } else {
        console.log("No hay usuario logueado. Redirigiendo al login...");
        botonAcceder.style.display = 'block'; // Asegura que el botón de 'Acceder' esté visible si no hay usuario logueado
        
    }
});




