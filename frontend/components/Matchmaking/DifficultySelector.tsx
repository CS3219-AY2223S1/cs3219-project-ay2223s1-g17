import { Button, Stack, Typography, useTheme } from '@mui/material';
import { DIFFICULTY } from 'utils/enums';
import { useMatchingContext } from 'contexts/MatchingContext';
import { FC } from 'react';

type Props = {
  hideLabel?: boolean;
};

const DifficultySelector: FC<Props> = ({ hideLabel }) => {
  const theme = useTheme();
  const { isMatching, startMatch } = useMatchingContext();

  return (
    <Stack flexDirection="row" columnGap={2} alignItems="center">
      {hideLabel ? (
        <></>
      ) : (
        <Typography variant="subtitle1" fontWeight={500} fontFamily="Raleway">
          Find Match:
        </Typography>
      )}
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
