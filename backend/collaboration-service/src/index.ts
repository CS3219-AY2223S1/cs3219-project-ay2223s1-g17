import express, { Express } from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';
import { registerStopwatchHandler } from './socketHandler/stopwatchHandler';

const app: Express = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

type ISocket = Socket & {
  roomId?: string;
};

export type InputOutput = typeof io;

io.use((socket: ISocket, next) => {
  const roomId = socket.handshake.auth.roomId;
  if (!roomId) {
    return console.log('ERROR: no room ID!');
  }
  socket.roomId = roomId;
  next();
});

io.on('connection', (socket: ISocket) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const roomId = socket.roomId!;
  socket.join(roomId);

  socket.on('editorChange', (event) => {
    socket.to(roomId).emit('editorChange', event);
  });

  socket.on('selection', (event) => {
    socket.to(roomId).emit('selection', event);
  });

  socket.on('openNextQuestionPrompt', () => {
    io.to(roomId).emit('openNextQuestionPrompt');
  });

  socket.on('acceptNextQuestion', () => {
    socket.to(roomId).emit('acceptNextQuestion');
  });

  socket.on('rejectNextQuestion', () => {
    socket.to(roomId).emit('rejectNextQuestion');
  });

  registerStopwatchHandler(io, socket, roomId);
});

const port = process.env.PORT || 8004;
server.listen(port, () => {
  console.log(`Collaboration Service is running at https://localhost:${port}`);
});
