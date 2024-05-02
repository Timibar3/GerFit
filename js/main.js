// Creo el saludo al usuario.
// Primero veo si hay un usuario guardado en localStorage.
const ubicacionNombre = document.getElementById('ubicacionSaludo')

async function obtenerNombre () {
    const { value: userName } = await Swal.fire({
        title: "Ingresa tu nombre",
        input: "text",
        inputValidator: (value) => {
            if (!value) {
            return "Por favor ingresa tu nombre";
            }
        }
    });
    if (userName) {
    Swal.fire(`Bienvenido ${userName}`);
    localStorage.setItem('nombre', userName)
    ubicacionNombre.innerHTML = `
    <a href="./user.html">${userName } </a>
    <i class="fa-solid fa-dumbbell"></i>`
    }
}

if (localStorage.getItem('nombre') == null) {
    obtenerNombre()
}else{
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
}

// genero las variables con los tipos de ejercicios y las cantidaddes.
let tiposEjercicios = ['ECTS', 'ECTI', 'EPTS', 'EPTI', 'EF', 'S']

let cantidadesPrincipiantes = [ 
    {cant: 1, repeticiones: "10 x 3"},
    {cant: 2, repeticiones: "15 x 3"},
    {cant: 1, repeticiones: "15 x 3"},
    {cant: 1, repeticiones: '20" cada Ejercicio'},
]

let cantidadesIntermedios = [ 
    {cant: 2, repeticiones: "15 x 4"},
    {cant: 2, repeticiones: "10 x 4"},
    {cant: 1, repeticiones: "10 x 4"},
    {cant: 1, repeticiones: '30" cada Ejercicio'},
]

let cantidadesAvanzados = [ 
    {cant: 3, repeticiones: "15 x 4"},
    {cant: 3, repeticiones: "8 x 4"},
    {cant: 1, repeticiones: "8 x 4"},
    {cant: 1, repeticiones: '45" cada Ejercicio'},
]

// ejercicios es la variable donde van a quedar guardados todos los ejercicios
const ejercicios = []

// creo la clase Ejercicio
class Ejercicio {
    constructor(nombre, tipo){
        //propiedades
        this.nombre = nombre.toLowerCase();
        this.tipo = tipo.toUpperCase();
        this.img = "./img/1366_2000.jpeg"
    }
}

function crearEjercicios (array, tipo){
    for (let i = 0; i < array.length; i++){
        let ejercicio = new Ejercicio (array[i], tipo)
        ejercicios.push(ejercicio)
    }
}

// -------------- Funcionalidad eleccion de rutinas------------------//
// Creo una funcion para filtrar los ejercicios segun su tipo.
let ejerciciosPorTipos = []
function agruparPorTipos (array, tipos) {
    ejerciciosPorTipos = array.filter(el =>el.tipo == tipos)  
}

// Creo una funcion para elegir al azar los ejercicios.
function seleccionAlAzar(datos) {
    return datos[Math.floor(Math.random() * datos.length)];
};

// Creo la funcion para generar la rutina eligiendo la cantidad de ejercicios al azar segun el nivel elegido
let rutinaParcial = [];

const creacionDeRutina = (array, cantidadEjercicios,cantidadRepeticiones) => {

    while (rutinaParcial.length < cantidadEjercicios) {
        let ejercicioElegido = seleccionAlAzar(array);
        let bandera = true;

        for (let i = 0; i <= rutinaParcial.length; i++ ){
            if (rutinaParcial[i] == ejercicioElegido){
                bandera = false;
            };
        };
        if (bandera){
            ejercicioElegido.repeticiones = cantidadRepeticiones
            rutinaParcial.push(ejercicioElegido);
        };
    };
};

let rutinaFinal = [];

const agregarARutinaFinal = (rutinaParcial) => {
    for(let i = 0; i < rutinaParcial.length; i++){
        rutinaFinal.push(rutinaParcial[i])
    };
    ejerciciosPorTipos = []
    rutinaParcial = []
}

// -------- Creo una funcion por cada nivel para que se ejecute al precionar el boton de nivel.-------

// Primero creo la funcion que va buscar los datos a datos.JSON para principiante.
function buscarDatosPrincipiante (e) {
    e.preventDefault
    fetch('./datos.json')
    .then(response => response.json())
    .then(data => data.forEach(ejercicio => {
    ejercicios.push(ejercicio)    
    }))
    .then(data => creacionDeRutinaPrincipiante())
    .then(data => ejecucionRutinaPrincipiante())
    .catch(err => {
        console.error('Hubo un error' + err)
    })
}
// Creo la funcion que va buscar los datos a datos.JSON para Intermedio.
function buscarDatosIntermedio (e) {
    e.preventDefault
    fetch('./datos.json')
    .then(response => response.json())
    .then(data => data.forEach(ejercicio => {
    ejercicios.push(ejercicio)    
}))
.then(data => creacionDeRutinaIntermedio())
.then(data => ejecucionRutinaIntermedio())
}
// Creo la funcion que va buscar los datos a datos.JSON para Avanzado.
function buscarDatosAvanzado (e) {
    e.preventDefault
    fetch('./datos.json')
    .then(response => response.json())
    .then(data => data.forEach(ejercicio => {
    ejercicios.push(ejercicio)    
}))
.then(data => creacionDeRutinaAvanzado())
.then(data => ejecucionRutinaAvanzado())
}


// creo la funcion para crear la rutina en cada nivel
function creacionDeRutinaPrincipiante () {
    agruparPorTipos(ejercicios, tiposEjercicios[0])
    creacionDeRutina(ejerciciosPorTipos, cantidadesPrincipiantes[0].cant, cantidadesPrincipiantes[0].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    agruparPorTipos(ejercicios, tiposEjercicios[1])
    creacionDeRutina(ejerciciosPorTipos, cantidadesPrincipiantes[0].cant, cantidadesPrincipiantes[0].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    agruparPorTipos(ejercicios, tiposEjercicios[2])
    creacionDeRutina(ejerciciosPorTipos, cantidadesPrincipiantes[1].cant,cantidadesPrincipiantes[1].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    agruparPorTipos(ejercicios, tiposEjercicios[3])
    creacionDeRutina(ejerciciosPorTipos, cantidadesPrincipiantes[1].cant, cantidadesPrincipiantes[1].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    agruparPorTipos(ejercicios, tiposEjercicios[4])
    creacionDeRutina(ejerciciosPorTipos, cantidadesPrincipiantes[2].cant, cantidadesPrincipiantes[2].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    agruparPorTipos(ejercicios, tiposEjercicios[5])
    creacionDeRutina(ejerciciosPorTipos, cantidadesPrincipiantes[3].cant, cantidadesPrincipiantes[3].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    obtenerPeliculas()
}

function creacionDeRutinaIntermedio () {
    agruparPorTipos(ejercicios, tiposEjercicios[0])
    creacionDeRutina(ejerciciosPorTipos, cantidadesIntermedios[0].cant, cantidadesIntermedios[0].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    agruparPorTipos(ejercicios, tiposEjercicios[1])
    creacionDeRutina(ejerciciosPorTipos, cantidadesIntermedios[0].cant, cantidadesIntermedios[0].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    agruparPorTipos(ejercicios, tiposEjercicios[2])
    creacionDeRutina(ejerciciosPorTipos, cantidadesIntermedios[1].cant, cantidadesIntermedios[1].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    agruparPorTipos(ejercicios, tiposEjercicios[3])
    creacionDeRutina(ejerciciosPorTipos, cantidadesIntermedios[1].cant, cantidadesIntermedios[1].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    agruparPorTipos(ejercicios, tiposEjercicios[4])
    creacionDeRutina(ejerciciosPorTipos, cantidadesIntermedios[2].cant, cantidadesIntermedios[2].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    agruparPorTipos(ejercicios, tiposEjercicios[5])
    creacionDeRutina(ejerciciosPorTipos, cantidadesIntermedios[3].cant, cantidadesIntermedios[3].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    obtenerPeliculas()
}

function creacionDeRutinaAvanzado () {
    agruparPorTipos(ejercicios, tiposEjercicios[0])
    creacionDeRutina(ejerciciosPorTipos, cantidadesAvanzados[0].cant, cantidadesAvanzados[0].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    agruparPorTipos(ejercicios, tiposEjercicios[1])
    creacionDeRutina(ejerciciosPorTipos, cantidadesAvanzados[0].cant, cantidadesAvanzados[0].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    agruparPorTipos(ejercicios, tiposEjercicios[2])
    creacionDeRutina(ejerciciosPorTipos, cantidadesAvanzados[1].cant, cantidadesAvanzados[1].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    agruparPorTipos(ejercicios, tiposEjercicios[3])
    creacionDeRutina(ejerciciosPorTipos, cantidadesAvanzados[1].cant, cantidadesAvanzados[1].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    agruparPorTipos(ejercicios, tiposEjercicios[4])
    creacionDeRutina(ejerciciosPorTipos, cantidadesAvanzados[2].cant, cantidadesAvanzados[2].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    agruparPorTipos(ejercicios, tiposEjercicios[5])
    creacionDeRutina(ejerciciosPorTipos, cantidadesAvanzados[3].cant, cantidadesAvanzados[3].repeticiones)
    agregarARutinaFinal(rutinaParcial)
    ejerciciosPorTipos = []
    rutinaParcial = []
    obtenerPeliculas()
}

// Selecciono los botones de los niveles y hago que cada uno ejecute la funcion de la creacion de la rutina de su nivel.
const botonPrincipiante = document.querySelector('div#card-principiante')
const botonIntermedio = document.querySelector('div#card-intermedio')
const botonAvanzado = document.querySelector('div#card-avanzado')
const contenedorRutina = document.querySelector('div.rutina-container')

// creo la funcion para adaptar el DOM para el boton principiante.
function ejecucionRutinaPrincipiante (){
    contenedorRutina.innerHTML = ""
    for (let i = 0; i < rutinaFinal.length; i++){
        contenedorRutina.innerHTML += 
            `<div class="card-ejercicio">
            <img id="imagen-ejercicio" src="${rutinaFinal[i].img}">
            <h5>${rutinaFinal[i].nombre}</h5>
            <h5>${rutinaFinal[i].repeticiones}</h5>
            </div>`
    }
    rutinaFinal = []
}

botonPrincipiante.addEventListener('click', buscarDatosPrincipiante)

// creo la funcion para adaptar el DOM para el boton intermedio.
function ejecucionRutinaIntermedio (){
    contenedorRutina.innerHTML = ""
    for (let i = 0; i < rutinaFinal.length; i++){
        contenedorRutina.innerHTML += 
            `<div class="card-ejercicio">
            <img id="imagen-ejercicio" src="${rutinaFinal[i].img}">
            <h5>${rutinaFinal[i].nombre} </h5>
            <h5>${rutinaFinal[i].repeticiones} </h5>
            </div>`
    }
    rutinaFinal = []
}

botonIntermedio.addEventListener('click', buscarDatosIntermedio)

// creo la funcion con el evento para el boton avanzado.
function ejecucionRutinaAvanzado (){
    contenedorRutina.innerHTML = ""
    for (let i = 0; i < rutinaFinal.length; i++){
        contenedorRutina.innerHTML += 
            `<div class="card-ejercicio">
            <img id="imagen-ejercicio" src="${rutinaFinal[i].img}">
            <h5>${rutinaFinal[i].nombre} </h5>
            <h5>${rutinaFinal[i].repeticiones} </h5>
            </div>`
    }
    rutinaFinal = []
}

botonAvanzado.addEventListener('click', buscarDatosAvanzado)

// Genero la logica para que recomiende una pelicula al finalizar cada rutina.

function pagina () {
    return Math.floor(Math.random() * 500)
};

const obtenerPeliculas = () => {
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjBiZTJhNzk0MDZlNmExMzVmNWYzNDkwYWRlZWFjMiIsInN1YiI6IjY2MWQ5NmRmMzg5ZGExMDE2MzM2MDk3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OjLtbvd_s68nBvIULY3wI4WabsYb6ONuJ6uF3-5g5tI'
        }
    };
    fetch(`https://api.themoviedb.org/3/movie/popular?language=es-la&page=${pagina()}`, options)
        .then(response => response.json())
        .then(response => {
            let peliculas = '';
            let peliAlAzar = Math.floor(Math.random() * response.results.length)
            let pelicula = response.results[peliAlAzar]
            peliculas += `
                <div class="pelicula">
                    <h3>Al terminar tu rutina te recomendamos ver esta película:<h3/>
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h3 class="titulo">${pelicula.title}</h3>
                </div>
                `
            document.getElementById('pelicula-container').innerHTML = peliculas
        })
        .catch(err => console.error(err));
}

