//Definición de variables
const url = 'http://localhost:3000/api/articulos/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const btnClose = document.querySelector("#btnClose");
const btnCreate = document.querySelector("#btnCreate");
const formArticulo = document.querySelector('form')
const caso = document.querySelector("#caso");
const area = document.querySelector("#area");
const descripcion = document.querySelector("#descripcion");
var opcion = ''

btnClose.addEventListener("click", emptyCamp);
btnClose.addEventListener("click", opcionCreate);

function emptyCamp() {
    caso.value = "";
    area.value = "";
    descripcion.value = "";
}

function opcionCreate() {
    opcion = 'crear';
}

//Funcion para mostrar los resultados
const mostrar = (articulos) => {
    articulos.forEach(articulo => {
        resultados += `<tr>
                            <td>${articulo.id}</td>
                            <td>${articulo.caso}</td>
                            <td>${articulo.area}</td>
                            <td>${articulo.descripcion}</td>
                            <td class="text-center"><button id="bntCrear" type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#modalArticulo" >Editar</button><button id="bntCrear" type="button" class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"  >Borrar</button>
                       </tr>
                    `
    })
    contenedor.innerHTML = resultados

}

// Procedimiento Mostrar
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))
