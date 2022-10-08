import { Stack, Typography, Button, ButtonGroup } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { useMatchingContext } from 'contexts/MatchingContext';

const Stopwatch = () => {
  const {
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
    stopwatch: { time, isActive, isPaused },
  } = useMatchingContext();
  // console.log(time, isActive, isPaused);
  return isActive ? (
    <Stack
      sx={{ color: 'black', columnGap: 1 }}
      flexDirection="row"
      alignItems="center"
    >
      <ButtonGroup variant="outlined">
        <Button
          disabled
          sx={{
            color: 'black !important',
            backgroundColor: 'white !important',
          }}
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
        <Button onClick={isPaused ? resumeTimer : pauseTimer}>
          {isPaused ? <PlayArrowIcon /> : <PauseIcon />}
        </Button>
        <Button onClick={stopTimer} color="error">
          <StopIcon />
        </Button>
      </ButtonGroup>
    </Stack>
  ) : (
    <Button variant="outlined" onClick={startTimer}>
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
