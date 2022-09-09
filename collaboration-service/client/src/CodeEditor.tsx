import Editor, { EditorProps, OnChange } from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../server/types/socket';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

interface EditorComponentProps {
  language?: string;
  code?: string;
  onChange: OnChange;
}

// Socket<ListenEvents (server -> client), EmitEvents (client -> server)>
let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

const ENDPOINT = 'http://localhost:3000';

const CodeEditor = () => {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    // get from query string
    // for now just generate a new uuid
    const room = uuid();

    console.log(`>>> room ${room}`);

    socket = io(ENDPOINT);

    let name;

    while (!name) {
      name = prompt('Hi, What is your name?');
    }

    setName(name);
    setRoomId(room);

    // Initial connection to the room
    socket.emit('join', { name, roomId }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, []);

  // Socket.io listeners
  useEffect(() => {
    socket.on('code', (code) => {
      setCode(code);
    });

    // socket.on("changeMode", (mode) => {
    //   setConfig({ mode: mode });
    // });

    // socket.on("changeTheme", (theme) => {
    //   setConfig({ theme: theme });
    // });

    // listen to changes of users state to see if need to
    // add some FE changes to user joined or smth
    // socket.on('roomData', ({ users }) => {
    //   setUsers(users);
    //   console.log(users);
    // });
  }, []);

  const handleChange = (value: string = '',
  e: monaco.editor.IModelContentChangedEvent,) => {
    console.log(`>>> value ${value}`);
    console.log(`>>> event ${e}`);

    socket.emit('sendCode', value);
  };

  //   const handleMode = (e: Event) => {
  //     setConfig({ mode: e.target.value });
  //     socket.emit("sendModeValue", e.target.value);
  //   };

  //   const handleTheme = (e: Event) => {
  //     setConfig({ theme: e.target.value });
  //     socket.emit("sendThemeValue", e.target.value);
  //   };

  //   const handleShare = () => {
  //     navigator.clipboard.writeText(window.location.href);
  //     store.addNotification({
  //       message: "Copied shareable link to clipboard!",
  //       type: "info",
  //       insert: "top",
  //       container: "top-right",
  //       animationIn: ["animated", "fadeIn"],
  //       animationOut: ["animated", "fadeOut"],
  //       dismiss: {
  //         duration: 5000,
  //         onScreen: true,
  //         pauseOnHover: true,
  //         touch: true,
  //         showIcon: true,
  //         click: true,
  //       },
  //     });
  //   };

  const modes = [
    { name: 'XML/HTML', code: 'xml' },
    { name: 'CSS', code: 'css' },
    { name: 'Javascript', code: 'javascript' },
    { name: 'C/C++/C#', code: 'clike' },
    { name: 'Python', code: 'python' },
    { name: 'PHP', code: 'php' },
    { name: 'Vue', code: 'vue' },
  ];

  const themes = [
    { name: 'Material', code: 'material' },
    { name: 'Monokai', code: 'monokai' },
    { name: 'Nord', code: 'nord' },
    { name: 'Ambiance', code: 'ambiance' },
    { name: 'Eclipse', code: 'eclipse' },
  ];

  const options = {
    theme: 'vs-dark',
  };

  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue={code}
      onChange={handleChange}
      options={options}
    />
  );
};

export default CodeEditor;
