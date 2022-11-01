import { IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useMatchingContext } from 'contexts/MatchingContext';
import TimeDisplay from './TimeDisplay';

const MatchQueueTimer = () => {
  const { count, stopQueuing } = useMatchingContext();

  return (
    <Stack flexDirection="row" alignItems="center">
      <Stack>
        <Stack flexDirection="row" alignItems="center">
          <Typography variant="caption" color="primary" sx={{ mr: 1 }}>
            Finding Match
          </Typography>
        </Stack>
        <TimeDisplay count={count ?? 0} />
      </Stack>
      <IconButton onClick={stopQueuing}>
        <CloseIcon color="error" />
      </IconButton>
    </Stack>
  );
};

export default MatchQueueTimer;
