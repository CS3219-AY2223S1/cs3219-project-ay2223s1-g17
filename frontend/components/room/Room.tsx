// packages

import { Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

// code
import CodeEditor from 'components/room/CodeEditor';
import { useMatchingContext } from 'contexts/MatchingContext';
import { LANGUAGE, VIEW } from 'utils/enums';
import QuestionPanel from './QuestionPanel';
import RoomOptions from './RoomOptions';
import Resizer from './Resizer';

const Room = () => {
  const { question } = useMatchingContext();
  const { templates } = question;
  const [language, setLanguage] = useState<LANGUAGE>(LANGUAGE.PYTHON);
  const [view, setView] = useState<VIEW>(VIEW.HYBRID);
  const [width, setWidth] = useState('33%');
  const [cursor, setCursor] = useState('auto');
  const [userSelect, setUserSelect] = useState('auto');
  const [pointerEvents, setPointerEvents] = useState('auto');

  const roomOptionsProps = { view, language, setView, setLanguage };
  const codeEditorProps = { language, templates };

  useEffect(() => {
    const resizer = document.getElementById('resizer');
    const questionPanel = document.getElementById('question-panel');
    const editorBox = document.getElementById('editor-box');

    if (!resizer || !questionPanel || !editorBox) return;

    let x = 0;
    let questionPanelWidth = 0;

    const mouseDownHandler = (e: Event) => {
      x = (e as MouseEvent).clientX;
      questionPanelWidth = questionPanel.getBoundingClientRect().width;

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = (e: Event) => {
      const dx = (e as MouseEvent).clientX - x;

      const container = resizer.parentNode;
      if (!container) return;
      const containerWidth = (container as HTMLElement).getBoundingClientRect()
        .width;

      const newQuestionPanelWidth = questionPanelWidth + dx;
      if (
        newQuestionPanelWidth >= containerWidth / 4 &&
        newQuestionPanelWidth <= containerWidth / 2
      ) {
        setWidth(`${newQuestionPanelWidth}px`);
        setCursor('col-resize');
      } else {
        setCursor('not-allowed');
      }

      setUserSelect('none');
      setPointerEvents('none');
    };

    const mouseUpHandler = () => {
      setUserSelect('auto');
      setPointerEvents('auto');
      setCursor('auto');

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    resizer.addEventListener('mousedown', mouseDownHandler);
    return () => {
      resizer.removeEventListener('mousedown', mouseDownHandler);
    };
  }, []);

  return (
    <Box sx={{ cursor }}>
      <RoomOptions {...roomOptionsProps} />
      <Stack
        id="collab-room"
        sx={{
          mt: '64px',
          height: 'calc(100vh - 128px)',
        }}
        flexDirection="row"
      >
        <Stack
          id="question-panel"
          sx={{
            width,
            cursor,
            pointerEvents,
            userSelect,
            minWidth: '25vw',
            maxWidth: '50vw',
            overflowY: 'auto',
          }}
        >
          <QuestionPanel question={question} />
        </Stack>
        <Resizer />
        <Box
          id="editor-box"
          sx={{
            height: '100%',
            minWidth: '50vw',
            maxWidth: '75vw',
            flexGrow: 1,
            userSelect,
            pointerEvents,
            ml: -1,
          }}
        >
          <CodeEditor {...codeEditorProps} />
        </Box>
      </Stack>
    </Box>
  );
};

export default Room;
