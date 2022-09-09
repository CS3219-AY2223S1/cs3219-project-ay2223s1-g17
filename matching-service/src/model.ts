import { DataTypes } from 'sequelize';
import { sequelize } from './db';

const WaitRoomModel = sequelize.define('WaitRoom', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  waitingSocketId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.ENUM({
      values: ['HARD', 'MEDIUM', 'EASY'],
    }),
    allowNull: false,
  },
});

interface WaitRoom {
  id: string;
  waitingSocketId: string;
  difficulty: DIFFICULTY;
}
interface Room {
  id: string;
  user1_id: string;
  user2_id: string;
}

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
  socketId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  isMatched: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

interface User {
  socketId: string;
  isMatched: boolean;
}

export enum DIFFICULTY {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}
export { RoomModel, UserModel, WaitRoomModel, WaitRoom, User, Room };
