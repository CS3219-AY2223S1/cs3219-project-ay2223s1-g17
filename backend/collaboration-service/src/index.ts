import express, { Express } from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';
import {
  onTimerStop,
  registerStopwatchHandler,
} from './socketHandler/stopwatchHandler';
import axios from 'axios';
import * as redis from 'redis';

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

io.on('connection', async (socket: ISocket) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const roomId = socket.roomId!;
  socket.join(roomId);
  const host = `${process.env.REDIS_HOST ?? 'redis'}`;
  const redisClient = redis.createClient({
    socket: {
      host,
    },
  });
  await redisClient.connect();

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

    onTimerStop(io, socket, roomId);
    users.push(history.user);
    delete history.user;
    const { status, data } = await axios.post(
      `${
        process.env.ENV === 'production'
          ? process.env.HISTORY_URL_PROD
          : process.env.HISTORY_URL_DEV
      }`,
      {
        history: { ...history, users: Array.from(users) },
      }
    );
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
