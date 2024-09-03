import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

interface GameState {
    board: any[]; // Defina o tipo adequado para o seu tabuleiro
    currentPlayer: 'white' | 'black';
}

let gameState: GameState = {
    board: [], // Inicialize o estado do tabuleiro
    currentPlayer: 'white',
};

io.on('connection', (socket) => {
    console.log('Um jogador se conectou:', socket.id);

    // Enviar o estado do jogo para o novo jogador
    socket.emit('gameState', gameState);

    // Ouvir movimentos dos jogadores
    socket.on('makeMove', (move) => {
        // Atualizar o estado do jogo aqui
        gameState.board = move.newBoard; // Atualize o tabuleiro com o novo estado
        gameState.currentPlayer = move.nextPlayer; // Altere o jogador atual

        // Emitir o novo estado do jogo para todos os jogadores
        io.emit('gameState', gameState);
    });

    socket.on('disconnect', () => {
        console.log('Um jogador se desconectou:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});