import {
  Stack,
  Typography,
  Button,
  ButtonGroup,
  Tooltip,
  IconButton,
} from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { useMatchingContext } from 'contexts/MatchingContext';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

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

const Stopwatch = () => {
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

    sock.auth = { roomId };
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
  return isActive ? (
    <Stack
      sx={{ color: 'black', columnGap: 1, display: roomId ? 'flex' : 'none' }}
      flexDirection="row"
      alignItems="center"
    >
      <ButtonGroup variant="outlined" size="small">
        <Button
          disabled
          sx={{
            color: 'black !important',
            backgroundColor: 'white !important',
          }}
          size="small"
        >
          <Typography
            sx={{
              fontFamily: 'Digital !important',
              fontSize: 24,
              width: '6rem',
            }}
          >
            {enforceTwoDigits(time.hours)}:{enforceTwoDigits(time.minutes)}:
            {enforceTwoDigits(time.seconds)}
          </Typography>
        </Button>
        <Button
          onClick={isPaused ? handleResume : handlePause}
          disabled={isLoading}
          size="small"
        >
          {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
        </Button>
        <Button
          onClick={handleStop}
          color="error"
          disabled={isLoading}
          size="small"
        >
          <StopIcon />
        </Button>
      </ButtonGroup>
    </Stack>
  ) : (
    <Tooltip title="Start Timer">
      <IconButton
        onClick={handleStart}
        disabled={isLoading}
        sx={{ display: roomId ? 'flex' : 'none' }}
      >
        <AccessAlarmIcon />
      </IconButton>
    </Tooltip>
  );
};

const enforceTwoDigits = (time: number) => {
  const timeString = String(time);
  const digits = timeString.length;
  if (digits === 2) return timeString;
  if (digits === 1) return '0' + timeString;
};

export default Stopwatch;
