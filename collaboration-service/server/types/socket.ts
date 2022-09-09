export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  code: (code: string) => void;
  roomData: () => void;
}

export interface ClientToServerEvents {
  join: (socketData: SocketData, callback: (error: any) => void) => void;
  sendCode: (code: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  roomId: string;
}

export interface RoomData {
  roomId: string;
  users: User[];
}

export interface User {
  id: string;
  name: string;
  roomId: string;
}

export interface Error {
  error: string;
}
