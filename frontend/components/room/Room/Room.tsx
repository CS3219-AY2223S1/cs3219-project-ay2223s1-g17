import { Stack } from '@mui/material';
import { useMatchingContext } from 'contexts/MatchingContext';
import React from 'react';

const Room = () => {
  const { leaveRoom } = useMatchingContext();
  return (
    <Stack
      sx={{
        height: '100%',
        color: 'black',
        textAlign: 'center',
        paddingTop: '30%',
        fontSize: 24,
      }}
    >
      {`room 31283182979`}
      <button onClick={leaveRoom}>exit room</button>
    </Stack>
  );
};

export default Room;
