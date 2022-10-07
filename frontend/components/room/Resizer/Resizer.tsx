import React from 'react';
import { Box, Stack } from '@mui/material';

const Resizer = () => {
  return (
    <Stack
      id="resizer"
      sx={{
        height: '100%',
        width: '14px',
        backgroundColor: 'rgba(0,0,0,0.1)',
        cursor: 'col-resize',
        zIndex: 1,
      }}
      alignItems="center"
      justifyContent="center"
      rowGap={1}
    >
      {Array.from(Array(3).keys()).map((index) => (
        <Dot key={index} />
      ))}
    </Stack>
  );
};

const Dot = () => (
  <Box
    sx={{
      backgroundColor: 'white',
      borderRadius: '100%',
      border: '1px solid gray',
      width: '50%',
      aspectRatio: '1/1',
    }}
  />
);

export default Resizer;
