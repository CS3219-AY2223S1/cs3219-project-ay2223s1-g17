import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import './db';
import { RoomModel, UserModel, WaitRoomModel } from './model';
import { registerMatchHandler } from './socketHandler/matchHandler';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
// app.options('*', cors());

app.get('/', (req, res) => {
  res.send('Hello World from matching-service');
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

export type InputOutput = typeof io;

const onConnection = async (socket: Socket) => {
  await UserModel.create({ socketId: socket.id, isMatched: false });
  registerMatchHandler(io, socket);
};

io.on('connection', onConnection);

// for debugging
setInterval(async () => {
  const { count: numRooms } = await RoomModel.findAndCountAll({});
  const { count: numWaitRooms } = await WaitRoomModel.findAndCountAll({});
  const { count: numUsers } = await UserModel.findAndCountAll({});
  console.log({ numRooms, numUsers, numWaitRooms });
}, 2000);

const port = process.env.PORT || 8080;

httpServer.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
