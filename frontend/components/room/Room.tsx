// packages

import { Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

// code
import CodeEditor from 'components/room/CodeEditor';
import { useMatchingContext } from 'contexts/MatchingContext';
import { LANGUAGE, VIEW } from 'utils/enums';
import QuestionPanel from './QuestionPanel';
import RoomOptions from './RoomOptions';
import { NAVBAR_HEIGHT_PX, RESIZER_HEIGHT_WIDTH_PX } from 'utils/constants';
import { Resizer } from './Resizer';

const Room = () => {
  const { question } = useMatchingContext();
  const { templates } = question;
  const [language, setLanguage] = useState<LANGUAGE>(LANGUAGE.PYTHON);
  const [view, setView] = useState<VIEW>(VIEW.HYBRID);
  const [width, setWidth] = useState('33%');
  const [height, setHeight] = useState('33%');
  const [cursor, setCursor] = useState('auto');
  const [verticalColor, setVerticalColor] = useState('rgba(0,0,0,0.1)');
  const [horizontalColor, setHorizontalColor] = useState('rgba(0,0,0,0.1)');
  const [userSelect, setUserSelect] = useState('auto');
  const [pointerEvents, setPointerEvents] = useState('auto');

  const roomOptionsProps = { view, language, setView, setLanguage };
  const codeEditorProps = { language, templates };

  useEffect(() => {
    const verticalResizer = document.getElementById('vertical-resizer');
    const horizontalResizer = document.getElementById('horizontal-resizer');
    const questionPanel = document.getElementById('question-panel');
    const chatPanel = document.getElementById('chat-panel');

    if (!verticalResizer || !horizontalResizer || !questionPanel || !chatPanel)
      return;

    let x = 0;
    let y = 0;
    let questionPanelWidth = 0;
    let chatPanelHeight = 0;

    const mouseDownXHandler = (e: Event) => {
      x = (e as MouseEvent).clientX;
      questionPanelWidth = questionPanel.getBoundingClientRect().width;
      setVerticalColor('#1976d2');

      document.addEventListener('mousemove', mouseMoveXHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseDownYHandler = (e: Event) => {
      y = (e as MouseEvent).clientY;
      chatPanelHeight = chatPanel.getBoundingClientRect().height;
      setHorizontalColor('#1976d2');

      document.addEventListener('mousemove', mouseMoveYHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveXHandler = (e: Event) => {
      const dx = (e as MouseEvent).clientX - x;

      const container = verticalResizer.parentNode;
      if (!container) return;
      const containerWidth = (container as HTMLElement).getBoundingClientRect()
        .width;

      const newQuestionPanelWidth = questionPanelWidth + dx;
      if (
        newQuestionPanelWidth >= containerWidth / 4 &&
        newQuestionPanelWidth + 2 * RESIZER_HEIGHT_WIDTH_PX <=
          containerWidth / 2
      ) {
        setWidth(`${newQuestionPanelWidth}px`);
        setCursor('col-resize');
      } else {
        setCursor('not-allowed');
      }

      setUserSelect('none');
      setPointerEvents('none');
    };

    const mouseMoveYHandler = (e: Event) => {
      const dy = (e as MouseEvent).clientY - y;

      const container = verticalResizer.parentNode;
      if (!container) return;
      const containerHeight = (container as HTMLElement).getBoundingClientRect()
        .height;

      const newChatPanelHeight = chatPanelHeight - dy;
      if (
        newChatPanelHeight >= containerHeight / 4 &&
        newChatPanelHeight + 2 * RESIZER_HEIGHT_WIDTH_PX <= containerHeight / 2
      ) {
        setHeight(`${newChatPanelHeight}px`);
        setCursor('row-resize');
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
      setHorizontalColor('rgba(0,0,0,0.1)');
      setVerticalColor('rgba(0,0,0,0.1)');

      document.removeEventListener('mousemove', mouseMoveXHandler);
      document.removeEventListener('mousemove', mouseMoveYHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    verticalResizer.addEventListener('mousedown', mouseDownXHandler);
    horizontalResizer.addEventListener('mousedown', mouseDownYHandler);
    return () => {
      verticalResizer.removeEventListener('mousedown', mouseDownXHandler);
      horizontalResizer.removeEventListener('mousedown', mouseDownYHandler);
    };
  }, []);

  return (
    <Box sx={{ cursor }}>
      <RoomOptions {...roomOptionsProps} />
      <Stack
        id="collab-room"
        sx={{
          mt: `${NAVBAR_HEIGHT_PX}px`,
          height: `calc(100vh - ${NAVBAR_HEIGHT_PX * 2}px)`,
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
            mx: 'auto',
            display: view === VIEW.EDITOR ? 'none' : 'flex',
          }}
        >
          <QuestionPanel question={question} />
        </Stack>
        <Resizer
          id="vertical-resizer"
          view={view}
          backgroundColor={verticalColor}
          isVertical
        />
        <Stack sx={{ minWidth: '50vw', maxWidth: '75vw', flexGrow: 1 }}>
          <Box
            sx={{
              minHeight: `calc((100vh - ${NAVBAR_HEIGHT_PX * 2}px) / 2)`,
              maxHeight: `calc((100vh - ${NAVBAR_HEIGHT_PX * 2}px) * 3 / 4) `,
              minWidth: '50vw',
              maxWidth: '75vw',
              flexGrow: 1,
              userSelect,
              pointerEvents,
              ml: view === VIEW.EDITOR ? 'auto' : 0,
              mr: view === VIEW.EDITOR ? 'auto' : 0,
              display: view === VIEW.QUESTION ? 'none' : 'block',
            }}
          >
            <CodeEditor {...codeEditorProps} />
          </Box>
          <Resizer
            id="horizontal-resizer"
            view={view}
            backgroundColor={verticalColor}
          />

          <Box
            id="chat-panel"
            sx={{
              backgroundColor: 'gray',
              border: '2px solid orange',
              height,
              userSelect,
              pointerEvents,
            }}
          ></Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Room;
