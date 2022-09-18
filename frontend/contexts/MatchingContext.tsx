/* eslint-disable @typescript-eslint/no-empty-function */
import { useRouter } from 'next/router';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { io, Socket } from 'socket.io-client';
import { DIFFICULTY } from 'utils/enums';

const MatchingContext = createContext<IMatchingContextValue>({
  startMatch: () => {},
  leaveRoom: () => {},
});

export const MatchingProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket>();
  const [count, setCount] = useState<number>();

  const router = useRouter();

  useEffect(() => {
    const socket = io(
      `http://localhost:${process.env.NEXT_PUBLIC_MATCHING_SERVICE_PORT ?? ''}`,
      {
        autoConnect: false,
      }
    );

    setSocket(socket);

    socket.on('connect', () => {
      // nth to do here for now, can store session Id in the future to maintain session through page reload
    });

    socket.on('disconnect', () => {
      // TODO
    });

    socket.on('matchLeave', () => {});

    socket.on('matchCountdown', (counter) => {
      // timeout
      if (counter === 0) {
        setCount(undefined);
        return toast.info(
          'Cannot find a match right now 😅 Please try again later'
        );
      }

      // counting down
      setCount(counter);
    });

    socket.on('matchSuccess', () => {
      setCount(undefined);

      router.push('/room');
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
    if (!socket) return;
    socket.connect();
    socket.emit('matchStart', difficulty);
    setCount(30);
  };

  const leaveRoom = () => {
    socket?.disconnect();
    router.push('/match');
  };

  const memoedValue = useMemo(
    () => ({
      startMatch,
      count,
      leaveRoom,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, socket]
  );

  return (
    <MatchingContext.Provider value={memoedValue}>
      {children}
    </MatchingContext.Provider>
  );
};

export const useMatchingContext = () => {
  return useContext(MatchingContext);
};

interface IMatchingContextValue {
  startMatch: (difficulty: DIFFICULTY) => void;
  count?: number;
  leaveRoom: () => void;
}
