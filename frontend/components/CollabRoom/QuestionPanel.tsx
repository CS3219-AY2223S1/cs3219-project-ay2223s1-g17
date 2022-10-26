import { FC } from 'react';
import { Box, Stack, Divider, Typography, useTheme } from '@mui/material';
import { DIFFICULTY } from 'utils/enums';
import { Question } from 'contexts/MatchingContext';
import LoadingWrapper from 'components/Loading/LoadingWrapper';

type Props = {
  question?: Question;
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
  isLoading: boolean;
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
  isLoading,
}) => {
  const theme = useTheme();
  const placeholderQuestion: Required<Question> = {
    _id: 'placeholder',
    title: 'placeholder title',
    difficulty: DIFFICULTY.EASY,
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores at natus id quisquam laudantium eos. Est laudantium amet vitae repudiandae dolorum ducimus pariatur expedita itaque! Ipsum, nam? Quos, est voluptas.',
    examples: [],
    constraints: [],
    templates: { PYTHON: '', JAVA: '', JAVASCRIPT: '', 'C++': '' },
  };

  const title = question?.title ?? placeholderQuestion.title;
  const difficulty = question?.difficulty ?? placeholderQuestion.difficulty;
  const description = question?.description ?? placeholderQuestion.description;
  const examples = question?.examples ?? placeholderQuestion.examples;
  const constraints = question?.constraints ?? placeholderQuestion.constraints;

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
        <LoadingWrapper isLoading={isLoading}>
          <Typography
            variant="h6"
            color="black"
            fontWeight="bold"
            sx={{ mb: 1, textTransform: 'capitalize' }}
            fontSize={24}
          >
            {title ?? 'placeholder title'}
          </Typography>
        </LoadingWrapper>
        <LoadingWrapper isLoading={isLoading}>
          <Typography
            variant="h6"
            color={theme.palette[`${difficulty}`].main}
            sx={{ textTransform: 'capitalize', mb: 1 }}
            fontWeight={500}
            fontSize={24}
          >
            {difficulty.toLowerCase()}
          </Typography>
        </LoadingWrapper>
      </Stack>
      <Divider orientation="horizontal" flexItem />
      <LoadingWrapper isLoading={isLoading}>
        <Typography sx={{ pr: 2, mt: 4, mb: 2 }} fontSize={18}>
          {description}
        </Typography>
      </LoadingWrapper>
      {(examples ?? []).map(({ input, output, explanation }, index) => (
        <LoadingWrapper
          isLoading={isLoading}
          custom
          styles={{ height: '4rem' }}
          key={`example-${index}`}
        >
          <Box
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
        </LoadingWrapper>
      ))}
      {constraints && constraints.length ? (
        <Typography fontWeight="bold">Constraints</Typography>
      ) : (
        <></>
      )}
      {(constraints ?? []).map((constraint, index) => (
        <LoadingWrapper isLoading={isLoading} key={`constraint-${index}`}>
          <Typography>{constraint}</Typography>
        </LoadingWrapper>
      ))}
    </Stack>
  );
};

export default QuestionPanel;
