import express, { Express } from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';

const app: Express = express();

app.get('/', (_, res) => {
  res.send('Hello World from comms-service');
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'http://alb-peerprep-2137662650.ap-southeast-1.elb.amazonaws.com',
      'http://localhost:3000',
    ],
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
  senderId: string;
  senderName: string;
  message: string;
  time: string;
  isConsecutive?: boolean;
};

type UpdateChatParams = {
  chats: Chat[];
  newChat: Chat;
};

io.on('connection', (socket: ISocket) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const roomId = socket.roomId!;
  socket.join(roomId);

  socket.on('message', (params: UpdateChatParams) => {
    const { chats, newChat } = params;
    chats.push({
      ...newChat,
      isConsecutive:
        chats.length > 0 &&
        chats[chats.length - 1].senderId === newChat.senderId,
    });
    io.to(roomId).emit('message', chats);
  });
});

const port = process.env.PORT || 8006;
server.listen(port, () => {
  console.log(`Communication Service is running at http://localhost:${port}`);
});
