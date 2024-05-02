let tiposEjercicios = ['ECTS', 'ECTI', 'EPTS', 'EPTI', 'EF', 'S']

// ejercicios es la variable donde van a quedar guardados todos los ejercicios
const ejercicios = []

// Busco los ejercicios de datos.json


function buscarDatos () {
    fetch('./datos.json')
    .then(response => response.json())
    .then(data => data.forEach(ejercicio => {
    ejercicios.push(ejercicio)    
    }))
    .then(data => agruparPorTipos(ejercicios, tiposEjercicios[1])
    )
    .then(data => console.log(ejerciciosPorTipos))
}


const botonPrincipiante = document.querySelector('div#card-principiante')
const contenedorRutina = document.querySelector('div.rutina-container')

async function imprimirPrincipiante (e) {
    e.preventDefault
    contenedorRutina.innerHTML = ""
    buscarDatos();
}



botonPrincipiante.addEventListener('click', imprimirPrincipiante)


// -------------- Funcionalidad eleccion de rutinas------------------//
// Creo una funcion para filtrar los ejercicios segun su tipo.
let ejerciciosPorTipos = []
function agruparPorTipos (array, tipos) {
    ejerciciosPorTipos = array.filter(el =>el.tipo == tipos)  
}

