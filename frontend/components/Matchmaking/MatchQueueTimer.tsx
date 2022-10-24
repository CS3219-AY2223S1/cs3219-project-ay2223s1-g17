import { Box, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useMatchingContext } from 'contexts/MatchingContext';

const MatchQueueTimer = () => {
  const { count, leaveRoom } = useMatchingContext();

  return (
    <Stack flexDirection="row" alignItems="center">
      <Stack>
        <Stack flexDirection="row" alignItems="center">
          <Typography variant="caption" sx={{ mr: 1 }}>
            Finding Match
          </Typography>
          {Array.from(Array(3).keys()).map((index) => {
            return (
              <Box
                key={index}
                sx={{
                  height: '4px',
                  width: '4px',
                  borderRadius: '50%',
                  bgcolor: 'blue',
                }}
              />
            );
          })}
        </Stack>
        {/* <Stack flexDirection="row" columnGap={0.25} alignItems="end">
        <Typography
        sx={{
          fontSize: 20,
        }}
        >
          {count < 10 ? '0' : ''}
          {count}
          </Typography>
          <Typography
          sx={{
            fontSize: 12,
            mb: 0.35,
          }}
          >
          s
          </Typography>
        </Stack> */}
      </Stack>
      <IconButton onClick={() => leaveRoom(false)}>
        <CloseIcon color="error" />
      </IconButton>
    </Stack>
  );
};

export default MatchQueueTimer;
