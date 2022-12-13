//Definición de variables
const url = 'http://localhost:3000/api/articulos/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const btnClose = document.querySelector("#btnClose");
const btnCrear = document.querySelector("#btnCrear");
const btnEnviar = document.querySelector('#btnEnviar')
const formArticulo = document.querySelector('#formModal')
const miModal = document.querySelector("#modalArticulo")
const caso = document.querySelector("#caso");
const area = document.querySelector("#area");
const descripcion = document.querySelector("#descripcion");
const shadowModal = document.getElementsByName('show')
var opcion = ''

btnEnviar.addEventListener('click', checkInput);
btnClose.addEventListener("click", emptyCamp);
btnCrear.addEventListener("click", opcionCreate);

function emptyCamp() {
    caso.value = "";
    area.value = "";
    descripcion.value = "";
}

function opcionCreate() {
    caso.value = "";
    area.value = "";
    descripcion.value = "";
    console.log("Se añade opcion crear")
    $('#modalArticulo').modal({ show: true });
    opcion = 'crear';
}


function checkInput() {

    if ((caso.value == "") || (area.value == "") || (descripcion.value == "")) {
        console.log("Los datos no pueden estar vacios")

    } else {
        $('#modalArticulo').modal('hide')
        $('.show').remove();
        if (opcion == 'crear') {
            alertify.success('Se crea nuevo caso');
        }
        setTimeout(() => {
            location.reload()
        }, 2000)
    }
}

//Funcion para mostrar los resultados
const mostrar = (articulos) => {
    articulos.forEach(articulo => {
        resultados += `<tr class="hover:bg-slate-300">
                            <td class="d-none">${articulo.id}.</td>
                            <td>${articulo.caso}</td>
                            <td>${articulo.area}</td>
                            <td>${articulo.descripcion}</td>
                            <td class="text-center"><button id="btnEditar" type="button" class="inline-block mx-3 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#modalArticulo" >Editar</button><button id="btnBorrar" type="button" class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"  >Borrar</button>
                       </tr>
                    `
        $(document).ready(function () {
            $('#tablaArticulos').DataTable({
                "bDestroy": true,
                "columnDefs": [{
                    "targets": [0, 4],
                    "searchable": false
                }]
            });
        });
    })
    contenedor.innerHTML = resultados

}

// Procedimiento Mostrar
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))

const on = (element, event, selector, handler) => {
    //console.log(element)
    //console.log(event)
    //console.log(selector)
    //console.log(handler)
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

//Procedimiento Borrar
on(document, 'click', '#btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("¿Esta seguro que desea eliminar este registro?",
        function () {
            const mensajeEliminar = document.querySelector(".ajs-header")
            console.log(mensajeEliminar.value)
            fetch(url + id, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(() => alertify.success('Mensaje Eliminado'))
            setTimeout(() => {
                location.reload()
            }, 1000)

        },
        function () {
            alertify.error('Cancelado')
        })

})

// Procedimiento editar
let idForm = 0
on(document, 'click', '#btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    console.log('EDITADO')
    idForm = fila.children[0].innerHTML
    const casoForm = fila.children[1].innerHTML
    const areaForm = fila.children[2].innerHTML
    const descripcionForm = fila.children[3].innerHTML
    caso.value = casoForm
    area.value = areaForm
    descripcion.value = descripcionForm
    opcion = 'editar'
})

//Procedimiento para Crear y Editar
formArticulo.addEventListener('submit', (e) => {
    e.preventDefault()
    if (opcion == 'crear') {
        if ((caso.value == "") || (area.value == "") || (descripcion.value == "")) {
            console.log("Los datos no pueden estar vacios")

        } else {
            console.log('OPCION CREAR')
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    caso: caso.value.charAt(0).toUpperCase() + caso.value.slice(1),
                    area: area.value.charAt(0).toUpperCase() + area.value.slice(1),
                    descripcion: descripcion.value.charAt(0).toUpperCase() + descripcion.value.slice(1)
                })
            })
                .then(response => response.json())
                .then(data => {
                    const nuevoArticulo = []
                    nuevoArticulo.push(data)
                    mostrar(nuevoArticulo)
                })
        }
    }

    if (opcion == 'editar') {
        if ((caso.value == "") || (area.value == 0) || (descripcion.value == 0)) {
            console.log("Los datos no pueden estar vacios")
        } else {
            console.log('OPCION EDITAR')
            fetch(url + idForm, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    caso: caso.value,
                    area: area.value,
                    descripcion: descripcion.value
                })
            })
                .then(response => response.json())
            alertify.success('Mensaje editado de manera exitosa')
            setTimeout(() => {
                location.reload()
            }, 1500)
        }

    }
    // modalArticulo.hide()
})
