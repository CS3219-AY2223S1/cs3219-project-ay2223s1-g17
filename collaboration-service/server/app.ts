import 'dotenv/config';
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

interface ISocket extends Socket {
  userIndex: number;
}

io.on('connection', (socket: Socket) => {
  console.log(`socket ${socket.id} has joined`);
  // socket.emit(`socket ${i} has joined`);

  i++;
  const mySocket = socket as ISocket;
  mySocket.userIndex = i;

  socket.on('editorChange', (event) => {
    // event.user = socket.id;
    console.log(mySocket.userIndex, 'triggered change');
    socket.broadcast.emit('editorChange', event);
  });
});

const port = process.env.PORT || 8050;
server.listen(port, () => {
  console.log(`Socket.io Server is running at https://localhost:${port}`);
});
