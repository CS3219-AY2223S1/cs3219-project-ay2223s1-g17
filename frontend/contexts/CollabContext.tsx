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

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

type Timer = {
  time: Time;
  isActive: boolean;
  isPaused: boolean;
};

const initialTime: Time = { seconds: 0, minutes: 0, hours: 0 };
const initialTimer: Timer = {
  time: initialTime,
  isActive: false,
  isPaused: false,
};

interface ICollabContext {
  isActive: boolean;
  isPaused: boolean;
  isLoading: boolean;
  time: Time;
  handleStop: () => void;
  handlePause: () => void;
  handleResume: () => void;
  handleStart: () => void;
}

const CollabContext = createContext<ICollabContext>({
  isActive: false,
  isPaused: false,
  isLoading: false,
  time: initialTime,
  handleStop: () => {},
  handleResume: () => {},
  handlePause: () => {},
  handleStart: () => {},
});

export const CollabProvider = ({ children }: { children: ReactNode }) => {
  const { roomId } = useMatchingContext();

  const [socket, setSocket] = useState<Socket>();
  const [timer, setTimer] = useState<Timer>(initialTimer);
  const [isLoading, setIsLoading] = useState(false);
  const { time, isActive, isPaused } = timer;

  useEffect(() => {
    const url =
      process.env.NEXT_PUBLIC_ENV === 'production'
        ? process.env.NEXT_PUBLIC_COLLABORATION_ENDPOINT
        : `http://localhost:${process.env.NEXT_PUBLIC_COLLABORATION_SERVICE_PORT}`;
    const sock = io(url || '', {
      autoConnect: false,
    });

    if (!roomId) return;
    console.log('ue: ', roomId);
    sock.auth = { roomId };
    sock.connect();
    setSocket(sock);

    sock.on('timerTick', (newTimer: Timer) => {
      console.log('tick');
      setTimer(newTimer);
    });

    sock.on('timerLoad', () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });

    return () => {
      setIsLoading(false);
      setTimer(initialTimer);
      sock.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const handleStart = () => {
    console.log('timer started', roomId, socket);
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
      isPaused,
      isLoading,
      time,
      handleStop,
      handlePause,
      handleResume,
      handleStart,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isActive, isPaused, isLoading, time, socket, roomId]
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
