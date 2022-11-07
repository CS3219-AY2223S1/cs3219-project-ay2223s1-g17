/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { io, Socket } from 'socket.io-client';

import { useMatchingContext } from 'contexts/MatchingContext';

type Timer = {
  time: Time;
  isActive: boolean;
  isPaused: boolean;
};

export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

interface ICollabContext {
  isActive: boolean;
  time: Time;
  isPaused: boolean;
  handleStop: () => void;
  handlePause: () => void;
  handleResume: () => void;
  handleStart: () => void;
  isLoading: boolean;
}

const CollabContext = createContext<ICollabContext>({
  isActive: false,
  time: { seconds: 0, minutes: 0, hours: 0 },
  isPaused: false,
  handleStop: () => {},
  handleResume: () => {},
  handlePause: () => {},
  handleStart: () => {},
  isLoading: false,
});

export const CollabProvider = ({ children }: { children: ReactNode }) => {
  const { roomId } = useMatchingContext();

  const initialTime: Time = { seconds: 0, minutes: 0, hours: 0 };
  const [socket, setSocket] = useState<Socket>();
  const [timer, setTimer] = useState<Timer>({
    time: initialTime,
    isActive: false,
    isPaused: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { time, isActive, isPaused } = timer;

  const timerLoad = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const url =
      process.env.NEXT_PUBLIC_ENV === 'production'
        ? process.env.NEXT_PUBLIC_COLLABORATION_ENDPOINT
        : `http://localhost:${process.env.NEXT_PUBLIC_COLLABORATION_SERVICE_PORT}`;
    const sock = io(url || '', {
      autoConnect: false,
    });

    if (!roomId) return;

    sock.Collab = { roomId };
    sock.connect();
    setSocket(sock);

    sock.on('timerTick', (newTimer: Timer) => {
      setTimer(newTimer);
    });

    sock.on('timerLoad', () => timerLoad());

    return () => {
      sock.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const handleStart = () => {
    socket?.emit('timerStart');
  };

  const handleStop = () => {
    socket?.emit('timerStop');
  };

  const handlePause = () => {
    socket?.emit('timerPause');
  };

  const handleResume = () => {
    socket?.emit('timerResume');
  };

  const memoedValue = useMemo(
    () => ({
      isActive,
      time,
      isPaused,
      handleStop,
      handlePause,
      handleResume,
      handleStart,
      isLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading]
  );

  return (
    <CollabContext.Provider value={memoedValue}>
      {children}
    </CollabContext.Provider>
  );
};

const useCollab = () => {
  return useContext(CollabContext);
};

export default useCollab;
