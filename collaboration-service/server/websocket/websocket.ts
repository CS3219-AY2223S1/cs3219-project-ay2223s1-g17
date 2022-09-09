import { Server } from 'socket.io';

// TODO: To change to enum
const WEBSOCKET_CORS = {
  origin: '*',
  methods: ['GET', 'POST'],
};

/**
 * Web Socket using Singleton Design Pattern
 */
class WebSocket extends Server {
  private static io: WebSocket;

  constructor(httpServer: any) {
    super(httpServer, {
      cors: WEBSOCKET_CORS,
    });
  }

  public static getInstance(httpServer?: any): WebSocket {
    if (!WebSocket.io) {
      WebSocket.io = new WebSocket(httpServer);
    }

    return WebSocket.io;
  }
}

export default WebSocket;
