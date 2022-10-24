import { Grid, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

type Props = {
  completedQuestionsByDay: Record<string, number>;
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

const Heatmap: FC<Props> = ({ completedQuestionsByDay }) => {
  const months = Array.from(Array(12).keys());
  const today = new Date();
  const thisYear = today.getFullYear();
  let dayCounter = -1;
  return (
    <Stack flexDirection="row" columnGap={1} width="100%">
      {months.map((monthIndex) => {
        const daysInMonth = new Date(thisYear, monthIndex + 1, 0).getDate();
        const firstDayOfMonth = new Date(thisYear, monthIndex, 1);
        const emptyDays = firstDayOfMonth.getDay();
        const monthLabel = firstDayOfMonth.toLocaleDateString('en-sg', {
          month: 'short',
        });

        return (
          <Stack
            key={monthLabel}
            justifyContent="center"
            alignItems="center"
            rowGap={0.5}
          >
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
                    : completedQuestionsByDay[String(++dayCounter)] ?? 0;

                  return (
                    <Grid
                      item
                      key={`day-${dayCounter}`}
                      sx={{
                        width: '8px',
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
            <Typography variant="caption" fontWeight={300}>
              {monthLabel}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Heatmap;
