import { FC } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import LoadingWrapper from 'components/Loading/LoadingWrapper';

type Props = {
  completedQuestionsByDay?: Record<string, number>;
  longestStreak?: number;
  isLoading: boolean;
};

const completionGreenPalette: Record<number, string> = {
  1: '#daf2da',
  2: '#b8e6b8',
  3: '#98d998',
  4: '#7acc7a',
  5: '#60bf60',
  6: '#47b347',
  7: '#32a632',
  8: '#1f991f',
  9: '#118c11',
  10: '#008000',
};

const Heatmap: FC<Props> = ({
  completedQuestionsByDay,
  longestStreak,
  isLoading,
}) => {
  const months = Array.from(Array(12).keys());
  const today = new Date();
  const thisYear = today.getFullYear();
  const totalQuestionsCompleted = Object.values(
    completedQuestionsByDay ?? {}
  ).reduce((a, b) => a + b, 0);
  let dayCounter = -1;
  return (
    <Stack>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 1, pb: 1 }}
      >
        <LoadingWrapper isLoading={isLoading}>
          <Stack flexDirection="row" columnGap={0.5}>
            <Typography variant="h5" fontWeight="bold">
              {totalQuestionsCompleted}
            </Typography>
            <Typography variant="subtitle1" color="secondary.dark">
              submissions in {thisYear}
            </Typography>
          </Stack>
        </LoadingWrapper>

        <LoadingWrapper isLoading={isLoading}>
          <Stack flexDirection="row" columnGap={2}>
            <Stack flexDirection="row" columnGap={0.5}>
              <Typography variant="body2" fontWeight="light" color="secondary">
                Total Active Days:
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {Object.keys(completedQuestionsByDay ?? {}).length}
              </Typography>
            </Stack>

            <Stack flexDirection="row" columnGap={0.5}>
              <Typography variant="body2" fontWeight="light" color="secondary">
                Longest Streak:
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {longestStreak}
              </Typography>
            </Stack>
          </Stack>
        </LoadingWrapper>
      </Stack>

      <Stack flexDirection="row" columnGap={1} sx={{ p: 1 }}>
        {months.map((monthIndex) => {
          const daysInMonth = new Date(thisYear, monthIndex + 1, 0).getDate();
          const firstDayOfMonth = new Date(thisYear, monthIndex, 1);
          const emptyDays = firstDayOfMonth.getDay();
          const monthLabel = firstDayOfMonth.toLocaleDateString('en-sg', {
            month: 'short',
          });

          return (
            <LoadingWrapper
              key={monthLabel}
              variant="rectangular"
              isLoading={isLoading}
              styles={{ borderRadius: '4px' }}
            >
              <Stack justifyContent="center" alignItems="center" rowGap={0.5}>
                <Grid
                  container
                  gap={0.25}
                  sx={{
                    display: 'grid',
                    gridAutoFlow: 'column',
                    gridTemplateRows: 'repeat(7, 1fr)',
                  }}
                >
                  {Array.from(Array(daysInMonth + emptyDays).keys()).map(
                    (dayIndex) => {
                      const emptyDay = dayIndex < emptyDays;
                      const completedQuestionsToday = emptyDay
                        ? 0
                        : completedQuestionsByDay?.[String(++dayCounter)] ?? 0;

                      return (
                        <Grid
                          item
                          key={`${monthLabel}-${dayIndex}`}
                          sx={{
                            width: { xs: '7px', lg: '9px' },
                            aspectRatio: '1/1',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '2px',
                            bgcolor: emptyDay
                              ? 'white'
                              : completedQuestionsToday
                              ? completionGreenPalette[
                                  Math.min(10, completedQuestionsToday)
                                ]
                              : 'rgba(0,0,0,0.05)',
                          }}
                        />
                      );
                    }
                  )}
                </Grid>
                <Typography
                  variant="caption"
                  fontWeight="light"
                  color="secondary.light"
                >
                  {monthLabel}
                </Typography>
              </Stack>
            </LoadingWrapper>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Heatmap;
