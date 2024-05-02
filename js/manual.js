// Traigo el nombre del localStorage
const ubicacionNombre = document.getElementById('ubicacionSaludo')

if(localStorage.getItem('nombre') != null) {
    switch(localStorage.getItem('icono')){
        case 'dumbbell':
            ubicacionNombre.innerHTML = `
                <a href="./user.html">${localStorage.getItem('nombre') } </a>
                <i class="fa-solid fa-dumbbell"></i>`;
            break;
        case 'fighter':
            ubicacionNombre.innerHTML = `
                <a href="./user.html">${localStorage.getItem('nombre') } </a>
                <i class="fa-solid fa-jet-fighter-up"></i>`;
            break;
        case 'dragon':
            console.log('Drangonnn')
            ubicacionNombre.innerHTML = `
                <a href="./user.html">${localStorage.getItem('nombre') } </a>
                <i class="fa-solid fa-dragon"></i>`;
            break;
        case 'person':
            ubicacionNombre.innerHTML = `
                <a href="./user.html">${localStorage.getItem('nombre') } </a>
                <i class="fa-solid fa-person"></i>`;
            break;
        case 'rocket':
            ubicacionNombre.innerHTML = `
                <a href="./user.html">${localStorage.getItem('nombre') } </a>
                <i class="fa-solid fa-rocket"></i>`;
            break;
        default:
            ubicacionNombre.innerHTML = `
                <a href="./user.html">${localStorage.getItem('nombre') } </a>
                <i class="fa-solid fa-dumbbell"></i>`;
            break;
    }
}

// Selecciono el div donde voy a crear las cards de cada ejercicio.
const contenedorTarjetas = document.querySelector('div.card-container');

// genero una funcion con un fetch que trae los ejercicios de json y los muestran en el html.
function mostrarEjercicios (e) {
    e.preventDefault
    contenedorTarjetas.innerHTML = ''
    fetch('./datos.json')
    .then(response => response.json())
    .then(data => {
        const dataFiltrada = data.filter(el => el.tipo == e.target.id)
        dataFiltrada.forEach(ejercicio => {
            contenedorTarjetas.innerHTML += `
            <div class="card-ejercicio">
            <img id="imagen-ejercicio" src="${ejercicio.img}">
            <h5>${ejercicio.nombre}</h5>
            <button type="submit" class="agregar-ejercicio">agregar</button>
            </div>`
        })
        agregarACarrito()
    })
    .catch(err => {
        console.error('Hubo un error' + err)
    })
}

// Selecciono los botones para filtrar los ejercicios por tipo.
const botonesTipo = document.querySelectorAll('div.tipo-button')

// Creo el evento y se lo aplico en los botones para filtrar por tipo.
const eventoBotonesTipo = Array.from(botonesTipo)
eventoBotonesTipo.forEach((boton) => {
    boton.addEventListener('click', mostrarEjercicios)
})

// Selecciono el div.carrito para agregar los ejercicios elegido.
const divCarrito = document.querySelector('div.carrito')

// Creo la funcion para agregar los ejercicios al carrito
function agregarACarrito () {
    //Selecciono boton agregar de la card de cada ejercicio.
    const botonesAgregar = document.querySelectorAll('button.agregar-ejercicio');
    const arrayBotonesAgregar = Array.from(botonesAgregar);
    arrayBotonesAgregar.map(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault
            divCarrito.innerHTML += `
            <div class="card-ejercicio-carrito" id="${e.target.parentElement.children[1].innerText}">
                <h5 class="titulo-ejercicio-carrito">${e.target.parentElement.children[1].innerText}</h5>
                <div class="borrar-ejercicio">X</div>
            </div>`
            borrarRutina()
            confirmarRutina()
            cancelarRutina()
        })
    })
}

// Creo la funcion para que la X borre los ejercicios del carrito.

function borrarRutina () {
    const botonesBorrarEjercicio = document.querySelectorAll('div.borrar-ejercicio')
    const arrayBotonesBorrarEjercicio = Array.from(botonesBorrarEjercicio);
    arrayBotonesBorrarEjercicio.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault;
            document.getElementById(e.target.parentElement.id).remove()
        })
    })
}

// Genero la funcionalidad para el boton confirmar rutina.
function confirmarRutina () {
    const botonConfirmarRutina = document.querySelector('#boton-confirmar')

    botonConfirmarRutina.addEventListener('click', (e) => {
        e.preventDefault;
        let confirmador = document.querySelectorAll('.card-ejercicio-carrito')
        if (confirmador.length != 0) {
            confirmador.forEach(ejercicio => {
                ejercicio.remove()
            })
        Swal.fire({
            title: "Rutina guardada exitosamente!!",
            icon: "success"
        });
        }
    })
}

// Genero la funcionalidad para el boton cancelar rutina.
function cancelarRutina () {
    const botonCancelarRutina = document.querySelector('#boton-cancelar')

    botonCancelarRutina.addEventListener('click', (e) => {
        e.preventDefault;
        Swal.fire({
            title: "Desea cancelar la rutina?",
            showDenyButton: true,
            confirmButtonText: "Si",
            denyButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                const borrador = document.querySelectorAll('.card-ejercicio-carrito')
                borrador.forEach(ejercicio => {
                    ejercicio.remove()
                })
            }
        });
    })
}
