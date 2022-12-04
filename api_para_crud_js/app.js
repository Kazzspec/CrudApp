const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const { json } = require('express')
const app = express()

app.use(express.json())
app.use(cors())
//Establecemos los prámetros de conexión
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'apoyo_crud_bdd'
})
//Conexión a la database
conexion.connect(function (error) {
    if (error) {
        throw error
    } else {
        console.log("¡Conexión exitosa a la base de datos!")
    }
})
app.get('/', function (req, res) {
    res.send('Ruta INICIO')
})
//Mostrar todos los artículos
app.get('/api/articulos', (req, res) => {
    conexion.query('SELECT * FROM cases', (error, filas) => {
        if (error) {
            throw error
        } else {
            res.send(filas)
        }
    })
})
//Mostrar un SOLO artículo
app.get('/api/articulos/:id', (req, res) => {
    conexion.query('SELECT * FROM articulos WHERE id = ?', [req.params.id], (error, fila) => {
        if (error) {
            throw error
        } else {
            res.send(fila)
        }
    })
})
//Crear un artículo
app.post('/api/articulos', (req, res) => {
    let data = { caso: req.body.caso, area: req.body.area, descripcion: req.body.descripcion }
    let sql = "INSERT INTO cases SET ?"
    conexion.query(sql, data, function (err, result) {
        if (err) {
            throw err
        } else {
            /*Esto es lo nuevo que agregamos para el CRUD con Javascript*/
            Object.assign(data, { id: result.insertId }) //agregamos el ID al objeto data
            res.send(data) //enviamos los valores
        }
    })
})
//Editar articulo
app.put('/api/articulos/:id', (req, res) => {
    let id = req.params.id
    let caso = req.body.caso
    let area = req.body.area
    let descripcion = req.body.descripcion
    let sql = "UPDATE cases SET caso = ?, area = ?, descripcion = ? WHERE id = ?"
    conexion.query(sql, [descripcion, caso, area, id], function (error, results) {
        if (error) {
            throw error
        } else {
            res.send(results)
        }
    })
})
//Eliminar articulo
app.delete('/api/articulos/:id', (req, res) => {
    conexion.query('DELETE FROM cases WHERE id = ?', [req.params.id], function (error, filas) {
        if (error) {
            throw error
        } else {
            res.send(filas)
        }
    })
})
const puerto = process.env.PUERTO || 3000
app.listen(puerto, function () {
    console.log("Servidor Ok en puerto:" + puerto)
})
