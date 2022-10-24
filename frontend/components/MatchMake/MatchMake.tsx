import { Box, Button, Stack, Typography, useTheme } from '@mui/material/';
import { DIFFICULTY } from 'utils/enums';
import Countdown from 'components/Countdown';
import { useMatchingContext } from 'contexts/MatchingContext';

const MatchMake = () => {
  const { startMatch, count } = useMatchingContext();
  const theme = useTheme();
  const isMatching = count !== undefined;

  return isMatching ? (
    <Countdown count={count} />
  ) : (
    <Box
      sx={{
        margin: 'auto',
        paddingTop: '20%',
        width: '50%',
      }}
    >
      <Stack spacing={2}>
        <Typography align="center" fontWeight="bold" fontSize={28}>
          Select Difficulty
        </Typography>
        {Object.values(DIFFICULTY).map((difficulty) => {
          return (
            <Button
              key={difficulty}
              type="submit"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: theme.palette[`${difficulty}`].main,
                fontSize: '20px',
                fontWeight: 500,
                textTransform: 'capitalize',
              }}
              disabled={isMatching}
              onClick={() => startMatch(difficulty)}
            >
              {difficulty.toLowerCase()}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

export default MatchMake;
