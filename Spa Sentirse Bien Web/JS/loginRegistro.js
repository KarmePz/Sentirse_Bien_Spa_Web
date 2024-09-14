var botonIngreso = document.getElementById('mostrar_ingreso');
var botonRegistro = document.getElementById('mostrar_registro');
var sectionIngreso = document.getElementById('ingreso_section');
var sectionRegistro = document.getElementById('registro_section');
var volverBoton = document.getElementById('volver_boton');
var  windowmain = window.open('/index.html.html');
activarAcceder();
sectionRegistro.style.display = 'none';


//EVENTOS DE CLICK
botonIngreso.addEventListener('click', function(){
    activarAcceder();
})
botonRegistro.addEventListener('click', function(){
    activarRegistrarse();
})
volverBoton.addEventListener('click', function(){
    window.location.href= "/index.html";
})


function activarAcceder(){
    sectionIngreso.style.display = 'block';
    botonIngreso.style.display ='none';
    botonRegistro.style.display = 'block';
    sectionRegistro.style.display = 'none';
    volverBoton.style.display = 'block';
}
function activarRegistrarse(){
    sectionIngreso.style.display = 'none';
    botonIngreso.style.display ='block';
    botonRegistro.style.display = 'none';
    sectionRegistro.style.display = 'block';
    volverBoton.style.display = 'block';
}





//Se evita el envio predeterminado de envio:
document.querySelector('.form_container_ingreso').addEventListener('submit',async function(event){
    event.preventDefault();

    
var nombreEmail = document.querySelector('#nombreEmail').value;
var contrasenia = document.querySelector('#contrasena').value;

//Datos del formulario
const datosUsuario = {
    username: nombreEmail,
    password: contrasenia
};

//Petición de ApI

    try{
        //Petición POST
        const response = await fetch('https://localhost:7034/api/Account/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosUsuario)
        });

        //Procesamiento de la respuesta API
        const resultado = await response.json();
        if (response.status === 405) {
            // Manejar error 401: No autorizado
            console.error("Error 405");
            alert("Error:Por favor, intenta de nuevo.");
         }
        else if(response.ok){
            //Si hay login, se redirige y se muestra un mensaje por consola
            console.log("Login Exitoso: ", resultado);
            //Redirigir
            window.location.href= "https://www.google.com";
            //TODO
        }else{
            console.error("Error en el login", resultado.message);
            alert("Error en el login: " + resultado.message);
        }

    }catch(error){
        console.error("Hubo un problema al realizar la petición: ", error);
        alert("Error en la conexión con la API");
    }

});