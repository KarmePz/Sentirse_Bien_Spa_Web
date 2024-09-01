//pestaña main
var botonAcceder = document.getElementById('boton_acceder');
var  windowLogin = window.open('./signIn.html');

botonAcceder.addEventListener('click', function(){
    window.location.href="./signIn.html";
    
})



