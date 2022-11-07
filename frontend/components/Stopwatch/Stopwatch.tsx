import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import {
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import useCollab from 'contexts/CollabContext';
import { useMatchingContext } from 'contexts/MatchingContext';

const Stopwatch = () => {
  const { roomId } = useMatchingContext();
  const {
    isActive,
    isPaused,
    isLoading,
    time,
    handleStop,
    handlePause,
    handleResume,
    handleStart,
  } = useCollab();

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
