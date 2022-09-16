import { Box } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const PageWrapper: FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)',
        backgroundImage: 'linear-gradient(to right, #3275c4, #1c2d50)',
        position: 'absolute',
        top: '64px',
        left: 0,
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
};

export default PageWrapper;
