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

export type Question = Partial<{
  _id: string;
  title: string;
  difficulty: DIFFICULTY;
  description: string;
  examples: { input: string; output: string; explanation: string }[];
  constraints: string[];
  templates: Record<LANGUAGE, string>;
}>;

const emptyCallBack = () => {};

const MatchingContext = createContext<IMatchingContextValue>({
  startMatch: emptyCallBack,
  leaveRoom: emptyCallBack,
  isMatching: false,
  questions: [{}],
});

export const MatchingProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket>();
  const [count, setCount] = useState<number>();
  const [roomId, setRoomId] = useState<number>();
  const [questions, setQuestions] = useState<Question[]>();
  const [isMatching, setIsMatching] = useState(false);

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
      // timeout
      if (counter === 0) {
        setCount(undefined);
        setIsMatching(false);
        return toast.info(
          'Cannot find a match right now 😅 Please try again later'
        );
      }

      // counting down
      setCount(counter);
    });

    socket.on('matchSuccess', ({ id, questions }) => {
      toast.success('A match has been found!');
      setCount(undefined);
      setRoomId(id);
      setQuestions(questions);
      setIsMatching(false);
      router.push('/room');
    });

    socket.on('matchLeave', () => {
      setRoomId(undefined);
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

    setIsMatching(true);
    socket.emit('matchStart', difficulty);
    setCount(30);
  };

  const leaveRoom = (returnHome = true) => {
    socket?.emit('matchLeave');
    setIsMatching(false);
    setRoomId(undefined);

    if (returnHome) router.push('/');
  };

  const memoedValue = useMemo(
    () => ({
      startMatch,
      count,
      leaveRoom,
      isMatching,
      roomId,
      questions: questions || [{}],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, isMatching, roomId, socket]
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
  isMatching: boolean;
  leaveRoom: (returnHome?: boolean) => void;
  roomId?: number;
  questions: Question[];
}
