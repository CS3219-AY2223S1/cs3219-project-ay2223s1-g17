import { FC, Dispatch, SetStateAction } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { VIEW } from 'utils/enums';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NextQuestionPrompt from './NextQuestionPrompt';
import ViewSelector from './ViewSelector';

type Props = {
  view: VIEW[];
  questionNumber: number;
  maxQuestionNumber: number;
  setView: Dispatch<SetStateAction<VIEW[]>>;
  handleNextQuestion: () => void;
  open: boolean;
  confirm: boolean;
  handleConfirm: () => void;
  handleReject: () => void;
  readOnly?: boolean;
};

const RoomOptions: FC<Props> = ({
  view,
  questionNumber,
  maxQuestionNumber,
  setView,
  handleNextQuestion,
  open,
  confirm,
  handleConfirm,
  handleReject,
  readOnly,
}) => {
  const isLastQuestion = questionNumber === maxQuestionNumber;

  return (
    <Box bgcolor="#f7f8fa">
      <NextQuestionPrompt
        isLastQuestion={isLastQuestion}
        open={open}
        confirm={confirm}
        handleConfirm={handleConfirm}
        handleClose={handleReject}
      />

      <Stack
        sx={{
          p: 2,
          position: 'fixed',
          top: '64px',
          height: '64px',
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: 'inherit',
        }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ViewSelector view={view} setView={setView} />

        {readOnly ? (
          <></>
        ) : (
          <Typography color="black" variant="h6">
            Question {questionNumber + 1}
          </Typography>
        )}

        {readOnly ? (
          <></>
        ) : (
          <Button
            variant="contained"
            color={isLastQuestion ? 'error' : 'primary'}
            onClick={handleNextQuestion}
            disableRipple
            size="small"
            endIcon={<NavigateNextIcon fontSize="small" />}
            sx={{ textTransform: 'none' }}
          >
            {isLastQuestion ? 'End Session' : 'Next Question'}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default RoomOptions;
