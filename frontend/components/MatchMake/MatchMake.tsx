import { Box, Button, Stack, Typography } from '@mui/material/';
import { DIFFICULTY } from 'utils/enums';
import Countdown from 'components/Countdown';
import { useMatchingContext } from 'contexts/MatchingContext';

const MatchMake = () => {
  const { startMatch, count } = useMatchingContext();
  const isMatching = count !== undefined;

  return isMatching ? (
    <Countdown count={count} />
  ) : (
    <Box sx={{ width: '50%', margin: 'auto', paddingTop: '20%' }}>
      <Stack spacing={2}>
        <Typography
          align="center"
          color="black"
          fontWeight="bold"
          fontSize={24}
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
            textTransform: 'capitalize',
          }}
          disabled={isMatching}
          onClick={() => startMatch(DIFFICULTY.EASY)}
        >
          {DIFFICULTY.EASY.toLowerCase()}
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          style={{
            backgroundColor: '#F8B06E',
            fontSize: '20px',
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}
          disabled={isMatching}
          onClick={() => startMatch(DIFFICULTY.MEDIUM)}
        >
          {DIFFICULTY.MEDIUM.toLowerCase()}
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          style={{
            backgroundColor: '#ED8D8D',
            fontSize: '20px',
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}
          disabled={isMatching}
          onClick={() => startMatch(DIFFICULTY.HARD)}
        >
          {DIFFICULTY.HARD.toLowerCase()}
        </Button>
      </Stack>
    </Box>
  );
};

export default MatchMake;
