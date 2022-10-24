import { Button, Stack, Typography, useTheme } from '@mui/material';
import { DIFFICULTY } from 'utils/enums';
import { useMatchingContext } from 'contexts/MatchingContext';

const DifficultySelector = () => {
  const theme = useTheme();
  const { isMatching, startMatch } = useMatchingContext();

  return (
    <Stack flexDirection="row" columnGap={2} alignItems="center">
      <Typography variant="subtitle1" fontWeight={500} fontFamily="Raleway">
        Find Match:
      </Typography>
      <Stack flexDirection="row" columnGap={1}>
        {Object.values(DIFFICULTY).map((difficulty) => {
          return (
            <Button
              key={difficulty}
              type="submit"
              variant="contained"
              size="small"
              sx={{
                backgroundColor: theme.palette[`${difficulty}`].main,
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
    </Stack>
  );
};

export default DifficultySelector;
