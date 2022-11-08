import express, { Express } from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';
import cors from 'cors';

import { registerStopwatchHandler } from './socketHandler/stopwatchHandler';
import axios from 'axios';
import * as redis from 'redis';

const app: Express = express();
app.use(cors());

app.get('/', (_, res) => {
  res.send('<h1>Hello world from collab service</h1>');
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

type ISocket = Socket & {
  roomId?: string;
};

export type InputOutput = typeof io;

io.use((socket: ISocket, next) => {
  const roomId = socket.handshake.auth.roomId;
  if (!roomId) {
    return;
  }
  socket.roomId = roomId;
  next();
});

io.on('connection', async (socket: ISocket) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const roomId = socket.roomId!;
  const host = `${process.env.REDIS_HOST ?? 'localhost'}`;
  const redisClient = redis.createClient({
    socket: {
      host,
    },
  });
  await redisClient.connect();
  socket.join(roomId);

  socket.on('editorChange', (event) => {
    socket.to(roomId).emit('editorChange', event);
  });

  socket.on('selection', (event) => {
    socket.to(roomId).emit('selection', event);
  });

  socket.on('openNextQuestionPrompt', () => {
    socket.to(roomId).emit('openNextQuestionPrompt');
  });

  socket.on('acceptNextQuestion', async (history) => {
    const users = await redisClient
      .get(roomId)
      .then((res) => (res ? JSON.parse(res) : res));
    if (!users) {
      await redisClient.set(roomId, JSON.stringify([history.user]));
      return;
    }

    users.push(history.user);
    delete history.user;
    const { status, data } = await axios.post(`${process.env.HISTORY_URL}`, {
      history: { ...history, users: Array.from(users) },
    });
    await redisClient.del(roomId);

    if (status !== 200) return io.to(roomId).emit('error', data);

    io.to(roomId).emit('proceedToNextQuestion');
  });

  socket.on('rejectNextQuestion', async () => {
    await redisClient.del(roomId);
    socket.to(roomId).emit('otherUserRejectedNextQuestion');
  });

  registerStopwatchHandler(io, socket, roomId);
});

const port = process.env.PORT || 8004;
server.listen(port, () => {
  console.log(`Collaboration Service is running at http://localhost:${port}`);
});
