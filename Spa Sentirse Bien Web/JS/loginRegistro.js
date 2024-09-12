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