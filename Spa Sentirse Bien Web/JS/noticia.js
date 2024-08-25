const carrusel = document.querySelector('.carrusel');
const noticiaOps = Array.from(document.querySelectorAll('.noticia_op'));
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let index = 0;
const noticiasVisibles = 3;

function mostrarNoticias() {
    carrusel.innerHTML = '';
    for (let i = 0; i < noticiasVisibles; i++) {
        const noticiaIndex = (index + i) % noticiaOps.length;
        carrusel.appendChild(noticiaOps[noticiaIndex]);
    }
}

prevButton.addEventListener('click', () => {
    index = (index - 1 + noticiaOps.length) % noticiaOps.length;
    mostrarNoticias();
});

nextButton.addEventListener('click', () => {
    index = (index + 1) % noticiaOps.length;
    mostrarNoticias();
});

mostrarNoticias();
