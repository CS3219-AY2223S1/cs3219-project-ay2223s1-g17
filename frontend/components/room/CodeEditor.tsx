// packages
import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// code
import { useMatchingContext } from 'contexts/MatchingContext';
import { LANGUAGE } from 'utils/enums';

const CodeEditor = ({ language, templates }: Props) => {
  const { roomId } = useMatchingContext();
  const [editorContent] = useState(
    (templates && templates[language]) ?? '# start coding here'
  );
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const isIncoming = useRef(false);
  const [socket, setSocket] = useState<Socket>();
  const [options] = useState<editor.IStandaloneEditorConstructionOptions>({
    fontSize: 16,
    scrollBeyondLastLine: false,
    minimap: { enabled: false },
    lineNumbersMinChars: 3,
    // readOnly: isReadOnly ?? false,
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
    const sock = io(
      `localhost:${process.env.NEXT_PUBLIC_COLLABORATION_SERVICE_PORT}`,
      {
        autoConnect: false,
      }
    );

    if (!roomId) {
      alert('Room not found, redirecting');
      window.location.replace('/');
    }

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
  }, []);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
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

  return socket ? (
    <Editor
      defaultLanguage={language.toLowerCase()}
      defaultValue={editorContent}
      width="auto"
      options={options}
      onMount={handleEditorDidMount}
      onChange={handleChange}
    />
  ) : (
    <></>
  );
};

export default CodeEditor;

interface Props {
  language: LANGUAGE;
  templates?: Record<LANGUAGE, string>;
}
