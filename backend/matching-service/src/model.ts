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
  language: {
    type: DataTypes.ENUM({
      values: ['PYTHON', 'JAVA', 'C++', 'JAVSCRIPT'],
    }),
    allowNull: false,
  },
});

export interface WaitRoom {
  id: string;
  waitingSocketId: string;
  difficulty: DIFFICULTY;
  language: LANGUAGE;
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
  status: {
    type: DataTypes.ENUM({
      values: ['IDLE', 'IN_QUEUE', 'IN_ROOM'],
    }),
    allowNull: false,
    defaultValue: 'IDLE',
  },
});

export interface User {
  socketId: string;
  status: USER_STATUS;
}

export enum DIFFICULTY {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}
export enum USER_STATUS {
  IDLE = 'IDLE',
  IN_QUEUE = 'IN_QUEUE',
  IN_ROOM = 'IN_ROOM',
}

export enum LANGUAGE {
  PYTHON = 'PYTHON',
  JAVA = 'JAVA',
  CPP = 'C++',
  JAVASCRIPT = 'JAVASCRIPT',
}
