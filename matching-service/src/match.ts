import { Socket } from 'socket.io';

export let easyWaitRooms: WaitRoom[] = [];
export let mediumWaitRooms: WaitRoom[] = [];
export let hardWaitRooms: WaitRoom[] = [];

export const activeRooms: Room[] = [];

export enum DIFFICULTY {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export const getWaitingRooms = (difficulty: DIFFICULTY) => {
  switch (difficulty) {
    case DIFFICULTY.EASY:
      return easyWaitRooms;
    case DIFFICULTY.MEDIUM:
      return mediumWaitRooms;
    case DIFFICULTY.HARD:
      return hardWaitRooms;
    default:
      return null;
  }
};

export interface Room {
  id: string;
  user1: string;
  user2: string;
}

export interface WaitRoom {
  id: string;
  waitingUserId: string;
  waitingSocketId: string;
  countdown: NodeJS.Timer;
}
