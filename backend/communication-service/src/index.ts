import express, { Express } from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';

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

type Chat = {
  sender: string;
  message: string;
};
const chatLogs: Record<string, Chat[]> = {};

io.on('connection', (socket: ISocket) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const roomId = socket.roomId!;
  socket.join(roomId);

  socket.on('otherUsername', (username: string) =>
    socket.to(roomId).emit('otherUsername', username)
  );

  socket.on('message', (chat: Chat) => {
    console.log('msg: ', chat.message);
    let chatLog = chatLogs[roomId];
    if (!chatLog) {
      chatLog = [];
      chatLogs[roomId] = [];
    }
    chatLog.push(chat);
    io.to(roomId).emit('message', chatLog);
  });
});

const port = process.env.PORT || 8006;
server.listen(port, () => {
  console.log(`Communication Service is running at http://localhost:${port}`);
});
