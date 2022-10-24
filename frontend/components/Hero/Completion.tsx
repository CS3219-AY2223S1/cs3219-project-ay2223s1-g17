import {
  Box,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import React, { FC } from 'react';
import { DIFFICULTY } from 'utils/enums';

type Props = CompletionCircleProps & CompletionByDifficultyProps;

type CompletionCircleProps = {
  numCompletedQuestions: number;
};

type CompletionByDifficultyProps = {
  completedQuestionsByDifficulty: Record<string, number>;
};

// TODO: fetch this instead?
const TOTAL_NUM_QUESTIONS = 30;
const TOTAL_NUM_QUESTIONS_BY_DIFFICULTY: Record<DIFFICULTY, number> = {
  EASY: 10,
  MEDIUM: 10,
  HARD: 10,
};

const Completion: FC<Props> = ({
  numCompletedQuestions,
  completedQuestionsByDifficulty,
}) => {
  return (
    <Stack flexDirection="row" width="100%">
      <CompletionCircle numCompletedQuestions={numCompletedQuestions} />
      <CompletionByDifficulty
        completedQuestionsByDifficulty={completedQuestionsByDifficulty}
      />
    </Stack>
  );
};

const CompletionCircle: FC<CompletionCircleProps> = ({
  numCompletedQuestions,
}) => {
  const completionPercentage =
    Math.floor(numCompletedQuestions / TOTAL_NUM_QUESTIONS) * 100;

  return (
    <Stack
      sx={{ m: 2, position: 'relative' }}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        sx={{
          borderRadius: '50%',
          height: '6.5rem',
          width: '6.5rem',
          background: `conic-gradient(rgb(3, 133, 255) ${completionPercentage}%,rgb(242,242,242) ${completionPercentage}%)`,
        }}
      />
      <Stack
        sx={{
          borderRadius: '50%',
          height: '6rem',
          width: '6rem',
          bgcolor: 'rgb(248,248,248)',
          position: 'absolute',
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6">{numCompletedQuestions}</Typography>
        <Typography variant="subtitle2" fontWeight={300}>
          Completed
        </Typography>
      </Stack>
    </Stack>
  );
};

const CompletionByDifficulty: FC<CompletionByDifficultyProps> = ({
  completedQuestionsByDifficulty,
}) => {
  const theme = useTheme();
  return (
    <Stack sx={{ flexGrow: 1 }}>
      {Object.values(DIFFICULTY).map((difficulty) => (
        <Stack key={difficulty} sx={{ m: 1 }}>
          <Stack
            flexDirection="row"
            width="100%"
            justifyContent="space-between"
          >
            <Typography
              variant="caption"
              textTransform="capitalize"
              color={theme.palette[`${difficulty}`].main}
              fontWeight={500}
            >
              {difficulty.toLowerCase()}
            </Typography>
            <Stack flexDirection="row" columnGap={0.5}>
              <Typography variant="caption" fontWeight="bold">
                {completedQuestionsByDifficulty[difficulty] ?? 0}
              </Typography>
              <Typography
                variant="caption"
                fontSize={10}
                color="gray"
                fontStyle="italic"
                fontWeight="light"
              >
                /{TOTAL_NUM_QUESTIONS_BY_DIFFICULTY[difficulty]}
              </Typography>
            </Stack>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={
              Math.floor(
                (completedQuestionsByDifficulty[difficulty] ?? 0) /
                  TOTAL_NUM_QUESTIONS_BY_DIFFICULTY[difficulty]
              ) * 100
            }
            sx={{
              borderRadius: 5,
              bgcolor: `${theme.palette[`${difficulty}`].main}40`,
              '& .MuiLinearProgress-bar': {
                backgroundColor: theme.palette[`${difficulty}`].main,
              },
            }}
          />
        </Stack>
      ))}
    </Stack>
  );
};

export default Completion;
