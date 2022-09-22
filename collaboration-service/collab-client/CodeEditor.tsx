import Editor, { EditorProps, OnChange } from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

const CodeEditor = () => {
  const editorRef = useRef(null);
  const isIncoming = useRef(false);
  const [socket, setSocket] = useState<Socket>();
  const [options, setOptions] = useState({
    theme: 'vs-dark',
  });

  useEffect(() => {
    console.log('mounting');
    const sock = io('http://localhost:8050');
    setSocket(sock);

    sock.on('connect', () => console.log('connected'));

    sock.on('editorChange', (event) => {
      // console.log({ event });
      // console.log(editorRef?.current);
      // console.log({ a: editorRef.current?.getModel() });
      try {
        isIncoming.current = true;
        editorRef.current?.getModel().applyEdits(event.changes);
        // }
      } catch (e) {
        alert('INTERNAL ERROR');
      }
    });

    return () => {
      console.log('dismounting');
      sock.off('editorChange');
      sock.off('connect');
    };
  }, []);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const handleChange = (value: string = '', event: any) => {
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
      height="90vh"
      defaultLanguage="javascript"
      onChange={handleChange}
      onMount={handleEditorDidMount}
      options={options}
      defaultValue="//start coding"
    />
  );
};

export default CodeEditor;
