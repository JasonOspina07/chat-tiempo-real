const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

/* Servir archivos estáticos*/
app.use(express.static(path.join(__dirname, '../public')))

/* Cuando un usuario se conecta*/
io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`)

    /* Cuando recibe un mensaje*/
    socket.on('mensaje', (data) => {
        console.log(`Mensaje recibido: ${data.texto}`)
        // Envía el mensaje a todos los conectados
        io.emit('mensaje', data)
    })

    /*Cuando un usuario se desconecta*/
    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`)
    })
})

const PORT = 3001
server.listen(PORT, () => {
    console.log(`Servidor de chat corriendo en http://localhost:${PORT}`)
})