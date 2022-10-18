import { FC, Dispatch, SetStateAction, ReactNode } from 'react';
import {
  Button,
  IconButton,
  // MenuItem,
  // Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {
  // LANGUAGE,
  VIEW,
} from 'utils/enums';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import ChatIcon from '@mui/icons-material/Chat';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Stopwatch from 'components/Stopwatch';
import NextQuestionPrompt from './NextQuestionPrompt';

type Props = {
  view: VIEW[];
  // language: LANGUAGE;
  questionNumber: number;
  maxQuestionNumber: number;
  setView: Dispatch<SetStateAction<VIEW[]>>;
  // setLanguage: Dispatch<SetStateAction<LANGUAGE>>;
  handleNextQuestion: () => void;
  open: boolean;
  confirm: boolean;
  handleConfirm: () => void;
  otherReject: boolean;
  handleReject: () => void;
};

const RoomOptions: FC<Props> = ({
  view,
  // language,
  questionNumber,
  maxQuestionNumber,
  setView,
  // setLanguage,
  handleNextQuestion,
  open,
  confirm,
  handleConfirm,
  otherReject,
  handleReject,
}) => {
  const ViewButtonMap: Record<VIEW, ReactNode> = {
    QUESTION: <DescriptionIcon />,
    CHAT: <ChatIcon />,
    EDITOR: <CodeIcon />,
  };
  return (
    <>
      <NextQuestionPrompt
        isLastQuestion={questionNumber === maxQuestionNumber}
        open={open}
        confirm={confirm}
        handleConfirm={handleConfirm}
        otherReject={otherReject}
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
          backgroundColor: 'white',
        }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ToggleButtonGroup
          value={view}
          onChange={(_, newView: VIEW[]) => {
            console.log(newView);
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

        <Stack flexDirection="row" alignItems="center" sx={{ mr: '5%' }}>
          <Typography color="black" variant="h6">
            Question {questionNumber + 1}
          </Typography>
          {questionNumber < maxQuestionNumber ? (
            <IconButton onClick={handleNextQuestion} disableRipple>
              <NavigateNextIcon />
            </IconButton>
          ) : (
            <></>
          )}
        </Stack>

        <Stack flexDirection="row" columnGap={2}>
          <Stopwatch />
          {questionNumber === maxQuestionNumber ? (
            <Button
              variant="contained"
              color="error"
              onClick={handleNextQuestion}
              disableRipple
            >
              End Session
            </Button>
          ) : (
            <></>
          )}

          {/* <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value as LANGUAGE)}
            sx={{ textTransform: 'capitalize' }}
            SelectDisplayProps={{ style: { paddingTop: 8, paddingBottom: 8 } }}
          >
            {Object.values(LANGUAGE).map((languageOption) => (
              <MenuItem
                key={languageOption}
                value={languageOption}
                sx={{ textTransform: 'capitalize' }}
              >
                {languageOption.toLowerCase()}
              </MenuItem>
            ))}
          </Select> */}
        </Stack>
      </Stack>
    </>
  );
};

export default RoomOptions;
