document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
})

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}
function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {
        if ( sobreFestival.getBoundingClientRect().bottom < 0 ) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll')
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}
function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth"});
            
        });
    });
}
function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes')

    for(let i = 1; i <= 12; i++ ) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="img/thumb/${i}.avif" type="image/avif">
        <source srcset="img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="img/thumb/${i}.jpg" alt="Imagen de Galeria">
        `;
        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
        
    }
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="img/grande/${id}.avif" type="image/avif">
    <source srcset="img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="img/grande/${id}.jpg" alt="Imagen de Galeria">
    `;

// crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

// boton para cerrar el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X'
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

// agregar al html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}