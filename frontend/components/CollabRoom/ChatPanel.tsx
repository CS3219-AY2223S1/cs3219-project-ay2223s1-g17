import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
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
import LoadingWrapper from 'components/Loading/LoadingWrapper';

type Props = {
  id: string;
  height: string;
  userSelect: string;
  pointerEvents: string;
  shouldDisplay: boolean;
  chats: Chat[];
  setChats: Dispatch<SetStateAction<Chat[]>>;
  readOnly?: boolean;
  isLoading: boolean;
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
  readOnly,
  isLoading,
}) => {
  const { roomId } = useMatchingContext();
  const { user } = useAuth();
  const theme = useTheme();
  const [socket, setSocket] = useState<Socket>();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (readOnly) return;

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
    <LoadingWrapper isLoading={isLoading} custom repeat={4}>
      <Stack
        id={id}
        sx={{
          display: shouldDisplay ? 'flex' : 'none',
          height,
          userSelect,
          pointerEvents,
          bgcolor: '#f7f8fa',
        }}
        justifyContent="space-between"
      >
        <Stack
          id="chat-box"
          sx={{
            color: 'black',
            wordBreak: 'break-word',
            overflowY: 'auto',
            height: '100%',
            p: 2,
          }}
          flexDirection="column-reverse"
        >
          {chats.length ? (
            chats.map((chat, index) => (
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
                    chat.senderId === user?._id ? '#BFFFBE' : '#2370C8',
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    alignSelf:
                      chat.senderId === user?._id ? 'flex-end' : 'flex-start',
                    display:
                      chat.isConsecutive || chat.senderId === user?._id
                        ? 'none'
                        : 'inline-block',
                    mb: 1,
                    color: 'white',
                  }}
                >
                  {chat.senderName}
                </Typography>
                <Typography
                  variant="body1"
                  color={
                    chat.senderId === user?._id ? 'rgba(0,0,0,0.8)' : 'white'
                  }
                >
                  {chat.message}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    alignSelf: 'flex-end',
                    mt: 0.125,
                    color: chat.senderId === user?._id ? 'black' : 'white',
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
                      chat.senderId === user?._id ? '#BFFFBE' : '#2370C8'
                    }`,
                    height: 0,
                    width: 0,
                  }}
                />
              </Stack>
            ))
          ) : (
            <Typography
              variant="h5"
              fontWeight="light"
              color="secondary.light"
              textAlign="center"
              sx={{ my: 'auto' }}
            >
              No Chats To Display
            </Typography>
          )}
        </Stack>
        {readOnly ? (
          <></>
        ) : (
          <form onSubmit={handleChat}>
            <Stack
              id="chat-input-container"
              flexDirection="row"
              columnGap={1}
              sx={{
                m: 2,
                pl: 2,
                pr: 0.5,
                borderRadius: '4px',
                bgcolor: 'white',
                outline: '1px solid gray',
                '&:focus-within': {
                  outlineColor: theme.palette.primary.main,
                  outlineWidth: '2px',
                },
              }}
            >
              <input
                type="text"
                style={{
                  flexGrow: 1,
                  color: 'black',
                  border: 'none',
                  outline: 'none',
                  fontSize: 16,
                }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <IconButton
                disabled={message === ''}
                type="submit"
                color="primary"
              >
                <SendIcon />
              </IconButton>
            </Stack>
          </form>
        )}
      </Stack>
    </LoadingWrapper>
  );
};

export default ChatPanel;
