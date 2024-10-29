const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const port = 8000;

const cors = require('cors');  // Importar el paquete cors

// Configurar CORS para permitir conexiones desde React (http://localhost:3000)
app.use(cors({
    origin:'*', //'http://localhost:3000',  // Dominio del cliente (React)
    methods: ['GET', 'POST'],  // Métodos HTTP permitidos
  }));

app.use(cors());  // Permitir CORS para todas las rutas

  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',  // Permitir solicitudes desde este origen
      methods: ['GET', 'POST'],  // Métodos permitidos
    }
  });


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('send name', (username) => {
        console.log("nombre",username)
        io.emit('send name', (username));
    });

    socket.on('send message', (chat) => {
        io.emit('send message', (chat));
    });
});

server.listen(port, () => {
    console.log(`Server is listening at the port: ${port}`);
});











