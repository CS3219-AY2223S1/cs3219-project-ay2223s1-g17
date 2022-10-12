import { Box, Button, Stack, Typography } from '@mui/material';
import { useMatchingContext } from 'contexts/MatchingContext';
import useAuth from 'contexts/AuthContext';
import { FC, FormEvent, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type Props = {
  id: string;
  height: string;
  userSelect: string;
  pointerEvents: string;
  shouldDisplay: boolean;
};

type Chat = {
  sender: string;
  message: string;
};

const ChatPanel: FC<Props> = ({
  id,
  height,
  userSelect,
  pointerEvents,
  shouldDisplay,
}) => {
  const { roomId } = useMatchingContext();
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [socket, setSocket] = useState<Socket>();
  const [message, setMessage] = useState('');
  const [otherUsername, setOtherUsername] = useState('');

  useEffect(() => {
    const sock = io(
      `localhost:${process.env.NEXT_PUBLIC_COMMUNICATION_SERVICE_PORT}`,
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

    sock.emit('otherUsername', user?.username ?? 'Anonymous');

    sock.on('message', (newChats: Chat[]) => {
      setChats(newChats);
    });

    return () => {
      sock.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (socket && !otherUsername) {
      socket.on('otherUsername', (username: string) =>
        setOtherUsername(username)
      );
    }
  }, [socket, otherUsername]);

  const handleChat = (e: FormEvent) => {
    e.preventDefault();
    socket?.emit('message', {
      sender: user?._id ?? 'anonymous',
      message,
    });
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
        sx={{
          borderBottom: '1px solid black',
          p: 1,
          width: '100%',
        }}
      >
        <Typography color="black">{otherUsername}</Typography>
      </Stack>
      <Stack
        id="chat-box"
        sx={{
          backgroundColor: 'white',
          color: 'black',
          wordBreak: 'break-word',
          overflowY: 'auto',
          height: '100%',
        }}
        flexDirection="column-reverse"
      >
        {chats.map((chat, index) => (
          <Stack
            key={`chat-${index}`}
            sx={{
              p: 1,
              alignSelf: chat.sender === user?._id ? 'flex-end' : 'flex-start',
              order: chats.length - index,
              maxWidth: 'fit-content',
            }}
          >
            {/* <Typography
              variant="caption"
              sx={{
                alignSelf:
                  chat.sender === user?._id ? 'flex-start' : 'flex-end',
                px: 1,
              }}
            >
              {chat.sender}
            </Typography> */}
            <Box
              sx={{
                borderRadius:
                  chat.sender === user?._id
                    ? '1rem 0.5rem 0px 1rem'
                    : '0.5rem 1rem 1rem 0px',
                backgroundColor:
                  chat.sender === user?._id ? 'lightgreen' : 'lightblue',
                p: 1,
                minWidth: '3rem',
              }}
            >
              <Typography variant="body1" textAlign="center">
                {chat.message}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
      <form onSubmit={handleChat}>
        <Stack
          flexDirection="row"
          columnGap={1}
          sx={{
            p: 2,
          }}
        >
          <input
            type="text"
            style={{
              width: '80%',
              padding: '4px 8px',
              background: 'lightgray',
              borderRadius: '4px',
              border: '1px solid black',
              display: 'inline-block',
              color: 'black',
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ flexGrow: 1 }}
            disabled={message === ''}
            type="submit"
          >
            Send
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default ChatPanel;
