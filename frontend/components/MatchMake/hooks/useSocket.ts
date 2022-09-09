import { SocketAddress } from 'net';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_MATCHING_SERVICE_URL || '');

export enum DIFFICULTY {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isMatching, setIsMatching] = useState(false);
  const [count, setCount] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('matchCountdown', (counter) => {
      console.log(counter);
      if (counter === 0) {
        setCount(null);
        setIsMatching(false);
        return;
      }
      setCount(counter);
    });

    socket.on('matchSuccess', () => {
      alert('match success');
    });
    socket.on('matchLeave', () => {
      alert('the other user has left the room');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('matchSuccess');
      socket.off('matchCountdown');
      socket.off('matchLeave');
    };
  }, []);

  const startMatch = (difficulty: DIFFICULTY) => {
    socket.emit('matchStart', difficulty);
    setIsMatching(true);
  };

  return {
    isConnected,
    startMatch,
    count,
    isMatching,
  };
};

export default useSocket;
