let entradasEnCalorTrenSuperior = [
    'Saltos estrella','Push-Ups piso','Push-Ups Inclinado','Push-Ups Declinado','Burpees'];

let entradasEnCalorTrenInferior = [
    'Air Squat','Puente','Sentadilla Bulgara','Gemelos', 'Salto de rana'];

let ejerciciosPrincipalesTrenSuperior = [
    'Vuelos laterales','Press sobre cabeza','Trapecio con disco','Press banca plana','Press banca inclinda','Biceps mancuerna'];

let ejerciciosPrincipalesTrenInferior = [
    'Squats','Cuadriceps en máquina','Isquios en máquina','Hip thrust','Peso muerto','Peso muerto Rumano'];

let ejerciciosDeFuerza = [
    'thrusters','wall balls','kettlebell swings'];

let stretchings = [
    'Opcion01','Opcion02','Opcion03','Opcion04','Opcion05'];

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
const ejercicios =[]

// creo la clase Ejercicio
class Ejercicio {
    constructor(nombre, tipo){
        //propiedades
        this.nombre = nombre.toLowerCase();
        this.tipo = tipo.toUpperCase();
        this.imagen = "./img/1366_2000.jpeg"
    }
}

function crearEjercicios (array, tipo){
    for (let i = 0; i < array.length; i++){
        let ejercicio = new Ejercicio (array[i], tipo)
        ejercicios.push(ejercicio)
    }
}

// ejecuto la funcion para la creacion de los ejercicios usando la clase y los arrays originales
crearEjercicios(entradasEnCalorTrenSuperior, tiposEjercicios[0])
crearEjercicios(entradasEnCalorTrenInferior, tiposEjercicios[1])
crearEjercicios(ejerciciosPrincipalesTrenSuperior, tiposEjercicios[2])
crearEjercicios(ejerciciosPrincipalesTrenInferior, tiposEjercicios[3])
crearEjercicios(ejerciciosDeFuerza, tiposEjercicios[4])
crearEjercicios(stretchings, tiposEjercicios[5])

// creo la funcionalidad para que al presionar el boton administrador aparezca el formulario para agregar ejercicios.
/* const botonAdministrador = document.querySelector('div#botonAdmin')
const crearEjercicioContainer = document.querySelector('div#crearEjercicioContainer') */


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
    // tengo que agregar aca la comprobacion que el ejercicio no exite
    let ejercicio = new Ejercicio (datoNombreEjercicio.value, selectTipos.value)
    ejercicios.push(ejercicio)
    datoNombreEjercicio.value = ''
}

formulario.addEventListener('submit', agregarEjercicio)

// Tomo el nombre del formulario de la pagina usuario y lo saludo en el header.

const formSaludo = document.querySelector('form.nombreUsuarioForm')
let datoNombreUsuario = document.querySelector('input#nombreUsuario')
let datoPesoUsuario = document.querySelector('input#pesoUsuario')
let ubicacionSaludo = document.querySelector('div#ubicacionSaludo')
let contenedorFormUsuario = document.querySelector('div#NombreUsuarioContainer')

let peso = JSON.parse(localStorage.getItem('peso'))
console.log(typeof(peso))

function saludarUsuario (e) {
    e.preventDefault()
    console.log(datoNombreUsuario.value)
    let saludo = document.createElement('p')
    if (peso == null){
        saludo.innerText = 'Hola ' + datoNombreUsuario.value
    }else if (peso < datoPesoUsuario.value){
        saludo.innerText = 'Hola ' + datoNombreUsuario.value + ' subiste ' + (datoPesoUsuario.value - peso) + 'Kg'
    }else if (peso > datoPesoUsuario.value){
        console.log('hola puto')
        saludo.innerText = 'Hola ' + datoNombreUsuario.value + ' bajaste ' + (peso - datoPesoUsuario.value) + 'Kg'
    }else{
        console.log('Algo salio mal')
    }
    localStorage.setItem('peso', datoPesoUsuario.value)
    ubicacionSaludo.appendChild(saludo)
    contenedorFormUsuario.remove()
}

formSaludo.addEventListener('submit', saludarUsuario)

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

// Creo una funcion por cada nivel para que se ejecute al precionar el boton de nivel.

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
    console.log(rutinaFinal)
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
    console.log(rutinaFinal)
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
    console.log(rutinaFinal)
}

// Selecciono los botones de los niveles y hago que cada uno ejecute la funcion de la creacion de la rutina de su nivel.

const botonPrincipiante = document.querySelector('div#card-principiante')
const botonIntermedio = document.querySelector('div#card-intermedio')
const botonAvanzado = document.querySelector('div#card-avanzado')
const contenedorRutina = document.querySelector('div.rutina-container')

// creo la funcion con el evento para el boton principiante.
function ejecucionRutinaPrincipiante (e){
    e.preventDefault
    contenedorRutina.innerHTML = ""
    creacionDeRutinaPrincipiante()
    for (let i = 0; i < rutinaFinal.length; i++){
        contenedorRutina.innerHTML += 
            `<div class="card-ejercicio">
            <img id="imagen-ejercicio" src="${rutinaFinal[i].imagen}">
            <h5>${rutinaFinal[i].nombre} </h5>
            <h5>${rutinaFinal[i].repeticiones} </h5>
            </div>`
        console.log(rutinaFinal[i].nombre)
    }
    
    rutinaFinal = []
}

botonPrincipiante.addEventListener('click', ejecucionRutinaPrincipiante)

// creo la funcion con el evento para el boton intermedio.
function ejecucionRutinaIntermedio (e){
    e.preventDefault
    contenedorRutina.innerHTML = ""
    creacionDeRutinaIntermedio()
    for (let i = 0; i < rutinaFinal.length; i++){
        contenedorRutina.innerHTML += 
            `<div class="card-ejercicio">
            <img id="imagen-ejercicio" src="${rutinaFinal[i].imagen}">
            <h5>${rutinaFinal[i].nombre} </h5>
            <h5>${rutinaFinal[i].repeticiones} </h5>
            </div>`
        console.log(rutinaFinal[i].nombre)
    }
    
    rutinaFinal = []
}

botonIntermedio.addEventListener('click', ejecucionRutinaIntermedio)

// creo la funcion con el evento para el boton avanzado.
function ejecucionRutinaAvanzado (e){
    e.preventDefault
    contenedorRutina.innerHTML = ""
    creacionDeRutinaAvanzado()
    for (let i = 0; i < rutinaFinal.length; i++){
        contenedorRutina.innerHTML += 
            `<div class="card-ejercicio">
            <img id="imagen-ejercicio" src="${rutinaFinal[i].imagen}">
            <h5>${rutinaFinal[i].nombre} </h5>
            <h5>${rutinaFinal[i].repeticiones} </h5>
            </div>`
        console.log(rutinaFinal[i].nombre)
    }
    
    rutinaFinal = []
}

botonAvanzado.addEventListener('click', ejecucionRutinaAvanzado)