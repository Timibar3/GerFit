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

// En esta variable estan los disintos tipo de ejercicios.
let tiposEjercicios = ['ECTS', 'ECTI', 'EPTS', 'EPTI', 'EF', 'S']

// agrego los tipos de ejercicios en el select del formulario del administrador. 
const selectTipos = document.querySelector('select#tiposEjercicios')

tiposEjercicios.forEach(ejercicios => {
    let tipos = document.createElement('option')
    tipos.innerText = ejercicios
    selectTipos.appendChild(tipos)
})

// uso el formulario de la pagina administrador para crear un nuevo ejercicio.
const formulario = document.querySelector('form#crearEjercicio')
let datoNombreEjercicio = document.querySelector('input#nombreEjercicio')

function agregarEjercicio (e) {
    e.preventDefault()
    let ejercicio = new Ejercicio (datoNombreEjercicio.value, selectTipos.value)
    let resultadoBusqueda = ejercicios.find(el => el.nombre == datoNombreEjercicio.value.toLowerCase())
    if(resultadoBusqueda == undefined && datoNombreEjercicio.value != ''){
        ejercicios.push(ejercicio)
        alert('Ejercicios agregado correctamente')
    }else if (resultadoBusqueda != undefined) {
        alert('El ejercicio ya existe')
    }else if (datoNombreEjercicio.value == ''){
        alert('El nombre del ejercicio no puede quedar vacio')
    }
    datoNombreEjercicio.value = ''
}

formulario.addEventListener('submit', agregarEjercicio)

// ejercicios es la variable donde van a quedar guardados todos los ejercicios
const ejercicios = []

// Busco los ejercicios de datos.json
fetch('./datos.json')
.then(response => response.json())
.then(data => data.forEach(ejercicio => {
    ejercicios.push(ejercicio)
}))


