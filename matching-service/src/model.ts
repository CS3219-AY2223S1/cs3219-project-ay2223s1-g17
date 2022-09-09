import { DataTypes } from 'sequelize';
import { sequelize } from './db';

export const WaitRoomModel = sequelize.define('WaitRoom', {
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

export interface WaitRoom {
  id: string;
  waitingSocketId: string;
  difficulty: DIFFICULTY;
}
export interface Room {
  id: string;
  user1_id: string;
  user2_id: string;
}

export const RoomModel = sequelize.define('Room', {
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

export const UserModel = sequelize.define('User', {
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

export interface User {
  socketId: string;
  isMatched: boolean;
}

export enum DIFFICULTY {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}
