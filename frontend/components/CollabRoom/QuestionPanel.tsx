import { FC } from 'react';
import { Box, Stack, Divider, Typography, useTheme } from '@mui/material';
import { DIFFICULTY } from 'utils/enums';
import { Question } from 'contexts/MatchingContext';
import { Output } from '@mui/icons-material';

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
        bgcolor: 'white',
      }}
    >
      <Stack
        sx={{
          pr: 1,
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
          fontWeight={500}
          fontSize={24}
        >
          {difficulty?.toLowerCase()}
        </Typography>
      </Stack>
      <Divider orientation="horizontal" flexItem />
      <Typography sx={{ pr: 2, mt: 4, mb: 2 }} fontSize={18}>
        {description}
      </Typography>
      {(examples ?? []).map(({ input, output, explanation }, index) => (
        <Box
          key={`example-${index}`}
          sx={{
            pr: 2,
            my: 2,
          }}
        >
          <Typography fontWeight="bold" color="black">
            Example {index + 1}
          </Typography>
          <Stack
            sx={{
              backgroundColor: '#EEEDE7',
              borderRadius: '4px',
              py: 1.5,
              pr: 1.5,
              my: 1,
            }}
            rowGap={1}
          >
            <Stack flexDirection="row" columnGap={1}>
              <Typography fontWeight={500}>Input: </Typography>
              <Typography>{input}</Typography>
            </Stack>
            <Stack flexDirection="row" columnGap={1}>
              <Typography fontWeight={500}>Output: </Typography>
              <Typography>{output}</Typography>
            </Stack>
            {explanation ? (
              <Stack flexDirection="row" columnGap={1}>
                <Typography fontWeight={500}>Explanation: </Typography>
                <Typography>{explanation}</Typography>
              </Stack>
            ) : (
              <></>
            )}
          </Stack>
        </Box>
      ))}
      {constraints && constraints.length ? (
        <Typography fontWeight="bold">Constraints</Typography>
      ) : (
        <></>
      )}
      {(constraints ?? []).map((constraint, index) => (
        <Typography key={`constraint-${index}`}>{constraint}</Typography>
      ))}
    </Stack>
  );
};

export default QuestionPanel;
