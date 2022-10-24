import { Op } from 'sequelize';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { InputOutput } from '..';
import {
  DIFFICULTY,
  RoomModel,
  UserModel,
  WaitRoom,
  WaitRoomModel,
} from '../model';
import { timers } from '../timers';
import fetch from 'node-fetch';

const onMatchStart =
  (io: InputOutput, socket: Socket) => async (difficulty: DIFFICULTY) => {
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

      // second user will join the wait room to form a full room
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

    const waitRoomId = uuidv4();

    let counter = 30;
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

export default onMatchStart;
