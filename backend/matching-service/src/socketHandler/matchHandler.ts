import { Op } from 'sequelize';
import { Socket } from 'socket.io';
import {
  Room,
  RoomModel,
  User,
  UserModel,
  USER_STATUS,
  WaitRoom,
  WaitRoomModel,
} from '../model';

import { InputOutput } from '..';
import { timers } from '../timers';
import onMatchStart from './onMatchStart';

const handleLeaveRoom = async (io: InputOutput, socket: Socket) => {
  const leavingUserId = socket.id;

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

  // notify 2nd user and
  socket.broadcast.to(roomId).emit('matchLeave');

  // leave socket room
  const user2Socket = io.of('/').sockets.get(otherUserId);
  socket.leave(roomId);
  user2Socket?.leave(roomId);

  await UserModel.update(
    { status: USER_STATUS.IDLE },
    {
      where: {
        socketId: {
          [Op.or]: [leavingUserId, otherUserId],
        },
      },
    }
  );

  await RoomModel.destroy({
    where: {
      id: roomId,
    },
  });
};

const onDisconnect = async (io: InputOutput, socket: Socket) => {
  const user = (await UserModel.findByPk(socket.id)) as unknown as User;

  if (user.status === USER_STATUS.IN_ROOM) {
    await handleLeaveRoom(io, socket);
  } else if (user.status === USER_STATUS.IN_QUEUE) {
    await onStopQueuing(socket);
  }

  await UserModel.destroy({
    where: {
      socketId: socket.id,
    },
  });
};

const onStopQueuing = async (socket: Socket) => {
  const waitRoom = (await WaitRoomModel.findOne({
    where: {
      waitingSocketId: socket.id,
    },
  })) as unknown as WaitRoom;

  await WaitRoomModel.destroy({
    where: {
      waitingSocketId: socket.id,
    },
  });

  clearInterval(timers[waitRoom?.id]);
};

export const registerMatchHandler = (io: InputOutput, socket: Socket) => {
  socket.on('matchStart', (data) => onMatchStart(socket, data));
  socket.on('matchLeave', () => handleLeaveRoom(io, socket));
  socket.on('disconnect', () => onDisconnect(io, socket));
  socket.on('stopQueuing', () => onStopQueuing(socket));
};
