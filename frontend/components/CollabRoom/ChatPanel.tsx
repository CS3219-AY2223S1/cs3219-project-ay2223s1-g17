import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { useMatchingContext } from 'contexts/MatchingContext';
import useAuth from 'contexts/AuthContext';
import {
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import SendIcon from '@mui/icons-material/Send';
import { io, Socket } from 'socket.io-client';

type Props = {
  id: string;
  height: string;
  userSelect: string;
  pointerEvents: string;
  shouldDisplay: boolean;
  chats: Chat[];
  setChats: Dispatch<SetStateAction<Chat[]>>;
};

export type Chat = {
  senderId: string;
  senderName: string;
  message: string;
  time: string;
  isConsecutive?: boolean;
};

const ChatPanel: FC<Props> = ({
  id,
  height,
  userSelect,
  pointerEvents,
  shouldDisplay,
  chats,
  setChats,
}) => {
  const { roomId } = useMatchingContext();
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket>();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const sock = io(
      `localhost:${process.env.NEXT_PUBLIC_COMMUNICATION_SERVICE_PORT}`,
      {
        autoConnect: false,
      }
    );

    sock.auth = { roomId };
    sock.connect();
    setSocket(sock);

    sock.on('message', (newChats: Chat[]) => {
      setChats(newChats);
    });

    return () => {
      sock.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChat = (e: FormEvent) => {
    e.preventDefault();
    const newChat: Chat = {
      senderId: user?._id ?? 'anonymous',
      senderName: user?.username ?? 'anonymous',
      time: new Date().toLocaleTimeString('en-sg', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
      }),
      message,
    };
    socket?.emit('message', { chats, newChat });
    setMessage('');
  };

  return (
    <Stack
      id={id}
      sx={{
        display: shouldDisplay ? 'flex' : 'none',
        height,
        userSelect,
        pointerEvents,
      }}
      justifyContent="space-between"
    >
      <Stack
        id="chat-box"
        sx={{
          backgroundColor: 'white',
          color: 'black',
          wordBreak: 'break-word',
          overflowY: 'auto',
          height: '100%',
          p: 2,
        }}
        flexDirection="column-reverse"
      >
        {chats.map((chat, index) => (
          <Stack
            key={`chat-${index}`}
            sx={{
              alignSelf:
                chat.senderId === user?._id ? 'flex-end' : 'flex-start',
              order: chats.length - index,
              minWidth: '10%',
              maxWidth: 'fit-content',
              position: 'relative',
              ml: chat.senderId === user?._id ? '10%' : 0,
              mr: chat.senderId === user?._id ? 0 : '10%',
              mt: chat.isConsecutive ? 0.5 : index === 0 ? 0 : 2,
              p: 1,
              borderRadius: '0.5rem',
              backgroundColor:
                chat.senderId === user?._id ? 'lightgreen' : 'lightblue',
            }}
          >
            <Typography
              variant="subtitle2"
              fontSize={18}
              sx={{
                alignSelf:
                  chat.senderId === user?._id ? 'flex-end' : 'flex-start',
                display:
                  chat.isConsecutive || chat.senderId === user?._id
                    ? 'none'
                    : 'inline-block',
                mb: 0.25,
              }}
            >
              {chat.senderName}
            </Typography>
            <Typography variant="body1" color="rgba(0,0,0,0.8)">
              {chat.message}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                alignSelf: 'flex-end',
                mt: 0.125,
              }}
            >
              {chat.time}
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: chat.senderId === user?._id ? '-8px' : 'auto',
                left: chat.senderId === user?._id ? 'auto' : '-8px',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: `8px solid ${
                  chat.senderId === user?._id ? 'lightgreen' : 'lightblue'
                }`,
                height: 0,
                width: 0,
              }}
            />
          </Stack>
        ))}
      </Stack>
      <form onSubmit={handleChat}>
        <Stack
          id="chat-input-container"
          flexDirection="row"
          columnGap={1}
          sx={{
            m: 2,
            pl: 2,
            pr: 0.5,
            borderRadius: '2rem',
            outline: '1px solid black',
          }}
        >
          <input
            type="text"
            style={{
              flexGrow: 1,
              backgroundColor: 'inherit',
              color: 'black',
              border: 'none',
              outline: 'none',
              fontSize: 16,
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton disabled={message === ''} type="submit">
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
    </Stack>
  );
};

export default ChatPanel;
