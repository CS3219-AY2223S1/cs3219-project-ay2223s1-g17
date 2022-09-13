import useSocket from 'components/MatchMake/hooks/useSocket';
import { Box, Button, Stack, Typography } from '@mui/material/';
import { DIFFICULTY } from 'utils/enums';

const MatchMake = () => {
  const { isConnected, startMatch, isMatching, count } = useSocket();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'linear-gradient(to right, #3275c4, #1c2d50)',
      }}
    >
      <Typography
        variant="h5"
        align="center"
        color="white"
        fontWeight="bold"
        sx={{ marginBottom: 4 }}
      >
        Connected: {'' + isConnected}
      </Typography>
      <Stack
        sx={{
          borderRadius: '13px',
          width: '55vh',
          bgcolor: 'white',
          alignItems: 'center',
          columnGap: 8,
          paddingY: 4,
          paddingX: 8,
        }}
      >
        <Stack
          spacing={2}
          sx={{
            width: '40vh',
          }}
        >
          <Typography
            variant="h5"
            align="center"
            color="black"
            fontWeight="bold"
          >
            Select Difficulty
          </Typography>
          <p></p>
          <Button
            type="submit"
            variant="contained"
            size="large"
            style={{
              backgroundColor: '#93DB9A',
              fontSize: '20px',
              fontWeight: 'bold',
              textTransform: 'none',
            }}
            disabled={isMatching}
            onClick={() => startMatch(DIFFICULTY.EASY)}
          >
            {DIFFICULTY.EASY}
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            style={{
              backgroundColor: '#F8B06E',
              fontSize: '20px',
              fontWeight: 'bold',
              textTransform: 'none',
            }}
            disabled={isMatching}
            onClick={() => startMatch(DIFFICULTY.MEDIUM)}
          >
            {DIFFICULTY.MEDIUM}
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            style={{
              backgroundColor: '#ED8D8D',
              fontSize: '20px',
              fontWeight: 'bold',
              textTransform: 'none',
            }}
            disabled={isMatching}
            onClick={() => startMatch(DIFFICULTY.HARD)}
          >
            {DIFFICULTY.HARD}
          </Button>
          {count !== null && (
            <div>
              <b>{count}</b>
            </div>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default MatchMake;
