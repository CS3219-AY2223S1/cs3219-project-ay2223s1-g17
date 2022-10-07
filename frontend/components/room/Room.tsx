// packages

import { Box, Stack } from '@mui/material';
import { useState } from 'react';

// code
import CodeEditor from 'components/room/CodeEditor';
import { useMatchingContext } from 'contexts/MatchingContext';
import { LANGUAGE, VIEW } from 'utils/enums';
import QuestionPanel from './QuestionPanel';
import RoomOptions from './RoomOptions';

const Room = () => {
  const { question } = useMatchingContext();
  const { templates } = question;
  const [language, setLanguage] = useState<LANGUAGE>(LANGUAGE.PYTHON);
  const [view, setView] = useState<VIEW>(VIEW.HYBRID);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        overflowX: 'hidden',
        flexDirection: 'column',
        pb: 2,
      }}
    >
      <RoomOptions
        view={view}
        language={language}
        setView={setView}
        setLanguage={setLanguage}
      />
      <Stack
        direction="row"
        sx={{
          display: view === VIEW.HYBRID ? 'grid' : 'flex',
          flexDirection: 'row',
          height: '100%',
          width: '100%',
          gridTemplateColumns: view === VIEW.HYBRID ? '1fr 2fr' : 'none',
          gridTemplateAreas: view === VIEW.HYBRID ? "'left right'" : 'none',
        }}
      >
        <Box
          sx={{
            height: '100%',
            maxHeight: 'calc(100vh - 64px)',
            overflowY: 'auto',
            whiteSpace: 'pre-line',
            resize: view === VIEW.HYBRID ? 'horizontal' : 'none',
            gridArea: 'left',
            minWidth: view === VIEW.HYBRID ? '33vw' : 'auto',
            maxWidth: view === VIEW.HYBRID ? '67vw' : 'auto',
            position: 'relative',
            margin: view === VIEW.QUESTION ? 'auto' : 'none',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            display: view === VIEW.EDITOR ? 'none' : 'inline',
          }}
        >
          <QuestionPanel question={question} view={view} />
        </Box>
        <Box
          sx={{
            height: '100%',
            width: '100%',
            gridArea: 'right',
            display: view === VIEW.QUESTION ? 'none' : 'inline',
          }}
        >
          <CodeEditor language={language} templates={templates} />
        </Box>
      </Stack>
    </Box>
  );
};

export default Room;
