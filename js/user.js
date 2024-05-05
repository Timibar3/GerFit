// Traigo el nombre del localStorage. 
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

// funcionalidad a a cerrar sesion de usuatio
const botonCerrarSesion = document.getElementById('cerrar-sesion')

botonCerrarSesion.addEventListener('click', (e) => {
    e.preventDefault;
    localStorage.removeItem('nombre')
    localStorage.removeItem('icono')
    ubicacionNombre.innerHTML = ""
})

// funcionalidad elegir icono
const formularioIcono = document.querySelector('#formulario-icono')
const radioIconos = document.getElementsByName('icono')

function seleccionarIcono () {
    formularioIcono.addEventListener('submit', (e) => {
        e.preventDefault;
        console.log(radioIconos.forEach(icono => {
            if(icono.checked){
                console.log('lo logre!')
                localStorage.setItem('icono', icono.value)
            }
        }))
    })
}
seleccionarIcono()