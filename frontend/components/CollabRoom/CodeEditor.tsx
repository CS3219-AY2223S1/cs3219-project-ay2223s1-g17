// packages
import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Box } from '@mui/material';

// code
import { useMatching } from 'contexts/MatchingContext';
import { LANGUAGE } from 'utils/enums';
import LoadingWrapper from 'components/Loading/LoadingWrapper';

const CodeEditor = ({
  language,
  questionNumber,
  editorContent,
  editorRef,
  minHeight,
  maxHeight,
  minWidth,
  maxWidth,
  userSelect,
  pointerEvents,
  shouldDisplay,
  readOnly,
  isLoading,
}: Props) => {
  const { roomId } = useMatching();
  const isIncoming = useRef(false);
  const [socket, setSocket] = useState<Socket>();
  const [options] = useState<editor.IStandaloneEditorConstructionOptions>({
    fontSize: 16,
    scrollBeyondLastLine: false,
    minimap: { enabled: false },
    lineNumbersMinChars: 3,
    readOnly: readOnly ?? false,
    scrollbar: {
      useShadows: false,
      verticalHasArrows: false,
      horizontalHasArrows: false,
      vertical: 'visible',
      horizontal: 'visible',
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
    },
  });
  const otherDecoration = useRef<string[]>([]);

  useEffect(() => {
    if (readOnly) return;

    const url =
      process.env.NEXT_PUBLIC_ENV === 'production'
        ? process.env.NEXT_PUBLIC_COLLABORATION_ENDPOINT
        : `http://localhost:${process.env.NEXT_PUBLIC_COLLABORATION_SERVICE_PORT}`;
    const sock = io(url || '', {
      autoConnect: false,
    });

    if (!roomId) return;

    sock.auth = { roomId };
    sock.connect();
    setSocket(sock);

    sock.on('editorChange', (event) => {
      isIncoming.current = true;
      editorRef.current?.getModel()?.applyEdits(event.changes);
    });

    sock.on('selection', (event) => {
      if (!editorRef.current) {
        return;
      }

      const selectionArray = [];
      if (
        event.selection.startColumn == event.selection.endColumn &&
        event.selection.startLineNumber == event.selection.endLineNumber
      ) {
        event.selection.endColumn++;
        selectionArray.push({
          range: event.selection,
          options: {
            className: `otherUserCursor`,
          },
        });
      } else {
        selectionArray.push({
          range: event.selection,
          options: {
            className: 'otherUserSelection',
          },
        });
      }
      // this API is deprecated, but the new api createDecorationsCollection is not working
      otherDecoration.current = editorRef.current.deltaDecorations(
        otherDecoration.current,
        selectionArray
      );
    });

    return () => {
      sock.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    if (!readOnly)
      editor.onDidChangeCursorSelection(
        (e: editor.ICursorSelectionChangedEvent) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          socket!.emit('selection', e);
        }
      );
  }

  const handleChange = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    value = '',
    event: editor.IModelContentChangedEvent
  ) => {
    // if it is incoming change, it is handled by socket listeners, we need to turn isIncoming flag off
    if (isIncoming.current) {
      isIncoming.current = false;
      return;
    }
    // else it is our change, we will emit to server
    socket?.emit('editorChange', event);
  };

  return readOnly || socket ? (
    <LoadingWrapper
      isLoading={isLoading}
      custom
      repeat={4}
      styles={{ width: '85%', mx: 'auto' }}
      containerStyles={{ my: 'auto' }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: shouldDisplay ? 'block' : 'none',
          minHeight,
          maxHeight,
          minWidth,
          maxWidth,
          userSelect,
          pointerEvents,
        }}
      >
        <Editor
          key={questionNumber}
          defaultLanguage={(language ?? LANGUAGE.PYTHON).toLowerCase()}
          defaultValue={editorContent ?? '# start coding here'}
          width="auto"
          options={options}
          onMount={handleEditorDidMount}
          onChange={handleChange}
        />
      </Box>
    </LoadingWrapper>
  ) : (
    <></>
  );
};

export default CodeEditor;

interface Props {
  language?: LANGUAGE;
  questionNumber: number;
  editorContent?: string;
  editorRef: MutableRefObject<editor.IStandaloneCodeEditor | undefined>;
  minHeight: string;
  maxHeight: string;
  minWidth: string;
  maxWidth: string;
  userSelect: string;
  pointerEvents: string;
  shouldDisplay: boolean;
  readOnly?: boolean;
  isLoading: boolean;
}
