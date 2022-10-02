import Editor from '@monaco-editor/react';
import { useMatchingContext } from 'contexts/MatchingContext';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { LANGUAGE } from 'utils/enums';

interface Props {
  language: LANGUAGE;
  templates?: Record<LANGUAGE, string>;
}

const CodeEditor = ({ language, templates }: Props) => {
  const { roomId } = useMatchingContext();
  const [editorContent, setEditorContent] = useState(
    (templates && templates[language]) ?? '// start coding here'
  );
  const editorRef = useRef(null);
  const isIncoming = useRef(false);
  const [socket, setSocket] = useState<Socket>();
  const [options, setOptions] = useState({
    fontSize: '18px',
    scrollBeyondLastLine: false,
    minimap: { enabled: false },
  });
  const otherDecoration = useRef([]);

  useEffect(() => {
    const port = process.env.NEXT_PUBLIC_COLLABORATION_SERVICE_PORT;
    const sock = io((port && `localhost:${port}`) || '', {
      autoConnect: false,
    });
    sock.auth = { roomId };
    sock.connect();
    setSocket(sock);

    sock.on('connect', () => console.log('connected'));

    sock.on('editorChange', (event) => {
      try {
        isIncoming.current = true;
        editorRef.current?.getModel().applyEdits(event.changes);
      } catch (e) {
        alert('INTERNAL ERROR');
      }
    });

    sock.on('selection', (e) => {
      let selectionArray = [];
      if (
        e.selection.startColumn == e.selection.endColumn &&
        e.selection.startLineNumber == e.selection.endLineNumber
      ) {
        e.selection.endColumn++;
        selectionArray.push({
          range: e.selection,
          options: {
            // className: `${e.user}one`,
            className: `user1one`,
            hoverMessage: {
              value: 'user1',
            },
          },
        });
      } else {
        selectionArray.push({
          range: e.selection,
          options: {
            className: 'user1',
            hoverMessage: {
              value: 'user1',
            },
          },
        });
      }
      otherDecoration.current = editorRef.current.deltaDecorations(
        otherDecoration.current,
        selectionArray
      );
      // console.log({ selectionEvent: event });
    });

    return () => {
      sock.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    editorRef.current.onDidChangeCursorSelection((e) => {
      console.log('cursor changed');
      socket?.emit('selection', e);
    });
  }, [editorRef.current]);

  // IStandaloneCodeEditor
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const handleChange = (value = '', event: any) => {
    // if it is incoming change, it is handled by socket listeners, we need to turn isIncoming flag off
    if (isIncoming.current) {
      isIncoming.current = false;
      return;
    }
    // else it is our change, we will emit to server
    socket?.emit('editorChange', event);
  };

  return (
    <Editor
      defaultLanguage={language.toLowerCase()}
      defaultValue={editorContent}
      width="auto"
      options={options}
      onMount={handleEditorDidMount}
      onChange={handleChange}
    />
  );
};

export default CodeEditor;
