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
import { DIFFICULTY, LANGUAGE } from 'utils/enums';

export type Question = {
  title?: string;
  difficulty?: DIFFICULTY;
  description?: string;
  examples?: { input: string; output: string; explanation: string }[];
  constraints?: string[];
  templates?: Record<LANGUAGE, string>;
};

const emptyCallBack = () => {};

const MatchingContext = createContext<IMatchingContextValue>({
  startMatch: emptyCallBack,
  leaveRoom: emptyCallBack,
  question: {},
});

export const MatchingProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket>();
  const [count, setCount] = useState<number>();
  const [roomId, setRoomId] = useState<number>();
  const [question, setQuestion] = useState<Question>();

  const router = useRouter();

  useEffect(() => {
    const socket = io(
      `http://localhost:${process.env.NEXT_PUBLIC_MATCHING_SERVICE_PORT ?? ''}`,
      {
        autoConnect: false,
      }
    );

    setSocket(socket);

    socket.on('matchCountdown', (counter) => {
      console.log('cd socket: ', socket);
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

    socket.on('matchSuccess', ({ id, question }) => {
      toast.success('A match has been found!');
      setCount(undefined);
      setRoomId(id);
      setQuestion(question);
      router.push('/room');
    });

    socket.on('matchLeave', () => {
      router.push('/match');
      toast.warn('The other user has left!');
    });

    return () => {
      socket.off('matchSuccess');
      socket.off('matchCountdown');
      socket.off('matchLeave');
      socket.off('timeTick');
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startMatch = (difficulty: DIFFICULTY) => {
    if (!socket) return;
    if (!socket.connected) socket.connect();
    socket.emit('matchStart', difficulty);
    setCount(30);
  };

  const leaveRoom = () => {
    socket?.emit('matchLeave');
    router.push('/match');
  };

  const memoedValue = useMemo(
    () => ({
      startMatch,
      count,
      leaveRoom,
      roomId,
      question: question || {},
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
  roomId?: number;
  question: Question;
}
