// packages

import { Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

// code
import CodeEditor from 'components/CollabRoom/CodeEditor';
import { useMatchingContext } from 'contexts/MatchingContext';
import { HTTP_METHOD, LANGUAGE, SERVICE, VIEW } from 'utils/enums';
import RoomOptions from './RoomOptions';
import { NAVBAR_HEIGHT_PX, RESIZER_HEIGHT_WIDTH_PX } from 'utils/constants';
import ChatPanel, { Chat } from './ChatPanel';
import QuestionPanel from './QuestionPanel';
import Resizer from './Resizer';
import { apiCall } from 'utils/helpers';
import useAuth from 'contexts/AuthContext';
import { toast } from 'react-toastify';

export type View = {
  showQuestion: boolean;
  showEditor: boolean;
  showChat: boolean;
};

const Room = () => {
  const { user } = useAuth();
  const { questions } = useMatchingContext();
  const [questionNumber, setQuestionNumber] = useState(0);
  const [language, setLanguage] = useState<LANGUAGE>(LANGUAGE.PYTHON);
  const [width, setWidth] = useState('33%');
  const [height, setHeight] = useState('33%');
  const [cursor, setCursor] = useState('auto');
  const [verticalColor, setVerticalColor] = useState('rgba(0,0,0,0.1)');
  const [horizontalColor, setHorizontalColor] = useState('rgba(0,0,0,0.1)');
  const [userSelect, setUserSelect] = useState('auto');
  const [pointerEvents, setPointerEvents] = useState('auto');
  const [view, setView] = useState<VIEW[]>([
    VIEW.EDITOR,
    VIEW.QUESTION,
    VIEW.CHAT,
  ]);
  const [chats, setChats] = useState<Chat[]>([]);

  const showQuestion = view.includes(VIEW.QUESTION);
  const showEditor = view.includes(VIEW.EDITOR);
  const showChat = view.includes(VIEW.CHAT);

  const handleSaveHistory = async () => {
    // await apiCall({
    //   path: '/',
    //   service: SERVICE.HISTORY,
    //   method: HTTP_METHOD.POST,
    //   requiresCredentials: true,
    //   body: {
    //     user,
    //     questionId: questions[questionNumber]._id,
    //     code: editorContent,
    //     chats,
    //   },
    //   onSuccess: () => toast.success('Successfully saved to history!'),
    // });
    handleNextQuestion();
    toast.success('we did it bois');
  };

  const handleNextQuestion = () => {
    console.log('prompting to save history');
    if (questionNumber === questions.length - 1) {
      return console.log('exit');
    }
    console.log('prompting to continue to next question');
    console.log('go to next question');
    setQuestionNumber((prev) => prev + 1);
    setChats([]);
  };

  const roomOptionsProps = {
    view,
    language,
    questionNumber,
    setView,
    setLanguage,
    handleSaveHistory,
  };
  const codeEditorProps = {
    language,
    questionNumber,
    editorContent:
      questions[questionNumber]?.templates?.[language] ?? '# start coding here',
    minHeight: `calc((100vh - ${NAVBAR_HEIGHT_PX * 2}px) / 2)`,
    maxHeight: showChat
      ? `calc((100vh - ${NAVBAR_HEIGHT_PX * 2}px) * 3 / 4)`
      : '100%',
    minWidth: '50vw',
    maxWidth: showQuestion ? '75vw' : '100%',
    userSelect,
    pointerEvents,
    shouldDisplay: showEditor,
  };
  const chatBoxProps = {
    id: 'chat-panel',
    height: showEditor ? height : '100%',
    userSelect,
    pointerEvents,
    shouldDisplay: showChat,
    chats,
    setChats,
  };
  const questionPanelProps = {
    id: 'question-panel',
    question: questions[questionNumber],
    width,
    cursor,
    pointerEvents,
    userSelect,
    minWidth: '25vw',
    maxWidth: '50vw',
    overflowY: 'auto',
    mx: 'auto',
    shouldDisplay: showQuestion,
  };

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
        sx={{
          mt: `${NAVBAR_HEIGHT_PX}px`,
          height: `calc(100vh - ${NAVBAR_HEIGHT_PX * 2}px)`,
        }}
        flexDirection="row"
      >
        <QuestionPanel {...questionPanelProps} />
        <Resizer
          id="vertical-resizer"
          shouldDisplay={showQuestion && (showEditor || showChat)}
          backgroundColor={verticalColor}
          isVertical
        />
        <Stack
          sx={{
            minWidth: '50vw',
            maxWidth: showQuestion ? '75vw' : '100%',
            flexGrow: 1,
          }}
        >
          <CodeEditor {...codeEditorProps} />
          <Resizer
            id="horizontal-resizer"
            shouldDisplay={showEditor && showChat}
            backgroundColor={horizontalColor}
          />
          <ChatPanel {...chatBoxProps} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Room;
