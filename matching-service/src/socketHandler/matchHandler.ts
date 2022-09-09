import { Op } from 'sequelize';
import { Socket } from 'socket.io';
import {
  DIFFICULTY,
  RoomModel,
  UserModel,
  WaitRoom,
  WaitRoomModel,
} from '../model';
import { timers } from '../timers';
import { v4 as uuidv4 } from 'uuid';

const startMatch = (socket: Socket) => async (difficulty: DIFFICULTY) => {
  const waitRooms = (await WaitRoomModel.findAll({
    where: {
      difficulty,
    },
    // can be removed as there will only ever be one waitRoom for every difficulty
    order: [['createdAt', 'ASC']],
    limit: 1,
  })) as unknown as WaitRoom[];

  if (waitRooms.length) {
    const { id: waitRoomId, waitingSocketId } = waitRooms[0];

    clearInterval(timers[waitRoomId]);

    // delete waitRoom
    await WaitRoomModel.destroy({
      where: {
        id: waitRoomId,
      },
    });

    // add new room
    await RoomModel.create({
      id: waitRoomId,
      user1_id: waitingSocketId,
      user2_id: socket.id,
    });

    // update users isMatched attribute
    await UserModel.update(
      { isMatched: true },
      {
        where: {
          socketId: {
            [Op.or]: [waitingSocketId, socket.id],
          },
        },
      }
    );

    // clear countdown interval

    // second user will join the wait room to form a full room
    socket.join(waitRoomId);

    socket.to(waitingSocketId).emit('matchSuccess');
    socket.emit('matchSuccess');
    return;
  }

  let counter = 3;
  const waitRoomId = uuidv4();

  socket.emit('matchCountdown', counter);
  counter--;
  const countdown = setInterval(async () => {
    socket.emit('matchCountdown', counter);
    if (counter === 0) {
      // clear interval
      clearInterval(timers[waitRoomId]);

      // remove waiting room and user if timeout
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
  await WaitRoomModel.create({
    id: waitRoomId,
    waitingSocketId: socket.id,
    difficulty,
  });
};

const matchHandler = (io, socket) => {
  socket.on('matchStart', startMatch(socket));

  socket.on('disconnect', async () => {
    const { socketId: disconnectingUserId, isMatched } =
      (await UserModel.findByPk(socket.id)) as unknown as User;

    if (isMatched) {
      // if user is in a matched room,
      const {
        id: roomId,
        user1_id,
        user2_id,
      } = (await RoomModel.findOne({
        where: {
          [Op.or]: [
            { user1_id: disconnectingUserId },
            { user2_id: disconnectingUserId },
          ],
        },
      })) as unknown as Room;

      const otherUserId = user1_id === socket.id ? user2_id : user1_id;

      // notify 2nd user, change isMatched status, leave socket room
      await UserModel.update(
        { isMatched: false },
        {
          where: {
            socketId: otherUserId,
          },
        }
      );
      let user2Socket = io.of('/').sockets.get(otherUserId);
      socket.broadcast.to(roomId).emit('matchLeave');
      user2Socket?.leave(roomId);

      // delete matched room,
      await RoomModel.destroy({
        where: {
          id: roomId,
        },
      });
    } else {
      // if user is not matched yet, destroy wait room
      await WaitRoomModel.destroy({
        where: {
          waitingSocketId: disconnectingUserId,
        },
      });
    }

    await UserModel.destroy({
      where: {
        socketId: disconnectingUserId,
      },
    });
  });
};
