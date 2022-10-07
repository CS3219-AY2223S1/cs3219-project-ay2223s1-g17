import { FC } from 'react';
import { Box, Stack, Divider, Typography } from '@mui/material';
import { DIFFICULTY } from 'utils/enums';
import { Question } from 'contexts/MatchingContext';

type Props = {
  question: Question;
};

const QuestionPanel: FC<Props> = ({
  question: { title, difficulty, description, examples, constraints },
}) => {
  const DifficultyColorMap: Record<DIFFICULTY, string> = {
    EASY: '#93DB9A',
    MEDIUM: '#F8B06E',
    HARD: '#ED8D8D',
  };

  return (
    <>
      <Stack
        sx={{
          px: 1,
          pt: 1,
        }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h6"
          color="black"
          fontWeight="bold"
          sx={{ mb: 1, textTransform: 'capitalize' }}
          fontSize={24}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          color={DifficultyColorMap[difficulty || DIFFICULTY.HARD]}
          sx={{ textTransform: 'capitalize', mb: 1 }}
          fontWeight="bold"
          fontSize={24}
        >
          {difficulty?.toLowerCase()}
        </Typography>
      </Stack>
      <Divider orientation="horizontal" flexItem />
      <Typography color="black" sx={{ px: 2, my: 4 }} fontSize={18}>
        {description}
      </Typography>
      {(examples ?? []).map(({ input, output, explanation }, index) => (
        <Box
          key={`example-${index}`}
          sx={{
            px: 2,
            my: 4,
          }}
        >
          <Typography fontWeight="bold" color="black">
            Example {index + 1}
          </Typography>
          <Box
            color="black"
            sx={{
              backgroundColor: '#EEEDE7',
              borderRadius: '5px',
              px: 2,
              py: 0.5,
              my: 1,
            }}
          >
            <p>
              <strong>Input: </strong>
              {input}
            </p>
            <p>
              <strong>Ouput: </strong>
              {output}
            </p>
            {explanation ? (
              <p>
                <strong>Explanation: </strong>
                {explanation}
              </p>
            ) : (
              <></>
            )}
          </Box>
        </Box>
      ))}
      {constraints && constraints.length ? (
        <Typography fontWeight="bold" color="black">
          Constraints
        </Typography>
      ) : (
        <></>
      )}
      {(constraints ?? []).map((constraint, index) => (
        <Typography key={`constraint-${index}`} color="black">
          {constraint}
        </Typography>
      ))}
    </>
  );
};

export default QuestionPanel;
