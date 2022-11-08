import { Stack, Tooltip, Typography } from '@mui/material';
import LoadingWrapper from 'components/Loading/LoadingWrapper';
import DifficultySelector from 'components/Matchmaking/DifficultySelector';
import React, { FC } from 'react';
import { Whatshot } from '@mui/icons-material';
import { amber } from '@mui/material/colors';

type Props = {
  completedQuestionsByDay?: Record<string, number>;
  isLoading: boolean;
};

const QuickMatch: FC<Props> = ({ completedQuestionsByDay, isLoading }) => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const timeSinceStartOfYear = now.getTime() - startOfYear.getTime();
  const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
  const dayOfYear = String(
    Math.floor(timeSinceStartOfYear / oneDayInMilliseconds)
  );
  const isDailyStreakClaimed = completedQuestionsByDay?.[dayOfYear]
    ? completedQuestionsByDay[dayOfYear] > 0
    : false;

  return (
    <Stack
      rowGap={isLoading ? 0 : 2}
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <LoadingWrapper isLoading={isLoading}>
        <Stack flexDirection="row" columnGap={1} alignItems="center">
          <Typography variant="h5" color="primary" fontWeight={500}>
            Quick Match
          </Typography>
          <Tooltip
            title={
              isDailyStreakClaimed
                ? 'Good job! You have already refreshed your streak today'
                : 'Find a match to continue your streak!'
            }
          >
            <Whatshot
              sx={{
                color: isDailyStreakClaimed ? 'secondary.main' : amber[800],
              }}
            />
          </Tooltip>
        </Stack>
      </LoadingWrapper>
      <LoadingWrapper isLoading={isLoading}>
        <DifficultySelector hideLabel large />
      </LoadingWrapper>
    </Stack>
  );
};

export default QuickMatch;
