import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('Um usuário se conectou');

    socket.on('move', (data) => {
        // Envie o movimento para todos os outros jogadores
        socket.broadcast.emit('move', data);
    });

    socket.on('disconnect', () => {
        console.log('Um usuário se desconectou');
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});