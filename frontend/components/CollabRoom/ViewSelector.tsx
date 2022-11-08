import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import ChatIcon from '@mui/icons-material/Chat';
import { VIEW } from 'utils/enums';
import { ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';

type Props = {
  view: VIEW[];
  setView: Dispatch<SetStateAction<VIEW[]>>;
};

const ViewSelector: FC<Props> = ({ view, setView }) => {
  const ViewButtonMap: Record<VIEW, ReactNode> = {
    QUESTION: <DescriptionIcon />,
    CHAT: <ChatIcon />,
    EDITOR: <CodeIcon />,
  };

  return (
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
  );
};

export default ViewSelector;
