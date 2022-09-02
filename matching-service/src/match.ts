import { Socket } from 'socket.io';

export const easyWaitRoom: WaitRoom[] = [];
export const mediumWaitRoom: WaitRoom[] = [];
export const hardWaitRoom: WaitRoom[] = [];

export const activeRooms: Room[] = [];

export interface Room {
  id: string;
  user1: string;
  socket1: Socket;
  user2: string;
  socket2: Socket;
}

export interface WaitRoom {
  id: string;
  user1: string;
  socket1: Socket;
  countdown1: NodeJS.Timer;
  user2?: string;
  socket2?: Socket;
}
