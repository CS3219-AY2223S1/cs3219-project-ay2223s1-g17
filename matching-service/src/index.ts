import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {
  activeRooms,
  getWaitingRooms,
  mediumWaitRooms,
  easyWaitRooms,
  hardWaitRooms,
} from './match';
import { v4 as uuidv4 } from 'uuid';
import './db';
import { UserModel, WaitRoomModel } from './model';
import { timers } from './timers';

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

io.on('connection', (socket) => {
  console.log('New WebSocket connection\n');

  socket.on('matchStart', async (difficulty) => {
    const waitingRooms = getWaitingRooms(difficulty);
    if (!waitingRooms) {
      console.log('ERROR: unreachable statement, check frontend code');
      return;
    }

    // if found a match, join active room
    // if (waitingRooms.length > 0) {
    //   const [waitingRoom] = waitingRooms.splice(0, 1); // dequeue
    //   const { id, waitingUserId, waitingSocketId, countdown } = waitingRoom;

    //   // clear the countdown timer for waiting client
    //   clearInterval(countdown);

    //   socket.join(id);
    //   activeRooms.push({
    //     id,
    //     user1: waitingUserId,
    //     user2: uuidv4(),
    //   });

    //   // emit success match (find a way to tell the first guy)
    //   socket.emit('matchSuccess');
    //   socket.to(waitingSocketId).emit('matchSuccess');
    //   console.log({
    //     easyWaitRoom: easyWaitRooms,
    //     mediumWaitRoom: mediumWaitRooms,
    //     hardWaitRoom: hardWaitRooms,
    //     activeRooms,
    //   });
    //   return;
    // }

    // if no match, start countdown timer, join a waiting room

    let counter = 4;
    const waitRoomId = uuidv4();
    const userId = uuidv4();
    const timerId = uuidv4();

    socket.emit('matchCountdown', counter);
    counter--;
    const countdown = setInterval(() => {
      socket.emit('matchCountdown', counter);
      if (counter === 0) {
        // clear interval
        clearInterval(timers[timerId]);
        // remove waiting room if timeout
        const room = waitingRooms.find((room) => room.id === waitRoomId);
        if (!room) {
          return;
        }
        waitingRooms.splice(waitingRooms.indexOf(room), 1);
        // leave the socket.io room
        socket.leave(waitRoomId);
      }
      counter--;
    }, 1000);

    timers[timerId] = countdown;
    socket.join(waitRoomId);
    await UserModel.build({ id: userId, socketId: socket.id }).save();
    await WaitRoomModel.build({
      id: waitRoomId,
      waitingUserId: userId,
      timerId,
    }).save();

    // console.log({
    //   easyWaitRoom: easyWaitRooms,
    //   mediumWaitRoom: mediumWaitRooms,
    //   hardWaitRoom: hardWaitRooms,
    //   activeRooms,
    // });
  });
});

const port = process.env.PORT || 8080;

httpServer.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
