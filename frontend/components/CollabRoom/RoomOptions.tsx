import { FC, Dispatch, SetStateAction, ReactNode } from 'react';
import {
  Box,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { VIEW } from 'utils/enums';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import ChatIcon from '@mui/icons-material/Chat';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NextQuestionPrompt from './NextQuestionPrompt';

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
  const ViewButtonMap: Record<VIEW, ReactNode> = {
    QUESTION: <DescriptionIcon />,
    CHAT: <ChatIcon />,
    EDITOR: <CodeIcon />,
  };

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
        <ToggleButtonGroup
          value={view}
          onChange={(_, newView: VIEW[]) => {
            setView(newView);
          }}
          color="primary"
        >
          {Object.values(VIEW).map((viewType) => (
            <ToggleButton
              key={viewType}
              value={viewType}
              sx={{ display: 'flex', columnGap: 1, alignItems: 'center' }}
            >
              {ViewButtonMap[viewType]}
              <Typography variant="caption">{viewType}</Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

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
