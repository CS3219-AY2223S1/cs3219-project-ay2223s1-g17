import { FC, Dispatch, SetStateAction, ReactNode, useState } from 'react';
import {
  IconButton,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { LANGUAGE, VIEW } from 'utils/enums';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import ChatIcon from '@mui/icons-material/Chat';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Stopwatch from 'components/Stopwatch';
import SaveHistoryPrompt from './SaveHistoryPrompt';

type Props = {
  view: VIEW[];
  language: LANGUAGE;
  questionNumber: number;
  setView: Dispatch<SetStateAction<VIEW[]>>;
  setLanguage: Dispatch<SetStateAction<LANGUAGE>>;
  handleSaveHistory: () => Promise<void>;
};

const RoomOptions: FC<Props> = ({
  view,
  language,
  questionNumber,
  setView,
  setLanguage,
  handleSaveHistory,
}) => {
  const ViewButtonMap: Record<VIEW, ReactNode> = {
    QUESTION: <DescriptionIcon />,
    CHAT: <ChatIcon />,
    EDITOR: <CodeIcon />,
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SaveHistoryPrompt
        open={open}
        onClose={handleClose}
        handleSaveHistory={handleSaveHistory}
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
          <IconButton onClick={handleOpen} disableRipple>
            <NavigateNextIcon />
          </IconButton>
        </Stack>

        <Stack flexDirection="row" columnGap={2}>
          <Stopwatch />

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
