import { Op } from 'sequelize';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import {
  DIFFICULTY,
  LANGUAGE,
  RoomModel,
  UserModel,
  USER_STATUS,
  WaitRoom,
  WaitRoomModel,
} from '../model';
import { timers } from '../timers';
import fetch from 'node-fetch';

const onMatchStart = async (
  socket: Socket,
  {
    difficulty,
    language,
  }: {
    difficulty: DIFFICULTY;
    language: LANGUAGE;
  }
) => {
  const waitRooms = (await WaitRoomModel.findAll({
    where: {
      difficulty,
      language,
    },
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

    // update user status
    await UserModel.update(
      { status: USER_STATUS.IN_ROOM },
      {
        where: {
          socketId: {
            [Op.or]: [waitingSocketId, socket.id],
          },
        },
      }
    );

    // join socket room
    socket.join(waitRoomId);

    // TODO: Make use of env variable when deployed to prod
    const res = await fetch(
      `http://question-service:8003/question/get/difficulty/${difficulty}`
    );
    const questions = await res.json();

    // notify both users
    socket
      .to(waitingSocketId)
      .emit('matchSuccess', { id: waitRoomId, questions });
    socket.emit('matchSuccess', { id: waitRoomId, questions });
    return;
  }

  // create a wait room and start waiting
  const waitRoomId = uuidv4();

  socket.join(waitRoomId);

  await WaitRoomModel.create({
    id: waitRoomId,
    waitingSocketId: socket.id,
    difficulty,
    language,
  });

  await UserModel.update(
    { status: USER_STATUS.IN_QUEUE },
    {
      where: {
        socketId: socket.id,
      },
    }
  );

  // set up timer
  let counter = 29;
  const countdown = setInterval(async () => {
    socket.emit('matchCountdown', counter);
    if (counter === 0) {
      clearInterval(timers[waitRoomId]);

      await WaitRoomModel.destroy({
        where: {
          id: waitRoomId,
        },
      });

      await UserModel.update(
        { status: USER_STATUS.IDLE },
        {
          where: {
            socketId: socket.id,
          },
        }
      );

      socket.leave(waitRoomId);
    }
    counter--;
  }, 1000);

  timers[waitRoomId] = countdown;
};

export default onMatchStart;
