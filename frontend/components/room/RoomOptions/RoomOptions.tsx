import { FC, Dispatch, SetStateAction, ReactNode } from 'react';
import {
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { LANGUAGE, VIEW } from 'utils/enums';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';

type Props = {
  view: VIEW;
  language: LANGUAGE;
  setView: Dispatch<SetStateAction<VIEW>>;
  setLanguage: Dispatch<SetStateAction<LANGUAGE>>;
};

const RoomOptions: FC<Props> = ({ view, language, setView, setLanguage }) => {
  const ViewButtonMap: Record<VIEW, ReactNode> = {
    QUESTION: <DescriptionIcon />,
    HYBRID: <VerticalSplitIcon sx={{ transform: 'rotate(180deg)' }} />,
    EDITOR: <CodeIcon />,
  };

  return (
    <Stack
      sx={{ width: '100%', px: 4, py: 2 }}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <ToggleButtonGroup
        value={view}
        onChange={(_, newView: VIEW) => setView(newView)}
        color="primary"
        exclusive
      >
        {Object.values(VIEW).map((viewType) => (
          <ToggleButton
            key={viewType}
            value={viewType}
            disabled={view === viewType}
          >
            {ViewButtonMap[viewType]}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Select
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
      </Select>
    </Stack>
  );
};

export default RoomOptions;
