let botonIngreso = document.getElementById('mostrar_ingreso');
let botonRegistro = document.getElementById('mostrar_registro');
let sectionIngreso = document.getElementById('ingreso_section');
let sectionRegistro = document.getElementById('registro_section');
let volverBoton = document.getElementById('volver_boton');

sectionIngreso.style.display = 'none';
sectionRegistro.style.display = 'none';


//EVENTOS DE CLICK
botonIngreso.addEventListener('click', function(){
    sectionIngreso.style.display = 'block';
    botonIngreso.style.display ='none';
    botonRegistro.style.display = 'block';
    sectionRegistro.style.display = 'none';
    volverBoton.style.display = 'block';
})
botonRegistro.addEventListener('click', function(){
    sectionIngreso.style.display = 'none';
    botonRegistro.style.display = 'none';
    botonIngreso.style.display ='block';
    sectionRegistro.style.display = 'block';
    volverBoton.style.display = 'block';

})
volverBoton.addEventListener('click', function(){
    window.location.href= "../main.html"
})