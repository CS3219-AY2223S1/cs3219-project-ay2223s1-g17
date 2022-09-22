import Editor from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { LANGUAGE } from 'utils/enums';

interface Props {
  language: LANGUAGE;
  templates: Record<LANGUAGE, string>;
}

const ActualEditor = ({ language, templates }: Props) => {
  const [editorContent, setEditorContent] = useState(
    templates[language] ?? '// start coding here'
  );
  const editorRef = useRef(null);
  const isIncoming = useRef(false);
  const [socket, setSocket] = useState<Socket>();
  const [options, setOptions] = useState({
    fontSize: '18px',
    scrollBeyondLastLine: false,
    minimap: { enabled: false },
  });

  useEffect(() => {
    console.log('mounting');
    const sock = io('http://localhost:8004');
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

    return () => {
      console.log('dismounting');
      sock.off('editorChange');
      sock.off('connect');
      sock.disconnect();
    };
  }, []);

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

export default ActualEditor;
