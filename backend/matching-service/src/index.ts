import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import './db';
import { UserModel } from './model';
import { registerMatchHandler } from './socketHandler/matchHandler';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
// app.options('*', cors());

app.get('/', (_, res) => {
  res.send('Hello World from matching-service');
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

export type InputOutput = typeof io;

const onConnection = async (socket: Socket) => {
  await UserModel.create({ socketId: socket.id, isMatched: false });
  registerMatchHandler(io, socket);
};

io.on('connection', onConnection);

// for debugging
// setInterval(async () => {
//   const { count: numRooms } = await RoomModel.findAndCountAll({
//     logging: false,
//   });
//   const { count: numWaitRooms } = await WaitRoomModel.findAndCountAll({
//     logging: false,
//   });
//   const { count: numUsers } = await UserModel.findAndCountAll({
//     logging: false,
//   });
//   console.log({ numRooms, numUsers, numWaitRooms });
// }, 5000);

const port = process.env.PORT || 8002;

httpServer.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
