import {
  Box,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import LoadingWrapper from 'components/Loading/LoadingWrapper';
import React, { FC } from 'react';
import { DIFFICULTY } from 'utils/enums';

type Props = CompletionCircleProps & CompletionByDifficultyProps;

type CompletionCircleProps = {
  numCompletedQuestions?: number;
  isLoading: boolean;
};

type CompletionByDifficultyProps = {
  completedQuestionsByDifficulty?: Record<string, number>;
  isLoading: boolean;
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
  isLoading,
}) => {
  return (
    <Stack flexDirection="row" width="100%" columnGap={2} sx={{ mx: 'auto' }}>
      <CompletionCircle
        numCompletedQuestions={numCompletedQuestions}
        isLoading={isLoading}
      />
      <CompletionByDifficulty
        completedQuestionsByDifficulty={completedQuestionsByDifficulty}
        isLoading={isLoading}
      />
    </Stack>
  );
};

const CompletionCircle: FC<CompletionCircleProps> = ({
  numCompletedQuestions,
  isLoading,
}) => {
  const theme = useTheme();
  const completionPercentage =
    ((numCompletedQuestions ?? 0) / TOTAL_NUM_QUESTIONS) * 100;

  return (
    <LoadingWrapper isLoading={isLoading} variant="circular">
      <Stack
        sx={{ position: 'relative' }}
        alignItems="center"
        justifyContent="center"
      >
        <Box
          sx={{
            borderRadius: '50%',
            height: '7rem',
            width: '7rem',
            background: `conic-gradient(${theme.palette.primary.main} ${completionPercentage}%,rgb(242,242,242) ${completionPercentage}%)`,
          }}
        />
        <Stack
          sx={{
            borderRadius: '50%',
            height: '6.5rem',
            width: '6.5rem',
            bgcolor: 'white',
            position: 'absolute',
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h5" fontWeight="bold">
            {numCompletedQuestions}
          </Typography>
          <Typography
            variant="caption"
            fontWeight="light"
            color="secondary.dark"
            textAlign="center"
          >
            unique
          </Typography>
          <Typography
            variant="caption"
            fontWeight="light"
            color="secondary.dark"
            textAlign="center"
          >
            questions
          </Typography>
        </Stack>
      </Stack>
    </LoadingWrapper>
  );
};

const CompletionByDifficulty: FC<CompletionByDifficultyProps> = ({
  completedQuestionsByDifficulty,
  isLoading,
}) => {
  const theme = useTheme();
  return (
    <Stack sx={{ flexGrow: 1 }} justifyContent="center">
      {Object.values(DIFFICULTY).map((difficulty) => {
        const completedQuestionsOfDifficulty =
          completedQuestionsByDifficulty?.[difficulty] ?? 0;
        return (
          <LoadingWrapper key={difficulty} isLoading={isLoading} custom>
            <Stack sx={{ m: 1 }}>
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
                    {completedQuestionsOfDifficulty}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontSize={10}
                    color="secondary"
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
                  (completedQuestionsOfDifficulty /
                    TOTAL_NUM_QUESTIONS_BY_DIFFICULTY[difficulty]) *
                  100
                }
                sx={{
                  borderRadius: 5,
                  bgcolor: `${theme.palette[`${difficulty}`].main}25`,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: theme.palette[`${difficulty}`].main,
                  },
                }}
              />
            </Stack>
          </LoadingWrapper>
        );
      })}
    </Stack>
  );
};

export default Completion;
