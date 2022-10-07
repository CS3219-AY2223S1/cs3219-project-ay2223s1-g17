import { useState, useEffect } from 'react';
import { Stack, Typography, Button, IconButton } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

const startTime: Time = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const Stopwatch = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState<Time>(startTime);

  useEffect(() => {
    let interval: NodeJS.Timer | undefined = undefined;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((prev) => {
          const newMinute = prev.seconds === 59;
          const newHour = prev.minutes === 59 && newMinute;
          return {
            hours: newHour ? prev.hours + 1 : prev.hours,
            minutes: newHour ? 0 : newMinute ? prev.minutes + 1 : prev.minutes,
            seconds: newMinute ? 0 : prev.seconds + 1,
          };
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleStop = () => {
    setIsActive(false);
    setTime(startTime);
  };

  return isActive ? (
    <Stack
      sx={{ color: 'black', columnGap: 1 }}
      flexDirection="row"
      alignItems="center"
    >
      <Typography sx={{ fontFamily: 'Digital !important', fontSize: 24 }}>
        {enforceTwoDigits(time.hours)}:{enforceTwoDigits(time.minutes)}:
        {enforceTwoDigits(time.seconds)}
      </Typography>
      <IconButton onClick={handlePause} disableRipple>
        {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
      </IconButton>
      <IconButton onClick={handleStop} disableRipple>
        <StopIcon />
      </IconButton>
    </Stack>
  ) : (
    <Button variant="outlined" onClick={handleStart}>
      Start Timer
    </Button>
  );
};

const enforceTwoDigits = (time: number) => {
  const timeString = String(time);
  const digits = timeString.length;
  if (digits === 2) return timeString;
  if (digits === 1) return '0' + timeString;
};

export default Stopwatch;
