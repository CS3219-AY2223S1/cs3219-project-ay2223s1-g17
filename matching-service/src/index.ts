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
import { UserModel, WaitRoomModel, WaitRoom, RoomModel } from './model';
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
    const waitRooms = (await WaitRoomModel.findAll({
      where: {
        difficulty,
      },
      order: [['createdAt', 'ASC']],
      limit: 1,
    })) as unknown as WaitRoom[];

    if (waitRooms.length) {
      const { id: waitRoomId, waitingUserId } = waitRooms[0];

      // delete from waitRoom
      await WaitRoomModel.destroy({
        where: {
          id: waitRoomId,
        },
      });
      // add new room (waiting room id will be used as room's id)
      await RoomModel.create({
        id: waitRoomId,
        user1_id: waitingUserId,
        user2_id: uuidv4(),
      });

      // clear countdown interval
      clearInterval(timers[waitRoomId]);

      // second user will join the wait room to form a full room
      socket.join(waitRoomId);

      // emit emit success
      const user1 = (await UserModel.findByPk(
        waitingUserId
      )) as unknown as User;
      console.log({ user1: JSON.stringify(user1) });

      return;
    }
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

    socket.emit('matchCountdown', counter);
    counter--;
    const countdown = setInterval(async () => {
      socket.emit('matchCountdown', counter);
      if (counter === 0) {
        // clear interval
        clearInterval(timers[waitRoomId]);

        // remove waiting room and user if timeout
        await UserModel.destroy({
          where: {
            id: userId,
          },
        });
        await WaitRoomModel.destroy({
          where: {
            id: waitRoomId,
          },
        });
        // leave the socket.io room
        socket.leave(waitRoomId);
      }
      counter--;
    }, 1000);

    timers[waitRoomId] = countdown;
    socket.join(waitRoomId);
    await UserModel.create({ id: userId, socketId: socket.id });
    await WaitRoomModel.create({
      id: waitRoomId,
      waitingUserId: userId,
      difficulty,
    });
  });
});

const port = process.env.PORT || 8080;

httpServer.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
