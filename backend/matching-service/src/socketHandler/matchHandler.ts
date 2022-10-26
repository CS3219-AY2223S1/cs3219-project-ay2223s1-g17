import { Op } from 'sequelize';
import { Socket } from 'socket.io';
import {
  Room,
  RoomModel,
  User,
  UserModel,
  WaitRoom,
  WaitRoomModel,
} from '../model';

import { InputOutput } from '..';
import onMatchStart from './onMatchStart';
import { timers } from '../timers';

const handleLeave = async (io: InputOutput, socket: Socket) => {
  const user = (await UserModel.findByPk(socket.id)) as unknown as User;
  if (!user) return;

  const { isMatched } = user;
  const leavingUserId = socket.id;

  if (isMatched) {
    // if user is in a matched room
    const {
      id: roomId,
      user1_id,
      user2_id,
    } = (await RoomModel.findOne({
      where: {
        [Op.or]: [{ user1_id: leavingUserId }, { user2_id: leavingUserId }],
      },
    })) as unknown as Room;

    const otherUserId = user1_id === socket.id ? user2_id : user1_id;

    // notify 2nd user
    socket.broadcast.to(roomId).emit('matchLeave');
    const user2Socket = io.of('/').sockets.get(otherUserId);
    if (user2Socket) {
      user2Socket.leave(roomId);
    }

    await UserModel.update(
      { isMatched: false },
      {
        where: {
          socketId: otherUserId,
        },
      }
    );

    await RoomModel.destroy({
      where: {
        id: roomId,
      },
    });
  } else {
    const { id } = (await WaitRoomModel.findOne({
      where: {
        waitingSocketId: leavingUserId,
      },
    })) as unknown as WaitRoom;

    // if user is not matched yet, destroy wait room, clear timer
    await WaitRoomModel.destroy({
      where: {
        waitingSocketId: leavingUserId,
      },
    });

    clearInterval(timers[id]);
  }
};

const onMatchLeave = (io: InputOutput, socket: Socket) => () => {
  handleLeave(io, socket);
};

const onDisconnect = (io: InputOutput, socket: Socket) => async () => {
  await handleLeave(io, socket);
  await UserModel.destroy({
    where: {
      socketId: socket.id,
    },
  });
};

export const registerMatchHandler = (io: InputOutput, socket: Socket) => {
  socket.on('matchStart', onMatchStart(io, socket));
  socket.on('matchLeave', onMatchLeave(io, socket));
  socket.on('disconnect', onDisconnect(io, socket));
};
