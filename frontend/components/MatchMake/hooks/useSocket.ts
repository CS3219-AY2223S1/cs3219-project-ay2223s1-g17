import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.MATCHING_SERVICE_URL || '');

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState<string | null>(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  };

  return {
    isConnected,
    lastPong,
    sendPing,
  };
};

export default useSocket;
