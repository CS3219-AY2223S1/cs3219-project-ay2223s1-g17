import express, { Express } from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';

// initialize express app
const app: Express = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let i = 1;

io.on('connection', (socket: Socket) => {
  socket.emit(`socket ${i} has joined`);
  i++;
  socket.on('editorChange', (event) => {
    socket.broadcast.emit('editorChange', event);
  });
});

const port = process.env.PORT || 8004;
server.listen(port, () => {
  console.log(`Socket.io Server is running at https://localhost:${port}`);
});
