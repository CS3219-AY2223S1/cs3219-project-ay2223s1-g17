import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import io, { Socket } from 'socket.io-client';
import { DIFFICULTY } from 'utils/enums';

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isMatching, setIsMatching] = useState(false);
  const [count, setCount] = useState(null);

  useEffect(() => {
    const socket = io(
      `http://localhost:${process.env.NEXT_PUBLIC_MATCHING_SERVICE_PORT ?? ''}`
    );
    setSocket(socket);

    socket.on('connect', () => {
      console.log('socket connected');
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected');
    });

    socket.on('matchCountdown', (counter) => {
      console.log(counter);

      // match fail
      if (counter === 0) {
        setCount(null);
        setIsMatching(false);
        return toast('Cannot find a match right now :( Please try again later');
      }

      setCount(counter);
    });

    socket.on('matchSuccess', () => {
      console.log('match success');
    });
    socket.on('matchLeave', () => {
      console.log('the other user has left the room');
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
    socket?.emit('matchStart', difficulty);
    setIsMatching(true);
  };

  return {
    startMatch,
    count,
    isMatching,
  };
};

export default useSocket;
