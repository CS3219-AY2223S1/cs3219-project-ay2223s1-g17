import useSocket from 'components/MatchMake/hooks/useSocket';
import { Button, Stack, Typography } from '@mui/material/';
import { DIFFICULTY } from 'utils/enums';
import Countdown from 'components/Countdown';

const MatchMake = () => {
  const { startMatch, isMatching, count } = useSocket();

  return isMatching && count ? (
    <Countdown count={count} />
  ) : (
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
        <Typography variant="h5" align="center" color="black" fontWeight="bold">
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
      </Stack>
    </Stack>
  );
};

export default MatchMake;
