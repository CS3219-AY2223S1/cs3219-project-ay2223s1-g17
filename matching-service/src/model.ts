import { DataTypes } from 'sequelize/types';
import { sequelize } from './db';

const WaitRoomModel = sequelize.define('WaitRoom', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  waitingUserId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const RoomModel = sequelize.define('Room', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  user1_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user2_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const UserModel = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  socketId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { RoomModel, UserModel, WaitRoomModel };
