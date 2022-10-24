import { FC } from 'react';
import { Box, Stack, Divider, Typography, useTheme } from '@mui/material';
import { DIFFICULTY } from 'utils/enums';
import { Question } from 'contexts/MatchingContext';

type Props = {
  question: Question;
  id: string;
  width: string;
  cursor: string;
  pointerEvents: string;
  userSelect: string;
  minWidth: string;
  maxWidth: string;
  overflowY: string;
  mx: string;
  shouldDisplay: boolean;
};

const QuestionPanel: FC<Props> = ({
  question,
  id,
  width,
  cursor,
  pointerEvents,
  userSelect,
  minWidth,
  maxWidth,
  overflowY,
  mx,
  shouldDisplay,
}) => {
  const theme = useTheme();
  const { title, difficulty, description, examples, constraints } =
    question ?? {
      title: 'title',
      difficulty: DIFFICULTY.EASY,
      description: 'description',
      examples: [],
      constraints: [],
    };
  if (!difficulty) return <></>;
  return (
    <Stack
      id={id}
      sx={{
        width,
        cursor,
        pointerEvents,
        userSelect,
        minWidth,
        maxWidth,
        overflowY,
        mx,
        display: shouldDisplay ? 'flex' : 'none',
      }}
    >
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
          color={theme.palette[`${difficulty}`].main}
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
    </Stack>
  );
};

export default QuestionPanel;
