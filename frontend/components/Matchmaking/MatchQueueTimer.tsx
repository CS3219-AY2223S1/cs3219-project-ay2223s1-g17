import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useMatching } from 'contexts/MatchingContext';
import TimeDisplay from './TimeDisplay';

const MatchQueueTimer = () => {
  const { count, stopQueuing } = useMatching();

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
      <Tooltip title="Cancel matchmaking">
        <IconButton onClick={stopQueuing}>
          <CloseIcon color="error" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default MatchQueueTimer;
