const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public'))

    // Esta ruta carga nuestro archivo index.html en la raíz de la misma
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
 ];

// "connection" se ejecuta la primera vez que se abre una nueva conexión
io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.emit('messages', messages);

    socket.on('new-message', (data) => {
        messages.push(data);
        io.sockets.emit('messages', messages);

    })
});

httpServer.listen(3030, () => console.log('SERVER ON'))